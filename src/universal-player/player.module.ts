/**
 * 
 */
import { NgModule } from '@angular/core';
import { UniversalPlayerComponent, UniversalPlayerController } from './provider/universal'; 
import { YoutubePlayerComponent, YoutubeCmdMapper } from './provider/youtube';
import { PlayerController } from './controller/player-controller';

import { CustomPlayerComponent } from './provider/custom';

// Application wide providers
const APP_PROVIDERS = [
    UniversalPlayerController,
    YoutubeCmdMapper,
    PlayerController
];


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [  ],
  declarations: [
    UniversalPlayerComponent,
    YoutubePlayerComponent,
    CustomPlayerComponent
  ],
  imports: [ // import Angular's modules
//    YoutubePlayerComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS
  ],
  exports: [
    UniversalPlayerComponent,
    YoutubePlayerComponent,
    CustomPlayerComponent
  ]
})
export class PlayerModule {}

