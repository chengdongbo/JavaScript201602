/**
 * Created by CHENG on 2016/5/4.
 */
var http=require("http");
var url=require("url");
var fs= require("fs");

var server=http.createServer(function(request,response){
    var urlObj=url.parse(request.url,true);
    var pathName=urlObj["pathname"],query=urlObj["query"];
    //if(pathName==="/index.html"){
    //    var con=fs.readFileSync("./index.html","utf8");
    //    response.writeHead(200,{'content-type':"text/html"});
    //    response.end(con);
    //}

    if(/^(html|css|js)$/i.test(pathName)){
        var con=fs.readFileSync("."+pathName,"utf8");
        var lastName=(pathName.substring(pathName.indexOf(".")+1)).toLowerCase();
        var contentType=lastName==="css"?"text/css":(lastName==="js"?"text/javascript":"text/html");
        response.writeHead(200,{'content-type':"contentType"});
        response.end(con);
        return
    }

    if(/(gif|png|jpg)/i.test(pathName)){
        var conImg=fs.readFileSync("."+pathName);
        lastName=(pathName.substring(pathName.indexOf(".")+1)).toLowerCase();
        contentType=lastName==="gif"?"image/gif":(lastName==="png"?"image/png":"img/jpg");
        response.writeHead(200,{'content-type':"contentType"});
        response.end(conImg);
        return
    }

    if(pathName ==="/userInfo"){
        var jsonStr= fs.readFileSync("../JSON/userInfo.json","utf8");
        var jsonObj=JSON.parse(jsonStr);

        for(var i=0;i<jsonObj.length;i++){
            var cur=jsonObj[i];
            var res={};
            if(cur.name===query.name){
                res=cur;
                break
            }
        }

        response.writeHead(200,{'content-type':"application/json"});
        response.end(JSON.stringify(res));
    }


});

server.listen(145,function(){
    console.log("服务器正在监听")
});