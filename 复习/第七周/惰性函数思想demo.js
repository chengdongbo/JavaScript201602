/**
 * Created by CHENG on 2016/5/20.
 */


function fn1(){
    return 1;
}

function fn2(){
    return 2;
}
function fn3(){
    return 3;
}


function getMax(){
    console.log('ok');


    var ary=[fn1,fn2,fn3];
    var max=ary[0](),maxFn=ary[0];

    for(var i= 1;i<ary.length;i++){
        var cur = ary[i];
        if(cur()>max){
            max=cur();
            maxFn=cur;
        }
    }


    getMax=maxFn;
    return max;
}

console.log(getMax());
console.log(getMax());