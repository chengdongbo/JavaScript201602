/**
 * Created by CHENG on 2016/5/7.
 */

var fs=require("fs");

function init(query,res){

    var data=fs.readFileSync("./JSON/customerInfo.json","utf8");
    data=JSON.parse(data);


    var obj={};
    for(var i=0;i<data.length;i++){
        var cur=data[i];
        if(cur.id==query.id){
            data.splice(i,1);
            obj=cur;
            break
        }
    }

    fs.writeFileSync("./JSON/customerInfo.json",JSON.stringify(data));
    res.writeHead(200,{'content-type':'application/json;charset=UTF-8'});
    res.end(JSON.stringify({
        code:0,
        desc:"删除成功",
        data:obj
    }))
}

module.exports={
    init:init
};
