/* 
 *  All rights reserverd
 *  @author Stephane Leonard 
 *  @contact sca.leonard@gmail.com
 */
import { PlayerEventInterface, CmdMapperInterface } from '../interface';
import { PlayerState } from '../model';

import { Subject, Observable} from 'rxjs';

export abstract class PlayerMode{
    
    protected _subject: Subject<any> = null;

    protected _cmd: CmdMapperInterface;
    
    public setCmd(cmd: CmdMapperInterface){
        this._cmd = cmd;
    }
    
    public setSubject(s: Subject<any>){
        this._subject = s;
    }

    public event(): Observable<any>{
        return this._subject;
    }

    abstract onStateChanged(newState: PlayerState);
    
    abstract onPlayProgress(time: number);
}

