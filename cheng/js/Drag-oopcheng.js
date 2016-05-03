/**
 * Created by CHENG on 2016/5/2.
 */
function EventEmitter() {
};

EventEmitter.prototype.on = function (type, fn) {
    if (!this["aEvent" + type]) {
        this["aEvent" + type] = [];
    }
    var a = this["aEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === fn) {
            return this
        }
    }
    a.push(fn);
    return this
};

EventEmitter.prototype.fire = function (type, e) {

    var a = this["aEvent" + type];
    if (a) {//这个一定要写，，因为当第一次循环的时候点击元素对应方法的时候，有可能这个借口的事件库中还没有绑定方法
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] === "function") {
                a[i].call(this, e);//给这个拖拽类扩展方法，只需要让这些方法中的this确定是当前元素即可，怎么实现呢，通过fire执行的时候，让其中的方法中的this变为这个；
            } else {
                a.slice(i, 1);
                i--;
            }
        }
    }
};

EventEmitter.prototype.off = function (type, fn) {
    var a = this["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                a[i] = null;
                return this
            }
        }
    }
};


function Drag(ele) {
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;
    this.ele = ele;

    this.DOWN = processThis(this.down, this);
    this.MOVE = processThis(this.move, this);
    this.UP = processThis(this.up, this);

    on(this.ele, "mousedown", this.DOWN);//设计原则，让所有原型上的方法 this都是当前实例；
}

Drag.prototype = new EventEmitter;

Drag.prototype.down = function (e) {
    this.x = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;

    if (this.ele.setCapture) {
        this.ele.setCapture();
        on(this.ele, "mousemove", this.MOVE);
        on(this.ele, "mouseup", this.UP)
        return
    }
    on(document, "mousemove", this.MOVE);
    on(document, "mouseup", this.UP);

    e.preventDefault();

    this.fire("selfDragStart", e);
};

Drag.prototype.move = function (e) {
    this.ele.style.left = e.pageX - this.mx + this.x + "px";
    this.ele.style.top = e.pageY - this.my + this.y + "px";

    this.fire("selfDrag", e);

};



Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,"mousemove",this.MOVE);
        off(this.ele,"mouseup",this.UP);

    }
    off(document,"mousemove",this.MOVE);
    off(document,"mouseup",this.UP);

    this.fire("selfDragEnd",e);

};
