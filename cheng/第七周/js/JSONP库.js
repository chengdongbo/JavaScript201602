/**
 * Created by CHENG on 2016/5/9.
 */

(function (undefined) {

    window.JSONP = function (url, data, jsoncallback, callback) {
        var cbnum = 'cb' + window.JSONP.count++;
        var cbname = 'window.JSONP.' + cbnum;

        window.JSONP[cbnum] = function (response) {
            try {
                callback(response);
            }catch(e){

            } finally {
                delete window.JSONP[cbnum];
                script.parentNode.removeChild(script);
            }
        };

        if (data) {
            data=tools.encodeDataToURL(data);
            url=tools.hasSearch(url,data);
        }

        url=tools.hasSearch(url,jsoncallback+'='+cbname);
        var script=document.createElement('script');
        console.log(url);
        script.src=url;
        script.type='text/javascript';
        script.async='async';
        document.body.appendChild(script);

    };

    window.JSONP.count=0;

    var tools = {
        encodeDataToURL: function (data) {
            if (Object.prototype.toString.call(data) === '[object String]') {
                return
            }

            var ary = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }
            return ary.join('&');
        },

        hasSearch: function (url, padString) {
            return url + (/^\?$/.test(url) ? '&' : '?') + padString;
        }
    }
})();
