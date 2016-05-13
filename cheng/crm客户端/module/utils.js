/**
 * Created by CHENG on 2016/5/5.
 */
//?name="程东波"&age=25&tel=14534567890&address="上海市"

// urlObj.query;name=%E5%9F%8E%E4%B8%9C%E5%93%A6%E4%B8%8D&age=23&tel=13042534567&address=%E4%B8%
//8A%E6%B5%B7%E5%B8%82
//decodeURIComponent(urlObj.query);
//name=城东哦不&age=23&tel=13042534567&address=上海市
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
