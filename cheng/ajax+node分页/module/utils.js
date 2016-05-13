/**
 * Created by CHENG on 2016/5/5.
 */
//?name="程东波"&age=25&tel=14534567890&address="上海市"


function queryURLParameter(url) {
    var obj={},reg=/([^=&?_]+)=([^=&?]+)/g;
    var res=reg.exec(url);
    while(res){
        obj[res[1]]=res[2];
        res=reg.exec(url);
    }
    return obj
}

if (typeof module !== "undefined") {
    module.exports = {
        queryURLParameter: queryURLParameter
    };
}
