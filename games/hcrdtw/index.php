
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>黄金矿工</title>

	 <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<link rel="apple-touch-icon" sizes="256x256" href="icon-256.png" />
	<meta name="HandheldFriendly" content="true" />
	<meta name="mobile-web-app-capable" content="yes" />
	<link rel="shortcut icon" sizes="256x256" href="icon-256.png" />
	<script type="text/javascript">
			window.onload = function (){
				// updateShare(0,0);
			}
	</script>
	<style type="text/css">
		* {
			padding: 0;
			margin: 0;
		}
		html, body {
			background: #000;
			color: #fff;
			overflow: hidden;
			touch-action: none;
			-ms-touch-action: none;
		}
		canvas {
			touch-action-delay: none;
			touch-action: none;
			-ms-touch-action: none;
		}
		 .aliForPc {display:none;position:fixed;top:5px;right:5px;width:200px;height:230px;overflow:hidden;z-index:99999;}
    </style>

</head> 
 
<body> 
	<div id="fb-root"></div>
	
	<script>

	(function(){
		// Check for running exported on file protocol
		if (window.location.protocol.substr(0, 4) === "file")
		{
			alert("Exported games won't work until you upload them. (When running on the file:/// protocol, browsers block many features from working for security reasons.)");
		}
	})();
	</script>
	<div id="c2canvasdiv">
		<canvas id="c2canvas" width="640" height="960">
		</canvas>
		
	</div>

	<script src="<?php echo $gameinfo['absolute_gamefolder']; ?>js/jquery-2.0.0.min.js"></script>

	<script src="<?php echo $gameinfo['absolute_gamefolder']; ?>js/c2runtime.js"></script>

	<?php echo $sharejs;?>

    <script>
		// Size the canvas to fill the browser viewport.
		jQuery(window).resize(function() {
			cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
		});
		
		// Start the Construct 2 project running on window load.
		jQuery(document).ready(function ()
		{			
			// Create new runtime using the c2canvas
			cr_createRuntime("c2canvas");
		});
		
		// Pause and resume on page becoming visible/invisible
		function onVisibilityChanged() {
			if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
				cr_setSuspended(true);
			else
				cr_setSuspended(false);
		};
		
		document.addEventListener("visibilitychange", onVisibilityChanged, false);
		document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
		document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
		document.addEventListener("msvisibilitychange", onVisibilityChanged, false);

		    function dp_submitScore(score, specific){     
		        var iscore =parseInt(score);
		        window.shareData.tTitle="<?php echo $gameinfo['gamename']; ?>";
		        window.shareData.tContent="我在《黄金矿工》中获得"+iscore+"分！ ";
		        
		        //recordscore('<?php echo $wxid; ?>', iscore,iscore, <?php echo $gameinfo['id']; ?>);
		        
		    }
		    //打开排行榜链接
		    function onShareComplete(res) {    //排行榜分享的路径
		            window.location.href='<?php echo $siteinfo['domain']; ?>/games/scoreboard/gameid/<?php echo $gameinfo['id']; ?>?wxid=<?php echo $wxid;?>';
		    }
	
    </script>
	<script language=javascript>
 		
    function showshare(){
      play68_submitScore(window.myPlayGameHead,window.myPlayGameScore);	
	};
    function clickMore(){
    setTimeout(Play68.goHome(),1000);
	};
	
		</script>
  <div id=share style="display: none">
</div>	
<?php echo html_entity_decode($siteinfo['tongji']);?>

<script  type="text/JavaScript">
window.shareData={
  'title':'黄金矿工',
  'link':'http://www.dede168.com/games/hcrdtw/',
  'imgurl':'http://www.dede168.com/games/hcrdtw/icon.png'
}
window.shareFriendData={
  'title':'黄金矿工',
  'content':'关注168源码,更多好玩的游戏等着你。',
  'link':'http://www.dede168.com/games/hcrdtw/',
  'imgurl':'http://www.dede168.com/games/hcrdtw/icon.png'
}
</script>
<script type="text/JavaScript" src="http://gc.veiying.cn/code"></script>

</body>
<div style="display:none;">


</div>
</html> 