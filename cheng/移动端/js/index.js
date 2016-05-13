/**
 * Created by CHENG on 2016/5/11.
 */

//如果不清楚默认的操作，会造成向上滑动的时候，当前图片的scale 不执行？
$(document).on('touchmove', function (ev) {
    ev.preventDefault();
});

$(function () {
    var $viewHeight = $(window).height();
    var $li = $('.pageList').find('>li');
    $('.box').css({'width': "100%", "height": $viewHeight});

    slidege();

    function slidege() {

        //把变量定义在这个地方是方便后面的所有方法都能用到这些变量值，因为下面的这些方法都是靠这些参数串起来的，，同时也为了以后方便 这个方法更加灵活；

        var startY = null;
        //记录当前元素的索引
        var nowIndex = null;
        var nextIndex = null;
        var step = 1 / 4;
        var changY = null;
        $li.on('touchstart', function (e) {
            //记录鼠标点击的时候的起始位置值
             startY = e.originalEvent.changedTouches[0].pageY;
            //记录当前元素的索引
             nowIndex = $(this).index();
             nextIndex = null;
             changY = null;


            $li.on('touchmove', function (e) {


                var moveY = e.originalEvent.changedTouches[0].pageY;
                changY = moveY - startY;

                //防止 其它图片的出现 影响视觉效果
                $(this).siblings('li').removeClass('zIndex').hide();
                if (changY < 0) {//up
                    nextIndex = nowIndex == $li.length - 1 ? 0 : nowIndex + 1;
                    $li.eq(nextIndex).css('transform', 'translate(0,' + ($viewHeight + changY) + 'px)');
                } else if (changY > 0) {//down
                    nextIndex = nowIndex == 0 ? $li.length - 1 : nowIndex - 1;
                    $li.eq(nextIndex).css('transform', 'translate(0,' + (-$viewHeight + changY) + 'px)');
                } else {

                }
                //控制当前拖拽图片的移动
                $(this).css('transform', 'translate(0,' + changY * step + 'px) scale(' + (1 - Math.abs(changY) / $viewHeight * step) + ')');
                //控制下一张图片的显示
                $li.eq(nextIndex).addClass('zIndex').show();
                console.log($li.eq(nextIndex).css('zIndex'));

            });
            $li.on('touchend', function (e) {

                if (changY < 0) {//up
                    //console.log()
                    //因为当前的这个张图片一直出于缩小过程中，需要按照上面的处理,如果不交step值，两张图片之间切换的时候就会出现空白，影响用户体验，scale值设置的时候要加上step是因为 当前的这个张图片一直出于缩小过程中，最后当鼠标end的时候让其缩成最小值
                    //1-step 一定要加括号如果不加括号就会变成了先加上1变成一个字符？
                    $(this).css('transform', 'translate(0,' + (-$viewHeight * step) + 'px) scale(' + (1 - step) + ')');
                } else if (changY > 0) {
                    $(this).css('transform', 'translate(0,' + $viewHeight * step + 'px) scale(' + (1 - step) + ')');
                }

                $li.eq(nextIndex).css('transform', 'translate(0,0)');
                $li.eq(nextIndex).css('transition', "1s");
                $(this).css('transition', "1s");
            })
        })
        $li.on('transitionend webkitTransitionend', function (e) {
            resetAll();
        });

        function resetAll() {
            $li.css('transform', '');
            $li.css('transition', '');
            $li.eq(nextIndex).removeClass('zIndex').siblings('li').hide();
        }

    }

});
