

// Google Analytics Module
Titanium.include('lib/analytics.js');
var analytics = new Analytics('UA-28213912-1');
Titanium.App.addEventListener('analytics_trackPageview', function(e){
    var path = "/app/" + Titanium.Platform.name;
    analytics.trackPageview(path + e.pageUrl);
});
Titanium.App.addEventListener('analytics_trackEvent', function(e){
    analytics.trackEvent(e.category, e.action, e.label, e.value);
});
Titanium.App.Analytics = {
    trackPageview:function(pageUrl){
        Titanium.App.fireEvent('analytics_trackPageview', {pageUrl:pageUrl});
    },
    trackEvent:function(category, action, label, value){
        Titanium.App.fireEvent('analytics_trackEvent', {category:category, action:action, label:label, value:value});
    }
}
//analytics.enabled = true;
analytics.start(10);


// no sleep
Ti.App.idleTimerDisabled = true;

// Admob Module
Ti.Admob = require('ti.admob');

// Admaker
var TiAdmaker = require('co.saiten.ti.admaker');

// Facebook 
Ti.Facebook.appid = '292682814116982';
Ti.Facebook.permissions = ['publish_stream', 'read_stream'];

var COLOR = '#FC8580'; // Pink
var COLOR2 = '#5D4C3F'; // Chairo
var D = 60*60*24*1000;
var H = 60*60*1000;
var M = 60*1000;
var S = 1000;

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor(COLOR);

// create tab group
var tabGroup = Ti.UI.createTabGroup();


var soundClick = Ti.Media.createSound({ url:'sounds/click.mp3', volume:0.1, allowBackground: true});
var soundNothing = Ti.Media.createSound({url:'sounds/nothing.wav', volume:0.1, allowBackground: true});
var soundAlarm = Ti.Media.createSound({url:'sounds/alarm.mp3', volume:0.1, allowBackground: true});
soundNothing.play();

var tw = {id:0};
var xhr = Ti.Network.createHTTPClient();

var today = new Date();
var love = new Date(); 
var rest = love - today; 
var jikan = ts2time(rest);








//
// Timer Window
//
var win1 = Ti.UI.createWindow({  
    title:'恋人時計',
    backgroundImage:'images/bg.png',
    barColor: COLOR2
});
var tab1 = Ti.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
win1.addEventListener('focus', function(e){
	//win1.hideNavBar();
	Ti.App.Analytics.trackPageview('/Main');
});

var timeView = Ti.UI.createView({
	layout: 'horizontal',
	id: 'timeView'
});
win1.add(timeView);

var timeLabel = Ti.UI.createLabel({
	text: '',
	id: 'timeLabel'
});
timeView.add(timeLabel);

var secLabel = Ti.UI.createLabel({
	text: '',
	id: 'secLabel'
});
timeView.add(secLabel);


var setButton = Ti.UI.createButton({
	title: '',
	backgroundImage:'images/set_button.png',
	id: 'setButton'
});
setButton.addEventListener('click', function(e){
	tabGroup.activeTab = tabGroup.tabs[1];
})
win1.add(setButton);

var statusView = Ti.UI.createView({
	layout: 'vertical',
	id: 'statusView'
});
var confirmDialog = Ti.UI.createAlertDialog({
	buttonNames: ['キャンセル', 'Safariを開く'],
	cancel: 0
});
confirmDialog.addEventListener('click', function(e){
	switch (e.index) {
		case 0:
			Ti.App.Analytics.trackEvent('Twitter','Tweet','Cancel',1);
			break;
		case 1:
			Ti.App.Analytics.trackEvent('Twitter','Tweet','ToTwitter',0);
			Ti.Platform.openURL(tw.url);
			break;
	}
});
statusView.addEventListener('click', function(e){
	if(tw.id != 0){
		confirmDialog.setTitle('ツイートページに移動します');
		confirmDialog.setMessage('アプリを中断し、Safariでツイッターを開きます。よろしいですか？');
		confirmDialog.show();
	}
});
win1.add(statusView);

var headerView = Ti.UI.createView({
	backgroundImage: 'images/feed_header.png',
	id: 'headerView'
});
statusView.add(headerView);

var statusTable = Ti.UI.createView({
	backgroundImage: 'images/feed_content.png',
	id: 'statusTable'
});
statusView.add(statusTable);

var footerView = Ti.UI.createView({
	backgroundImage: 'images/feed_footer.png',
	id: 'footerView'
});
statusView.add(footerView);

var hito = Ti.UI.createImageView({
	image: 'images/heart.png',
	id: 'hito'
});
statusTable.add(hito);

var whenLabel = Ti.UI.createLabel({
	text: '',
	id: 'whenLabel'
});
statusTable.add(whenLabel);

var statusLabel = Ti.UI.createLabel({
	text: '',
	id: 'statusLabel'
});
statusTable.add(statusLabel);

var loveButton = Ti.UI.createButton({
	title: '',
	backgroundImage: 'images/lovebutton.png',
	visible: false,
	id: 'loveButton'
});
loveButton.addEventListener('click', function(e){
	Ti.Platform.openURL('http://hamhei.github.com/love/');
});
win1.add(loveButton);



var iads = Ti.UI.iOS.createAdView({
    width: 'auto',
    height: 50,
    bottom: 0,
    borderColor: '#000000',
    backgroundColor: COLOR
    });
var t1 = Ti.UI.createAnimation({bottom:0, duration:750});
 
var adview1;

var timeout = setTimeout(function(){setAd();},5000);

function setAd(){
if (today.getTime % 2 == 1) {
	adview1 = Ti.Admob.createView({
		testDevices:true,
		adBackgroundColor: COLOR,
		primaryTextColor:'#FFFFFF',
		secondaryTextColor:'#FFFFFF',
		publisherId:'a14f06a030d456c',
		id: 'adview1'
	});
} else {
	adview1 = TiAdmaker.createView({
	    backgroundColor: COLOR,
	    adUrl: "http://images.ad-maker.info/apps/4b1c1c20f89c2ec4d94c.html",
	    siteId: "111",
	    zoneId: "111",
	    id: 'adview1'
}); 
}
win1.add(adview1);
}

iads.addEventListener('load', function(){    
	clearTimeout(timeout);
	//iads.animate(t1);
});
win1.add(iads);







//
// Setting Window
//
var win2 = Ti.UI.createWindow({  
    title:'設定',
    barColor: COLOR2,
    backgroundImage:'images/Default.png'
});
win2.addEventListener('focus', function(e){
	Ti.App.Analytics.trackPageview('/Setting');
});
var tab2 = Ti.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 2',
    window:win2
});
win2.addEventListener('blur', function(e){
	Ti.App.Properties.setString('love',picker.value.toString());
	love = picker.value;
	rest = love - today;
	jikan = ts2time(rest);
	Ti.App.Analytics.trackEvent('RestTime',
								'Setting',
								new Date().toString() + ' === ' + love.toString(),
								rest
								);
});

backButton = Ti.UI.createButton({
	title: '設定完了',
	id: 'backButton'
});
backButton.addEventListener('click', function(e){
	tabGroup.activeTab = tabGroup.tabs[0];
})
win2.leftNavButton = backButton;

var twView = Ti.UI.createView({
	layout: 'vertical',
	id: 'twView'
});
win2.add(twView);

var itemView = Ti.UI.createView({
	layout: 'horizontal',
	id: 'itemView'
});
twView.add(itemView);

var hito2 = Ti.UI.createImageView({
	image: 'images/heart.png',
	id: 'hito2'
});
itemView.add(hito2);

var twLabel = Ti.UI.createLabel({
	text: '好きな人のツイッターIDは？',
	id: 'twLabel'
});
itemView.add(twLabel);
var twtf = Ti.UI.createTextField({
        hintText:'twitter ID',
        value: '',
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        keyboardType:Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: 'twtf'
});
twtf.addEventListener('blur', function(e){
	if(Ti.App.Properties.getString('name') != twtf.value) {
		tw.name = twtf.value;
		Ti.App.Properties.setString('name', tw.name);
		setTweet(tw.name);
	}
});
twView.add(twtf);

var notifyLabel = Ti.UI.createLabel({
	text: 'その人の最新の呟きを通知してもいいですか？',
	id: 'notifyLabel'
});
twView.add(notifyLabel);

var notifyTab = Ti.UI.createTabbedBar({
	labels: ['OK', 'ダメ'],
	index: 0,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	id: 'notifyTab'
});
notifyTab.addEventListener('change', function(e){
	notifyTab.index = e.index;
	Ti.App.Properties.setInt('notify', notifyTab.index);
});
twView.add(notifyTab);

var itemView2 = Ti.UI.createView({
	layout: 'horizontal',
	id: 'itemView2'
});
twView.add(itemView2);

var clock = Ti.UI.createImageView({
	image: 'images/clock.png',
	id: 'clock'
});
itemView2.add(clock);

var pickerLabel = Ti.UI.createLabel({
	text: '次にその人と会える日を教えてね♪',
	id: 'pickerLabel'
});
itemView2.add(pickerLabel);

var picker = Ti.UI.createPicker({
	type: Ti.UI.PICKER_TYPE_DATE_AND_TIME,
	minDate: today,
	maxDate: new Date(today.getTime() + (30*24*3600*1000)),
	locale: 'ja',
	value: love,
	id: 'picker'
});
picker.addEventListener('change', function(e) {
	today = new Date();
	picker.minDate = today;
	picker.value = e.value;
	});
win2.add(picker);


//
//  add tabs
//
win1.hideTabBar();
tabGroup.addTab(tab1);  
win1.hideNavBar();
win2.hideTabBar();
tabGroup.addTab(tab2);


// open tab group
tabGroup.open();

init();

function init() {
	if(Ti.App.Properties.hasProperty("name")) {
		tw.name = Ti.App.Properties.getString('name');
		twtf.value = tw.name;
		setTweet(tw.name);
	}
	if(Ti.App.Properties.hasProperty("notify")) {
		notifyTab.index = Ti.App.Properties.getInt('notify');
	}
	today = new Date();
	if(Ti.App.Properties.hasProperty("love")) {
		love = new Date(Ti.App.Properties.getString('love'));
		picker.value = love;
	} else {
		on = true;
		tabGroup.activeTab = tabGroup.tabs[1];
	}
	rest = love - today;
	jikan = ts2time(rest);
	//alert(rest);
	if(rest < (-24*3600*1000)) {
		on = true;
		tabGroup.activeTab = tabGroup.tabs[1];		
	}
}

setInterval(function(){
	update();
}, 1000);

var on = true;
var d = Ti.UI.createAlertDialog();
d.addEventListener('click', function(e){
	soundAlarm.stop();
});
function update(){
	rest -= 1000;
	jikan[2]--;
	if(jikan[2] == -1) {
		jikan[2] = 59;
		jikan[1]--;
		if(jikan[1] % 3 == 0){
			setTweet(tw.name);
		}
		if(jikan[1] == -1){
			jikan[1] = 59;
			jikan[0]--;
		}
	}
	if(rest > 0){
		if(on) {
			on = false;
			win1.backgroundImage = 'images/bg.png';
			loveButton.visible = false;
		}
		display();
	} else {
		win1.backgroundImage = 'images/finish_bg.png';
		loveButton.visible = true;
		timeLabel.text = "";
		secLabel.text = '';
		if(!on) {
			on = true;
			Ti.Media.vibrate();
			soundAlarm.play();
			d.setTitle('(=´∀｀)人(´∀｀=)');
			d.setMessage('時間になりました。好きな人には会えましたか？ヾ( 〃∇〃)ﾂ');
			d.show();
		}
	}
}

function display(){
	if(jikan[1] < 10) {
		timeLabel.text = jikan[0] + ':0' + jikan[1];
	} else {
		timeLabel.text = jikan[0] + ':' + jikan[1];
	}
	if (jikan[2] < 10) {
		secLabel.text = '0' + jikan[2];
	} else {
		secLabel.text = jikan[2];
	}
}

function ts2time(r) {
	var t = [];
	t[0] = Math.floor(r/H);
	t[1] = Math.floor((r%H)/M);
	t[2] = Math.floor((r%M)/S);
	return t;
}

function setTweet(name) {
	if(name){
		if(name[0] == '@') {
			name = name.slice(1);
			Ti.App.Analytics.trackEvent('Twitter','Send','@',0);
		}
		statusView.visible = true;
		var twurl = "http://twitter.com/statuses/user_timeline/"+name+".json?count=2";
		xhr.open("GET", twurl);
		xhr.send();
	} else {
		statusView.visible = false;
	}
}
var cnt = 0;
xhr.onload = function() {
	Ti.API.info(this.responseText.toString());
	var obj = JSON.parse(this.responseText);
	if(!obj.error) {
		if(tw.id != obj[0].id_str) {
			soundClick.play();
			Ti.Media.vibrate();
			tw.id = obj[0].id_str;
			tw.text = obj[0].text;
			tw.url = 'https://mobile.twitter.com/#!/' + tw.name + '/status/' + tw.id;
			tw.created_at = obj[0].created_at;
			Ti.App.Properties.setString('twid', tw.id);
		}
		var sa = ts2time(new Date() - new Date(tw.created_at));
        if(sa[0] > 147) {
            tw.when = '１週間以上前';
        } else if(sa[0] > 0) {
           	tw.when = sa[0]+'時間前';
        } else if(sa[1] > 0) {
           	tw.when = sa[1]+'分前';
        } else {  //if(sa[2] > 0) {
           	tw.when = sa[2]+'秒前';
        }
        whenLabel.text = tw.when;
		statusLabel.text = tw.text;
		cnt = 0;
	} else {
		tw.id = 0;
		statusLabel.text = 'ツイッターの使い過ぎみたいです>< 暫く待ってから試して下さい^^; \n 【ヒント：他のツイッタークライアントを閉じて、このアプリを起動し続けたままにしておくと、制限に引っかかり難くなります】';
		Ti.App.Analytics.trackEvent('Twitter','Get','APIOver',cnt++);
	}
}

Ti.App.addEventListener("resumed", function(){
    Ti.API.info("notification canceld");
    Ti.App.iOS.cancelAllLocalNotifications();
    if(service!=null){
		service.stop();
		service.unregister();
	}
	init();
    Ti.UI.iPhone.appBadge = null;
	Ti.App.Analytics.trackEvent('TwitterID','Setting','Name',twtf.value==null?0:1);
	Ti.App.Analytics.trackEvent('Notification','Setting',notifyTab.labels[notifyTab.index],notifyTab.index);
	//Ti.App.Analytics.trackEvent('Skin','Setting','Blue',0);
});


var service;
Ti.App.addEventListener('pause',function(e){
	Ti.App.Properties.setString('twid', tw.id);
	Ti.API.info("app was paused from the foreground");
	service = Ti.App.iOS.registerBackgroundService({url:'bg.js'});
	Ti.API.info("registered background service = "+service);
});