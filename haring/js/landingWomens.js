var select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }, 

    animHolderHeartWomen = select('#animHolderHeartWomen'),    
    animDataHeartWomen = {
		wrapper: animHolderHeartWomen,
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: '../anim/women/heart.json'
	},
    animHolderTv = select('#animHolderTv'),    
    animDataTv = {
		wrapper: animHolderTv,
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: '../anim/women/tv.json'
	},
    animHeartWomen,
    animTv,
    tlTv,
    tlBoombox,
    tl;

// FRAMECOUNTS:
// heart: 180, tv: 304
// FPS: 30

 animHeartWomen = bodymovin.loadAnimation(animDataHeartWomen);
 animHeartWomen.setSpeed(1);

 animTv = bodymovin.loadAnimation(animDataTv);
 animTv.setSpeed(1);

/*$('#framecount').click ( function() {
    document.getElementById("outputText").value = "heart: " + animHeartWomen.totalFrames + " Tv: " + animTv.totalFrames; 
});*/

document.addEventListener('DOMContentLoaded', onDOMLoaded);


function onDOMLoaded(e){

    animHeartWomen.goToAndStop(1, true);
    tlHeartWomen = new TimelineMax({});
    tlHeartWomen.to({frame:1}, 180/30, {
        frame:180,
        ease:Linear.easeNone,
        onUpdate: function(){
            animHeartWomen.goToAndStop(Math.round(this.target.frame), true);
                //document.getElementById("outputText").value = "heart: " + animHeartWomen.currentFrame; 

        }
    });
    
    tlTv = new TimelineMax({});
    tlTv.to({frame:0}, 304/30, {
        frame:304,
        ease:Linear.easeNone,
        onUpdate: function(){
            animTv.goToAndStop(Math.round(this.target.frame), true);
        }
    });

    
    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
        triggerElement: '#animHolderHeartWomen', // starting scene, when reaching this element
        offset: -280,
        triggerHook: 'onLeave',
        duration: "90%" // calculate relative to screen height
    }); // the element we want to pin
        
    // Add Scene to ScrollMagic Controller
    scene.setTween(tlHeartWomen);
    scene.addTo(controller);
    scene.addIndicators();

    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#animHolderTv',
        offset: -200,
        duration: "100%"
    })

    scene2.setTween(tlTv);
    scene2.addTo(controller);
    scene2.addIndicators();
    

    

    
 /*tl = new TimelineMax({repeat:-1});
 tl.to({frame:0}, 5, {
  frame:anim_dog.totalFrames-1,
  ease:Linear.easeNone,
  onUpdate:function(){  
   anim_dog.goToAndStop(Math.round(this.target.frame), true);
animUfo.goToAndStop(Math.round(this.target.frame), true);
  }
 })
 .to(svg, 0.6, {
  alpha:0,
  ease:Sine.easeIn
 })*/
}

//ScrubBodymovinTimeline(anim)