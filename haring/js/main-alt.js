var select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }, 
  animHolderBeam = select('#animHolderBeam'),    
    animDataBeam = {
		wrapper: animHolderBeam,
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: 'anim/beam.json'
	},
    animHolderUfo = select('#animHolderUfo'),    
    animDataUfo = {
		wrapper: animHolderUfo,
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: 'anim/ufo.json'
	},
    animHolderDog = select('#animHolderDog'),    
    animDataDog = {
		wrapper: animHolderDog,
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: 'anim/dog.json'
	},
    animHolderHeart = select('#animHolderHeart'),    
    animDataHeart = {
		wrapper: animHolderHeart,
		animType: 'svg',
		loop: true,
		prerender: true,
		autoplay: true,
		path: 'anim/heart.json'
	},
    animHolderBoombox = select('#animHolderBoombox'),    
    animDataBoombox = {
		wrapper: animHolderBoombox,
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: 'anim/boombox.json'
	},
    animBeam, 
    animUfo,
    animDog,
    animHeart,
    animBoombox,
    tlUfoComp,
    tlUfo,
    tlDog,
    tlBeam,
    tlHeart,
    tlBoombox,
    tl;

// FRAMECOUNTS:
// dog: 292 ufo: 840 beam: 43 heart: 180 boombox: 249
// FPS: 30
// OFFSETS:
// beam: 43

 animBeam = bodymovin.loadAnimation(animDataBeam);
 animBeam.setSpeed(1);
 
 animUfo = bodymovin.loadAnimation(animDataUfo);
 animUfo.setSpeed(1);

 animDog = bodymovin.loadAnimation(animDataDog);
 animDog.addEventListener('DOMLoaded', function(){animDog.goToAndStop(1, true); console.log("dog")});


 animDog.setSpeed(1);

 animHeart = bodymovin.loadAnimation(animDataHeart);
 animHeart.setSpeed(1);

 animBoombox = bodymovin.loadAnimation(animDataBoombox);
 animBoombox.setSpeed(1);

/*
$('#pause').click( function() {
		animBoombox.pause();
        tlUfoComp.pause();
});
	
$('#play').click( function() {
		animBoombox.play();
    tlUfoComp.play();
});
	
$('#forward').click( function() {
		animBoombox.setDirection(1);
});
	
$('#reverse').click( function() {
		animBoombox.setDirection(-1);
});

$('#framecount').click ( function() {
    document.getElementById("outputText").value = "dog: " + animDog.totalFrames + " ufo: " + animUfo.totalFrames + " beam: " + animBeam.totalFrames + " heart: " + animHeart.totalFrames + " boombox: " + animBoombox.totalFrames; 
});*/

document.addEventListener('DOMContentLoaded', onDOMLoaded);


function onDOMLoaded(e){
 //var svg = selectAll('svg')[0];
 //svg.setAttribute('class', 'tick');
    tlUfo = new TimelineMax({});
    tlUfo.to({frame:0}, 300/30, { 
        // originally had 840 frames
        // truncating to 300 because the rest are dead frames
        frame:300,                  
        ease:Linear.easeNone,
        onUpdate: function(){
            animUfo.goToAndStop(Math.round(this.target.frame), true);      //document.getElementById("outputText").value = "ufo: " + animUfo.currentFrame;
        },
        /*onStart: function () {
            console.log("start");
        },
        onComplete: function () {
            console.log("complete");
        },
        onReverseComplete: function () {
            console.log("reverse complete");
        }*/
    });
    tlBeam = new TimelineMax({});
    tlBeam.to({frame:0}, 43/30, {
        frame:43,
        ease:Linear.easeNone,
        onUpdate: function(){
            animBeam.goToAndStop(Math.round(this.target.frame), true);
        }
    });
    tlDog = new TimelineMax({});
    tlDog.to({frame:1}, 292/30, {
        frame:292,
        ease:Linear.easeNone,
        onUpdate: function(){
            animDog.goToAndStop(Math.round(this.target.frame), true);
        }
    });
    
    tlUfoComp = new TimelineMax({}); // can't be looping or paused to controll with ScrollMagic
    tlUfoComp.add("startLabel", "+=0")
    tlUfoComp.add(tlUfo, 0);
    tlUfoComp.add(tlDog, 0);
    tlUfoComp.add(tlBeam, 75/30);
    tlUfoComp.add(new TweenMax.from("#animHolderBeam", 0.01, {autoAlpha:0}), 75/30);
    tlUfoComp.add(new TweenMax.from("#animHolderBeam", 43/30, {y:"-=25%", ease:Linear.easeNone}), 75/30);
    tlUfoComp.add(new TweenMax.to("#animHolderBeam", 0.01, {autoAlpha:0}), (75+50)/30);
    //tlUfoComp.add(new TweenMax.to("#animCompHolderUfo", 28, {autoAlpha:0}), 0);
    
    /*
    tlHeart = new TimelineMax({});
    tlHeart.to({frame:0}, 180/30, {
        frame:180,
        ease:Linear.easeNone,
        onUpdate: function(){
            animHeart.goToAndStop(Math.round(this.target.frame), true);
        }
    });
    */
    
    tlBoombox = new TimelineMax({});
    tlBoombox.to({frame:0}, 249/30, {
        frame:249,
        ease:Linear.easeNone,
        onUpdate: function(){
            animBoombox.goToAndStop(Math.round(this.target.frame), true);
        }
    });

    
    var controller = new ScrollMagic.Controller();

    
    
    var scene = new ScrollMagic.Scene({
        triggerElement: '#animCompHolderUfo', // starting scene, when reaching this element
        triggerHook: 'onLeave',
        offset: document.getElementById('animCompHolderUfo').clientHeight * -0.15,
        //duration: document.getElementById('animCompHolderUfo').clientHeight
    }); 
        
    // Add Scene to ScrollMagic Controller
    scene.setTween(tlUfoComp);
    scene.addTo(controller);
    scene.addIndicators();

    /*
    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#animHolderHeart',
        offset: -200,
        //duration: "100%"
    })

    scene2.setTween(tlHeart);
    scene2.addTo(controller);
    scene2.addIndicators();
    */
    
    var scene3 = new ScrollMagic.Scene({
        triggerElement: '#animCompHolderBoombox',

        //offset: -200,
        //duration: "100%"
    })

    scene3.setTween(tlBoombox);
    scene3.addTo(controller);
    scene3.addIndicators();
}
