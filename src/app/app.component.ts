import { Component, OnInit } from '@angular/core';

import { UniversalPlayerController, YoutubeCmdMapper, LoopMode, PlayerController,  PlayerMode, VideoInfo, Playlist, VideoProvider} from '../universal-player';

import { VideoTagModel, VideoTagMode, VideoTaggerPlayerController } from '../videotagger';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public currentTimer: number = 0;
  public videoUrl: string;
  public videoId: string;
  public modes: Array<PlayerMode> = [];
  public newVideoTag: VideoTagModel = new VideoTagModel();
  public _playerController: VideoTaggerPlayerController;


  constructor(){
    this._playerController = new VideoTaggerPlayerController();
    let ytProvider = new VideoProvider('youtube');
    
    this._playerController.playlist = new Playlist<VideoTagModel>();
    // this._playerController.playlist.push(new VideoInfo("MasvoDXQe3U", ytProvider));
    // this._playerController.playlist.push(new VideoInfo("U2quQUSKaik", ytProvider));
    // this._playerController.playlist.push(new VideoInfo("PuNv-oVm2T8", ytProvider));
    // this._playerController.playlist.push(new VideoInfo("m8aM2XVffaE", ytProvider));
    // this._playerController.playlist.push(new VideoInfo("bFz52xVQIos", ytProvider));

    // Init video tags

  }

  public ngOnInit() { 
      let loopMode = new LoopMode();
      loopMode.start = 3;
      loopMode.end = 5;
      this.modes.push(loopMode);


      let videoTag = new VideoTagModel();
      videoTag.begin = 10;
      videoTag.end = 12;

      let videoTagMode = new VideoTagMode(videoTag);
      videoTagMode.loopCount = -1;
      videoTagMode.setSubject(new Subject());

      videoTagMode.event().subscribe(
        () => {
        },
        (error) => {

        },
        () => {
            this.nextVideo();
        }
      );

      this.modes.push(videoTagMode);

      this._playerController.event.ready.subscribe(
        () => {
          console.log('Setting mode: '  + videoTagMode);
          this._playerController.mode = videoTagMode; 

        }
      );

  }

  public setMode(mode: PlayerMode){
    this._playerController.mode = mode;
  }

  public prevVideo(){
    let video = this._playerController.playlist.prev();
    console.log('Loading video: ' + video);
    this._playerController.cmd.load(video);
  }

  public nextVideo(){
    let video = this._playerController.playlist.next();
    console.log('Loading video: ' + video);
    this._playerController.cmd.load(video);
  }

  public addVideoTag(newVideoTag: VideoTagModel){
    this._playerController.play(newVideoTag);
  }

  public playVideoTag(newVideoTag: VideoTagModel){
    this._playerController.play(newVideoTag);
  }
}
