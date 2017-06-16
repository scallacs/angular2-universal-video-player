import { VideoTagModel } from '../model';

import { PlayerMode, CmdMapperInterface, PlayerState } from '../../universal-player';

export interface MultiSectionModeEventInterface{

    onStateChanged(newState: PlayerState);

    onEnter(time: number);

    onLeave(time: number);
    
    onProgress(time: number);

    isActive(): boolean;
};

export class MultiSectionModeModel{

    public id: string;
    public videoId: string;
    public startAt: number;
    public endAt: number;
    public events: MultiSectionModeEventInterface;

    constructor(id: string, startAt: number, endAt: number, events: MultiSectionModeEventInterface){
        this.id = id;
        this.startAt = startAt;
        this.endAt = endAt;
        this.events = events;
    }
}

export class MultiSectionMode extends PlayerMode {
    

    private _items: Array<any> = [];

    private _previousItems = {};

    constructor(){
        super();
    }

    get items(){
        return this._items;
    }

    /**
     * TODO make it work with video id
     * @param videoId 
     * @param id 
     * @param startAt 
     * @param endAt 
     * @param events 
     */
    public add(videoId: string, id: string, startAt: number, endAt: number, events: MultiSectionModeEventInterface){ 
        this._items.push(new MultiSectionModeModel(id, startAt, endAt, events));
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

        let onEnterItems = [];

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
                onEnterItems.push(currentItem);
            }

            delete this._previousItems[currentItem.id];
        }

        // If item is not here anymore => onLeave
        for (let key in this._previousItems){
            let item = this._previousItems[key];
            console.log('Leaving for ' + item.id);
            item.events.onLeave();
        }

        // OnEnter should be called after on leave
        for (let item of onEnterItems){
            item.events.onEnter(time);
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