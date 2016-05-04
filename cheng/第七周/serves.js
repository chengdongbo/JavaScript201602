/**
 * Created by CHENG on 2016/5/4.
 */
var http=require("http");
var url=require("url");
var fs= require("fs");

var server=http.createServer(function(request,response){
    var urlObj=url.parse(request.url,true);
    var pathName=urlObj["pathname"],query=urlObj["query"];
    if(pathName==="/index.html"){
        var con=fs.readFileSync("./index.html","utf8");
        response.writeHead(200,{'content-type':"text/html"});
        response.end(con);
    }

    if(/^(html|css|js)$/.test(pathName)){
        var con=fs.readFileSync("."+pathName,"utf8");
        
        response.writeHead(200,{'content-type':""})
    }
});

server.listen(80,function(){
    console.log("服务器正在监听")
});