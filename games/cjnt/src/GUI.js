GUI = function(e) {
    this.game = e;
    Phaser.Group.call(this, e);
    this.fixedToCamera = true;
    this.callPause = new Phaser.Signal;
    this.callResume = new Phaser.Signal;
    this.callRestart = new Phaser.Signal;
    this.tutorial = this.game.add.group();
    this.tutorial.x += scaleValue(20);
    this.add(this.tutorial);
    var t = this.tutorial.create(scaleValue(50), scaleValue(100), "sprites", "Tutor");
    var n = {
        font: scaleValue(26) + "px Arial",
        fill: 0,
        align: "left"
    };
    var r = this.game.add.text(scaleValue(80), scaleValue(230), GetPlatformAction(this.game.device.desktop, lang), n, this.tutorial);
    var i = this.game.add.text(scaleValue(160), scaleValue(140), GetPlatformAction(this.game.device.desktop, lang), n, this.tutorial);
    this.init_inGameUI();
    this.init_gameOver()
};
GUI.prototype = Object.create(Phaser.Group.prototype);
GUI.prototype.constructor = GUI;
var p = GUI.prototype;
p.init_inGameUI = function() {
    var e = {
        font: "Bold " + scaleValue(26) + "px Arial",
        fill: 0,
        align: "right"
    };
    this.labelScore = this.game.add.text(scaleValue(310), scaleValue(10), "0", e, this);
    this.labelScore.anchor.set(1, 0)
};
p.init_pauseMenu = function() {
    // updateShare(0);
    this.pauseBack = this.game.add.graphics(0, 0);
    this.add(this.pauseBack);
    this.pauseBack.beginFill(16777215, .7);
    this.pauseBack.drawRect(0, 0, this.game.width, this.game.height);
    this.pauseBack.endFill();
    this.pauseButtonResume = new PopButton(this.game, this.game.width / 2, this.game.height / 2, "sprites", "buttonPlay", this);
    this.pauseButtonResume.events.onInputUp.add(this.hidePause, this);
    this.pauseButtonMore = new PopButton(this.game, this.game.width / 2 - scaleValue(80), this.game.height / 2, "sprites", "buttonMore", this);
    this.pauseButtonMore.events.onInputUp.add(this.gotoSite, this);
    this.pauseButtonSound = new PopButton(this.game, this.game.width / 2 + scaleValue(80), this.game.height / 2, "sprites", "buttonSoundOn", this);
    this.pauseButtonSound.events.onInputUp.add(this.switchSound, this);
    if (JSON.parse(localStorage["Jumper.sound"])) {
        this.pauseButtonSound.loadTexture("sprites", "buttonSoundOn")
    } else {
        this.pauseButtonSound.loadTexture("sprites", "buttonSoundOff")
    }
    this.pauseBack.visible = false;
    this.pauseButtonMore.visible = false;
    this.pauseButtonResume.visible = false;
    this.pauseButtonSound.visible = false
};
p.init_gameOver = function() {
    this.overBack = this.game.add.graphics(0, 0);
    this.add(this.overBack);
    this.overBack.beginFill(16777215);
    this.overBack.drawRect(0, 0, this.game.width, this.game.height);
    this.overBack.endFill();
    var e = {
        font: "Bold " + scaleValue(36) + "px Arial",
        fill: 0,
        align: "center"
    };
    this.labelGameOver = this.game.add.text(this.game.width / 2, scaleValue(60), Lang[lang][0], e, this);
    this.labelGameOver.anchor.set(.5, 0);
    this.overBorder = this.create(this.game.width / 2, scaleValue(110), "sprites", "gameOverBorder");
    this.overBorder.anchor.set(.5, 0);
    this.medal = this.create(scaleValue(178), scaleValue(151));
    this.medal.scale.set(1.1, 1.1);
    var t = {
        font: scaleValue(18) + "px Arial",
        fill: 0,
        align: "left"
    };
    var n = {
        font: "Bold " + scaleValue(18) + "px Arial",
        fill: 0,
        align: "left"
    };
    this.labelResult = this.game.add.text(scaleValue(70), scaleValue(125), Lang[lang][1], t, this);
    this.labelResultValue = this.game.add.text(scaleValue(70), this.labelResult.y + scaleValue(22), "0", n, this);
    this.labelBest = this.game.add.text(scaleValue(70), scaleValue(176), Lang[lang][2], t, this);
    this.labelBestValue = this.game.add.text(scaleValue(70), this.labelBest.y + scaleValue(22), "0", n, this);
    this.labelReward = this.game.add.text(scaleValue(211), scaleValue(125), Lang[lang][3], t, this);
    this.labelReward.anchor.set(.5, 0);
    this.backRecord = this.create(0, this.labelBestValue.y, "sprites", "New");
    var r = {
        font: scaleValue(12) + "px Arial",
        fill: "#ffffff",
        align: "left"
    };
    this.recordLabel = this.game.add.text(0, 0, Lang[lang][7], r, this);
    this.buttonAgain = new ColorButton(this.game, this.game.width / 2, scaleValue(270), scaleValue(180), scaleValue(40), scaleValue(20), "#5acf63", this, Lang[lang][4]);
    this.buttonShare = new ColorButton(this.game, this.game.width / 2, scaleValue(320), scaleValue(180), scaleValue(40), scaleValue(20), "#4198de", this, Lang[lang][5]);
    this.buttonMore = new ColorButton(this.game, this.game.width / 2, scaleValue(370), scaleValue(180), scaleValue(40), scaleValue(20), "#9f53d6", this, Lang[lang][6]);
    this.buttonAgain.events.onInputUp.add(this.callRestart.dispatch, this);
    this.overBorder.visible = false;
    this.overBack.visible = false;
    this.labelGameOver.visible = false;
    this.labelReward.visible = false;
    this.labelResult.visible = false;
    this.labelResultValue.visible = false;
    this.labelBest.visible = false;
    this.labelBestValue.visible = false;
    this.buttonAgain.visible = false;
    this.buttonShare.visible = false;
    this.buttonMore.visible = false;
    this.medal.visible = false;
    this.backRecord.visible = false;
    this.recordLabel.visible = false
};
p.hideTutorial = function() {
    var e = this.game.add.tween(this.tutorial);
    e.onComplete.add(function() {
        this.destroy(true)
    }, this.tutorial);
    e.to({
        alpha: 0
    }, 500, Phaser.Easing.Linear.None, true)
};
p.setScore = function(e) {
    this.labelScore.setText(e)
};
p.showPause = function() {
    this.callPause.dispatch();
    this.pauseBack.visible = true;
    this.pauseButtonMore.visible = true;
    this.pauseButtonResume.visible = true;
    this.pauseButtonSound.visible = true
};
p.hidePause = function() {
    this.callResume.dispatch();
    this.pauseBack.visible = false;
    this.pauseButtonMore.visible = false;
    this.pauseButtonResume.visible = false;
    this.pauseButtonSound.visible = false
};
p.showGameOver = function(e) {
    this.overBorder.visible = true;
    this.overBack.visible = true;
    this.labelGameOver.visible = true;
    this.labelReward.visible = true;
    this.labelResult.visible = true;
    this.labelResultValue.visible = true;
    this.labelBest.visible = true;
    this.labelBestValue.visible = true;
    this.buttonAgain.visible = true;
    this.buttonShare.visible = true;
    this.buttonMore.visible = true;
    this.medal.visible = true;
    var t = JSON.parse(localStorage["Jumper.bestScore"]);
    if (e > t) {
        t = e;
        localStorage["Jumper.bestScore"] = e
    }
    this.labelBestValue.setText(t);
    this.labelResultValue.setText(e);
    window.myPlayScore = e;
    // Play68.setRankingScoreDesc(window.myPlayScore);
    // updateShare(e)
};
p.switchSound = function() {
    var e = JSON.parse(localStorage["Jumper.sound"]);
    e = !e;
    if (e) {
        this.pauseButtonSound.loadTexture("sprites", "buttonSoundOn")
    } else {
        this.pauseButtonSound.loadTexture("sprites", "buttonSoundOff")
    }
    localStorage["Jumper.sound"] = e;
    this.game.sndManager.switchSound(e)
};
p.gotoSite = function() {
    clickMore()
};
PopButton = function(e, t, n, r, i, s) {
    Phaser.Sprite.call(this, e, t, n, r, i);
    e.add.existing(this);
    s.add(this);
    this.anchor.set(.5, .5);
    this.inputEnabled = true;
    this.events.onInputDown.add(function() {
        this.scale.set(1.1, 1.1)
    }, this);
    this.events.onInputUp.add(function() {
        this.scale.set(1, 1);
        this.game.sndManager.playButton()
    }, this)
};
PopButton.prototype = Object.create(Phaser.Sprite.prototype);
PopButton.prototype.constructor = PopButton;
var p = PopButton.prototype;
ColorButton = function(e, t, n, r, i, s, o, u, a) {
    Phaser.Sprite.call(this, e, t, n);
    e.add.existing(this);
    u.add(this);
    this.anchor.set(.5, .5);
    renderGroup = this.game.add.group();
    texture = this.game.add.renderTexture(r, i, "button_" + a);
    var t = 0;
    var n = 0;
    var f = r;
    var l = i;
    var c = s;
    var h = this.game.add.bitmapData(f, l);
    h.context.beginPath();
    h.context.moveTo(t + c, n);
    h.context.arcTo(t + f, n, t + f, n + l, c);
    h.context.arcTo(t + f, n + l, t, n + l, c);
    h.context.arcTo(t, n + l, t, n, c);
    h.context.arcTo(t, n, t + f, n, c);
    h.context.closePath();
    h.context.fillStyle = o;
    h.context.fill();
    var p = renderGroup.create(0, 0, h);
    p.anchor.set(.5, .5);
    var d = {
        font: "Bold " + scaleValue(22) + "px Arial",
        fill: "#ffffff",
        align: "center"
    };
    var v = this.game.add.text(0, 0, a, d, renderGroup);
    v.anchor.set(.5, .5);
    texture.renderXY(renderGroup, renderGroup.width / 2, renderGroup.height / 2);
    renderGroup.destroy(true);
    this.loadTexture(texture);
    this.inputEnabled = true;
    this.events.onInputDown.add(function() {
        this.scale.set(1.1, 1.1)
    }, this);
    this.events.onInputUp.add(function() {
        this.scale.set(1, 1);
        this.game.sndManager.playButton()
    }, this)
};
ColorButton.prototype = Object.create(Phaser.Sprite.prototype);
ColorButton.prototype.constructor = ColorButton;
var p = ColorButton.prototype