import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerModule } from '../universal-player';
import { HomeComponent } from './home';

import { PageUniversalPlayerComponent } from './universal-player';
import { PagePlayerControlComponent } from './player-control';
import { PageAnnotationComponent } from './annotation';

import { VideoTaggerModule } from '../videotagger';

import { routing } from './app.routes';

const APP_COMPONENTS = [
    AppComponent,
    HomeComponent,
    PageUniversalPlayerComponent,
    PagePlayerControlComponent,
    PageAnnotationComponent
];

@NgModule({
  declarations: [
    APP_COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PlayerModule,
    VideoTaggerModule,

    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
