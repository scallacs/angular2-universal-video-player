import { VideoInfoInterface } from '../interface';
import { VideoProvider } from '../model';

export class VideoInfo implements VideoInfoInterface {
    
    public startTime: number;
    public endTime: number;
    
    public getStartTime(): number {
        return this.startTime;
    }
    public getEndTime(): number {
        return this.endTime;
    }

    public getUrl() {
        return this.url;
    }

    public getProvider(): VideoProvider {
        return this.provider;
    }

    constructor(
        public url: string,
        public provider: VideoProvider,
        startTime?: number,
        endTime?: number){
        this.startTime = startTime ? startTime : 0;
        this.endTime = endTime ? endTime : null;
    }

    public toString(): string{
        return 'VideoInfo[url='+this.getUrl()+';provider='+this.getProvider()+']';
    }

}