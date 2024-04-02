import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './intercept/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
