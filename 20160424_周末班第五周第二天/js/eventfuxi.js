/**
 * Created by CHENG on 2016/4/24.
 */

var chengEvent = (function () {


    function processThis(callback, context) {
        var outerAry = Array.prototype.slice.call(arguments, 2);
        return function () {
            var innerAry = Array.prototype.slice.call(arguments, 0);
            callback.apply(context, outerAry.concat(innerAry));
        }
    }

    function bind(curEle, type, fn) {

        if ("addEventListener" in curEle) {
            curEle.addEventListener(type, fn, false);
            return
        }
        var tempFn = processThis(fn, curEle);
        tempFn.photo = fn;//因为直接把tempfn绑定给当前元素的时候，后面移除的时候无法保证是否是同一个函数，所以我们就采用自定义属性，加数组的方式作为一个中间存储数据的方式，以后后面再移除的时候可以方便获取到同一个函数
        if (!curEle["mybind" + type]) {
            curEle["mybind" + type] = [];
        }
        ;
        var ary = curEle["mybind" + type];
        //如果同一个type的相同的方法之前出现过了，那么久不用再存储和绑定了
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                return
            }
        }

        ary.push(tempFn);
        curEle.attachEvent("on" + type, fn);
    }

    function unbind(curEle, type, fn) {
        var ary = curEle["mybind" + type];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                ary.slice(i, 1);
                break
            }
        }
    }

    function on(curEle, type, fn) {
        if (!curELe["myEvent" + type]) {
            curELe["myEvent" + type] = [];
        }

        var ary = curELe["myEvent" + type];

        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                return
            }
        }

        ary.push(fn)
        bind(curEle, type, fire);//这个作为桥梁把 on 中粗存的方法和 元素的本来的绑定机制联系起来
    }


    function off(curEle, type, fn) {
        var ary = curELe["myEvent" + type];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                ary[i] = null;//这里不能直接使用删除是因为，如果这里删除了，那么在后面的fire方法中对这个方法的数组的处理就会有数组塌陷问题，而在fire中删除，然后I--的话，就不会有这个问题，因为fire是最后一步操作，
            }
        }
    }

    function fire(e) {//因为这个方法的主要目的就是实现标准浏览器的事件池机制，正常的情况之下都是要为被触发的这个方法传递一个e的，那么这里也需要传递一个e，以便和浏览器的内置效果一样
        var ary = this["myEvent" + type];
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] === "function") {
                ary[i].call(this, e);
            } else {
                ary.slice(i, 1);
                i--;
            }
        }
    }

    return {
        on:on,
        off:off,
        processThis:processThis
    }
})()

