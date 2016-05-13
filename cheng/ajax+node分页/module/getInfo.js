/**
 * Created by CHENG on 2016/5/5.
 */
var fs=require("fs");

function init(res){
    var data=fs.readFileSync("./JSON/customerInfo.json","utf8");
    
    res.writeHead("200",{'content-type':'application/json;charset=UTF-8'});
    res.end(data);
}

module.exports={
    init:init
}