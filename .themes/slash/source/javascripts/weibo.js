(function($){
	$.fn.getWeiboTimeline = function(uid,source){
		var banner = $(this),
			feed = banner.find('.feed'),
			interval = 10000,
			speed = 500;


		var relativeDate = function(date){
			if (navigator.appName === 'Microsoft Internet Explorer') return '';

			var unit = {
				now: 'Now',
				minute: '1 min',
				minutes: ' mins',
				hour: '1 hr',
				hours: ' hrs',
				day: 'Yesterday',
				days: ' days',
				week: '1 week',
				weeks: ' weeks'
			};

			var current = new Date(),
				tweet = new Date(date),
				diff = (((current.getTime() + (1 * 60000)) - tweet.getTime()) / 1000),
				day_diff = Math.floor(diff / 86400);
			
			if (day_diff == 0){
				if (diff < 60) return unit.now;
				else if (diff < 120) return unit.minute;
				else if (diff < 3600) return Math.floor(diff / 60) + unit.minutes;
				else if (diff < 7200) return unit.hour;
				else if (diff < 86400) return Math.floor(diff / 3600) + unit.hours;
				else return '';
			} else if (day_diff == 1) {
				return unit.day;
			} else if (day_diff < 7) {
				return day_diff + unit.days;
			} else if (day_diff == 7) {
				return unit.week;
			} else if (day_diff > 7) {
				return Math.ceil(day_diff / 7) + unit.weeks;
			} else {
				return '';
			}
		}

		var txt='{"草泥马":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_org.gif","神马":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_org.gif","浮云":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_org.gif","给力":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_org.gif","围观":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_org.gif","威武":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_org.gif","熊猫":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_org.gif","兔子":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_org.gif","奥特曼":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_org.gif","囧":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_org.gif","互粉":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_org.gif","礼物":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_org.gif","呵呵":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_org.gif","嘻嘻":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_org.gif","哈哈":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/laugh.gif","可爱":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/14/tza_org.gif","可怜":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/kl_org.gif","挖鼻屎":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a0/kbsa_org.gif","吃惊":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f4/cj_org.gif","害羞":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/shamea_org.gif","挤眼":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c3/zy_org.gif","闭嘴":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/29/bz_org.gif","鄙视":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/71/bs2_org.gif","爱你":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/lovea_org.gif","泪":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9d/sada_org.gif","偷笑":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/19/heia_org.gif","亲亲":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8f/qq_org.gif","生病":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/sb_org.gif","太开心":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/mb_org.gif","懒得理你":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/17/ldln_org.gif","右哼哼":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/98/yhh_org.gif","左哼哼":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/zhh_org.gif","嘘":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a6/x_org.gif","衰":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/cry.gif","委屈":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/73/wq_org.gif","吐":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9e/t_org.gif","打哈欠":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f3/k_org.gif","抱抱":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/27/bba_org.gif","怒":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7c/angrya_org.gif","疑问":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/5c/yw_org.gif","馋嘴":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a5/cza_org.gif","拜拜":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/88_org.gif","思考":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e9/sk_org.gif","汗":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/24/sweata_org.gif","困":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7f/sleepya_org.gif","睡觉":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6b/sleepa_org.gif","钱":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/90/money_org.gif","失望":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0c/sw_org.gif","酷":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/cool_org.gif","花心":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8c/hsa_org.gif","哼":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/49/hatea_org.gif","鼓掌":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/36/gza_org.gif","晕":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/dizzya_org.gif","悲伤":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1a/bs_org.gif","抓狂":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/62/crazya_org.gif","黑线":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/91/h_org.gif","阴险":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/yx_org.gif","怒骂":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/nm_org.gif","心":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/hearta_org.gif","伤心":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ea/unheart.gif","猪头":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/pig.gif","ok":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d6/ok_org.gif","耶":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/ye_org.gif","good":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/good_org.gif","不要":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c7/no_org.gif","赞":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d0/z2_org.gif","来":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/come_org.gif","弱":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/sad_org.gif","蜡烛":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/91/lazu_org.gif","蛋糕":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/cake.gif","钟":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d3/clock_org.gif","话筒":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/m_org.gif","国旗":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/dc/flag_org.gif","吃货":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ba/lxhgreedy_org.gif","笑哈哈":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/32/lxhwahaha_org.gif","江南style":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/67/gangnamstyle_org.gif","飞个吻":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8a/lxhblowakiss_org.gif","lt最右":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f1/ltzuiyou_org.gif","lt切克闹":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/73/ltqiekenao_org.gif","moc转发":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/cb/moczhuanfa_org.gif","moc晕":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/84/mocyun_org.gif","gst耐你":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/gstnaini_org.gif","xb压力":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e0/xbyali_org.gif","din推撞":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/dd/dintuizhuang_org.gif","大南瓜":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/4d/lxhpumpkin_org.gif","moc鬼脸":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0f/mocguilian_org.gif","gst好羞射":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8b/gsthaoxiushe_org.gif","泪流满面":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/64/lxhtongku_org.gif","最右":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c8/lxhzuiyou_org.gif","右边亮了":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ae/lxhliangle_org.gif","带感":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d2/lxhdaigan_org.gif","xb小花":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c2/xbxiaohua_org.gif","得瑟":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ca/lxhdese_org.gif","bed凌乱":"http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/fa/brdlingluan_org.gif"}';
		var jsonObject = JSON.parse(txt);

		if ($(window).width() > 600){

			var url = 'http://api.weibo.com/2/statuses/user_timeline.json?source='+source+'&uid='+uid+'&feature=1&trim_user=1&callback=?';
			banner.show();
			$.getJSON(url,function(json){
				//console.log(json.data.statuses[0].text);
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

				var play = function(){
					timeout = setTimeout(function(){
						feed.animate({top: '-='+33}, speed, function(){
							$(this).append($(this).children().eq(counts).clone());
							counts++;
							play();
						});
					}, interval);
				}

				var pause = function(){
					clearTimeout(timeout);
				}

				banner.on('mouseenter', pause).on('mouseleave', play)
				.children('.loading').hide().end()
				.children('.container').show()
				.children('.feed').append(fragment);

				play();
			});

		}
	};
})(jQuery);