import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SynapsPicsModule } from './synaps-pics/synaps-pics.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SynapsPicsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
