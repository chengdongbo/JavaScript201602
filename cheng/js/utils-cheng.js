/**
 * Created by CHENG on 2016/4/30.
 */

var utilsCheng={


    listToArray:function (likeAry){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length]=likeAry[i];
            }
        }
        return ary
    },

    jsonParse:function(str){
        return "JSON" in window? JSON.parse(str):eval("("+str+")");
    }
};
