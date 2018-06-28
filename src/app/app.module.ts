import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SynapsPicsModule } from 'ngx-synaps-pics';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SynapsPicsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
