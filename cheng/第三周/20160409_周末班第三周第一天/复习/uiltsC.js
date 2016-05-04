/**
 * Created by CHENG on 2016/4/11.
 */
var uiltsC = (function () {


    function offset(curEle) {
        var top = null, left = null, pra = curEle.offsetParent;

        top += curEle.offsetTop;
        left += curEle.offsetLeft;

        while (pra) {
            if (window.navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                top += pra.clientTop;
                left += pra.clientLeft;
            }

            top += pra.offsetTop;
            left += pra.offsetLeft;

            return {left: left, top: top};
        }
    }
    function getCss(curEle,attr){
        var val = null;
        if(window.getComputedStyle){
            val = window.getComputedStyle(curEle,null)[attr];
        }else{
            if(attr === "opacity"){
                val=curEle.currentStyle[filter];
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;

                val = reg.test(val)? reg.exec(val)/100:1;
            }else{
                val = curEle.currentStyle[attr];
            }
        }
        return val;
    }


    return {
        offset:offset,
        getCss:getCss
    }
})()




