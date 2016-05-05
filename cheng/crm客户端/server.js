/**
 * Created by CHENG on 2016/5/5.
 */

var http=require("http");
var url=require("url");
var fs=require("fs");

//使用node创建一个服务,当客户端发送一起请求的时候，就会把对应的毁掉函数执行，并且传递两个参数值，request，response，
var server = http.createServer(function(req,res){

    //解析客户端发送请求地址
    var urlObj= url.parse(req.url,true);//把传递进来的参数一对象键值对的方式来存储
    var pathname=urlObj.pathname,query=urlObj.query;

    //前端路由判断

    var reg=/\.(html|js|css)/i;
    if(reg.test(pathname)){

        var fileCon=fs.readFileSync("."+pathname,"utf8");
        var suffix=reg.exec(pathname)[1];
        var conType=suffix==="html"?"text/html":(suffix==="css"?"text/css":"text/javascript");

        res.writeHead("200",{'content-Type':"conType"});
        res.end(fileCon);

    }

});

server.listen(9876,function(){
    console.log("node服务已经成功启动，正在监听端口9876")
});