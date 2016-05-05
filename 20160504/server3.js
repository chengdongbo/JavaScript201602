/**
 * Created by CHENG on 2016/5/4.
 */
var http=require("http");
var url=require("url");
var fs=require("fs");

var server=http.createServer(function(request,response){
    var urlObj=url.parse(request.url,true);
    var pathName=urlObj.pathname,query=urlObj["query"];

    if(/(css|js|html)/i.test(pathName)){
        var con=fs.readFileSync("."+pathName,"utf8");
        var lastName=(pathName.substring(pathName.indexOf(".")+1)).toLowerCase();
        var contentType=lastName==="css"?"text/css":(lastName==="js"?"text/javascript":"text/html");
        response.writeHead("200",{'content-type':contentType});
        response.end(con);
        return
    }

    if(/(gif|png|jpg)/i.test(pathName)){
        con=fs.readFileSync("."+pathName);
        lastName=lastName=(pathName.substring(pathName.indexOf(".")+1)).toLowerCase();
        contentType=lastName==="gif"?"image/gif":(lastName==="png"?"image/png":"image/jpg");
        response.writeHead("200",{'content-type':contentType});
        response.end(con);
        return
    }

    if(pathName==="/userInfo"){
       var jsonStr=fs.readFileSync("./json/userInfo.json","utf8");
        var jsonObj=JSON.parse(jsonStr);
        var res={};
        for(var i=0;i<jsonObj.length;i++){
            var cur=jsonObj[i];
            if(cur.name=query.name){
                res=cur;
                break
            }
        }

        response.writeHead("200",{'content-type':"application/json"});
        response.end(JSON.stringify(res));

    }
});

server.listen(1234,function(){

});