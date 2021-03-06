(function($){
	$.fn.getTwitterFeed = function(uid, verifier){
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

		if ($(window).width() > 600){

			var url = 'http://api.weibo.com/2/statuses/user_timeline.json?source=5786724301&uid=2144329284&feature=1&trim_user=1&callback=?';
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
					item.innerHTML = text + '<small>'+relativeDate(json.data.statuses[i].created_at)+'</small>';
					fragment.appendChild(item);
				}

				var play = function(){
					timeout = setTimeout(function(){
						feed.animate({top: '-='+30}, speed, function(){
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