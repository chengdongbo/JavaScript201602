/**
 * Created by CHENG on 2016/5/3.
 */
function add(){
    var total=null;
    for(var i= 0,len=arguments.length;i<len;i++){
        var cur=arguments[i];
        if(isNaN(cur)){
            continue
        }
        total+=cur;
    }
    console.log(total);
}

module.exports.add=add;