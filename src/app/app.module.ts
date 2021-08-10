import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { JoyrideModule } from 'ngx-joyride';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormatTimePipe } from './pipe/format-time.pipe';
var CREDENTIALS = {
  apiKey: 'AIzaSyB4-GCxJO5Y6wh1x9bDkLv2W7daTXXyy3Q',
  authDomain: 'astro360-app.firebaseapp.com',
  projectId: 'astro360-app',
  storageBucket: 'astro360-app.appspot.com',
  messagingSenderId: '657106332716',
  appId: '1:657106332716:web:34b07c1614d2f1feeef589',
  measurementId: 'G-142BMTG8B7',
};
@NgModule({
  declarations: [AppComponent, FormatTimePipe],
  entryComponents: [],
  imports: [
    JoyrideModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(CREDENTIALS),
    AngularFireAuthModule,
  ],
  providers: [
    Facebook,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
