/**
 * Created by CHENG on 2016/5/5.
 */

var fs=require("fs");

function init(query,res){
    var obj={};
    console.log(query);
    for(var key in query){
        if(query.hasOwnProperty(key)){
            obj[key]=query[key]
        }
    }

    var data=fs.readFileSync("./JSON/customerInfo.json","utf8");
    data=JSON.parse(data);
    obj.id=parseInt(data[data.length-1].id)+1;

    data.push(obj);

    fs.writeFileSync("./JSON/customerInfo.json",JSON.stringify(data));
    res.writeHead("200",{'content-type':'application/json;charset=UTF-8'})
    res.end(JSON.stringify({
        code:0,
        desc:"添加成功",
        data:obj
    }))
}

module.exports={
    init:init
};