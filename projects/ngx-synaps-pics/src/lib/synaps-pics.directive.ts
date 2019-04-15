import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { from, Observable, ReplaySubject, Subject } from 'rxjs';
import { Gravity } from './synaps-image-options.model';
import { SynapsPicsUtils } from './synaps-pics.utils';

@Directive({
  selector: '[synapsPics]'
})
export class SynapsPicsDirective implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() crop: string;
  @Input() bg: string;
  @Input() quality: number;
  @Input() gravity: Gravity;
  @Input() format: ['jpg', 'png', 'gif', 'webp'];

  private _imageUrl: string;
  private _lazy: boolean = null;
  private _dpi = 1;
  private _lazySubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _isLoadedSubject: Subject<boolean>;
  private _lazyObservable: Observable<boolean>;
  private isLoaded = false;
  private elementId: string;

  @Input('lazy')
  set lazy(value: boolean) {
    this._lazy = value;
    if (value === true) {
      this._lazySubject.next(true);
    }
  }

  constructor(private el: ElementRef, private utils: SynapsPicsUtils, private renderer: Renderer2) {
    this._lazyObservable =  from(this._lazySubject);
    this._isLoadedSubject = new Subject();

    if ('lazy' in this.el.nativeElement.attributes) {
      this._lazyObservable = from(this.inViewportSubject());
    }

  }

  ngOnInit() {
    if (this._lazy === null) {
      this._lazySubject.next(true);
    }
  }

  private makeid() {
    let text = '_s';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.elementId = text;
    this.el.nativeElement.setAttribute(text, '');
  }

  private inViewportSubject(): Subject<boolean> {
    const subject = new Subject<boolean>();
    const config = {
      // If the image gets within 50px in the Y axis, start the download.
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    if (!('IntersectionObserver' in window)) {
      subject.next(true);
    } else {
      // It is supported, load the images
      const observer = new IntersectionObserver((entries) => {
        // Loop through the entries
        entries.forEach(entry => {
          // Are we in viewport?
          if (entry.intersectionRatio > 0) {
            // Stop watching and load the image
            observer.unobserve(entry.target);
            subject.next(true);
          }
        });
      }, config);
      observer.observe(this.el.nativeElement);
    }

    return subject;
  }

  private addStyle(imageUrls) {
    this.makeid();
    // Fallback image
    let css = `[${this.elementId}] {
      background-image: url(${imageUrls[0]}) !important;
     }`;

    // High density versions
    css += imageUrls.map((imageUrl, index) => {
      return `@media (-webkit-min-device-pixel-ratio: ${index + 1}),
       (min-resolution: ${index + 1}dppx) {
         [${this.elementId}] {
          background-image: url(${imageUrl}) !important;
         }
       }
      `;
    }).join('');

    const head = document.querySelector('head');
    const style = this.renderer.createElement('style');

    this.renderer.setAttribute(style, 'type', 'text/css');
    this.renderer.appendChild(style, this.renderer.createText(css));

    this.renderer.appendChild(head, style);
  }

  private setImage(imageUrls: string[]) {
    let targetAttr = 'src';
    const element = this.el.nativeElement;
    const attrs = element.attributes;

    if ('as-link' in attrs) {
      targetAttr = 'href';
    }

    if ('as-attr' in attrs) {
      targetAttr = element.getAttribute('as-attr');
    }

    const showImage = () => {
      if ('as-background' in attrs) {
        this.addStyle(imageUrls);
      } else {
        element.setAttribute(targetAttr, imageUrls[0]);
        if (targetAttr === 'src') {
          element.setAttribute('srcset', imageUrls.map((imageUrl, index) => `${imageUrl} ${index + 1}x`).join(', '));
        }
      }
    };

    this._lazyObservable.subscribe(() => {
      showImage();
      this._isLoadedSubject.next(true);
    });
  }

  @Input('synapsPics')
  set imageUrl(name: string) {
    this._imageUrl = name && name.trim();
    const self = this;
    const element = this.el.nativeElement;
    const attrs = element.attrs;

    const placeholderUrl = this.utils.getPlaceholderUrl(this.width, this.height, this._dpi);

    element.addEventListener('error', function () {
      element.removeEventListener('error', this);
      // self.setImage(placeholderUrl);
    });

    if (this._imageUrl) {
      const images = this.utils.getHDImages({
        path: this.utils.getPath(this._imageUrl),
        width: this.width,
        height: this.height,
        crop: this.crop,
        bg: this.bg,
        quality: this.quality,
        gravity: this.gravity,
        format: this.format
      });

      this.setImage(images);
    } else {
      this.setImage([placeholderUrl]);
    }

  }

  get imageUrl(): string {
    return this._imageUrl;
  }
}
