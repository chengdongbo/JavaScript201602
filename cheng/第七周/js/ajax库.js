/**
 * Created by CHENG on 2016/5/9.
 */

(function(global,undefined){
    if(global.x){
        return
    };

    var x=global.x={};
    var Ajax=function(options){
        if(tools.getType(options,'Object')){
            return
        };

        var xhr=tools.getXHR();

        if(options.processData===undefined||options.processData===true){
            if(tools.getType(data,'String')){
                return
            };
            options.data=tools.encodeDataToURI(data);//这里是把非表单数据变成表单编码的形式（javascript对象转化为表单格式的数据。）
        }

        if(/^(get|delete|head)$/img.test(options.method)){
            options.url=tools.hasSearch(options.url,options.data);
            options.data=null;//这个为什么呢？
        }

        if(options.cache=false){
            var random=random = (~~(Math.random() * 0xffffff)).toString(36);
            options.url=tools.hasSearch(options.url,'_='+random);
        }

        if(options.async===undefined){
            options.async=true;
        }

        xhr.open(options.method,options.url,options.async,options.username,options.password);

        //但使用Post请求请求数据提交数据的时候必须把请求头中的content-type改为application/x-www=form-urlencoded
        tools.forIn(options.headers,function(key,value){
            xhr.setRequestHeader && xhr.setRequestHeader(key,value);
        });

        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(/^2\d{2}$/.test(xhr.status)){
                    var response=xhr.responseText;
                    if(options.dataType==='json'){
                        try{
                            response=tools.jsonParse(response);
                        }catch(e){
                            options.error('e');
                            return
                        }
                    }
                    options.success(response);
                }else if(/^(4|5)\d{2}$/.test(xhr.status)){
                    options.error("xhr.status");
                }
            }
        }

        if(options.timeout>0){
            xhr.timeout=+options.timeout;
            if('timeout' in xhr){
                xhr.ontimeout=function(){
                    options.error("timeout");
                }
            }else{
                setTimeout(function(){
                    if(xhr.readyState!==4){
                        xhr.abort();
                        options.error("请求已经超时");
                    }
                },options.timeout);
            }
        }

        xhr.send(options.data);
    };

    var tools={
        getXHR:(function(){
            var xhrList=[
                function (){
                    return new XMLHttpRequest;
                },
                function (){
                    return new ActiveXObject("Microsoft.XMLHTTP");
                },
                function (){
                    return new ActiveXObject("MsXML2.XMLHTTP");
                },
                function (){
                    return new ActiveXObject("MsXML2.XMLHTTP");
                }
            ];

           var xhr=null;
           while(xhr=xhrList.shift()){
               try{
                   xhr();
                   return
               }catch(e){
                   xhr=null;
                   continue
               }
           }

           if(xhr=null){
               throw  new Error("您的浏览器不支持ajax")
           }

           return xhr
       })(),

        getType:function(data,type){
            return Object.prototype.toString.call(data)==='[object '+type+']';
        },

        forIn:function(data,callback){
            if(!this.getType(data,'Object')){
               return
            }

            for(var key in data){
                if(data.hasOwnProperty(key)){
                    callback.call(undefined,key,data[key]);
                }
            }
        },

        encodeDataToURI:function(data){
            if(this.getType(data,'String')){
                return
            }

            var ary=[];
            this.forIn(data,function(key,value){//这两个形参是用来接受call传递过来的参数的
                ary.push(encodeURIComponent(key)+"="+encodeURIComponent(value));
            });

            return ary.join("&");

        },

        jsonParse:function(jsonString){
            if(this.getType(jsonString,'Object')){
                return
            }

            if(window.JSON){
                return JSON.parse(jsonString);
            }

            return eval('('+jsonString+')');

        },

        hasSearch:function(url,padString){
            return url+(/^\?/.test(url)?"&":"?")+padString;
        }
    };
    x.ajax=Ajax;
})(window);
