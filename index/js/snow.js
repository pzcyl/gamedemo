jQuery(function ($) {

    var element = $('<div />').addClass('snow'),
        elementWidth = null,
        elementHeight = null,
        uAgent = navigator.userAgent.toLowerCase();


    if (uAgent.match(/Android/i) || uAgent.match(/webOS/i) || uAgent.match(/iPhone/i) || uAgent.match(/iPad/i) || uAgent.match(/iPod/i) || uAgent.match(/BlackBerry/i) || uAgent.match(/Windows Phone/i)) {
        return;
    } else {
        element.appendTo('body');

        elementWidth = $(window).width() - 50,
        elementHeight = $(window).height();

        element.css({
            'width': elementWidth,
            'height': elementHeight,
            'position': 'fixed',
            'left': '0',
            'top': '0',
            'z-index': '1000',
            'pointer-events': 'none'
        });
    }

    var SCREEN_WIDTH = elementWidth,
        SCREEN_HEIGHT = elementHeight,
        container,
        particle,
        camera,
        scene,
        renderer,
        mouseX = 0,
        mouseY = 0,
        windowHalfX = elementWidth / 2,
        windowHalfY = elementHeight / 2,
        particles = [],
        particleImage = new Image(),
        TO_RADIANS = Math.PI / 150;

    Particle3D = function (material) {
        THREE.Particle.call(this, material);

        this.velocity = new THREE.Vector3(0, -8, 0);
        this.velocity.rotateX(randomRange(-45, 45));
        this.velocity.rotateY(randomRange(0, 360));
        this.gravity = new THREE.Vector3(0, 0, 0);
        this.drag = 1;

    };

    Particle3D.prototype = new THREE.Particle();
    Particle3D.prototype.constructor = Particle3D;

    Particle3D.prototype.updatePhysics = function () {
        this.velocity.multiplyScalar(this.drag);
        this.velocity.addSelf(this.gravity);
        this.position.addSelf(this.velocity);
    };

    THREE.Vector3.prototype.rotateY = function (angle) {
        cosRY = Math.cos(angle * TO_RADIANS);
        sinRY = Math.sin(angle * TO_RADIANS);

        var tempz = this.z;;
        var tempx = this.x;

        this.x = (tempx * cosRY) + (tempz * sinRY);
        this.z = (tempx * -sinRY) + (tempz * cosRY);
    };

    THREE.Vector3.prototype.rotateX = function (angle) {
        cosRY = Math.cos(angle * TO_RADIANS);
        sinRY = Math.sin(angle * TO_RADIANS);

        var tempz = this.z;;
        var tempy = this.y;

        this.y = (tempy * cosRY) + (tempz * sinRY);
        this.z = (tempy * -sinRY) + (tempz * cosRY);
    };

    THREE.Vector3.prototype.rotateZ = function (angle) {
        cosRY = Math.cos(angle * TO_RADIANS);
        sinRY = Math.sin(angle * TO_RADIANS);

        var tempx = this.x;;
        var tempy = this.y;

        this.y = (tempy * cosRY) + (tempx * sinRY);
        this.x = (tempy * -sinRY) + (tempx * cosRY);
    };

    function randomRange(min, max) {
        return ((Math.random() * (max - min)) + min);
    };

    particleImage.src = 'http://img1.cache.netease.com/game/blizzard/images/snowflake.png';

    function init() {

        camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        camera.position.z = 1000;

        scene = new THREE.Scene();
        scene.add(camera);

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        var material = new THREE.ParticleBasicMaterial({ map: new THREE.Texture(particleImage) });

        for (var i = 0; i < 100; i++) {

            particle = new Particle3D(material);
            particle.position.x = Math.random() * 2000 - 1000;
            particle.position.y = Math.random() * 2000 - 1000;
            particle.position.z = Math.random() * 2000 - 1000;
            particle.scale.x = particle.scale.y = 1;
            scene.add(particle);

            particles.push(particle);
        };

        element.append(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);

        setInterval(loop, 1000 / 20);

    };

    function onDocumentMouseMove(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    };

    function onDocumentTouchStart(event) {

        if (event.touches.length == 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        };
    };

    function onDocumentTouchMove(event) {

        if (event.touches.length == 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    };

    function loop() {

        for (var i = 0; i < particles.length; i++) {

            var particle = particles[i];
            particle.updatePhysics();

            with (particle.position) {
                if (y < -1000) y += 2000;
                if (x > 1000) x -= 2000;
                else if (x < -1000) x += 2000;
                if (z > 1000) z -= 2000;
                else if (z < -1000) z += 2000;
            }
        };

        camera.position.x += (mouseX - camera.position.x) * 0.008;
        camera.position.y += (-mouseY - camera.position.y) * 0.008;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);

    };

    init();
})