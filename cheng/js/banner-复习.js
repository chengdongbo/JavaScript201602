/**
 * Created by CHENG on 2016/4/18.
 */
//~function () {
//
//    var banner = document.getElementById("banner"), bannerDiv = utils.firstChild(banner), bannerTips = utils.children(banner, "ul")[0];
//
//    var imgLists = document.getElementsByTagName("img"), oLis = bannerTips.getElementsByTagName("li");
//    var bannerLeft = document.getElementsByTagName("a")[0], bannerRight = document.getElementsByTagName("a")[1];
//
//
//    //第一步，请求数据
//    var jsonData = null, count = null;
//
//
//    ~function () {
//        var xhr = new XMLHttpRequest;
//        xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//                jsonData = utils.formatJSON(xhr.responseText);
//            }
//        };
//        xhr.send(null);
//    }();
//
//
//    //绑定数据
//    ~function () {
//        if (jsonData) {
//            var str = "";
//            //绑定的是图片
//            for (var i = 0, len = jsonData.length; i < len; i++) {
//                var curData = jsonData[i];
//                str += '<div><img src="" trueImg="' + curData["img"] + '"/></div>';
//            }
//            str += '<div><img src="" trueImg="' + jsonData[0]["img"] + '"/></div>';
//
//            count=jsonData.length+1;
//            utils.css(bannerDiv,{
//                width:count*1000
//            })
//            bannerDiv.innerHTML = str;
//
//            //绑定li
//            var str2 = "";
//            console.log(jsonData.length);
//            for (var k = 0, len = jsonData.length; k < len; k++) {
//                if (k === 0) {
//                    str2 += "<li class='bg'></li>";
//                }else{
//                    str2 += "<li></li>";
//                }
//                console.log(str2);
//            }
//            bannerTips.innerHTML = str2;
//        }
//    }();
//
//
//    //实现图片的延迟加载
//    setTimeout(lazyImg, 500);
//    function lazyImg() {
//        for (var i = 0, len = imgLists.length; i < len; i++) {
//            ~function () {
//                var curImg = imgLists[i];
//                var img = new Image;
//                img.src = curImg.getAttribute("trueImg");
//                img.onload = function () {
//                    curImg.src = this.src;
//                    curImg.style.display = "block";
//                    img = null;
//                    zhufengAnimate(curImg, {
//                        opacity: 1
//                    }, 300)
//                }
//            }()
//        }
//    }
//
//    //实现图片的自动轮播
//
//    var step= 0,interval=1000,autoTimer=null;
//    autoTimer=window.setInterval(autoMove,interval);
//    function autoMove(){
//        if(step>=count-1){
//            step=0;
//            bannerDiv.style.left = 0
//        }
//        step++;
//        zhufengAnimate(bannerDiv,{
//            left:-step*1000
//        },300)
//        changTip();
//    }
//
//    //实现焦点对齐，
//    function changTip(){
//        var tempStep = step>=oLis.length?0:step;
//        for(var i = 0,len=oLis.length;i<len;i++){
//            var curLi=oLis[i];
//            i === tempStep?utils.addClass(curLi,"bg"):utils.removeClass(curLi,"bg");
//        }
//    }
//
//    //实现鼠标滑过停止轮播效果
//    banner.onmouseover=function(){
//        window.clearInterval(autoTimer);
//        bannerLeft.style.display= bannerRight.style.display="block";
//    }
//    banner.onmouseout = function(){
//        autoTimer=window.setInterval(autoMove,interval);
//        bannerLeft.style.display=bannerRight.style.display="none";
//    }
//
//
//    //点击标点实现图片切换
//~function(){
//    for(var i= 0,len=oLis.length;i<len;i++){
//        var curLi = oLis[i];
//        curLi.index=i;
//        curLi.onclick=function(){
//            step = this.index;
//            changTip();
//            zhufengAnimate(bannerDiv, {
//                left:-step*1000
//            },300 )
//        }
//    }
//
//    //实现左右切换
//    bannerLeft.onclick=function(){
//        autoMove();
//    }
//    bannerRight.onclick=function(){
//
//        if(step<=0){
//            step=count-1;
//            utils.css(bannerDiv,"left",-step*1000)
//        }
//        step--;
//        zhufengAnimate(bannerDiv,{
//            left:-step*1000
//        },300)
//        changTip();
//    }
//
//}();
//
//
//
//
//}()





