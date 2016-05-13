/**
 * Created by CHENG on 2016/5/9.
 */

var ready=function(callback){
    var isReady=false;
    if(isReady){
        return
    };

    if(window.addEventListener){
        window.addEventListener('DOMContentLoaded',function(){
            callback();
            isReady=true;
        },false)
    }else{
        var timeout=0;

        document.onreadystatechange=function(){
            if(document.readystate==='interactive'||document.readystate==='complete'){
                isReady=true;
                callback();
                clearTimeout(timeout);
            }
        };

        timeout=setTimeout(function(){
            try{
                document.documentElement.doScroll('left');
                isReady=true;
                callback();
                document.onreadystatechange=null;
            }catch(e){
                timeout=setTimeout(arguments.callee,50);
            }
        },50);
    }
};
