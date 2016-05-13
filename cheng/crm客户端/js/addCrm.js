/**
 * Created by CHENG on 2016/5/10.
 */
    String.prototype.myTrim=function myTrim(){
    return  this.replace(/^ +| +$/g,'');
}

var cusName=document.getElementById('name'),cusAge=document.getElementById('age'),cusTel=document.getElementById('tel'),cusAddress=document.getElementById('address');
var submitBtn=document.getElementById('btn');


var obj = queryURLParameter(window.location.href);
var flag = 'id'in obj ? 'updata' : 'add';

//如果是更新的话，需要先把要更新的这个数据全部都显示在对应的input框中
if (flag === 'updata') {
    var url = '/updataInfo?id=' + encodeURIComponent(obj['id']);
    ajax(url, function (data) {
        cusName.value=data.data['name'];
        cusAge.value=data.data['age'];
        cusAddress.value=data.data['address'];
        cusTel.value=data.data['tel'];
    })
}


submitBtn.onclick=function(){
    var url2='name'+'='+cusName.value.myTrim()+'&'+'age'+'='+cusAge.value.myTrim()+'&'+'tel'+'='+cusTel.value.myTrim()+'&'+'address'+'='+cusAddress.value.myTrim();

    if(flag==='updata'){
        ajax('/updataInfo?'+url2+'&id='+obj['id'],function(data){
            if(data&&data['code']===0){
                window.location.href='index.html';
            }else{
                alert('信息修改失败');
            }
        })
    }

    if(flag==='add'){
        ajax('/addInfo?'+url2,function(data){
            if(data&&data['code']===0){
                window.location.href='index.html';
            }else{
                alert('信息修改失败');
            }
        })
    }
};

