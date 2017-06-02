import { VideoProvider, VideoInfoInterface } from '../../universal-player';

class Video{
    public url;

    public getUrl(): string{
        return this.url;
    }
}

export class VideoTagModel implements VideoInfoInterface {    

    public getUrl() {
        this.video.getUrl();
    }
    
    public getProvider(): VideoProvider {
        return this.provider;
    }

    public getStartTime(): number {
        return this.begin;
    }

    public getEndTime(): number {
        return this.end;
    }


    public id: number;
    public title: string;
    public begin: number;
    public end: number;

    public video: Video;
    public provider: VideoProvider;
}