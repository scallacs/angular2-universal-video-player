import { VideoTagModel } from '../model';

import { PlayerMode, CmdMapperInterface, PlayerState } from '../../universal-player';

export class VideoTagMode extends PlayerMode {

    constructor(videoTag: VideoTagModel){
        super();
        this.videoTag = videoTag;
    }
    /**
     * Wether or not we will repeat the video tag
     * -1 => infinite
     * 0 => no repetition
     * x => x repetition
     */
    public loopCount: number = -1;

    public videoTag: VideoTagModel;

    setVideoTag(videoTag : VideoTagModel){ 
        this.videoTag = videoTag;
        this.restart();
    }

    onStateChanged(newState: PlayerState) {

    }

    onPlayProgress(time: number) {
        if (time > this.videoTag.end) {
            if (this.loopCount === -1 || this.loopCount > 0) {
                if (this._subject){
                    this._subject.next('Next loop. remaining: ' + this.loopCount);
                }
                this._cmd.seekTo(this.videoTag.begin);
                if (this.loopCount > 0) {
                    this.loopCount--;
                }
            }
            else{
                if (this._subject){
                    this._subject.complete();
                }
            }
        }
        else if (time < this.videoTag.begin){
            this._cmd.seekTo(this.videoTag.begin);
        }
    }

    restart(){
        this._cmd.seekTo(this.videoTag.begin);
    }

    toString(): string{
        return 'VideoTagMode[tag='+this.videoTag+ ';loopCount='+this.loopCount+']';
    }
}