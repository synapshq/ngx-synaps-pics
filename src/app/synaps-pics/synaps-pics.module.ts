import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynapsPicsDirective } from './synaps-pics.directive';
import { SynapsPicsUtils } from './synaps-pics.utils';
import { SynapsPicsConfig } from './synaps-pics.config';
import { SynapsImageOptions } from './synaps-image-options.model';

@NgModule({
  declarations: [
    SynapsPicsDirective
  ],
  exports: [
    CommonModule,
    SynapsPicsDirective
  ],
  providers: [
    SynapsPicsUtils,
    SynapsImageOptions,
    SynapsPicsConfig
  ]
})
export class SynapsPicsModule {
}
