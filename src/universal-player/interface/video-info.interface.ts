/* 
 *  All rights reserverd
 *  @author Stephane Leonard 
 *  @contact sca.leonard@gmail.com
 */
import { CmdMapperInterface } from '../interface';
import { VideoProvider } from '../model';

export abstract class VideoInfoInterface {

    public abstract getUrl(): any;

    public abstract getProvider(): VideoProvider;

    public abstract getStartTime(): number;

    public abstract getEndTime(): number;
}