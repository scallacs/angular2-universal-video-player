/* 
 *  All rights reserverd
 *  @author Stephane Leonard 
 *  @contact sca.leonard@gmail.com
 */
 import { PlayerState } from './player-state.enum';
 import { VideoProvider } from './video-provider';

 export class PlayerInfo{
     public time: number;
     public duration: number;
     public state: PlayerState;
     public provider: VideoProvider;
      
     construct(){
         this.time = 0;
         this.duration = null;
         this.state = PlayerState.None;
         this.provider = null;
     }
 }
 