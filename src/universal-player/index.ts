import { NgModule, ModuleWithProviders } from '@angular/core';

//export * from './mode';
// export * from './model';

export { PlayerState, VideoInfo, PlayerInfo, VideoProvider, Playlist } from './model';

export { UniversalPlayerController } from './provider/universal/universal-player.controller';
export { YoutubeCmdMapper } from './provider/youtube/youtube-cmd-mapper';

export { PlayerModule } from './player.module';

export { PlayerMode, LoopMode } from './mode';

export { PlayerController } from './controller/player-controller';
export * from './interface';
//export * from './provider';
