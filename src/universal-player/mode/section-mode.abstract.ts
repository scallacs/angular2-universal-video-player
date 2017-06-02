/**
 * 
 */

import { PlayerState } from '../model';
import { PlayerMode } from './player-mode';

export abstract class AbstractSectionMode extends PlayerMode{
    
    protected _start: number;
    get start(): number{
        return this._start;
    }
    set start(v: number){
        this._start = v;
    }
    protected _end: number;
    get end(): number{
        return this._end;
    }
    set end(v: number){
        this._end = v;
    }
    
    public onStateChanged(newState: PlayerState){
        
    }
    
    public onPlayProgress(time: number){
        if (time >= this._end){
            this.onSectionEnd();
        }
    }
    
    public abstract onSectionEnd();

    public toString(): string{
        return "AbstractSectionMode[from " + this._start + " to " + this._end + "]";
    }
}