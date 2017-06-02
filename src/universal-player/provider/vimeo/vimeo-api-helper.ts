

class VimeoApiHelper {


    static extractIdFromUrl(url) {
        if (!url)
            return false;
        var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
        var match = url.match(regExp);
        return (match !== null && match[5].length > 1) ? match[5] : false;
    }

    static computeUrl(videoIds: Array<string>) {
        //var url = "https://api.vimeo.com/videos/" + this._videoIds.join();
        var url = 'http://vimeo.com/api/v2/video/' + videoIds.join() + '.json'
        return url;
    }


    static load() {
        var that = this;
        // var defer = $q.defer();
        // // todo change 
        // console.log("Loading vimeo info: " + that.computeUrl());
        // $.ajax({
        //     dataType: 'jsonp',
        //     async: false,
        //     type: 'GET',
        //     url: that.computeUrl(),
        //     success: callbackSuccess,
        //     error: function (error) {
        //         console.log(error);
        //         defer.reject();
        //     }
        // });
        // this._query = defer.promise;
        // return this._query;

        // function callbackSuccess(data) {
        //     console.log(data);
        //     that._data = data;
        //     defer.resolve(data);
        // }
    }

}