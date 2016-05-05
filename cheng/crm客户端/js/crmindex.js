/**
 * Created by CHENG on 2016/5/5.
 */

var boxList = document.getElementById("boxlist"), oLis = boxList.getElementsByTagName("li");

+function () {
    for (var i = 0; i < oLis.length; i++) {
        var curLi = oLis[i];
        curLi.className = i % 2 === 1 ? "bg" : null;
        curLi.oldclass = curLi.className;
        curLi.onmouseenter = function () {
            this.className = "hov";
        }
        curLi.onmouseleave = function () {
            this.className = curLi.oldclass;
        }
    }
}();