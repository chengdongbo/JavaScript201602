/**
 * Created by CHENG on 2016/5/1.
 */

function down(e){
    this.x=this.offsetLeft;
    this.y=this.offsetTop;
    this.mx= e.pageX;
    this.my= e.pageY;

    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up);
        return
    }
    this.MOVE=processThis(move,this);
    this.UP=processThis(up,this);

    on(document,"mousemove",this.MOVE);
    on(document,"mouseup",this.UP);

    e.preventDefault();

   selfFire.call(this,"selfDragStart",e);//发布或者是为这个方法留下接口；
}


function move(e){
    this.style.left= e.pageX-this.mx+this.x+"px";
    this.style.top= e.pageY-this.my+this.y+"px";

    selfFire.call(this,"selfDrag",e);
}


function up(e){
    if(this.setCapture){
        this.setCapture();
        off(this,"mousemove",this.MOVE);
        off(this,"mouseup",this.UP);
        return
    }

    off(document,"mousemove",this.MOVE);
    off(document,"mouseup",this.UP);

    selfFire.call(this,"selfDragEnd",e);

}

function processThis(fn,context){
    var outer = Array.prototype.slice.call(arguments,2);
    return function (){
        var inner= Array.prototype.slice.call(arguments,0);
        fn.apply(context,outer.concat(inner));
    }
}