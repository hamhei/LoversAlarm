Ti.API.info("hello from a background service!");

var count = 1;
var love = new Date(Ti.App.Properties.getString('love'));
var today = new Date();
var rest = love - today;

var notification;
var timeup;
var dialog = Ti.UI.createAlertDialog();
setNotify();

function setNotify(){
	if(rest > (30*1000)){
		timeup = Ti.App.iOS.scheduleLocalNotification({
			date: love,
			alertBody: "時間になりました。好きな人に逢えましたか？(=´∀｀)人(´∀｀=)",
			alertAction: "アプリを開く",
			userInfo:{timeup:"timeup"},
			badge: count++,
			sound: 'sounds/alarm.mp3'
		});
	}
	if(rest > (3*24*3600*1000)){
		notification = Ti.App.iOS.scheduleLocalNotification({
			date: new Date(love.getTime() - (3*24*3600*1000)),
			alertBody: "好きな人に逢えるまで、あと３日です！今からワクワクですね(●´▽｀●)",
			alertAction: "時間を確認",
			userInfo:{time:"３日"},
			badge: count++,
			sound: 'sounds/click.mp3'
		});
	} else if(rest > (24*3600*1000)){
		notification = Ti.App.iOS.scheduleLocalNotification({
			date: new Date(love.getTime() - (24*3600*1000)),
			alertBody: "好きな人に逢えるまで、あと１日です。明日が楽しみですね(･艸･｡)",
			alertAction: "時間を確認",
			userInfo:{time:"１日"},
			badge: count++,
			sound: 'sounds/click.mp3'
		});
	} else if(rest > (3*3600*1000)){
		notification = Ti.App.iOS.scheduleLocalNotification({
			date: new Date(love.getTime() - (3*3600*1000)),
			alertBody: "好きな人に逢えるまで、あと３時間です！今日のプランはばっちりですか？(｡>ω<)",
			alertAction: "時間を確認する",
			userInfo:{time:"３時間"},
			badge: 1,
			sound: 'sounds/click.mp3'
		});
	} else if(rest > (3600*1000)){
		notification = Ti.App.iOS.scheduleLocalNotification({
			date: new Date(love.getTime() - (3600*1000)),
			alertBody: "好きな人に逢えるまで、あと１時間！もうひと踏ん張り( /^ω^)/",
			alertAction: "時間を確認する",
			userInfo:{time:"１時間"},
			badge: 1,
			sound: 'sounds/click.mp3'
		});
	}
}


var x = Ti.Network.createHTTPClient();
var timer 
if(Ti.App.Properties.getInt('notify') == 0){
	timer = setInterval(function(){check();}, 180000);
}

function check(){
	Ti.API.info(Ti.App.Properties.getString('name'));
	if(Ti.App.Properties.getString('name')){
		var url = "http://mobile.twitter.com/statuses/user_timeline/"+Ti.App.Properties.getString('name')+".json?count=2";
		x.open("GET", url);
		x.send();
	} else {
		timer = null;
	}
}

var twid = Ti.App.Properties.getString('twid');
x.onload = function() {
	Ti.API.info(this.responseText.toString());
	var json = JSON.parse(this.responseText);
	if(!json.error) {
		if(twid == null) {
			twid = json[0].id_str;
			Ti.App.Properties.setString('twid', twid);
		} else {
			if(twid != json[0].id_str) {
				twid = json[0].id_str;
				twNotify(json[0].text);
				Ti.App.Properties.setString('twid', twid);
			}
		}
	}
}

var twNotification;
function twNotify(text) {
	twNotification = Ti.App.iOS.scheduleLocalNotification({
		alertBody:"恋人の最新の情報がありますヾ(●⌒∇⌒●)ﾉ　「" + text + "」",
		alertAction:"確認",
		userInfo:{"hello":"world"},
		badge: count++,
		date:new Date(new Date().getTime() + 1000),
		sound: 'sounds/click.mp3'
	});
}

Ti.App.iOS.addEventListener("notification", function(e){
	Ti.API.info('background event received');
	Ti.App.currentService.stop();
	Ti.App.currentService.unregister();
});
