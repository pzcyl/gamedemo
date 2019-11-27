var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();  
        var self = this;

        var txt = cc.createSprite('@第1小时', {
            anchor: [0.5, 1.0],
            xy: [140, 1200],
            color: 'black',
            fontSize: 34
        });
        this.addChild(txt);
        this.hour = 1;

        var layer = cc.LayerColor.create(cc.color('rgba(255,255,255,255)'));
        layer.attr({
            'zOrder': 10,
            'xy' : [300, 1005]
        });
        this.addChild(layer);

        var fishman = cc.createSprite(res.fishman_png, {
            xy: [240, 1000],

        });

        this.addChild(fishman);

        var rope = cc.createSprite(res.rope_png, {
            anchor: [0.5, 1.0],
            xy: [370, 1000]
        });
        this.addChild(rope);

        var hook = cc.createSprite(res.hook_png, {
            xy: [0, 0]
        });
        rope.addChild(hook);
        this.hook = hook;

        this.bornFish(5);

        this.delegate(this, 'click', function(){
            self.undelegate(self);
            console.log(1);
            rope.moveBy(7.5, cc.p(0, 850)).then(function(){
                self.gameOver();
            }).act();
        });

        var max = 5,t = 0;
        setInterval(function(){
            self.bornFish(cc.random(1, max));
            if(++t%10 == 0){
                max = (++max - 3) % 10 + 3;
                if(t%2 == 0){
                    self.hour++;
                    txt.setString('第'+self.hour+'小时');
                }
            }
        }, 1500);
        this.score = 0;
        return true;
    },
    gameOver: function(){
        var self = this;

        this.isGameOver = true;

        var layerMask = cc.LayerColor.create(cc.color('rgba(0,0,0,128)'));
        layerMask.attr({
            zOrder: 88,
            opacity: 0
        });
        self.addChild(layerMask); 
        var text ="";
        if(self.score <= 0){
            text = '蹲了'+self.hour+'个多小时，腿都麻了，我连半条鱼都木有调到';
        }else{
            text = '经过'+self.hour+'个多小时的蹲点，我成功的钓到了'+self.score+'条小鱼儿';
        }

        layerMask.delay(0.5).then(function(){
            layerMask.attr('opacity', 128);
            var share = cc.createSprite(res.share_png, {
                anchor: [1.0, 1.0],
                xy: [720, 1280],
                opacity: 0,
                scale: 0.5
            });
            layerMask.addChild(share);     

            share.fadeIn(0.5).act();
            self.delegate(layerMask, 'click', function(){
                layerMask.fadeOut(0.5).then(function(){
                    self.getParent().reload();
                }).act();
            }); 

            var result = cc.createSprite('@'+text, {
                xy: [360, 720],
                fontSize: 46,
                size: [700, 300],
                textAlign: 'center'
            });
            layerMask.addChild(result);     

            var again = cc.createSprite('@再玩一次', {
                xy: [360, 420],
                fontSize: 46,
                size: [700, 300],
                textAlign: 'center'
            });
            layerMask.addChild(again);       

        }).act();
    },
    bornFish: function(n){
        var self = this;
        for(var i = 0; i < n; i++){
            var flippedX = cc.random([0, 180]);
            var speedX = flippedX == 180 ? -cc.random(20, 100) : cc.random(20, 100);
            console.log(flippedX);
            var fish = cc.createSprite(res.fish_png, {
                xy: [flippedX == 180 ? -40 : 760, cc.random(150, 850)],
                flippedX: [flippedX]
            });
            this.addChild(fish);

            (function(fish){
                var fishTimer = setInterval(function(){
                    var box = self.hook.getBoundingBoxToWorld();
                    var fbox = fish.getBoundingBoxToWorld(); 
                    if(cc.rectIntersectsRect(box, fbox)){
                        clearInterval(fishTimer);
                        fish.stopAllActions();
                        fish.removeFromParent(false);
                        self.hook.addChild(fish);
                        console.log(2);
                        fish.attr({
                            'xy': [0, 0],
                            flippedX: 0
                        });
                        fish.setRotationX=90;
                        self.score++;
                    }
                }, 20);
                fish.moveBy(860 / Math.abs(speedX), cc.p(flippedX == 180 ? 860 : -860, 0)).then(function(){
                    clearInterval(fishTimer);
                    fish.removeFromParent(true);
                }).act();
            })(fish);
        }
    },
    backClicked: function(){
    	//cc.log('end');
    	cc.director.end();
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

