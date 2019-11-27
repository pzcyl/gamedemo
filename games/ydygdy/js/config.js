function play68_init() {
	updateShare(0);
}

function play68_submitScore(score) {
	updateShareScore(score);
	Play68.shareFriend(); 
}

function updateShare(bestScore) {
	
	var descContent = "有多远滚多远";
	switch(true){
		case bestScore > 1500 :
			shareTitle = "我滚了" + bestScore + "米，滚到人生巅峰，已载入史册！";
			break;
		case bestScore > 1200 :
			shareTitle = "我滚了" + bestScore + "米，下一站火星！";
			break;
		case bestScore > 900 :
			shareTitle = "我滚了" + bestScore + "米，我已经化为一颗小星星远去了！";
			break;
		case bestScore > 700 :
			shareTitle = "我滚了" + bestScore + "米，这是要拜托地球引力的节奏！";
			break;
		case bestScore > 500 :
			shareTitle = "我滚了" + bestScore + "米，滚出了自己的风格！";
			break;
		case bestScore > 300 :
			shareTitle = "我滚了" + bestScore + "米，滚得精彩！";
			break;
		case bestScore > 100 :
			shareTitle = "我滚了" + bestScore + "米，请问终点在哪里？";
			break;
		case bestScore > 0 :
			shareTitle = "我滚了" + bestScore + "米，手一抖就撞墙了！不要问我头疼不疼！";
			break;
		default: shareTitle = "你说有多远滚多远，就别叫我回来，因为我已经滚得太远了...";
	}
	appid = '';
	Play68.setShareInfo(shareTitle,descContent);
}

function updateShareScore(bestScore) {
	updateShare(bestScore);
}