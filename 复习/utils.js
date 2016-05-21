/**
 * Created by CHENG on 2016/5/20.
 */

var utils = {

    //foreach 方法兼容处理
    each: (function () {
        if (Array.prototype.forEach) {
            return function (ary, fn, context) {
                ary.forEach(fn, context);
            }
        }

        return function (ary, fn, context) {
            for (var i = 0; i < ary.length; i++) {
                fn.call(context, ary[i], i, ary);
            }
        }
    })(),


    //继承，让config对象的属性覆盖原有的defaultconfig的属性，并且返回一个全新的属性；
    extends: function (defaultconfig, config) {
        var obj = {};
        for (var attr in defaultconfig) {
            obj[attr] = config[attr] || defaultconfig[attr];
        }
    }


};


//使用示范
var ary = [1, 2, 3];

utils.each(ary, function (item, index, list) {
    console.log(item, index, list, this['name']);
}, {name: 'chengdongbo'});


