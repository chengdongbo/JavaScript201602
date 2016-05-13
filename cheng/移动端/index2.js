/**
 * Created by CHENG on 2016/5/12.
 */


$(function () {

    // 第一步重新设置每个页面的宽度.让宽度适应当前屏幕；
    var viewHeight = $(window).height();
    var $box = $('#box');
    var $oLis = $('#pageList').children('li');

    //这里要注意jQuery中的css的写法
    $box.css({'height': viewHeight, 'width': '100%'});
    slidePage.slidePage($oLis,viewHeight)
})
;