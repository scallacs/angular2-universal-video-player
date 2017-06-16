import { Inject, Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  PlayerState,
  UniversalPlayerController,
  YoutubeCmdMapper,
  LoopMode,
  PlayerController,
  PlayerMode,
  VideoInfo,
  Playlist,
  VideoProvider
} from '../universal-player';

import {
  VideoTagModel,
  VideoTagMode,
  MultiSectionMode,
  MultiSectionModeModel,
  MultiSectionModeEventInterface,
  VideoTaggerPlayerController,

  AnnotationModel
} from '../videotagger';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  multiSectionMode: MultiSectionMode;

  taggerAnnotationVisible: boolean = false;
  //title = 'app works!';

  public currentTimer: number = 0;
  public videoUrl: string;
  public videoId: string;
  public modes: Array<PlayerMode> = [];
  public newVideoTag: VideoTagModel = new VideoTagModel();
  public _playerController: VideoTaggerPlayerController;
  public annotationModelBottom: AnnotationModel;


  constructor( @Inject(ChangeDetectorRef) public changeDetectorRef: ChangeDetectorRef) {
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
        console.log('Setting mode: ' + videoTagMode);
        this._playerController.mode = videoTagMode;

        this.testTagger();
      }
    );

  }

  public setMode(mode: PlayerMode) {
    this._playerController.mode = mode;
  }

  public prevVideo() {
    let video = this._playerController.playlist.prev();
    console.log('Loading video: ' + video);
    this._playerController.cmd.load(video);
  }

  public nextVideo() {
    let video = this._playerController.playlist.next();
    console.log('Loading video: ' + video);
    this._playerController.cmd.load(video);
  }

  public addVideoTag(newVideoTag: VideoTagModel) {
    this.multiSectionMode.add("test", Math.random() + "", newVideoTag.begin, newVideoTag.end, SectionAnnotationFactory.create(this, newVideoTag.title, ""));
    console.log('addVideoTag(): ', newVideoTag);
  }

  public playVideoTag(newVideoTag: VideoTagModel) {
    this._playerController.play(newVideoTag);
  }

  public testTagger(): void {

    this.multiSectionMode = new MultiSectionMode();

    this.multiSectionMode.add("test", "A", 1, 5, SectionAnnotationFactory.create(this, "A from 1 to 5", "This is the ABC content"));
    this.multiSectionMode.add("test", "B", 7, 13, SectionAnnotationFactory.create(this, "B from 7 to 13", "This is the B content"));
    this.multiSectionMode.add("test", "C", 13, 20, SectionAnnotationFactory.create(this, "C from 13 to 20", "This is the C content"));
    
    this._playerController.mode = this.multiSectionMode;
  }

  public onAnnotationCardClick(model: MultiSectionModeModel){
    // TODO play this annotation
    this._playerController.cmd.seekTo(model.startAt);
    this._playerController.cmd.play();
  }
}

class SectionAnnotationFactory {

  public static create(context: AppComponent, title: string, content: string) {
    return new SectionAnnotation(context, new AnnotationModel(title, content));
  }
}

class SectionAnnotation implements MultiSectionModeEventInterface {

  constructor(public context: AppComponent, public annotation: AnnotationModel) {

  }

  onStateChanged(newState: PlayerState) {

  }

  onEnter(time: number) {
    console.log('SectionAnnotation', 'OnEnter', time)
    this.context.taggerAnnotationVisible = true;
    this.context.annotationModelBottom = this.annotation;
    this.annotation.setTime(time);
    this.annotation.setActive(true);
    this.context.changeDetectorRef.detectChanges();
  }

  onLeave(time: number) {
    console.log('SectionAnnotation', 'OnLeave', time)
    this.context.taggerAnnotationVisible = false;
    this.context.annotationModelBottom = null;
    this.annotation.setTime(time);
    this.annotation.setActive(false);
    this.context.changeDetectorRef.detectChanges();
  }

  onProgress(time: number) {
    this.annotation.setTime(time);
  }

  isActive(): boolean {
    return this.annotation.active;
  }


}