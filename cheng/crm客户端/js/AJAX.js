/**
 * Created by CHENG on 2016/5/5.
 */

var getXHR = function () {
    var list = [
        function () {
            return new XMLHttpRequest;//->IE7+、标准浏览器
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }
    ];
    var temp = null;
    for (var i = 0; i < list.length; i++) {
        var tempFn = list[i];
        try {
            temp = tempFn();
        } catch (e) {
            continue;
        }
        getXHR = tempFn;
        break;
    }
    if (!temp) {
        throw new Error("您的当前浏览器不支持AJAX!");
    }
    return temp;
};

function ajax(apiurl,callback){
        var xhr=getXHR();
    apiurl.indexOf("?")>-1
    xhr.open("get",apiurl,)
}
