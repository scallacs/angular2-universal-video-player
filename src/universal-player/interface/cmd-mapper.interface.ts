
import { CmdMapperInterface, VideoInfoInterface } from '../interface';

export interface CmdMapperInterface {

    seekTo(seconds: number): void;

    play(): void;

    stop(): void;

    pause(): void;

    getCurrentTime(): number;

    load(data: VideoInfoInterface): void;

    getVideoUrl(): string;

    loadVideoUrl(url: string): void;

    loadVideoId(url: string): void;
    
    //speed(speed: number);
}