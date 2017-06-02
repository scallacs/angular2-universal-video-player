import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerModule } from '../universal-player';
import { HomeComponent } from './home/home.component';
import { VideoTaggerModule } from '../videotagger';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PlayerModule,
    VideoTaggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
