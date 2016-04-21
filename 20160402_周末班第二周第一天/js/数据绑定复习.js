/**
 * Created by CHENG on 2016/4/3.
 */
(function(){
    var jsonData=utils.formatJSON(jsonStr);
    console.dir(jsonData);
    var oTablist=document.getElementById("tablist");
    var oLis = oTablist.getElementsByTagName("li");




//    +function(){
//        var str="";
//        for(var i= 0,len=jsonData.length;i<len;i++){
//            str+="<li>";
//            var curData = jsonData[i]
//            for(var key in curData ){
//                str+="<span>";
//                str+=""+curData[key]+"";
//                str+="</span>";
//            }
//            str+="</li>";
//        }
//        oTablist.innerHTML+=str;
//        console.dir(str);
//    }();
//

    //第二种方法；利用动态创建dom元素方法
    //会引发多次的回流（html机构发生变化，那么浏览器会把整个的html结构进行重新计算），

    //+function(){
    //    for(var i= 0,len=jsonData.length;i<len;i++){
    //        var curData = jsonData[i];
    //        var oLi=document.createElement("li");
    //            for(var key in curData){
    //                var oSpan= document.createElement("span");
    //                oSpan.innerHTML = curData[key];
    //                oLi.appendChild(oSpan);
    //            }
    //        oTablist.appendChild(oLi);
    //    }
    //}()

    //第三种方法：利用文档碎片方法

    //1,实现数据绑定

    +function(){
        var frg = document.createDocumentFragment();
        for(var i= 0,len=jsonData.length;i<len;i++){
            var curData = jsonData[i];
            curData["sex"]=curData["sex"]===0?"男":(curData["sex"]===1?"女":"未知");
            //获取对象属性值的两种方式 obj["shuxinming"],为啥要给男加上双引号
            var oLi=document.createElement("li")
                for(var key in curData){
                    var oSpan= document.createElement("span");
                    oSpan.innerHTML = curData[key];
                    oLi.appendChild(oSpan);
                }
            frg.appendChild(oLi);
        }
        oTablist.appendChild(frg);//这里不能使用innerhtml 因为如果插入，是插入一个容器
    }()

    //表格排序
    function sortList(){

         flag *= -1;//因为我们把flag这个全局变量初始值设置为-1了，在每次函数执行的时候，我们只要先改变下flag的值
        // 这样  全局变量就会变成了 1，这个时候后面用到的flag 就会想应的变化，，，

        var ary = utils.listToArray(oLis);
        ary.sort(function (a, b) {
            var curInn = a.getElementsByTagName("span")[1].innerHTML;//因为a代表的是当前项，b代表的下一项；
            var nexInn = b.getElementsByTagName("span")[1].innerHTML;
            var curInnNum = parseFloat(curInn), nexInnNum = parseFloat(nexInn);
            return (curInnNum-nexInnNum)*flag;
        });
        var frg = document.createDocumentFragment();
        for(var i= 0,len=ary.length;i<len;i++){
            frg.appendChild(ary[i]);
        }
        oTablist.appendChild(frg);
        frg = null ;

    }

    //绑定事件

    //获取元素
    var oHeader = document.getElementById("tabHead")
    console.log(oHeader);
    var oHeaderSpan = oHeader.getElementsByTagName("span");//getBYtagname之下不能再使用相同的方法？


    var flag = -1;
    oHeaderSpan[1].onclick = function () {
        sortList();
    }
})();










