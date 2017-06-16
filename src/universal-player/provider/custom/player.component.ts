import {Component, Input, Output, AfterViewChecked} from '@angular/core';
import { PlayerEventInterface } from '../../interface';
import { PlayerState } from '../../model';
import { CustomCmdMapper } from './cmd-mapper';
import { PlayerController } from '../../controller/player-controller';

@Component({
    selector: 'custom-player',
    providers: [],
    styleUrls: [
        './style.css'
    ],
    templateUrl: './player.html'
})
export class CustomPlayerComponent {

    private static INTERVAL_PLAY_PROGRESS_MILLIS: number = 100.

    @Input() ctrl: PlayerController<any>;

    public currentTime: number = 0;
    public timer: any;
    public player: YT.Player;

    constructor() {
        // TODO
    }

    public ngAfterViewChecked(): void {
        this.loadApi();
    }

    private loadApi(): void {
        // TODO 
    }

    private onApiReady(): void {
        let that: CustomPlayerComponent = this;
        console.log(this);
        
        // TODO build player

        let cmd = new CustomCmdMapper();
        cmd.setPlayer(this.player);
        this.ctrl.cmd = cmd;

        this.onReady();
    }

    public onError(error: any) {
        console.error('Custom player error: ', error);
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
            console.warn('CustomPlayer: There is no event listener registered');
            return;
        }
        this.ctrl.event.onPlayerReady();
    }

    public onStateChange(newState: PlayerState) {
        //clearInterval(that.event.timer);
        if (!this.ctrl.event){
            console.warn('CustomPlayer: There is no event listener registered for this event: ' + event);
            return;
        }

        switch (newState){
            case PlayerState.Play: 
            // TODO run timer
            break;
            case PlayerState.Pause:
            // TODO stop timer
            break;
            case PlayerState.Stop: 
            // TODO stop timer
            // TODO reset to 0 timer
            this.currentTime = 0;
            break;
        }
        this.clearTimeout();
        this.ctrl.event.onStateChanged(newState);
    }

    private clearTimeout(): void {
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
    }
}
