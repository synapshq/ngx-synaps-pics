import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SynapsImageOptions } from './synaps-image-options.model';
import { SynapsPicsConfig } from './synaps-pics.config';
import { SynapsPicsDirective } from './synaps-pics.directive';
import { SynapsPicsUtils } from './synaps-pics.utils';

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
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SynapsPicsModule,
      providers: [
        SynapsPicsUtils,
        SynapsImageOptions,
        SynapsPicsConfig
      ]
    };
  }
}
