/**
 * Created by CHENG on 2016/4/27.
 */

function on(ele, type, fn) {
    var reg = /^self/;
    if (reg.test(type)) {
        if (!ele["rose" + type]) {
            ele["rose" + type] = [];
        }

        var a = ele["rose" + type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                return
            }
        }

        a.push(fn);
    } else {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
            return
        }

        if (!ele["aEvent" + type]) {
            ele["aEvent" + type] = [];
            ele.attachEvent("on" + type, function () {
                fire.call(ele)
            })
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



function selfFire(type, e) {
    var a = this["rose" + type];
    for (var i = 0; i < a.length; i++) {
        a[i].call(this, e)
    }
}


function fire() {
    var e = window.event;
    var type = e.type;//通过这个可以直接判断出其中的点击方法是谁；
    if (!e.target) {
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.stopPropagation = function () {
            e.cancelBubble = true
        };
        e.preventDefault = function () {
            e.returnValue = false
        };
    }
    var a = this["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                if (typeof a[i] === "function") {
                    a[i].call(this);
                } else {
                    a.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

function off(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
        return
    }

    var a = ele["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                a[i] = null;
            }
        }
    }
}

