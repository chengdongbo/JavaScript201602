/**
 * Created by CHENG on 2016/5/1.
 */
function on(ele, type, fn) {
    var reg = /^self/;
    if (reg.test(type)) {//自定义事件
        if (!ele[type]) {
            ele[type] = [];
        }
        var a = ele[type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                return
            }
        }
        a.push(fn);
    } else {//系统事件


        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
            return;
        }

        if (!ele["aEvent" + type]) {
            ele["aEvent" + type] = [];
            ele.attachEvent("on" + type, function () {
                fire.call(ele,e)
            });
        }

        var a = ele["aEvent" + type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                return
            }
        }
        a.push(fn);
    }
}

function fire(e) {
    e = window.event;
    if (!e.target) {
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
    }

    var a = this["aEvent" + e.type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] === "function") {
                a[i].call(this, e);
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }

}

//function selfFire(type, e) {
//    var a = this[type];
//    if (a) {
//        for (var i = 0; i < a.length; i++) {
//            a[i].call(this,e);
//        }
//    }
//}

function off(ele, type, fn) {
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return
    }
    var a = ele["aEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === fn) {
            a[i] = null;
        }
    }
}

function processThis(fn,context){

     var outArg=[].slice.call(arguments,2);
     return function(e){
     var innerArg=[].slice.call(arguments,0);
     //fn.call(context,e);
     fn.apply(context,innerArg.concat(outArg));
     }

    ////return function(e){
////    fn.call(context,e);
}