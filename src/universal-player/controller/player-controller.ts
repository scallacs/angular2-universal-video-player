
import { Component, Input } from '@angular/core';
import { PlayerEventInterface, CmdMapperInterface, PlaylistInterface, VideoInfoInterface } from '../interface';
import { PlayerMode } from '../mode';
import { PlayerState, Playlist } from '../model';
import { ObservablePlayerEvent } from './observable-player-event';

/**
 * TODO add multiple modes
 */
export class PlayerController<T> {

    protected _playlist: PlaylistInterface<T>;

    set playlist(p: PlaylistInterface<T>){
        this._playlist = p;
    }

    get playlist(): PlaylistInterface<T>{
        return this._playlist;
    }

    protected _event: ObservablePlayerEvent = new ObservablePlayerEvent();

    get event(){
        return this._event;
    }

    protected _cmd: CmdMapperInterface;

    get cmd(){
        return this._cmd;
    }

    set cmd(cmd: CmdMapperInterface){
        this._cmd = cmd;
    }

    protected _mode: PlayerMode = null;

    set mode(m: PlayerMode){
        this.assertPlayerReady();
        if (m !== null){
            m.setCmd(this._cmd);
        }
        this._mode = m;
    }

    public constructor() {
        console.log("PlayerController::init");
        this.initSubscription();
    }

    protected assertPlayerReady(): void{
        if (this._cmd === null){
            throw "Player is not ready yet. This method call should not be performed before OnReady event";
        }
    }

    private initSubscription(){
        this._event.playProgress.subscribe(
            (time: number) => {
                if (this._mode){
                    this._mode.onPlayProgress(time);
                }
            },
            (error: any) => {

            },
            () => {

            }
        );

        this._event.stateChanged.subscribe(
            (state: PlayerState) => {
                if (this._mode){
                    this._mode.onStateChanged(state);
                }
            },
            (error: any) => {
                
            },
            () => {
                
            }
        );

        this._event.error.subscribe(
            (error: any) => {
                // TODO 
            },
            (error: any) => {
                
            },
            () => {
                
            }
        );
    }

    public toString(): string{
        return 'PlayerController[mode=' + this._mode + '; event=' + this._event + '; cmd=' + this._cmd + ']';
    }
}