// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAnnotationComponent } from './annotation';
import { PagePlayerControlComponent } from './player-control';
import { PageUniversalPlayerComponent } from './universal-player';

// Route Configuration
export const routes: Routes = [
  { path: 'annotation', component: PageAnnotationComponent },
  { path: 'controls', component: PagePlayerControlComponent },
  { path: 'universal-player', component: PageUniversalPlayerComponent }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);