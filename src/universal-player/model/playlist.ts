
import { PlaylistInterface, VideoInfoInterface } from '../interface';

export class Playlist<T> implements PlaylistInterface<T> {

    private _items: Array<any> = [];

    public currentIndex: number;

    constructor(){
        this.currentIndex = 0;
    }

    next(): T {
        this._changeIndex(1);
        return this.current();
    }
    
    prev(): T {
        this._changeIndex(-1);
        return this.current();
    }

    hasNext(): boolean{
        return this.has(this.currentIndex + 1);
    }

    hasPrev(): boolean{
        return this.has(this.currentIndex - 1);
    }

    current(): T{
        return this._items[this.currentIndex];
    }

    at(index: number) {
        return this._items[index];
    }
    
    has(index: number) {
        return index >= 0 && index < this.count();
    }
    
    count(): number {
        return this._items.length;
    }

    push(value: T) {
        this._items.push(value);
    }

    private _changeIndex(diff: number){
        if (!this.has(this.currentIndex + diff)){
            throw "IndexOutOfBoundException: no more index";
        }
        this.currentIndex = this.currentIndex + diff;
    }

    items(): Array<T>{
        return this._items;
    }

}