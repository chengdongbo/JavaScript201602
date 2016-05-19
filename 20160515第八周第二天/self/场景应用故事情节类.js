/**
 * Created by CHENG on 2016/5/17.
 */

function getEle(selector){
    return document.querySelector(selector);
}


var main=getEle('#main');
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var desH=1008,desW=640;
var loading=getEle('#loading'),process=getEle('.process');
var listen=getEle('.listen'),speak=getEle('.speak'),phone=getEle('#phone');
var bell=getEle('#bell'),say=getEle('#say'),music=getEle('#music');

if(winW/winH<=desW/desH){
    main.style.webkitTransform='scale('+winH/desH+')';
}else{
    main.style.webkitTransform='scale('+winW/desW+')';
}


function fnLoad() {
    var ary= ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];

    var n=0;
    ary.forEach(function(){
        var oImg=new Image();
        oImg.src='./images/'+arguments[0];
        oImg.onload=function(){
            n++;
            process.style.width=n/ary.length*100+'%';
            process.addEventListener('webkitTransitionEnd',function(){
                this.style.webkitTransition='';
            });
            if(n===ary.length&&loading){
                setTimeout(function(){
                    main.removeChild(loading);
                    bell.play();
                    fnPhone.init();
                },1100);
            }
        }
    })
}
fnLoad();


var fnPhone={
    init:function(){
        phone.addEventListener('touchstart',this.touch,false);
    },
    touch:function(e){
        var target= e.target;
        if(target.className=='listenTouch'){
            bell.pause();
            say.play();
            target.parentNode.style.display='none';
            speak.style.webkitTransform='translate(0,0)';

        }else if(target.className=='refuse'){
            say.pause();
            phone.style.webkitTransform='translate(0,'+desH+'px)';
            phone.style.webkitTransition='1s';
            setTimeout(function(){
                main.removeChild(phone);
                music.play();
                fnmessage();
            },1000)
        }

    }
};


function fnmessage(){
    var message=getEle('#message');
    var oUl=getEle('#message>ul');
    var oLis=document.querySelectorAll('#message>ul>li');
    var n= 0,totalH=0;
    var timer =setInterval(function(){
        oLis[n].style.opacity=1;
        oLis[n].style.webkitTransform='translate(0,0)';
        totalH+=oLis[n].offsetHeight-20;
        n++;
        console.log(n,totalH);
        if(n>3){
            if(n>4){
                totalH+=20;
            }
            oUl.style.webkitTransform='translate(0,'+(-totalH)+'px)';
            oUl.style.webkitTransition='1s';
        }
        if(n==oLis.length){
            window.clearInterval(timer);
            window.setTimeout(function(){
                main.removeChild(message);
                fnCube();
            },1200);
        }
    },1000)
}

function fnCube(){
    var cubeBox=getEle('#cubeBox');
    cubeBox.style.webkitTransform='scale(0.7) rotateX(-135deg) rotateY(-135deg)';


    var startX=-135;
    var startY=-135;
    var x=null;
    var y=null;

    document.addEventListener('touchstart',start,false);
    document.addEventListener('touchmove',move,false);
    document.addEventListener('touchend',end,false);

    function start(e){
        this.startTouches={
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY

        }


    }

    function move(e){
        this.flag=true;
        this.moveTouches={
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY

        };

        //console.log(this.startTouch.x,this.moveTouches.x)
        x= this.startTouches.x-this.moveTouches.x;
        y= this.startTouches.y-this.moveTouches.y;

        cubeBox.style.webkitTransform='scale(0.7) rotateX('+(startX+y)+'deg) rotateY('+(startY+x)+'deg)';
    }

    function end(){
        if(this.flag){
            startX+=x;
            startY+=y;
            this.flag=false;
        }
    }

}