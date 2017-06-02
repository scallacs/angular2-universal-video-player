/// <reference types="youtube" />

import { CmdMapperInterface, VideoInfoInterface } from '../../interface';

export class YoutubeCmdMapper implements CmdMapperInterface {

    private _player: YT.Player;

    public YoutubeCmdMapper(player: YT.Player) {
        this._player = player;
    }
    
    public setPlayer(player: YT.Player){
        this._player = player;
    }

    public seekTo(seconds: number) {
        this._player.seekTo(seconds, true);
    }
    
    public play() {
        this._player.playVideo();
    }
    
    public stop() {
        this._player.stopVideo();
    }
    
    public pause() {
        this._player.pauseVideo();
    }
    
    public getCurrentTime() {
        return 0;//$q.when(this._player.getCurrentTime());
    }
    
    public getVideoUrl(): string{
        return this._player.getVideoUrl();
    }

    /*
    public speed(){
        this._player.sp
    }*/

    public load(videoInfo: VideoInfoInterface): void {
        this._player.loadVideoById({
            videoId: videoInfo.getUrl(),
            startSeconds: videoInfo.getStartTime(),
        });
    }
    
    public loadVideoUrl(url: string): void {
        this._player.loadVideoByUrl(url);
    }

    public loadVideoId(id: string): void {
        this._player.loadVideoById(id);
    }
}