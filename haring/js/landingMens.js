var select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }, 

    animHolderWerewolf = select('#animHolderWerewolf'),    
    animDataWerewolf = {
		wrapper: animHolderWerewolf,
		animType: 'svg',
		loop: true,
		prerender: true,
		autoplay: false,
		path: '../anim/men/wolf.json'
	},
    animHolderMonster = select('#animHolderMonster'),    
    animDataMonster = {
		wrapper: animHolderMonster,
		animType: 'svg',
		loop: true,
		prerender: true,
		autoplay: false,
		path: '../anim/men/monster.json'
	},
    animWerewolf,
    animMonster,
    tlMonster,
    tlBoombox,
    tl;

// FRAMECOUNTS:
// wolf: 249, monster: 304
// FPS: 30

 animWerewolf = bodymovin.loadAnimation(animDataWerewolf);
 animWerewolf.setSpeed(1);

 animMonster = bodymovin.loadAnimation(animDataMonster);
 animMonster.setSpeed(1);


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
    document.getElementById("outputText").value = "wolf: " + animWerewolf.totalFrames + " monster: " + animMonster.totalFrames; 
});*/

document.addEventListener('DOMContentLoaded', onDOMLoaded);


function onDOMLoaded(e){
    tlWerewolf = new TimelineMax({});
    tlWerewolf.to({frame:0}, 249/30, {
        frame:249,
        ease:Linear.easeNone,
        onUpdate: function(){
            animWerewolf.goToAndStop(Math.round(this.target.frame), true);
               // document.getElementById("outputText").value = "wolf: " + animWerewolf.currentFrame; 

        }
    });
    
    tlMonster = new TimelineMax({});
    tlMonster.to({frame:0}, 304/30, {
        frame:304,
        ease:Linear.easeNone,
        onUpdate: function(){
            animMonster.goToAndStop(Math.round(this.target.frame), true);
        }
    });

    
    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
        triggerElement: '#animHolderWerewolf', // starting scene, when reaching this element
        offset: -240,
        triggerHook: 'onLeave',
        duration: "100%" // calculate relative to screen height
    }); // the element we want to pin
        
    // Add Scene to ScrollMagic Controller
    scene.setTween(tlWerewolf);
    scene.addTo(controller);
    scene.addIndicators();

    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#animHolderMonster',
        offset: -200,
        duration: "100%"
    })

    scene2.setTween(tlMonster);
    scene2.addTo(controller);
    scene2.addIndicators();
    
}

