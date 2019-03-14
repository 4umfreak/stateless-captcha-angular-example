import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransomApiClientService } from './transom-api-client.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ServicesModule } from './services/services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CaptchaComponent } from "./utils-components/captcha/captcha.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle, faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(faInfoCircle, faExclamationTriangle, faSpinner);

@NgModule({
  declarations: [
    AppComponent,
    CaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServicesModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    TransomApiClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
