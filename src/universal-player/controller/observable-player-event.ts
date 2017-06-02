
import { PlayerEventInterface } from '../interface';
import { PlayerState } from '../model';
import { Observable, Observer, Subject } from 'rxjs'

export class ObservablePlayerEvent implements PlayerEventInterface {

    private _stateChangedStream: Subject<PlayerState> = new Subject();

    get stateChanged(): Observable<PlayerState>{
        return this._stateChangedStream;
    }

    onStateChanged(newState: PlayerState): void {
        this._stateChangedStream.next(newState);
    }

    private _playProgressStream: Subject<number> = new Subject();
    
    get playProgress(): Observable<number>{
        return this._playProgressStream;
    }

    onPlayProgress(time: number): void {
        this._playProgressStream.next(time);
    }

    private _playerReadyStream: Subject<any> = new Subject();
    
    get ready(): Observable<any>{
        return this._playerReadyStream;
    }

    onPlayerReady(): void {
        this._playerReadyStream.next();
    }

    private _playerErrorStream: Subject<any> = new Subject();
    
    get error(): Observable<any>{
        return this._playProgressStream;
    }

    onPlayerError(data: any): void {
        this._playerErrorStream.next(data);
    }

}