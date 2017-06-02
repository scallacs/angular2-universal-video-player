import { PlayerController } from '../universal-player';

import { VideoTagModel } from './model';
import { VideoTagMode } from './mode';

export class VideoTaggerPlayerController extends PlayerController<VideoTagModel>{

    constructor(){
        super();
    }

    public play(videoTag: VideoTagModel){
        this.mode = new VideoTagMode(videoTag);
        this.cmd.play();
    }

    public playAll(){
        
    }

    public tags(){
        return this._playlist.items();
    }
}