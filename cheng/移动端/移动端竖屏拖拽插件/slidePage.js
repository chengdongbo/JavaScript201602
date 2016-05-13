/**
 * Created by CHENG on 2016/5/13.
 */
//这个方法是建立在jQuery基础之上的，里面使用的选择器，以及方法都是通过jQuery实现的，

var slidePage=(function(){

    //参数 page：表示当前的需要滑动的页面数；viewHeight:当前屏幕高度
    function slidePage(page,viewHeight) {

        $(document).on('touchmove',function(e){
            e.preventDefault();
        });


        var startY = null;
        var nowIndex=null;
        var nextIndex=null;
        var step=1/4;
        var isTouch=true;


        page.on('touchstart', function (e) {
            if(isTouch){
                isTouch=false;
                var touch = e.originalEvent.changedTouches[0];
                startY = touch.pageY;
                nowIndex=$(this).index();
                page.on('touchmove.move', function (e) {
                    //这里呀重新获取下touch，如果不重新获取，那么changY的值就是一个固定的值
                    touch = e.originalEvent.changedTouches[0];
                    var changY = touch.pageY - startY;
                    //这一步是为了解决 多张图片重复出现的问题，值让当前图片和下面的一张图片显示
                    $(this).siblings('li').hide();
                    if(changY<0){//up
                        nextIndex=nowIndex===page.length-1?0:nowIndex+1;
                        //(viewHeight+changY) 这个表达式要加括号；如果不加就是个字符串拼接！
                        page.eq(nextIndex).css('transform','translate(0,'+(viewHeight+changY)+'px)');
                    }else{//down
                        nextIndex=nowIndex===0?page.length-1:nowIndex-1;
                        page.eq(nextIndex).css('transform','translate(0,'+(-viewHeight+changY)+'px)')
                    }
                    $(this).css('transform', 'translate(0,' + changY*step + 'px) scale(' + (1 - Math.abs(changY) / viewHeight*step) + ')');
                    page.eq(nextIndex).addClass('zIndex').show()
                });

                page.on('touchend.move',function(e){
                    var flag=null;
                    var changY=e.originalEvent.changedTouches[0].pageY-startY;
                    if(changY<0){//up
                        flag=-1;
                    }else if(changY>0){
                        flag=1;
                    }else{
                        flag=0;
                        step=0;
                    }
                    $(this).css('transform','translate(0,'+(flag*viewHeight*step)+'px) scale('+(1-step)+')');
                    $(this).css('transition','.3s');
                    page.eq(nextIndex).css('transform','translate(0,0)');
                    page.eq(nextIndex).css('transition','.3s');

                    //再做拖拽类似的效果的时候，记得在end这个阶段的时候吧之前的绑定的move和end方法移除，
                    page.off('.move');
                });
            }
        });

        //在使用transform和transition对元素进行操作之后，清除之前所做的全部效果，让所有的li恢复到之前一样，知识各个li的显示层级变化了，这样再在后面操作的时候，就不容易出现由于之前操作积存的数据出现错误；
        page.on('transitionEnd webkitTransitionEnd',function(){
            reset();
        });

        function reset(){
            page.css('transform','');
            page.css('transition','');
            page.eq(nextIndex).removeClass('zIndex').siblings().hide();
            isTouch=true;
        }
    };

    return{
        slidePage:slidePage
    }
})();
