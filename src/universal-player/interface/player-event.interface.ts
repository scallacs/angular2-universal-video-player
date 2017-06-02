/**
 * 
 */
import { PlayerState } from '../model';
 
export interface PlayerEventInterface {

    onStateChanged(newState: PlayerState): void;

    onPlayProgress(time: number): void;
    
    onPlayerReady(): void;
    
    onPlayerError(data: any): void;
}