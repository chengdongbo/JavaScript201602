/**
 * Created by CHENG on 2016/5/5.
 */
var mainBodyUl=document.getElementById("mainBody");
var mainBodyLis=mainBodyUl.getElementsByTagName('li');


function changBg(){
    if(mainBodyLis){
        for(var i= 0,len=mainBodyLis.length;i<len;i++){
            var cur=mainBodyLis[i];
            cur.className=i%2===1?"bg":null;
        }
    }
}



//利用ajax获取数据并且绑定数据

ajax('/getInfo',function(data){

    var str='';
    for(var i= 0,len=data.length;i<len;i++){
        var cur=data[i];
        str+='<li>';
        str+='<span>'+cur["id"]+'</span>';
        str+='<span>'+cur["name"]+'</span>';
        str+='<span>'+cur["age"]+'</span>';
        str+='<span class="w150">'+cur['tel']+'</span>';
        str+='<span class="w150">'+cur['address']+'</span>';
        str+='<span class="w150" curId='+cur["id"]+'>';
        str+='<a href="addInfo.html?id='+cur['id']+'">修改</a>';
        str+='<a href="javascript:;" btnType="delete">删除</a>';
        str+='</li>';
    }
    mainBodyUl.innerHTML+=str;
    changBg();
});


mainBodyUl.onclick=function(e){
    e=e||window.event;
    e.target= e.target|| e.srcElement;
    var tar= e.target;
    if(tar.getAttribute('btnType')==='delete'){
        var tarId=tar.parentNode.getAttribute('curId');
        var flag=window.confirm("您确定要删除当前ID为"+ tarId +"这一项吗？");
        if(flag){
            var url='/deleteInfo?id'+'='+tarId;
            ajax(url,function(data){
                if(data&&data['code']===0){
                    var curLi=tar.parentNode.parentNode;
                    curLi.parentNode.removeChild(curLi);
                    changBg();
                }
            });
        }

    }
};

