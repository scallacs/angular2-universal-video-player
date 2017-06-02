/**
 *
 */


declare var $q: any;
declare var $: any;
declare var API_KEY: any;

export class YoutubeVideoApi {
    //            var API_KEY = __APIConfig__.youtube.id;

    public _query: any;
    public _parts: any;
    public _videoIds: any;
    public _data: any;
    
    constructor() {
        this._query = null;
        this._parts = ['id'];
        this._videoIds = [];
        return this;
    }

//    public createItem() {
//        return new YoutubeItem.create(data.items[0]);
//    }

    public load() {
        var that = this;

        var defer = $q.defer();
        // todo change 
        $.ajax({
            async: false,
            type: 'GET',
            url: that.computeUrl(),
            success: callbackSuccess,
            error: function() {
                defer.reject();
            }
        });
        this._query = defer.promise;
        return this._query;

        function callbackSuccess(data) {
            that._data = data;
            defer.resolve(data);
        }
    }

    public addVideo(id) {
        this._videoIds.push(id);
        return this;
    }

    public setVideos(ids) {
        this._videoIds = ids;
        return this;
    }

    public setParts(parts) {
        this._parts = parts;
    }
    public addPart(part) {
        this._parts.push(part);
        return this;
    }

    public static extractIdFromUrl(url) {
        if (!url)
            return false;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }

    public computeUrl() {
        var url = "https://www.googleapis.com/youtube/v3/videos?id=" + this._videoIds.join() +
            "&key=" + API_KEY;
        if (this._parts.length > 0) {
            url += "&part=" + this._parts.join();
        }
        return url;
    }

    public exists() {
        return this._data && this._data.items.length > 0;
    }
    //            function convertTime(duration) {
    //                var a = duration.match(/\d+/g);
    //
    //                if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
    //                    a = [0, a[0], 0];
    //                }
    //
    //                if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
    //                    a = [a[0], 0, a[1]];
    //                }
    //                if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
    //                    a = [a[0], 0, 0];
    //                }
    //
    //                duration = 0;
    //
    //                if (a.length == 3) {
    //                    duration = duration + parseInt(a[0]) * 3600;
    //                    duration = duration + parseInt(a[1]) * 60;
    //                    duration = duration + parseInt(a[2]);
    //                }
    //
    //                if (a.length == 2) {
    //                    duration = duration + parseInt(a[0]) * 60;
    //                    duration = duration + parseInt(a[1]);
    //                }
    //
    //                if (a.length == 1) {
    //                    duration = duration + parseInt(a[0]);
    //                }
    //                return duration;
    //            }
}

