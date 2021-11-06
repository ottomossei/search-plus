var form = document.forms.jsform;
var array_display = ['aim','keyword','addword']

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
            form.aim.value = "https://www.google.com/search?q=";//初期値はGoogle
        }else{
            form.aim.value = value.aim;
        }
        form.keyword.value = "";//キーワード
        form.addword.value = value.addword;//アドワード
    })
});

//保存
document.getElementById('jsform').onsubmit = function(){
    var  aim = form.aim.value;//検索サイト
    var  keyword = form.keyword.value;//キーワード
    var  addword = form.addword.value;//アドワード
    var array_form = {'aim':aim,'keyword':keyword, 'addword':addword}
    chrome.storage.local.set(array_form);
    var newurl = aim+addword+'+'+keyword;
    chrome.tabs.query({'active': true}, function(tabs) {
        chrome.tabs.create({url:newurl});
    });
    return false;
}
