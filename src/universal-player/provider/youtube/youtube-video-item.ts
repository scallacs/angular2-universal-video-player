/* 
 *  All rights reserverd
 *  @author Stephane Leonard 
 *  @contact sca.leonard@gmail.com
 */

class YoutubeVideoItem{
    private _item: any;

    
    constructor(item: any) {
        this._item = item;
    }

    
    public contentDetails() {
        return this._item.contentDetails;
    }
    
    public snippet() {
        return this._item.snippet;
    }
    
    public duration() {
        return this._item.snippet.contentDetails.duration;
    }
    
    public thumbnail(size) {
        return this._item.snippet.thumbnails[size].url;
    }
    
    public title() {
        return this.snippet().title;
    }
    
    public description() {
        return this.snippet().description;
    }
    
    public publishedAt() {
        return this.snippet().publishedAt;
    }
}