// /// <reference types="vimeo" />

import { CmdMapperInterface, VideoInfoInterface } from '../../interface';

export class VimeoCmdMapper implements CmdMapperInterface {

    protected _player: any;
    protected _iframe: any;

    public VimeoCmdMapper() {
    }

    public setPlayer(player: YT.Player) {
        // this._player = player;
    }

    public seekTo(seconds: number) {
        this._player.api('seekTo', seconds);
    }

    public play() {
        this._player.api('play');
    }

    public stop() {
        // this._player.stopVideo();
        this._player.api('pause');
    }

    public pause() {
        console.log('VimeoCmdMapper::stop()');
        this._player.api('pause');
    }

    public getCurrentTime(): number {
        // var self = this;
        // return $q(function(resolve, reject) {
        //     self._player.api('getCurrentTime', function(value) {
        //         return resolve(value);
        //     });
        // });
        return 0;
    }

    public getVideoUrl(): string {
        return "";
        // return this._player.getVideoUrl();
    }

    /*
    public speed(){
        this._player.sp
    }*/

    public load(videoInfo: VideoInfoInterface): void {
        console.log('VimeoCmdMapper::load');
        this._iframe.attr('src', this.computeUrl(videoInfo.getUrl(), this._iframe.attr('id')));
        this._iframe.load(() => {
            this.seekTo(videoInfo.getStartTime());
            this.play();
        });
    }

    public loadVideoUrl(url: string): void {
        // this._player.loadVideoByUrl(url);
    }

    public loadVideoId(id: string): void {
        // this._player.loadVideoById(id);
    }

    protected computeUrl(videoId, playerId) {
        return 'http://player.vimeo.com/video/' + videoId + '?api=1&amp;player_id=' + playerId + '&amp;callback=JSON_CALLBACK';
    }

    
}