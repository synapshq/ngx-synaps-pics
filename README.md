# ngx-synaps-pics

Angular bindings for [Synaps.Pics](https://synaps.pics)

## Installation

With npm:
```
npm i --save ngx-synaps-pics
```

With yarn:
```
yarn add ngx-synaps-pics
```

## Usage

Import `SynapsPicsModule` to your app.

```ts
import { SynapsPicsModule } from 'ngx-synaps-pics';

@NgModule{
  ....
  imports: [
    ...,
    SynapsPicsModule
  ],
```

Now you can use `synapsPics` directive in your templates.

```html
<img [synapsPics]="imageUrl" width="100" height="100" crop="fill">
```

### Using as background

By default, `synapsPics` directive sets the image url for `src` and/or `srcset` attribute. If you want to use image as a background you can use `as-background` attribute.

```html
<div [synapsPics]="imageUrl" width="100" height="100" as-background></div>
```

### Using as an attribute

You can also set url as an attribute:

```html
<a [synapsPics]="imageUrl" width="100" height="100" crop="fill" as-attr="href">Link to image</a>
```

### Lazy Loading

`ngx-synaps-pics` has the ability lazy loading images with a given condition or by checking if it's in the viewport.

#### Lazy load image when it's visible

```html
<img [synapsPics]="imageUrl" lazy>
```

> Please note that, visibility checking is using [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). If you need [to support Internet Explorer and Safari](https://www.caniuse.com/#feat=intersectionobserver) browsers please include [intersection observer pollyfill](https://www.npmjs.com/package/intersection-observer) to your page. Just run `npm i --save intersection-observer` and then add `import 'intersection-observer';` line to your `pollyfill.ts` file.

#### Lazy loading with a condition

`[lazy]` attribute also accepts a boolean value. So you can write some conditions for defining when image will be loaded. This feature is handy when you want to use it with a slider/carousel component for example.

```html
<div class="slide" *ngFor="let slide of slides; let i = index">
  <img [synapsPics]="imageUrl" [lazy]="activeSlide === i">
</div>
```

## Reference for manipulation parameters

For the original image below available manipulation parameters and example results are here.

![](https://img.synaps.pics/anon/image_bla.jpg)

parameter | value | example | Description
--- | --- | --- | ---
width | (integer) | ![](https://img.synaps.pics/anon/w_80/image_bla.jpg) | sets width: <br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80">```
height | (integer) | ![](https://img.synaps.pics/anon/h_80/image_bla.jpg) | sets height: <br>```<img [synapsPics]="'/anon/image_bla.jpg'" height="80">```
crop | fit (default) | ![](https://img.synaps.pics/anon/w_80,h_80,c_fit/image_bla.jpg) | The image is resized so that it takes up as much space as possible within a bounding box defined by the given width and height parameters. The original aspect ratio is retained and all of the original image is visible.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fit">```
crop | scale | ![](https://img.synaps.pics/anon/w_80,h_80,c_scale/image_bla.jpg) | Change the size of the image exactly to the given width and height without necessarily retaining the original aspect ratio: all original image parts are visible but might be stretched or shrunk.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="scale">```
crop | fill | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill/image_bla.jpg) | Same as the 'fit' mode but only if the original image is larger than the given limit (width and height), in which case the image is scaled down so that it takes up as much space as possible within a bounding box defined by the given width and height parameters. The original aspect ratio is retained and all of the original image is visible.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill">```
crop | pad | ![](https://img.synaps.pics/anon/w_80,h_80,c_pad,b_rgb:000000/image_bla.jpg) | Resize the image to fill the given width and height while retaining the original aspect ratio. If the proportions of the original image do not match the given width and height, padding is added to the image to reach the required size.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="pad">```
crop | limit | ![](https://img.synaps.pics/anon/w_80,h_80,c_limit/image_bla.jpg) | Same as the 'fit' mode but only if the original image is larger than the given limit (width and height).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="limit">```
quality | integer (default 80) | ![](https://img.synaps.pics/anon/w_80,h_80,q_40/image_bla.jpg) | Output quality. 1 to 100.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" q="40">```
gravity | center (default) | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_center/image_bla.jpg) | The focus to the center of the image when cropping.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="center">```
gravity | northwest | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_northwest/image_bla.jpg) | The focus to the northwest of the image when cropping.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="northwest">```
gravity | northeast | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_northeast/image_bla.jpg) | North east corner (top right).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="northeast">```
gravity | southeast | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_southeast/image_bla.jpg) | South east corner (bottom right).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="southeast">```
gravity | southwest | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_southwest/image_bla.jpg) | South west corner (bottom left).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="southwest">```
gravity | north | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_north/image_bla.jpg) | North center part (top center).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="north">```
gravity | west | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_west/image_bla.jpg) | Middle west part (left).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="west">```
gravity | east | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_east/image_bla.jpg) | Middle east part (right).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="east">```
gravity | south | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_south/image_bla.jpg) | Middle south part (bottom center).<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="south">```
gravity | auto | ![](https://img.synaps.pics/anon/w_80,h_80,c_fill,g_auto/image_bla.jpg) | Smart cropping with feature detection.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="fill" gravity="auto">```
background | ffffff | ![](https://img.synaps.pics/anon/w_80,h_80,c_pad,b_rgb:ffffff/image_bla.jpg) | Fill background color for `pad` crop style.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" crop="pad" bg="ffffff">```
format | jpg,png,gif | ![](https://img.synaps.pics/anon/w_80,h_80,f_gif/image_bla.jpg) | Set the output image format.<br>```<img [synapsPics]="'/anon/image_bla.jpg'" width="80" height="80" format="gif">```
