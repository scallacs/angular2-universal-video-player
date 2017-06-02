/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { PlayerEventInterface, CmdMapperInterface, VideoInfoInterface } from '../../interface';
import { PlayerInfo, PlayerState, VideoInfo, VideoProvider } from '../../model';



export class UniversalPlayerController implements PlayerEventInterface {

    private providers: {[key:string]:CmdMapperInterface}; 
    private playerInfo: PlayerInfo;
    private playerMode: PlayerEventInterface;
    private _cmd: CmdMapperInterface;
//
//    private registerProvider(){
//        
//    }

    public constructor() {
        console.log("PlayerData::init");
        this.playerInfo = new PlayerInfo();
        this.providers = {};
    }

    public registerProvider(id: string, provider: CmdMapperInterface){
        this.providers[id] = provider;
    }

    public setPlayerMode(mode: PlayerEventInterface) {
        this.playerMode = mode;
    }

    private setProvider(p: CmdMapperInterface): void {
        if (this._cmd !== p) {
            if (this._cmd != null) {
                this._cmd.stop();
            }
            console.log('Changing provider to: ' + p + '(before: ' + this._cmd + ')');
            this._cmd = p;
        }
    }

    public isMode(m): boolean {
        //        console.log("PlayerData::isMode(" + m + ") ? " + obj.mode);
        return this.playerMode === m;
    }

    public cmd(): CmdMapperInterface {
        return this._cmd;
    }

    // -------------------------------------------------------------------------
    // EVENTS

    public onPlayProgress(time: number): void {
        console.log('onPlayProgress(' + time + ')');
        this.playerInfo.time = time;
        if (this.playerMode != null) {
            this.playerMode.onPlayProgress(time);
        }
    }

    public onStateChanged(newState: PlayerState): void {
        console.log('onStateChanged(' + newState + ')');
        this.playerInfo.state = newState;
        if (this.playerMode != null) {
            this.playerMode.onStateChanged(newState);
        }
    }

    public onPlayerError(error: any): void {
        console.log('onPlayerError: ', error);

    }

    public onPlayerReady(): void {
        console.log('onPlayerReady()');
    }

    // -------------------------------------------------------------------------

    public hasError() {
        return false;
    }

    public errorPlayer(errorType, error) {

    }

    public isProvider(provider: any): boolean {
        return this._cmd === provider;
    }

    public getPlayer() {
        //console.log(obj.players[obj.data.provider]);
        return this._cmd;
    }

    public reset(): void {
        // TODO
    }

    public loadVideo(videoInfo: VideoInfoInterface) {
        // If same provider
        if (this.playerInfo.provider == videoInfo.getProvider()) {
            console.log('Same video, same provider');
        }
        // If not same provider
        else {
            console.log('Load video: ' + videoInfo);
            //            return this.thes
            // Get the provider 
            if (this.providers[videoInfo.getProvider().name]){
                let provider = this.providers[videoInfo.getProvider().name]
                this.setProvider(provider);
                // TODO 
                //this._cmd.load(provider);
            }
        }
    }

}
