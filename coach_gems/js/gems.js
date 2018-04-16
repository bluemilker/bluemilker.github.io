/*
The goal: create a certain number of dots, place them at random positions inside
of a circle, and then "explode" them on click (make them shoot outward), complete with
gravity and slightly randomized velocity. No canvas, just DOM elements.

To optimize performance, we put the animation into a timeline so that we can restart()
anytime rather than recreating all the dots and animations on each click. To provide more
flexibility, we create a few timelines (you decide how many with the explosionQuantity
variable) and cycle between them, thus delivering more variety. 

You can call explode(yourElement) and pass in any element, and it'll center an explosion 
on that particular element.
*/

//the following variables make things configurable. Play around. 
var dotQuantity = 80,
    //dotSizeMin = 40,
    //dotSizeMax = 70,
    speed = 1,
    gravity = 1.5,
    explosionQuantity = 3;

//the explosion array will store data for each explosion: the container element which we create, and the TimelineLite instance (the animation). That way, we can position the explosion whereve we want, and control the entire animation, like restart(), pause(), reverse(), whatever.
var explosions = [],
    currentExplosion = 0, //index number in the array corresponding to the current explosion. We'll increment it each time we play one.
    container, i;
for (i = 0; i < explosionQuantity; i++) {
    container = document.createElement("div");
    container.style.cssText = "position:absolute; left:0; top:0; width:100%; height:100%; overflow:hidden; z-index:5000; pointer-events:none; border: 0px solid red";
    document.body.appendChild(container);
    explosions.push({
        container: container,
        animation: createExplosion(container)
    });
}

//this function does all the magic, creating dots, dropping them into the container, setting their initial properties and animation, then ultimately returning a TimelineLite instance.
function createExplosion(container) {
    var tl = new TimelineLite({paused:true}),
        dots = [],
        angle, length, dot, i, size, randomVal;
//create all the dots
    for (i = 0; i < dotQuantity; i++) {
        dot = document.createElement("div");
        dots.push(dot);
        //size = getRandom(dotSizeMin, dotSizeMax);
        randomVal = Math.floor(getRandom(0,3));
        if (randomVal == 0) {
            dot.className = "gem_grey";
            size = 50;
        } else if (randomVal == 1) {
            dot.className = "gem_red";
            size = 50;
        } else {
            dot.className = "gem_greenpurple";  
            size = 80;
        }
        container.appendChild(dot);
        angle = Math.random() * Math.PI * 2; //random angle
        angle = Math.PI * 0.5;
        //figure out the maximum distance from the center, factoring in the size of the dot (it must never go outside the circle), and then pick a random spot along that length where we'll plot the point. 
        //length = Math.random() * (emitterSize / 2 - size / 2); 
        //place the dot at a random spot within the emitter, and set its size.
        TweenLite.set(dot, {
          //x:Math.cos(angle) * length, 
          //y:Math.sin(angle) * length, 
            x:Math.random() * container.clientWidth,
            y:-1 * size,
            width:size, 
            height:size, 
            xPercent:-50, 
            yPercent:-50,
            rotation:getRandom(0,360),
            visibility:"hidden",
            force3D:true
        });
        //this is where we do the animation...
        tl.to(dot, 2.5, {
            //opacity:0,
            delay: Math.random() * 1.5,
            visibility:"visible",
            //y:container.clientHeight * 1.2,
            rotation: "" + getRandom(-20,20),
            //ease: Power1.easeIn,
            ease: Linear.easeNone,
            physics2D:{
                angle:angle * 180 / Math.PI, //translate radians to degrees
                //angle: Math.PI * -1,
                //velocity:(100 + Math.random() * 300) * speed, //initial velocity
                velocity: 0,
                gravity:900 * gravity
            }
        }, 0);
    }
    tl.set(dots, {visibility:"hidden"}); //hide the dots at the end for improved performance (better than opacity:0 because the browser can ignore the elements)
    return tl;
}

//just pass in an element and it'll move the explosion container over its center and play the next explosion animation. 
function explode(element) {
    var bounds = element.getBoundingClientRect(),
        explosion;
    if (++currentExplosion === explosions.length) {
        currentExplosion = 0;
    }
    explosion = explosions[currentExplosion];
    //TweenLite.set(explosion.container, {x:bounds.left + bounds.width / 2, y:bounds.top + bounds.height / 2});
    explosion.animation.restart();
}

function getRandom(min, max) {
    return min + Math.random() * (max - min);
}

document.getElementById("gems").onclick = function() {explode(document.getElementById("gems"))};
