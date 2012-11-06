---
layout: post
title: "Hello Octopress"
date: 2012-10-31 23:15
comments: true
categories: octopress

---


是不是每一个建立Blog的，都会把他的**_第一篇博文奉献给如何建Blog_**？这个就不得而知。
  
不过关于如何透过octopress建立blog，我就不多说什么了。这个写的人太多了，还写就没什么意义。既然不写如何建，那么就来写写如何完善吧。。。~~丫的，还是玩了个擦边球。~~

###weibo部分

主要做了2部分：

1. 右上角的微博图标
2. 上端微博滚动

右上角的微博图标主要是仿照其他按钮，用photoshop做的。这个很容易，没几下就搞好了。至于微博滚动部分还是仿照原有的推特javascript写了个weibo的脚本。好吧，没有一点JS CSS Jquery Html语言的基础，还真花了不少时间= =，不过归功于这个脚本，这几天不少的翻看了下这堆东西。大致也了解了下。。勉强还是做出来了。。虽然本想不只滚动微博文字这么简单，还想让@的每个用户都能直接跳转到该用户的微博主页。。不过由于weibo用户的每个用户昵称都可以有个性域名，或者有个专属的uid。也就是说，即使知道用户的昵称，也没法通过昵称来实现直接跳转到他的微博页面。但是可以通过weibo API来获取每个用户的个性域名。不过这样的话，每条微博的@用户都需要透过API来请求得到。除了麻烦外，更重要的是我没有属于我自己的weibo AppKey。所以索性直接跳到用户搜索界面得了。

说道这个获取weibo的JS脚本原先我原先是打算仿照推特JS的写法使用，weibo API来获取微博数据，但是一开始不想那么麻烦去研究如何使用weibo的API，于是像通过分析[微博秀](http://app.weibo.com/tool/weiboshow)的网页的源代码来进而来提取。其实通过_\<iframe\>_标签来注入要简单的多。但是这样的的话，达不到我想要的效果。尝试了各种方法总是不能成功把该微博秀里面的网页信息成功提取出来。但是这涉及到跨域获取数据。有下面的情况：
!--more-->

* 如果直接使用`$.getJSON()`来获取，通过`&callback=?`参数硬是把页面返回了。但是返回的页面不是JSON数据，直接报错，JS脚本停止运行。
* 如果直接通过`$.get()`来获取，除非不是跨域，才能得到页面的源代码。
* 如果直接使用`$.getScript()`那么可以返回得到该页面，但是没办法调用。

真是奔溃啊。最后想通过建立一个PHP文件来作为一个中间代理。PHP文件与Blog属于同一域，使用JS来访问也就不存在问题。同时PHP文件动态的去请求[微博秀]((http://app.weibo.com/tool/weiboshow)里面的数据，这样就能获取到我想要的数据。好了。大致翻看了下PHP的用法。最后也终于在本地弄好自己的PHP文件。不过悲剧的事又来了。Github不支持挂PHP。泪奔。。。无奈死了。让我去找服务器，挂上PHP，并把Blog挂上去，真不愿意去找。（在通过其他方法搞完weibo后，才发现[sourceforge.net](sourceforge.net)可以挂Blog和PHP。擦。。要是早点发现。就不用后来又折腾了那么久。）虽然后面是发现了[sourceforge.net](sourceforge.net)但是已经不想把弄好的重新打回PHP在去挂到上面去。。

关于PHP部分，利用simple_html_dom.php来分析html页面文件其实是很容易的。就贴出代码吧。
```php
<?php
include("simple_html_dom.php");
header('Content-type:text/json; charset=utf-8');
$html = file_get_html('http://widget.weibo.com/weiboshow/index.php?&isWeibo=1&uid=1765106605&verifier=a4b838a0&dpc=1');
$loop = 0;
foreach($html->find('.weiboShow_mainFeed_listContent_txt') as $element){
	$a = $element->innertext;
	$array[$loop]=$a;
	$loop = ($loop==20) ? 0 : $loop+1 ;
}
echo json_encode($array);
$html->clear();
?>
```

最后居然还是通过weibo api来获取自己的微博数据。擦。一开始就这样不就ok了。还去搞什么微博秀。


关于weibo JS部分就不多说了。贴出部分比较核心的代码：
```js weibo.js
var url = 'http://api.weibo.com/2/statuses/user_timeline.json?source='+source+'&uid='+uid+'&feature=1&trim_user=1&callback=?';
$.getJSON(url,function(json){
				var length = 20,
					fragment = document.createDocumentFragment(),
					counts = 0,
					timeout;
					
				for (var i=0; i<length; i++){
					var item = document.createElement('li'),
						text = json.data.statuses[i].text;	
					text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>').replace(/(^|\W)#(\w+)/g, '$1<a href="http://huati.weibo.com/k/$2?">#$2#</a>').replace(/@([\u4e00-\u9fa5a-zA-Z0-9_-]{4,30})/g, '<a href="http://s.weibo.com/user/$1?">@$1</a>');	
					var reg=text.match(/(?!\[)([\u4e00-\u9fa5a-zA-Z0-9_-]{1,10})(?=\])/gi);
					if (reg!=null) {
						for (var j = 0; j < reg.length; j++) {
							var weiboface = jsonObject[reg[j]];
							if(weiboface!=undefined){
								text=text.replace(/\[([\u4e00-\u9fa5a-zA-Z0-9_-]{1,10})\]/, '<img src="'+weiboface+'" img>');
							}		
						};
					};
					item.innerHTML = text + '<small>'+relativeDate(json.data.statuses[i].created_at)+'</small>';
					fragment.appendChild(item);
				}
```
###配置Octopress






