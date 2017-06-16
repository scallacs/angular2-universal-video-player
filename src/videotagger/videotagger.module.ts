/**
 * 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnotationComponent } from './ui';

// Application wide providers
const VIDEOTAGGER_PROVIDERS = [
];

const VIDEOTAGGER_COMPONENTS = [
  AnnotationComponent
];


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [],
  declarations: [
    VIDEOTAGGER_COMPONENTS
  ],
  imports: [ // import Angular's modules
    //    YoutubePlayerComponent
    CommonModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    VIDEOTAGGER_PROVIDERS
  ],
  exports: [
    VIDEOTAGGER_COMPONENTS,
  ]
})
export class VideoTaggerModule { }

