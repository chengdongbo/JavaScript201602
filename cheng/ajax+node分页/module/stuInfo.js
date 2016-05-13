/**
 * Created by CHENG on 2016/5/11.
 */

var fs = require('fs');

function init(query, res) {


    var count = query.count;
    var page = query.page;

    var data = fs.readFileSync('./JSON/stuInfo.json', 'utf8');
    data = JSON.parse(data);

    var ary=[];
    for(var i=(page-1)*count;i<=page*count;i++){
        var cur=data[i];
        if(i>data.length-1){
            break
        }
        ary.push(cur);
    }



    res.writeHead(200,{'content-type':'application/json; charset;UTF-8'});
    res.end(JSON.stringify({
        stuInfo:ary,
        allDataLen:data.length-1
    }))
}

module.exports={
    init:init
};
