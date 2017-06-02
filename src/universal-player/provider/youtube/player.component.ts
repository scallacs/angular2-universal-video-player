/// <reference types="youtube" />

import {Component, Input, Output, AfterViewChecked} from '@angular/core';
import { PlayerEventInterface } from '../../interface';
import { PlayerState } from '../../model';
import { YoutubeCmdMapper } from './youtube-cmd-mapper';
import { PlayerController } from '../../controller/player-controller';

@Component({
    selector: 'youtube-player',
    providers: [],
    styles: [],
    templateUrl: './player.html'
})
export class YoutubePlayerComponent {

    private static INTERVAL_PLAY_PROGRESS_MILLIS: number = 100.

    @Input() ctrl: PlayerController<any>;

    public timer: any;
    public player: YT.Player;

    constructor() {
        let that = this;
        window['onYouTubeIframeAPIReady'] = (function() {
            that.onApiReady();
        });
    }

    public ngAfterViewChecked(): void {
        this.loadApi();
    }

    private loadApi(): void {
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    private onApiReady(): void {
        let that: YoutubePlayerComponent = this;
        console.log(this);
        let selectorId: any = document.getElementById('YoutubePlayer');
        this.player = new YT.Player(selectorId, {
            playerVars: {
                autoplay: 0,
                //                html5: 1,
                //theme: "light",
                //                modesbranding: 0,
                color: "white",
                iv_load_policy: 3,
                showinfo: 1,
                controls: 1,
                rel: 0,
                loop: 1
            },
            //height: '100%',
            //width: '100%',
            videoId: 'M7lc1UVf-VE',
            events: {
                onError: (function(data) {
                    that.onError(data);
                }),
                onReady: (function() {
                    that.onReady();
                }),
                onStateChange: (function(newState) {
                    that.onStateChange(newState);
                }),
            }
        });
        let cmd = new YoutubeCmdMapper();
        cmd.setPlayer(this.player);
        this.ctrl.cmd = cmd;
    }

    public onError(error: any) {
        console.error('Youtube error: ', error);
        switch (error.data) {
            case 2: // Invalid id
                break;
            case 100: // Video has been removed
            case 101: // Video is private
            case 150: // Same, video is private
                break
        }
        this.ctrl.event.onPlayerError(error);
    }

    public onReady() {
        if (!this.ctrl.event){
            console.warn('YoutubePlayer: There is no event listener registered');
            return;
        }
        //that.event.setPlayer('youtube', YoutubeCmdMapper.create(player));
        this.ctrl.event.onPlayerReady();
    }

    public onStateChange(event: any) {
        //clearInterval(that.event.timer);
        if (!this.ctrl.event){
            console.warn('YoutubePlayer: There is no event listener registered for this event: ' + event);
            return;
        }

        this.clearTimeout();
        switch (event.data) {
            case YT.PlayerState.PAUSED:
                this.ctrl.event.onStateChanged(PlayerState.Pause);
                break;
            case YT.PlayerState.ENDED:
                this.ctrl.event.onStateChanged(PlayerState.End);
                break;
            case YT.PlayerState.PLAYING:
                this.ctrl.event.onStateChanged(PlayerState.Play);
                console.log("Setting youtube time event");
                var that = this;
                this.timer = setInterval(function() {
                    that.ctrl.event.onPlayProgress(that.player.getCurrentTime());
                }, YoutubePlayerComponent.INTERVAL_PLAY_PROGRESS_MILLIS);
                break
            case YT.PlayerState.BUFFERING:
                break;
            case YT.PlayerState.CUED:
                break;
        }
    }

    private clearTimeout(): void {
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
    }
}
