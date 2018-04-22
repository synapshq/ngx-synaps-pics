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

