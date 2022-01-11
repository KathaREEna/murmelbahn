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

function setup() {
  const canvas = createCanvas(800, 600);

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
  text('TEST - GLaDOS', width/2, 50);


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
  if (keyCode === 32) {
    let direction = 1; // ball runs left to right ->
    if ((marblin.body.position.x - marblin.body.positionPrev.x) < 0) {
      direction = -1; // ball runs right to left <-
    }
    // use current direction and velocity for the jump
    Matter.Body.applyForce(
      marblin.body,
      {x: marblin.body.position.x, y: marblin.body.position.y},
      {x: (0.05 * direction) + marblin.body.velocity.x / 100, y: -0.2}
    );
  } else if (keyCode === 83) {
    console.log("pressed s --> shaking ball");
      interval1 = setInterval(shake, 100);

  } else if (keyCode === 17) { //STRG
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
  } else if (keyCode === 71) {
    console.log("g - mache grün");
    newR = 0;
    newG = 255;
    newB = 0;
    interval2 = setInterval(colorFade, 10);
  } else if (keyCode = 66) {
    console.log("b - mache braun");
    newR = 101;
    newG = 67;
    newB = 33;
    interval2 = setInterval(colorFade, 10);
  }
}
