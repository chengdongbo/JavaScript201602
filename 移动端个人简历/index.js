/**
 * Created by CHENG on 2016/5/18.
 */



        var box=document.querySelector('#box');
        var winH=document.documentElement.clientHeight,winW=document.documentElement.clientWidth;
        var desH=960,desW=640;
        var oLis=document.querySelectorAll('#box>ul>li');
        var startY=null,moveY=null;

//处理适配问题
        if(winW/winH<desW/desH){
            box.style.webkitTransform='scale('+winH/desH+')';
        }else{
            box.style.webkitTransform='scale('+winW/desW+')';
        }

        [].forEach.call(oLis,function(){
            var cur=arguments[0];
            cur.index=arguments[1];
            cur.addEventListener('touchstart',start,false);
            cur.addEventListener('touchmove',move,false);
            cur.addEventListener('touchend',end,false);
        });


        function start(e){
            startY= e.changedTouches[0].pageY;
        }

        function move(e){
            this.isMove=true;
            moveY=e.changedTouches[0].pageY;
            var movePos=moveY-startY;
            var index=this.index;
            e.preventDefault();
            [].forEach.call(oLis,function(){
                var cur = arguments[0];
                if(index!==arguments[1]){
                    cur.style.display='none';
                }
                cur.className='';
            });
            if(movePos<0){//up
                this.nextIndex=this.index==oLis.length-1?0:this.index+1;
                this.duration=800+movePos;
            }else{//down
                this.nextIndex=this.index==0?oLis.length-1:this.index-1;
                this.duration=-800+movePos;
            }
            oLis[index].style.webkitTransform="translate(0,"+movePos+"px)";
            oLis[this.nextIndex].style.display='block';
            oLis[this.nextIndex].style.webkitTransform='translate(0,'+this.duration+'px)';
            oLis[this.nextIndex].className="zIndex";
        }


        function end(e){
            if(this.isMove){
                oLis[this.nextIndex].style.webkitTransform="translate(0,0)";
                oLis[this.nextIndex].style.webkitTransition='0.7s';
                oLis[this.nextIndex].addEventListener('webkitTransitionEnd',function(){                 this.style.webkitTransition = "";
                },false);
                this.isMove = false;
            }

        }





