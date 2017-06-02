import { VideoTagModel } from '../model';

import { PlayerMode, CmdMapperInterface, PlayerState } from '../../universal-player';

export class MultiSectionMode extends PlayerMode {
    

    private _items: Array<any> = [];

    private _previousItems = {};

    constructor(){
        super();
    }


    public add(videoId: string, id: string, startAt: number, endAt: number, events: any){ 
        // TODO 
        this._items.push({ 
            id: id,
            startAt: startAt,
            endAt: endAt,
            events: events
        });
    }

    public onStateChanged(newState: PlayerState) {
        for (let key in this._previousItems){
            let item = this._previousItems[key];
            item.events.onStateChanged(newState);
        }
    }

/**
 * TODO: enter and leave not called properly
 * @param time 
 */
    public onPlayProgress(time: number) {
        //console.log("onPlayProgress() => " + time);
        let currentItems = this.getCurrentItems(time);

        for (let key in currentItems){
            let currentItem = currentItems[key];
            let exists = this._previousItems[currentItem.id];
            // If item is still here => onPlayProgress
            if (exists){
                console.log('Progressing for ' + currentItem.id);
                currentItem.events.onProgress(time);
            }
            // If item is new => onEnter            
            else {
                console.log('Entering for ' + currentItem.id);
                currentItem.events.onEnter(time);
            }

            delete this._previousItems[currentItem.id];
        }

        // If item is not here anymore => onLeave
        for (let key in this._previousItems){
            let item = this._previousItems[key];
            console.log('Leaving for ' + item.id);
            item.events.onLeave();
        }

        this._previousItems = currentItems;

        return null;
    }

    public getCurrentItems(time: number): {}{
        let newCurrentItems = {};
        for (let item of this._items) {
            if (item.startAt < time && item.endAt > time) {
                // console.log("Adding current item: " + item.id);
                newCurrentItems[item.id] = item;
            }
        }
        return newCurrentItems;
    }

    toString(): string{
        return 'VideoEventMode[]';
    }
}