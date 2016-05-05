/**
 * Created by CHENG on 2016/5/5.
 */

var fs=require("js");
function init(query,res){
    console.log(query);
    //获取客户端传递给我的信息,query存了客户端传递给服务器端信息{name:'',age:'',tel:'',address;''}
    //把信息存放到对应文件中

    var obj={};
    for(var key in query){
        if(query.hasOwnProperty(key)){
            obj[key]=query[key];
        }
    }
    //把之前的内容获取到
    var data = fs.readFileSync("./json/customerInfo.json","utf8");
    data = JSON.parse(data);

    obj.id=parseInt(data[data.length-1])+1;

    data.push(obj);

    fs.writeFileSync("./json/customerInfo.json",JSON.stringify(data));
    res.writeHead("200",{'content-Type':'application/json;charset=UTF-8'});
    res.end({
        code:0,
        desc:"添加成功！",
        data:"{name:'',age:'',tel:'',address;''}"
    });

}

module.exports={
    init:init
};
