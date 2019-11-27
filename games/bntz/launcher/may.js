/**
 * Created by May on 2015/4/22.
 */
// create a namespace for the application
this.may = this.may || {};

// this is a function closure
(function () {
    // the application
    function SoundCtrl() {
        //this.init();
    }

    SoundCtrl.prototype = {

        assetsPath:"resource/assets/",          // assets path prefix

        data:[
            {
                src: "music.mp3",
                data:
                {
                    channels: 5,
                    audioSprite:
                        [
                            {id: "m0", startTime: 0, duration: 12450},
                            {id: "m1", startTime: 12650, duration: 12730},
                            {id: "m2", startTime: 25250, duration: 13150}
                        ]
                }
            }
        ],

        //38400;

        loadedCallback:null,
        loadedScope:null,
        loaded:false,
        instancePool:[],
        enableIt:true,

        startLoad: function(loadedCallback, loadedScope){

            if(createjs.BrowserDetect.isAndroid)
            {
                this.enableIt = false;
                this.loaded = true;
                return;
            }

            createjs.Sound.initializeDefaultPlugins();
            this.loadedCallback = loadedCallback;
            this.loadedScope = loadedScope;

            createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.onLoaded, this)); // add event listener for when load is completed.
            createjs.Sound.registerSounds(this.data, this.assetsPath);  // register sounds, which preloads by default
        },

        // play a sound inside
        onLoaded: function (event) {
            createjs.Sound.removeEventListener("fileload", this.onLoaded);

            this.loaded = true;
            if(this.loadedScope)
                this.loadedCallback.call(this.loadedScope);
        },

        /**
         * 自动根据当前的分值来决定播放哪一首背景音乐
         */
        launchSound: function () {
            if(!this.enableIt)   return;

            var t = 0;
            for(var i = 0; i < Status.soundGrading.length; i++)
                if(Status.score >= Status.soundGrading[i])
                    t ++;
            //console.log("we should play: " + t);

            var snd = createjs.Sound.createInstance("m" + t);
            this.instancePool.push(snd);
            snd.addEventListener("complete", createjs.proxy(this.soundPlayed, this));
            snd.play();

            //if(createjs.BrowserDetect.isIOS)
            egret.Tween.get(this, {override:true}).wait(snd.getDuration() - 200).call(this.launchSound, this);
        },

        soundPlayed: function(evt){
            var snd = evt.target;
            snd.removeAllEventListeners();
            snd.destroy();
            this.instancePool.splice(this.instancePool.indexOf(snd), 1);
            /*
            if(!createjs.BrowserDetect.isIOS)
                this.launchSound();
                */
        },

        /**
         * 暂停全部音乐的播放
         */
        pause:function()
        {
            for(var i = 0; i < this.instancePool.length; i++)
                this.instancePool[i].paused = true;
        },

        /**
         * 恢复全部音乐的播放
         */
        resume:function()
        {
            for(var i = 0; i < this.instancePool.length; i++)
                this.instancePool[i].paused = false;
        },

        dispose:function()
        {
            //Done: stop all sound instance
            while(this.instancePool.length)
            {
                var snd = this.instancePool.pop();
                snd.stop();
                snd.removeAllEventListeners();
                snd.destroy();
            }
        }
    };

    // add MyApp to myNameSpace
    may.SoundCtrl = SoundCtrl;
}());