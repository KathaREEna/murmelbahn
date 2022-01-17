// Benedikt Groß

// setup wrap coordinates plugin
Matter.use('matter-wrap');

let ball;
let obstacle;
let slide;
let frameR = 60;
let frameCounter = 0;
let sekunden = 0;
let dauer = 3; //Zeit Sekunden
let interval1;
let interval2;
let countertestzahl = 0;
let alternate = 0;
let actualR = 255;
let actualG = 255;
let actualB = 255;
let newR = 255;
let newG = 255;
let newB = 255;

//sleepy animation
let sleepy = false;
let sleepyLoop = 100;
let sleepyPosition = 0;
let sleepyOffsetX = 30;
let sleepyOffsetY = 40;

//in love animation
let inLove = false;
let lovelyLoop = 100;
let lovelyBoundry = 60;
let lovelyPosition = 0;
let lovelyPositions; //Array welches für die einzelnen Positionen verwendet wird
let lovelyCount = 12;
let lovelySize = 20;
//let lovelyArea = 60;



function setup() {
  const canvas = createCanvas(1280, 720);

  // create an engine
  const engine = Matter.Engine.create();
  const world = engine.world;

  // config wrap area
  const wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };

  // create cirle, slide and obstacle
  marblin = new Ball(world,
    { x: 300, y: 540, r: 40, color: color(actualR,actualG,actualB) },
    { restitution: 0, plugin: { wrap: wrap } }
  );
  slide = new Block(world,
    { x: 400, y: 580, w: 800, h: 40, color: 'grey' },
    { isStatic: true, angle: 0 }
  );
  grenzeO = new Block(world,
    { x: 400, y: 0, w: 800, h: 40, color: 'grey' },
    { isStatic: true, angle: 0 }
  );
  grenzeR = new Block(world,
    { x: 800, y: 300, w: 20, h: 600, color: 'grey' },
    { isStatic: true, angle: 0 }
  );
  grenzeL = new Block(world,
    { x: 0, y: 300, w: 20, h: 600, color: 'grey' },
    { isStatic: true, angle: 0 }
  );
  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Engine.run(engine);
  frameRate(frameR);


  //setup hearts Array
  lovelyPositions = new Array(lovelyCount);
  for (var i = 0; i < lovelyPositions.length; i++) {
    lovelyPositions[i] = new Array(2);
  }
  for (var i = 0; i < lovelyCount; i++) {
    lovelyPositions[i][0] = floor(0 - (lovelyLoop / lovelyCount)*i);
    lovelyPositions[i][1] = random(lovelyBoundry, -1*lovelyBoundry);
  }
  console.log(lovelyPositions);

}





function draw() {
  background('black');

  marblin.draw();
  slide.draw();
  grenzeO.draw();
  grenzeR.draw();
  grenzeL.draw();
  mouse.draw();

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(29);
  text('TEST - GLaDOS', width/2, 50);


//SCHLAFEN
  if (sleepy) {
    fill(color(0,180,255));
    rectMode(CENTER);
    rect(marblin.body.position.x-30,marblin.body.position.y+15,200,50);
    rect(marblin.body.position.x-120,marblin.body.position.y,20,60);
    rect(marblin.body.position.x+60.5,marblin.body.position.y,20,80);

    let sleepyTransparency1 = map(sleepyPosition, 0, sleepyLoop, 0, 1255);
    let sleepyTransparency2 = map((sleepyPosition+sleepyLoop/3)%sleepyLoop, 0, sleepyLoop, 0, 1255);
    let sleepyTransparency3 = map((sleepyPosition+sleepyLoop/3*2)%sleepyLoop, 0, sleepyLoop, 0, 1255);
    let sleepyPosition2 = (sleepyPosition + sleepyLoop/3)%sleepyLoop;
    let sleepyPosition3 = (sleepyPosition + sleepyLoop/3*2)%sleepyLoop;

    fill(125,sleepyTransparency1);
    textSize((sleepyLoop-sleepyPosition)/2);
    text("Z", marblin.body.position.x+sleepyOffsetX+sleepyPosition, marblin.body.position.y-sleepyOffsetY-sleepyPosition);

    fill(125,sleepyTransparency2);
    textSize((sleepyLoop-sleepyPosition2)/2);
    text("Z", marblin.body.position.x+sleepyOffsetX+sleepyPosition2, marblin.body.position.y-sleepyOffsetY-sleepyPosition2);

    fill(125,sleepyTransparency3);
    textSize((sleepyLoop-sleepyPosition3)/2);
    text("Z", marblin.body.position.x+sleepyOffsetX+sleepyPosition3, marblin.body.position.y-sleepyOffsetY-sleepyPosition3);

    sleepyPosition = (sleepyPosition + 0.5) % sleepyLoop;
  }



//LIEBEN
  if (inLove) {

    for (var i = 0; i < lovelyCount; i++) {
      let lovelyTransparency = map(lovelyPositions[i][0], 0, lovelyLoop, 0, 1255)
      let lovelyTransparencyInverted = map(lovelyPositions[i][0], 0, lovelyLoop, 1255, 0)
      if (lovelyPositions[i][0] < (lovelyLoop/2)) {
        fill(255,192,203, lovelyTransparency);
      } else {
        fill(255,192,203, lovelyTransparencyInverted);
      }
      lovelyPositions[i][0] = (lovelyPositions[i][0] + 1) % lovelyLoop;

      if (lovelyPositions[i][0] == 0) {
        //lovelyOffsets
        lovelyPositions[i][1] = floor(random(lovelyBoundry, -1*lovelyBoundry));
      }
      if (lovelyPositions[i][0] > 0) {
        textSize(lovelySize);
        let wackeln = map(noise(lovelyPositions[i][0]/30)*10,0,10,-5,5);
        text("❤", marblin.body.position.x + lovelyPositions[i][1]+wackeln, marblin.body.position.y-20-lovelyPositions[i][0]);
      }
    }
    //console.log("draw: ");
    //console.log(lovelyPositions);
  }









//counter für umrechnung von Frames in Zeit (Sekunden)
  frameCounter++;
  if (frameCounter % 60 == 0) {
    frameCounter = 0;
    sekunden++;
  }
}



function colorFade(){
  console.log("newR: " + newR + "newG: " + newG + "newB: " + newB);
  console.log("actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  if (newR-actualR > 0) {
    actualR++;
  } else if (newR-actualR < 0) {
    actualR--;
  }

  if (newG-actualG > 0) {
    actualG++;
  }else if (newG-actualG < 0) {
    actualG--;
  }

  if (newB-actualB > 0) {
    actualB++;
  }else if (newB-actualB < 0) {
    actualB--;
  }
  console.log("new values: actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  marblin.attrs.color = color(actualR,actualG,actualB);
  if (newB-actualB+newG-actualG+newR-actualR == 0){
    clearInterval(interval2);
    console.log("clearing interval2");
  }
}

function shake(){
  console.log(sekunden);
  countertestzahl++;
  if (countertestzahl >= 30) {
    clearInterval(interval1);
    countertestzahl = 0;
  }
  let direction = 1;
  if (alternate == 0) {
    direction = -1; // ball runs right to left <-
    alternate = 1; // ball runs left to right ->
  }else {
    direction = 1;
    alternate = 0;
  }
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: (0.05 * direction) /*+ marblin.body.velocity.x */, y: 0.01}
  );
}

function keyPressed() {
  // is SPACE pressed?
  let direction = 1;
  switch (keyCode) {
    case 32: //spacebar
      sleepy = false;
      direction = 1; // ball runs left to right ->
      if ((marblin.body.position.x - marblin.body.positionPrev.x) < 0) {
        direction = -1; // ball runs right to left <-
      }
      // use current direction and velocity for the jump
      Matter.Body.applyForce(
        marblin.body,
        {x: marblin.body.position.x, y: marblin.body.position.y},
        {x: (0.05 * direction) + marblin.body.velocity.x / 100, y: -0.2}
      );
      break;
    case 83:
      console.log("pressed s --> shaking ball");
      interval1 = setInterval(shake, 100);

      break;
    case 17: //STRG
      direction = 1;
      if (alternate == 0) {
        direction = -1; // ball runs right to left <-
        alternate = 1; // ball runs left to right ->
      }else {
        direction = 1;
        alternate = 0;
      }
      Matter.Body.applyForce(
        marblin.body,
        {x: marblin.body.position.x, y: marblin.body.position.y},
        {x: (0.05 * direction), y: 0.01}
      );
      break;
    case 71:
      console.log("g - mache grün");
      newR = 0;
      newG = 255;
      newB = 0;
      interval2 = setInterval(colorFade, 10);
      break;
    case 66:
      console.log("b - mache braun");
      newR = 101;
      newG = 67;
      newB = 33;
      interval2 = setInterval(colorFade, 10);
      break;
    case 87:
      console.log("w - mache weiß");
      newR = 255;
      newG = 255;
      newB = 255;
      interval2 = setInterval(colorFade, 10);
      break;
    case 89: //z
      console.log("sleeping animation");
      console.log(marblin.body.position);
      if (sleepy) {
        sleepy = false;
      } else {
        sleepy = true;
      }
      break;
    case 76: //L inLove
      if (inLove) {
        inLove = false;
      } else {
        inLove = true;
      }
      break;
    /*
    case 87:

      break;*/
    default:

  }
}
