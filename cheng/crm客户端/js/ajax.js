/**
 * Created by CHENG on 2016/5/10.
 */

var getXHR=function() {
    var xhrList = [
        function () {
            return new XMLHttpRequest;
        },
        function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        },
        function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        },
        function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }

    ];

    var temp = null;
    for (var i = 0; i < xhrList.length; i++) {
        var tempFn = xhrList[i];
        try {
            temp = tempFn();

        } catch (e) {
            continue
        }
    }

    if (!temp) {
        throw new Error('您的浏览器不支持ajax')
    }

    return temp
};

function ajax(apiurl,callback){
    var xhr=getXHR();

    apiurl+=/\?/.test(apiurl)?'&_='+Math.random():'?_='+Math.random();
    xhr.open('GET',apiurl,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
            var data=xhr.responseText;
            data=JSON in window?JSON.parse(data):eval('('+data+')');
            callback(data);
        }
    };
    xhr.send(null);
}


