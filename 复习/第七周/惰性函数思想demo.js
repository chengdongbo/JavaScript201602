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


//function getMax(){
//    console.log('ok');
//
//
//    var ary=[fn1,fn2,fn3];
//    var max=ary[0](),maxFn=ary[0];
//
//    for(var i= 1;i<ary.length;i++){
//        var cur = ary[i];
//        if(cur()>max){
//            max=cur();
//            maxFn=cur;
//        }
//    }
//
//
//    getMax=maxFn;
//    return max;
//}



function getM(){

    console.log('ok');
    var arr=[fn1,fn2,fn3];
    var max=arr[1](),maxFn=arr[1];
    arr.forEach(function(){
        var cur =arguments[0];
        if(cur()>max){
            max=cur();
            maxFn=cur;
        }


    });

    getM=maxFn;
    return max;
}

console.log(getM());
console.log(getM());
