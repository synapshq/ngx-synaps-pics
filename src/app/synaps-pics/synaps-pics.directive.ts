import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { SynapsPicsUtils } from './synaps-pics.utils';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Directive({
  selector: '[synapsPics]'
})
export class SynapsPicsDirective implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() crop: string;
  @Input() bg: string;

  private _imageUrl: string;
  private _lazy: boolean = null;
  private _dpi = 1;
  private _lazySubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _isLoadedSubject: Subject<boolean>;
  private _lazyObservable: Observable<boolean>;
  private isLoaded = false;

  @Input('retina')
  set retina(value: any) {
    if (value !== 'false') {
      this._dpi = 2;
    }
  }

  get retina() {
    return this._dpi === 2;
  }

  @Input('lazy')
  set lazy(value: boolean) {
    this._lazy = value;
    if (value === true) {
      this._lazySubject.next(true);
    }
  }

  constructor(private el: ElementRef, private utils: SynapsPicsUtils) {
    this._lazyObservable =  Observable.from(this._lazySubject);
    this._isLoadedSubject = new Subject();

    if ('lazy' in this.el.nativeElement.attributes) {
      this._lazyObservable = Observable.from(this.inViewportSubject());
    }

  }

  ngOnInit() {
    if (this._lazy === null) {
      this._lazySubject.next(true);
    }
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

  private setImage(imageUrl: String) {
    let targetAttr = 'src';
    const element = this.el.nativeElement;
    const attrs = element.attributes;

    if ('as-link' in attrs) {
      targetAttr = 'href';
    }

    if ('as-attr' in attrs) {
      targetAttr = attrs.asAttr;
    }

    const showImage = function () {
      if ('as-background' in attrs) {
        element.style.backgroundImage = 'url(' + imageUrl + ')';
      } else {
        element.setAttribute(targetAttr, imageUrl);
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

    const getLocation = (href) => {
      const l = document.createElement('a');
      l.href = href;
      return l;
    };

    if (this._imageUrl) {
      const imageUrl = this.utils.getImageUrl({
        path: getLocation(this._imageUrl).pathname,
        width: this.width,
        height: this.height,
        retina: this.retina,
        crop: this.crop,
        bg: this.bg
      });

      this.setImage(imageUrl);
    } else {
      this.setImage(placeholderUrl);
    }

  }

  get imageUrl(): string {
    return this._imageUrl;
  }
}
