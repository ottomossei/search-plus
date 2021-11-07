var form = document.forms.jsform;
var array_display = ['aim','keyword','addword','exceptword','obj_site']

function logtime(){
	var now = new Date();
	var ms = ("000"+now.getMilliseconds()).slice(3);
	var time = now.toLocaleTimeString()+"."+ms;
	return time;
}


$(document).ready( function(){
    function renewal(){
        //現在時刻表示
        var now = new Date();
        document.getElementById("js-time").innerHTML = "現在時刻："+ now.toLocaleString();
    }
    renewal();
    setInterval(renewal,500);
});

//表示
$(document).ready( function(){
    chrome.storage.local.get(array_display,function(value){
        if (typeof value.keyword === "undefined") {
            form.aim.value = "";//初期値はDefault
        }else{
            form.aim.value = value.aim;
        }
        if (typeof value.exceptword === "undefined") {
            form.exceptword.value = "";
        }else{
            form.exceptword.value = value.exceptword;
        }
        if (typeof value.keyword === "undefined") {
            form.keyword.value = "";//初期値はDefault
        }else{
            form.keyword.value = value.keyword;
        }
        form.obj_site.value = value.obj_site;//対象サイト
        form.addword.value = value.addword;//アドワード
    })
});

//保存
document.getElementById('jsform').onsubmit = function(){
    var  aim = form.aim.value;//検索サイト
    var obj_site = form.obj_site.value;//対象サイト
    var  keyword = form.keyword.value;//キーワード
    if (form.exceptword.value != "") {
        var exceptword = '+-' + form.exceptword.value;//除外ワード
    }else{
        var exceptword = '';//除外ワード
    }
    var  addword = form.addword.value;//アドワード
    var array_form = {'aim':aim,'keyword':keyword, 'addword':addword, 'exceptword':exceptword, 'obj_site':obj_site}
    chrome.storage.local.set(array_form);
    var url_google = "https://www.google.com/search?q="
    var newurl = url_google+addword+'+'+keyword+exceptword+obj_site+aim;
    chrome.tabs.query({'active': true}, function(tabs) {
        chrome.tabs.create({url:newurl});
    });
    return false;
}
