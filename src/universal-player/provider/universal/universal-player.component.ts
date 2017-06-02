/**
 * 
 */
import {Component, Input} from '@angular/core';
import { UniversalPlayerController } from './universal-player.controller';
import { PlayerEventInterface } from '../../interface';

// http://stackoverflow.com/questions/37540197/angular2-loading-components-dynamically-from-a-service-response

@Component({
    selector: 'universal-player',
    providers: [],
    styles: [],
    templateUrl: './player.html'
})
export class UniversalPlayerComponent {
    
    @Input() controller: UniversalPlayerController;
        
    constructor() {

    }
}
