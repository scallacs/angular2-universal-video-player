// /// <reference types="vimeo" />

import { Component, Input, Output, AfterViewChecked } from '@angular/core';
import { PlayerEventInterface } from '../../interface';
import { PlayerState } from '../../model';
import { VimeoCmdMapper } from './cmd-mapper';
import { PlayerController } from '../../controller/player-controller';

@Component({
    selector: 'vimeo-player',
    providers: [],
    styles: [],
    templateUrl: './player.html'
})
export class VimeoPlayerComponent {

    private static INTERVAL_PLAY_PROGRESS_MILLIS: number = 100.

    @Input() ctrl: PlayerController<any>;

    public timer: any;
    public player: YT.Player;

    constructor() {

    }

    public ngAfterViewChecked(): void {
        this.loadApi();
    }

    private loadApi(): void {
        console.log('VimeoPlayerComponent: Loading vimeo API');
        // var playerId = attrs.playerId || element[0].id;
        // element[0].id = playerId + 'Container';
        // var PlayerData = scope.playerData;

        // element.on('$destroy', function() {
        //     PlayerData.resetPlayer('vimeo');
        // });

        // scope.$watch('playerData.data.video_url', function(newVal) {
        //     if ($('#' + playerId).length === 0 && newVal !== null) {
        //         loadPlayer(newVal);
        //     }
        // });

        // function loadPlayer(videoUrl) {
        //     console.log('LOAD VIMEO PLAYER');
        //     var html = '<iframe \n\
        //             src="' + VimeoCmdMapper.computeUrl(videoUrl, playerId) + '" \n\
        //             id="' + playerId + '" width="100%" height="100%" frameborder="0"></iframe>';
        //     element.html(html);
        //     var iframe = $('#' + playerId);
        //     var player = $f(iframe[0]);
        //     // When the player is ready, add listeners for pause, finish, and playProgress

        //     player.addEvent('ready', function(playerId) {
        //         var player = $f(playerId);
        //         console.log('VIMEO PLAYER: ready');
        //         PlayerData.setPlayer('vimeo', VimeoCmdMapper.create(player, iframe));
        //         player.addEvent('playProgress', function(data) {
        //             scope.$apply(function() {
        //                 PlayerData.onPlayProgress(data.seconds);
        //             });
        //         });
        //         player.addEvent('pause', PlayerData.onPause);
        //         player.addEvent('play', PlayerData.onPlay);
        //         player.addEvent('finished', PlayerData.onFinish);
        //     });

        // }
    }

    private onApiReady(): void {

    }

    public onError(error: any) {

    }

    public onReady() {
        if (!this.ctrl.event) {
            console.warn('VimeoPlayer: There is no event listener registered');
            return;
        }
        //that.event.setPlayer('vimeo', VimeoCmdMapper.create(player));
        this.ctrl.event.onPlayerReady();
    }

    public onStateChange(event: any) {
        //clearInterval(that.event.timer);
        if (!this.ctrl.event) {
            console.warn('VimeoPlayer: There is no event listener registered for this event: ' + event);
            return;
        }

    }

    private clearTimeout(): void {
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
    }
}
