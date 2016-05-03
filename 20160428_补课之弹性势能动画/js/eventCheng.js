/**
 * Created by CHENG on 2016/4/29.
 */
Function.prototype.chengBind = function chengBind(context) {//因为这个bind方法有可能是被一个直接方法绑定，也有可能是被赋值给了一个事件绑定，所有要考虑传值和鼠标事件；
    var _this = this;
    var outerAry = Array.prototype.slice.call(arguments, 1);//实现原生bind方法的的传值功能，
    return function (e) {
        var innerAry = Array.prototype.slice.call(arguments, 0);
        _this.apply(outerAry.concat(innerAry));
    }
};

function bind(curele, type, fn) {
    if (curele.addEventListener) {
        curele.addEventListener(type, fn, false);
        return
    }

    var tempFn = fn.chengBind(curele);
    tempFn.photo = fn;//因为tempfn是不带有任何标示的匿名函数，想要在下面移除这个方法，就要给这个方法加一个标签
    if (!curele["aEvent" + type]) {//这里创建一个数组来解决绑定ie6-8下的重复绑定问题，但是如果不加type容易出现方法名相同，但是type不同的两个绑定回绑定不上，所有需要加一个type，来具体区分
        curele["aEvent" + type] = [];
    }
    var a = curele["aEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i].photo = fn) {
            return
        }
    }
    a.push(tempFn);
    curele.attachEvent("on" + type,tempFn);
}


function unbind(curele, type, fn) {
    if (curele.removeEventListener) {
        curele.removeEventListener(type, fn, false);
    }

    var a = curele["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            var curA = a[i];
            if (curA.photo === fn) {
                curele.detachEvent("on"+type,curA);//删除的是对应项
                a.splice(i, 1);//把自定义属性上储存的这一项也删除
                return
            }
        }
    }
}

//on 方法解决 IE中顺序执行问题

function on (curele,type,fn) {
    if (this.addEventListener) {
        this.addEventListener(type, fn, false);
        return
    }

    if (!this["aEvent" + type]) {
        this["aEvent" + type] = [];
    }
    var a = this["aEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i].photo = fn) {
            return
        }
    }

    a.push(fn);
    bind(this,type,run);//通过这个把run方法绑定在了事件上；
}

function run(e){
    if(!e.target){
        e.target= e.srcElement;
        e.pageX= e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY= e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };
        e.preventDefault= function(){
            e.returnValue=false;
        }
    }
    var a=this["aEvent"+ e.type];
    if(a){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]==="function"){
                a[i].call(this,e);
                continue
            }
            a.splice(i,1);
            i--;
        }
    }
}

function off(curele,type,fn){
    var a=curele["aEvent"+type];
    if(a){
        for(var i=0;i< a.length;i++){
            if(a[i]===fn){
                a[i]=null;
                return
            }
        }
    }
}