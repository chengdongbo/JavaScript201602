/**
 * Created by CHENG on 2016/5/16.
 */

function getEle(selector){
    return document.querySelector(selector)
}


var main =getEle('#main');
var oLis=document.querySelectorAll("#main>ul>li");

var winH=document.documentElement.clientHeight;
var winW=document.documentElement.clientWidth;

var desW=640;
var desH=960;

var startY=null;
var moveY=null;
var step=1/2;

if(winW/winH<=desW/desH){
    main.style.webkitTransform="scale("+winH/desH+")";
}else{
    main.style.webkitTransform="scale("+winW/desW+")";
}


[].forEach.call(oLis,function(){
    var curLi=arguments[0];
    curLi.index=arguments[1];
    curLi.addEventListener("touchstart",start,false);
    curLi.addEventListener("touchmove",move,false);
    curLi.addEventListener("touchend",end,false);
});

function start(e){
    startY= e.changedTouches[0].pageY;
}

function move(e){
    this.isMove=true;
    e.preventDefault();
    moveY=e.changedTouches[0].pageY;
    var changY=moveY-startY;
    this.flag=1;
    var index=this.index;

    [].forEach.call(oLis,function(){
        if(arguments[1]!==index){
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    });
    if(changY>0){//down
        this.nextIndex=index===0?oLis.length-1:index-1;
        this.flag*=-1;
    }else{//up
        this.nextIndex=index===oLis.length-1?0:index+1;
    }

    oLis[index].style.webkitTransform="translate(0,"+changY+"px) scale("+(1-Math.abs(changY)/winH*step)+")";
    oLis[this.nextIndex].style.display="block";
    oLis[this.nextIndex].style.webkitTransform="translate(0,"+(this.flag*winH+changY)+"px)";
    oLis[this.nextIndex].className="zIndex";
}

function end(){
    if(this.isMove){
        oLis[this.nextIndex].style.webkitTransform="translate(0,0)";
        oLis[this.nextIndex].style.webkitTransition=".5s";
        oLis[this.nextIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition="";
            this.firstElementChild.id="a"+this.index;
        },false);
        this.isMove=false;
    }

}