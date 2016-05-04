/**
 * Created by CHENG on 2016/4/11.
 */
var uiltsC = (function () {


    var flag = "getComputedStyle" in window;

    //获取浏览器属性的方法
    function win(attr,value){
        if(typeof  value  ==="undefined"){
           return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

    function likeToArray(likeAry) {
        if (flag) {
            return [].prototype.slice.call(likeAry, 0);
            //为什么这么写ary.splice(0) 把原来的数组中每一项都删除掉(清空数组每一项),把之前的每一项的值以一个新的数组返回(把之前的数组克隆了一份一模一样的,这样的克隆会修改原来的数组)
        }
        var ary = [];
        for (var i = 0, len = likeAry.length; i < len; i++) {
            var cur = likeAry[i];
            ary[ary.length] = cur;
        }

        return ary;
    }

    function offset(curEle) {
        var top = null, left = null, pra = curEle.offsetParent;

        top += curEle.offsetTop;
        left += curEle.offsetLeft;

        while (pra) {
            if (window.navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                top += pra.clientTop;
                left += pra.clientLeft;
            }

            top += pra.offsetTop;
            left += pra.offsetLeft;

            return {left: left, top: top};
        }
    }

    function getCss(curEle, attr) {
        var val = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle[filter];
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;

                val = reg.test(val) ? reg.exec(val) / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }

        var reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i
        return reg.test(val)?parseFloat(val):val;
    }

    //获取某个元素下的符合条件的元素子节点
    function children(curEle,tagName){
        var ary=[];

        //第一步获取 元素节点集合
        if(!flag){
            //非标准浏览器
            var nodeLists = curEle.childNodes;
            for(var i = 0;i<nodeLists.length;i++){
                var curNod = nodeLists[i];
                curNod.nodeType===1?ary[ary.length]=curNod:null;
            }
            nodeLists = null;//清空这个内存，优化性能
        }
        ary = this.likeToArray(curEle.children);
        //标准浏览器下，直接使用children

        //第二步：判断指定的参数
        //首先判断值是否存在
        if(typeof tagName ==="string"){
            //存在，比较tagname值和ary中的元素节点的值，把符合条件的拿出来，或者不不符合条件的删除
            for(var k =0;k<ary.length;k++){
                var curEleNod = ary[k];
                if(curEleNod.nodeName.toLocaleLowerCase()!==tagName.toLocaleLowerCase()){
                    ary.splice(k,1);
                    k--;//为了防止数组塌陷问题
                }
            }
        }
        return ary;

    }

    //获取上一个哥哥元素节点
    function prev(curEle) {
        if (flag) {
            //此时是标准浏览器
            return curEle.previousElementSibling;
        }

        prev = curEle.previousSibling;
        while (prev && prev.nodeType !== 1) {
            //当上一个节点存在且这个这节点不是元素节点，才继续向上查找
            prev = prev.previousSibling;
        }
        return prev;
        //如果上一个哥哥节点不存在，这个元素是一个节点，直接返回的是这个元素值？这样不好吧！；如果当前元素的nodetype值等于1了，说明就已经找到了，直接返回


    }

    //获取下一个弟弟元素节点
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    //获取所有的元素哥哥节点
    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    //获取所有的元素弟弟节点
    function nextAll(curEle) {
        var ary = [];
        var next = this.next(curEle);
        while (next) {
            ary.push(next);
            next = this.next(next);
        }
        return ary;
    }

    //获取某个元素的相邻两个元素节点
    function sibling(cueEle) {
        var prev = this.prev(cueEle);
        var next = this.next(curEle);
        var ary = [];
        prev ? ary.push(prev) : null;
        next ? ary.push(next) : null;
        return ary;
    }

    //获取元素的所有兄弟元素节点
    function siblings(curEle){
       return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    //获取当前元素索引
    function index(curEle){
        return this.prevAll(curEle).length;
    }

    //获取当前元素相爱的第一个元素节点
    function firstChildren(curEle){
        var chs = this.children(curEle);
        return chs.length>0?chs[0]:null;
    }

    //获取当前元素下的最后一个元素节点
    function lastChildren(curEle){
        var chs = this.children(curEle);
        return chs.length>0?chs[chs.length-1]:null;
    }

    //向指定容器末尾追加一个新的元素
    function append(curEle,container){
        container.appendChild(curEle);
    }

    //向指定容器之前追加一个新元素
    function prepend(curEle,container){
        var fir = this.firstChildren(container);
        if(fir){
            container.insertBefore(curEle,fir);
            return
        }
        container.appendChild(curEle);

    }

    //把新元素追加到特定元素之前
    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }

    //把新元素追加到指定元素后面
    function insertAfter(newEle,oldEle){
        var nex = this.next(oldEle);
        if(nex){
            nex.parentNode.insertBefore(newEle,nex);
            return
        }
        oldEle.parentNode.appendChild(newEle);

    }

    //验证当前元素是否包括某个类名
    function hasClass(curEle,className){
        var reg = new RegExp("(^| +)"+className+"( +|$)");
        ////当一个正则表达式中需要把一个变量的值作为一个动态的规则:我们只能使用实例创建的方式；*出现0到多次；？出现0-1次，+1到多次；
        var curClaName = curEle.style.className;
        //获取元素属性的方式
        return reg.test(curClaName);
    }

    //给某个元素增加样式名
    function addClass(curEle,className){
        var ary = className.split(/ +/g);
        for(var i= 0,len=ary.length;i<len;i++){
            var curName = ary[i];
            if(!hasClass(curEle,curName)){
                curEle.className = " "+curName;
            }
        }
    }

    //移除样式
    function removeClass(curEle,className){
        var ary = className.split(/ +/g);
        for(var i= 0,len=ary.length;i<len;i++){
            var curName = ary[i];
            if(hasClass(curEle,curName)){
                var reg = new RegExp(("(^| +)"+curName+"( +|$)"),"g");
                curEle.className = curName.className.replace(reg," ");
            }
        }
    }

    //通过元素的样式类名获取一组元素
    function getElmentByClass(className,context){
        context= context||document;
        var likeAry = className.replace(/(^ +| +$)/g,"").split(/ +/g);
        var ary = [];
        var nodeLists = context.getElementsByTagName("*");
        //获取指定元素下的所有元素标签
        for(var i= 0;i<nodeLists.length;i++){
            var curTag = nodeLists[i];
            //循环传递进来的classname值，看看当前的这个标签中是否包括了这个其中的全部；
            var isOk = true;
            for(var k=0;k<likeAry.length;k++){
                var curLikeAry =likeAry[k];
                var reg = new RegExp("(^| +)"+curLikeAry+"( +|$)");
                if(!reg.test(curTag.className)){
                    isOk = false;
                    break
                }
            }
            if(isOk){
                ary.push(curTag);
            }

        }
        return ary;

    }

    return {
        win:win,
        likeToArray:likeToArray,
        offset:offset,
        getCss:getCss,
        children:children,
        prev:prev,
        next:next,
        prevAll:prevAll,
        nextAll:nextAll,
        sibling:sibling,
        index:index,
        firstChildren:firstChildren,
        lastChildren:lastChildren,
        append:append,
        prepend:prepend,
        insertBefore:insertBefore,
        insertAfter:insertAfter,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        getElmentByClass:getElmentByClass

    }
})()




