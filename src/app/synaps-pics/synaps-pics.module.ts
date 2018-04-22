import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynapsPicsDirective } from './synaps-pics.directive';
import { SynapsPicsUtils } from './synaps-pics.utils';
import { SynapsPicsConfig } from './synaps-pics.config';
import { SynapsImageOptions } from './synaps-image-options.model';

export { SynapsPicsUtils } from './synaps-pics.utils';
export { SynapsPicsConfig } from './synaps-pics.config';
export { SynapsImageOptions } from './synaps-image-options.model';

@NgModule({
  declarations: [
    SynapsPicsDirective
  ],
  exports: [
    CommonModule,
    SynapsPicsDirective,
    SynapsPicsUtils,
    SynapsImageOptions,
    SynapsPicsConfig
  ],
  providers: [
    SynapsPicsUtils,
    SynapsImageOptions,
    SynapsPicsConfig
  ]
})
export class SynapsPicsModule {
}
