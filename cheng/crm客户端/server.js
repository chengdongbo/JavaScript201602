/**
 * Created by CHENG on 2016/5/5.
 */

var http=require("http");
var url=require("url");
var fs=require("fs");
var utils=require("./module/utils.js");

var getInfo=require("./module/getInfo.js");
var addInfo=require("./module/addInfo.js");
var updataInfo=require("./module/updataInfo.js");
var deleteInfo=require('./module/deleteInfo.js');
var detailInfo=require('./module/detailInfo.js');



var server=http.createServer(function(req,res){


    var urlObj=url.parse(req.url);
    var pathname=urlObj.pathname,query=utils.queryURLParameter(decodeURIComponent(urlObj.query));

    if(/(js|css|html)/i.test(pathname)){
        var con = fs.readFileSync("."+pathname,"utf8");
        var suffix = (pathname.substring(pathname.indexOf(".")+1)).toLowerCase();
        var conType=suffix==="html"?"text/html":(suffix==="css"?"text/css":"text/javascript");

        res.writeHead("200",{'content-type':conType});
        res.end(con);
    }

    if(pathname==="/getInfo"){
        getInfo.init(res);
        return
    }

    if(pathname==="/addInfo"){
        addInfo.init(query,res);
        return
    }

    if(pathname==="/updataInfo"){
        updataInfo.init(query,res);
        return
    }

    if(pathname==='/deleteInfo'){
        deleteInfo.init(query,res);
        return
    }

    if(pathname==='/detailInfo'){
        detailInfo.init(query,res);
        return
    }


});

server.listen(987,function(){
    console.log("服务器正在监听端口");
});