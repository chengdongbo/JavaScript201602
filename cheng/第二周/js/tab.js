/**
 * Created by CHENG on 2016/5/3.
 */

var oTab=document.getElementById("tab");
var tHead=oTab.tHead;
var oThs=tHead.rows[0].cells;
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;

//第一步数据绑定

var jsonData = null;
~function () {
    var xhr = new XMLHttpRequest;
    xhr.open("get", "json/userInfo.txt", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var str = xhr.responseText;
            jsonData = utilsCheng.jsonParse(str);
        }
    };
    xhr.send(null);
}();


//数据绑定


function  bind(){
    var frg=document.createDocumentFragment();
    for(var i= 0,len=jsonData.length;i<len;i++){
        var cur=jsonData[i];
        var oTr=document.createElement("tr");
        for(var key in cur){
            var oTds=document.createElement("td");
            if(key==="sex"){
                oTds.innerHTML=cur[key]===0?"男":"女";
            }else{
                oTds.innerHTML=cur[key];
            }
            oTr.appendChild(oTds);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg=null;
}
bind();



function changBg(){
    for(var i= 0,len=oRows.length;i<len;i++){
        oRows[i].className=i%2===1?"bg":null;//className 是oRows[i]的私有属性，而非style属性下的属性；
    }
}
changBg();



function order(){
    var _this=this;
    _this.flag*=-1;
    for(var k=0;k<oThs.length;k++){
        if(oThs[k]!==_this){
            oThs[k].flag=-1;
        }
    }
    var ary=utilsCheng.listToArray(oRows);
    ary.sort(function(a,b){
        var cur=a.cells[_this.index],next=b.cells[_this.index],curN=a.cells[_this.index].innerHTML,nextN=b.cells[_this.index].innerHTML;
        if(isNaN(curN)||isNaN(nextN)){
            return curN.localeCompare(nextN)* _this.flag;
        }else{
            return (parseFloat(curN)- parseFloat(nextN))*_this.flag;
        }
    });

    var frg=document.createDocumentFragment();
    for(var i=0;i< ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;
    changBg();
}

//实现点击排序
for(var i= 0,len=oThs.length;i<len;i++){
    var curTh=oThs[i];
    if(curTh.className==="cursor"){
        curTh.index=i;
        curTh.flag=-1;
        curTh.onclick=order;

    }
}





