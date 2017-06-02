
import {NgModule} from '@angular/core';
import { UniversalPlayerComponent } from './universal-player.component';
import { YoutubePlayerComponent } from '../youtube';

@NgModule({
  imports: [    
    YoutubePlayerComponent
  ],
  declarations: [
    UniversalPlayerComponent,
  ],
  providers: [
    
  ]
})
export default class UniversalPlayerModule {}
