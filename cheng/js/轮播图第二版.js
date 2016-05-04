/**
 * Created by CHENG on 2016/4/19.
 */

~function () {

    var banner = document.getElementById("banner"),
        bannerInner = document.getElementById("bannerInner"),
        imgLists = bannerInner.getElementsByTagName("img"),
        bannerTip = document.getElementById("bannerTips"),
        bannerTips = bannerTip.getElementsByTagName("li"),
        bannerLeft = banner.getElementsByTagName("a")[0],
        bannerRight = banner.getElementsByTagName("a")[1];
    var divLists = bannerInner.getElementsByTagName("div");

//第一步请求数据

    var jsonData = null;


    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "../json/banner.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.formatJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }()

//绑定数据

    ~function () {
        var str = "", str2 = "";
        if (jsonData) {
            for (var i = 0, len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" trueImg="' + curData["img"] + '"/></div>';
                i === 0 ? str2 += "<li class='bg'></li>" : str2 += "<li></li>";
            }
            bannerInner.innerHTML = str;
            bannerTip.innerHTML = str2;
        }
    }()

//图片的延迟加载

    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0, len = imgLists.length; i < len; i++) {
            ~function (i) {
                var curImg = imgLists[i];
                var img = new Image;
                img.src = curImg.getAttribute("trueImg");
                img.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    if (i === 0) {
                        var curDiv = curImg.parentNode;
                        curDiv.style.zIndex = 1;
                        zhufengAnimate(curDiv, {
                            opacity: 1
                        }, 500)
                    }
                }
                img = null;
            }(i)
        }
    }

    //实现轮播
    var interval = 2000, step = 0, autoTimer = null;
    autoTimer = window.setInterval(autoMove, interval);

    function autoMove(){
        if(step>=imgLists.length-1){
            step=-1;
        }
        step++;
       setImg();
    }


    function setImg(){
        for(var i= 0,len=divLists.length;i<len;i++){
            var curDiv = divLists[i];
            if(i===step){
                curDiv.style.zIndex=1;
                zhufengAnimate(curDiv,{opacity:1},500);

                var siblings=utils.siblings(curDiv);
                for(var k= 0,len=siblings.length;k<len;k++){
                    var curSib=siblings[k];
                    curSib.style.zIndex=0;
                    zhufengAnimate(curSib,{opacity:1},500);
                }
                continue
            }
            utils.css(curDiv,"zIndex",0);
        }

        //实现焦点对齐

        for (var i = 0, len = bannerTips.length; i < len; i++) {
            var curTip = bannerTips[i];
            i === step ? utils.addClass(curTip, "bg") : utils.removeClass(curTip, "bg");
        }
    }





}()





