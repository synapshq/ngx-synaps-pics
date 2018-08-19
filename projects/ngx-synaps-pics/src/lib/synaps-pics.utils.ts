import { Injectable } from '@angular/core';
import { SynapsImageOptions } from './synaps-image-options.model';
import { SynapsPicsConfig } from './synaps-pics.config';

@Injectable()
export class SynapsPicsUtils {
  public protocol: string;
  public serviceUrl: string;

  constructor(config: SynapsPicsConfig) {
    this.protocol = config.useHttps ? 'https' : 'http';
    this.serviceUrl = `${this.protocol}://${config.serviceUrl}/`;
  }

  public getLocation(url: string) {
    // return new URL(url, this.serviceUrl);
    return `${this.serviceUrl}${url}`;
  }

  public getPath(url: string): string {
    // return this.getLocation(url).pathname;
    return url;
  }

  public getImageUrl(options: SynapsImageOptions): string {
    const params = [];
    options.dpi = options.dpi || 1;

    const size = this.getSizeString(options.width, options.height, options.dpi);

    if (size) {
      params.push(size);
    }

    if (options.crop) {
      params.push('c_' + options.crop);
    }

    if (options.bg) {
      params.push('b_rgb:' + options.bg);
    }

    if (options.gravity) {
      params.push('g_' + options.gravity);
    }

    if (options.quality) {
      params.push('q_' + options.quality);
    }

    if (options.format) {
      params.push('f_' + options.format);
    }

    const pathParts = this.getPath(options.path).replace(/^\/+|\/+$/, '').split('/');
    const fileName = pathParts.pop();
    const realPath = pathParts.join('/');

    return `${this.serviceUrl}${realPath}/` +
      (params.length > 0 ? params.join(',') + '/' : '') + fileName;

  }

  public getHDImages(options: SynapsImageOptions): string[] {
    return [1, 2, 3, 4].map((dpi) => {
      options.dpi = dpi;
      return this.getImageUrl(options);
    });
  }

  public getPlaceholderUrl(width: number, height: number, dpi: number): string {
    const size = this.getSizeString(width, height, dpi);

    return `${this.serviceUrl}synaps/${size},c_fill/default-placeholder.png`;
  }

  private getSizeString(width: number, height: number, dpi: number): string {
    const sizeParts = [];
    if (width || height) {
      if (width) {
        sizeParts.push('w_' + (width * dpi));
      }

      if (height) {
        sizeParts.push('h_' + (height * dpi));
      }
    }

    return sizeParts.join(',');
  }
}
