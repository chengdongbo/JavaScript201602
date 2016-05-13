/**
 * Created by CHENG on 2016/5/10.
 */

var fs = require('fs');

function init(query, res) {
    var data = fs.readFileSync('./JSON/customerInfo.json', 'utf8');
    data = JSON.parse(data);

    var obj = {};
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        if (cur.id = query.id) {
            obj = cur;
            break
        }
    }

    res.writeHead(200,{'content-type':'application/json;charset=UTF-8'});
    res.end(JSON.stringify(obj));
}

module.exports={
    init:init
};

