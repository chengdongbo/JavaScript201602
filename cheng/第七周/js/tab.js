/**
 * Created by CHENG on 2016/5/4.
 */
var xhr=new XMLHttpRequest();
xhr.open("GET","http://localhost:/userInfo?name=张峰",false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        val = JSON.parse(val);
        console.log(val);
    }
};
xhr.send(null);