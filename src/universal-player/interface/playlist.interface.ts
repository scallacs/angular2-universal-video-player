/**
 * 
 */
import { VideoInfoInterface } from '../interface';
 
export interface PlaylistInterface<T> {

    next() : T;

    prev() : T;

    current() : T;

    at(index: number);

    push(value: T);

    has(index: number);

    count(): number;
    
    items(): Array<any>;
    
}