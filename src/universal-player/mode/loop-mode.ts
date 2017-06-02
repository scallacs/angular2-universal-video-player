/**
 * 
 */

import { PlayerState } from '../model';
import { PlayerMode } from './player-mode';
import { AbstractSectionMode } from './section-mode.abstract';

export class LoopMode extends AbstractSectionMode {

    public onSectionEnd() {
        this._cmd.seekTo(this._start);
    }

    public toString(): string {
        return "LoopMode[from " + this._start + " to " + this._end + "]";
    }
}