Matter.use('matter-wrap');


let marblin;
let marblinLover;
let canvasW = 1280;
let canvasH = 720 * 11;
let viewportW = 1280;
let viewportH = 720;
let frameR = 60;
let sun_moon;
let seperator_1;
let seperator_2;
let seperator_3;
let seperator_4;
let seperator_5;
let seperator_6;
let seperator_7;
let terrain_1;
let terrain_2;
let terrain_1edge;
let ramp;
let number = 0;
let spiel = [];
let blocks = [];
let theta;
let theta2;

let stair1;
let stair2;
let stair3;
let stair4;
let stair5;
let stair6;
let stair7;
let drawStair1 = false;
let drawStair2 = false;
let drawStair3 = false;
let drawStair4 = false;
let drawStair5 = false;
let drawStair6 = false;
let drawStair7 = false;

//Color Fade Variables
let intervalmarblin;
let marblinactualR = 255;
let marblinactualG = 255;
let marblinactualB = 255;
let marblinnewR = 255;
let marblinnewG = 255;
let marblinnewB = 255;

let intervalTERRAIN;
let actualR = 0;
let actualG = 0;
let actualB = 139;
let newR = 255;
let newG = 255;
let newB = 255;

let intervalBG;
let bgactualR = 0;
let bgactualG = 0;
let bgactualB = 255;
let bgnewR = 255;
let bgnewG = 255;
let bgnewB = 255;

let intervalSUN;
let sunactualR = 235;
let sunactualG = 224;
let sunactualB = 197;
let sunnewR = 255;
let sunnewG = 255;
let sunnewB = 255;

//Shake
let sekunden = 0;
let dauer = 3; //Zeit Sekunden
let countertestzahl = 0;
let alternate = 0;

//in love animation
let inLove = false;
let lovelyLoop = 100;
let lovelyBoundry = 60;
let lovelyPosition = 0;
let lovelyPositions; //Array welches für die einzelnen Positionen verwendet wird
let lovelyCount = 10;
let lovelySize = 20;

let house;

//sleepy animation
let sleepy = false;
let sleepyLoop = 100;
let sleepyPosition = 0;
let sleepyOffsetX = 30;
let sleepyOffsetY = 40;


let backgroundColor;
let terrainColor;
let sun_moonColor;

// attractor configs
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const MouseConstraint = Matter.MouseConstraint;
const Composites = Matter.Composites;
const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;
let attractor;
let boxes;
let engine;


function preload() {
  const engine = Matter.Engine.create();
  let world = engine.world;
  //create house
  house = new PolygonFromSVG(world, {
    x: 250,
    y: 417,
    fromFile: './house.svg',
    scale: 3,
    color: 'white'
  });

  let level4position = viewportH * 7.5;
  lamp = new PolygonFromSVG(world, {
    x: viewportW / 2 +200,
    y: level4position+200,
    fromFile: './lamp.svg',
    scale: 1,
    color: 'yellow'
  });
  

}

function setup() {
  rectMode(CORNER);
  const canvas = createCanvas(canvasW, canvasH);

  // create an engine
  const engine = Matter.Engine.create();
  let world = engine.world;
  // config wrap area
  const wrap = {
    min: {
      x: 0,
      y: 0
    },
    max: {
      x: width,
      y: height
    }
  };

  //Farben initialisieren
  backgroundColor = color(bgactualR, bgactualG, bgactualB);//"blue";
  terrainColor = color(actualR, actualG, actualB);//"darkblue";
  sun_moonColor = color(sunactualR, sunactualG, sunactualB);//"#EBE0C5";

  //variablen für inLove initialisieren
  lovelyPositions = new Array(lovelyCount);
  for (var i = 0; i < lovelyPositions.length; i++) {
    lovelyPositions[i] = new Array(2);
  }
  for (var i = 0; i < lovelyCount; i++) {
    lovelyPositions[i][0] = floor(0 - (lovelyLoop / lovelyCount)*i);
    lovelyPositions[i][1] = random(lovelyBoundry, -1*lovelyBoundry);
  }

  // create Main Character MURMEL
  marblin = new Ball(world, {
    x: 250,
    y: 50,
    r: 40,
    color: 'white'
  },

  {
    restitution: 0,
    friction: 0,
    label: "marblin",
    plugin: {
      wrap: wrap
    },
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "terrain_1edge" || bodyB.label === "terrain_1edge") {
      console.log("COLLISION")
     marblin.body.friction = 0.05;
     ramp4.body.collisionFilter.group = -1;
     marblinLover.body.collisionFilter.group = -1;
     terrain_9.body.collisionFilter.group = -1;
<<<<<<< HEAD
=======
     prison.body.collisionFilter.group = -1;
     toggleInLove();
>>>>>>> 6f32b9f697a25a10e8e223881b2d81619d1906eb
    }

  });

  marblinLover = new Ball(world, {
    x: 1350,
    y: 50,
    r: 40,
    color: 'red'
  }, {
    friction: 0.004,
    restitution: 0
  });

  // create the world <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // create level 1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let level1position;

  sun_moon = new Ball(world, {
      x: viewportW * 4 / 5,
      y: viewportH * 1 / 5,
      r: 70,
      color: sun_moonColor
    },

    {
      isStatic: true
    }
  );

  ramp = new BlockCore(world, {
    x: viewportW * 1 / 5-15,
    y: 500,
    w: 30,
    h: 30,
    color: terrainColor
  }, {
    isStatic: true, angle: radians(45), label: 'ramp'
  });

  ramp2 = new BlockCore(world, {
    x: viewportW * 1 / 5,
    y: 480,
    w: 30,
    h: 30,
    color: terrainColor
  }, {
    isStatic: true, label: 'ramp'
  });

  ramp3 = new BlockCore(world, {
    x: viewportW+90,
    y: 500,
    w: 30,
    h: 30,
    color: terrainColor
  }, {
    isStatic: true, label: 'ramp',angle: radians(45),
  });

  ramp4 = new BlockCore(world, {
    x: viewportW+50,
    y: 280,
    w: 100,
    h: 30,
    color: terrainColor
  }, {
    isStatic: true, label: 'ramp4'
  });

  terrain_1 = new BlockCore(world, {
    x: viewportW * 1 / 5,
    y: 620,
    w: viewportW * 3 / 5,
    h: viewportH / 4,
    color: terrainColor
  }, {
    isStatic: true,
    label: "terrain_1"
  });

  terrain_1edge = new BlockCore(world, {
    x: viewportW * 3 / 5,
    y: 620,
    w: viewportW * 1 / 5,
    h: viewportH / 4,
    color: terrainColor
  }, {
    isStatic: true,
    label: "terrain_1edge"
  });

  terrain_2 = new BlockCore(world, {
    x: viewportW,
    y: 620,
    w: viewportW * 2 / 5,
    h: viewportH / 4,
    color: terrainColor
  }, {
    isStatic: true,
    restitution: 0
  });

  // create zwischensequenz 1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


  stair1 = new Block(
    world,
    { x: 1000, y: 1440, w: 100, h: 100, color: 'darkblue' },
    { isStatic: true, restitution: 1, label: 'stair' }
  );

  stair2 = new Block(
<<<<<<< HEAD
    world,
    { x: 700, y : 1640, w: 100, h: 100, color: 'darkblue' },
    { isStatic: true, friction: 1, restitution: 1, label: 'stair2' }
  );

  stair3 = new Block(
    world,
    { x: 400, y : 1840, w: 100, h: 100, color: 'darkblue' },
    { isStatic: true, restitution: 1, label: 'stair3' }
  );

  stair4 = new Block(
    world,
    { x: 100, y : 2340, w: 200, h: 100, color: '#050D7F' },
    { isStatic: true, friction: 0.5, restitution: 0, label: 'stair4' }
  );

  stair5 = new Block(
    world,
    { x: 100, y : 2440, w: 500, h: 100, color: '#0794DB' },
    { isStatic: true, restitution: 1, label: 'stair5' }
  );

  stair6 = new Block(
    world,
    { x: 100, y : 2540, w: 800, h: 100, color: '#00BFEC' },
    { isStatic: true, restitution: 1, label: 'stair6' }
=======
    world, 
    { x: 709, y : 1640, w: 100, h: 100, color: 'darkblue' }, 
    { isStatic: true, restitution: 1, label: 'stair2' }
  );

  stair3 = new Block(
    world, 
    { x: 400, y : 1840, w: 100, h: 100, color: 'darkblue' }, 
    { isStatic: true, restitution: 0.1, label: 'stair3' }
  );

  stair4 = new Block(
    world, 
    { x: 100, y : 2340, w: 200, h: 100, color: '#050D7F' }, 
    { isStatic: true, label: 'stair4' }
  );

  stair5 = new Block(
    world, 
    { x: 100, y : 2440, w: 500, h: 100, color: '#0794DB' }, 
    { isStatic: true, label: 'stair5' }
  );

  stair6 = new Block(
    world, 
    { x: 100, y : 2540, w: 800, h: 100, color: '#00BFEC' }, 
    { isStatic: true, label: 'stair6' }
>>>>>>> 6f32b9f697a25a10e8e223881b2d81619d1906eb
  );
  
  stair7 = new Block(
<<<<<<< HEAD
    world,
    { x: 100, y : 2640, w: 1100, h: 110, color: '#1CD0F8' },
    { isStatic: true, restitution: 1, label: 'stair7' }
  );

=======
    world, 
    { x: 100, y : 2640, w: 1100, h: 110, color: '#1CD0F8' }, 
    { isStatic: true, label: 'stair7' }
  );
>>>>>>> 6f32b9f697a25a10e8e223881b2d81619d1906eb

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair" || bodyB.label === "stair") {
      drawStair1 = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair2" || bodyB.label === "stair2") {
      drawStair1 = false;
      drawStair2 = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair3" || bodyB.label === "stair3") {
      drawStair2 = false;
      drawStair3 = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair4" || bodyB.label === "stair4") {
      drawStair3 = false;
      drawStair4 = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair5" || bodyB.label === "stair5") {
      drawStair5 = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair6" || bodyB.label === "stair6") {
      drawStair6 = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair7" || bodyB.label === "stair7") {
      drawStair7 = true;
    }
  });

 // create level 2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 let level2position = viewportH * 4.5;


  // attractor = Bodies.circle(400, viewportH * 3, 20, {
  //   isStatic: false,
  //   plugin: {
  //     attractors: [
  //       function(bodyA, bodyB) {
  //         return {
  //           x: (bodyA.position.x - bodyB.position.x) * 1e-6,
  //           y: (bodyA.position.y - bodyB.position.y) * 1e-6,
  //         };
  //       }
  //     ]
  //   }
  // });
  // World.add(engine.world, attractor);

  // boxes = Composites.stack(viewportW/2, viewportH * 3, 3, 20, 3, 3, function(x, y) {
  //   return Bodies.circle(x, y, 10);
  // });
  // World.add(engine.world, boxes);

  terrain_9 = new BlockCore(world, {
    x: viewportW/2,
    y: level2position-viewportH/3,
    w: viewportW,
    h: viewportH/3,
    color: "darkblue"
  },{ isStatic: true });
  terrain_10 = new BlockCore(world, {
    x: viewportW/2,
    y: level2position,
    w: viewportW,
    h: viewportH/3,
    color: "#050B4E"
  },{ isStatic: true });
  terrain_11 = new BlockCore(world, {
    x: viewportW/2,
    y: level2position+viewportH/3,
    w: viewportW,
    h: viewportH/3,
    color: "black"
  },{ isStatic: true });


  // terrain_3 = new BlockCore(world,
  //   { x: viewportW*1/2, y: 2*viewportH*(6/3)+1/6*viewportH, w: viewportW, h: viewportH/3, color: "#003EF7"},
  //   { isStatic: true }
  // );
  // terrain_4 = new BlockCore(world,
  //   { x: viewportW*1/2, y: 2*viewportH*(7/3)*viewportH, w: viewportW, h: viewportH/3, color: "#002BAB"},
  //   { isStatic: true }
  // );
  // terrain_5 = new BlockCore(world,
  //   { x: viewportW*1/2, y: viewportH*(8/3)+1/6*viewportH, w: viewportW, h: viewportH/3, color: terrainColor},
  //   { isStatic: true }
  // );



  // create zwischensequenz 2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 12; j++) {
      const kugel = new Ball(
        world, {
          x: 20 + i * 50,
          y: 5 * viewportH + 50 * j,
          r: 20,
          color: terrainColor
        }, {
          isStatic: false,
          restitution: 0.3
        }
      );
      kugel.constrainTo(null, {
        pointB: {
          x: 20 + i * 50,
          y: 5 * viewportH + 50 * j - 200
        },
        length: 300,
        draw: false
      });
      blocks.push(kugel);
    }
  }
  // create level 3 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let level3position = viewportH * 6.5;

<<<<<<< HEAD

=======
  prison = new BlockCore(world, {
    x: viewportW/2,
    y: level3position,
    w: 400,
    h: 400,
    color: "red"
  },{ isStatic: false });

  // prisonHolder = new BlockCore(world, {
  //   x: viewportW/2,
  //   y: level3position-viewportH/4,
  //   w: 400,
  //   h: 400,
  //   color: "darkred"
  // },{ isStatic: false });
>>>>>>> 6f32b9f697a25a10e8e223881b2d81619d1906eb

 terrain_12 = new BlockCore(world, {
    x: viewportW/2,
    y: level3position+viewportH/6*2,
    w: viewportW,
    h: viewportH/6,
    color: "darkblue"
  },{ isStatic: true });


    // create ÜBERGANG 3 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


      // create level 4 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      let level4position = viewportH * 7.5;


  // terrain_3 = new BlockCore(world,
  //   { x: viewportW*1/2, y: 2*viewportH*(6/3)+1/6*viewportH, w: viewportW, h: viewportH/3, color: "#003EF7"},
  //   { isStatic: true }
  // );
  // terrain_4 = new BlockCore(world,
  //   { x: viewportW*1/2, y: 2*viewportH*(7/3)*viewportH, w: viewportW, h: viewportH/3, color: "#002BAB"},
  //   { isStatic: true }
  // );
  // terrain_5 = new BlockCore(world,
  //   { x: viewportW*1/2, y: viewportH*(8/3)+1/6*viewportH, w: viewportW, h: viewportH/3, color: terrainColor},
  //   { isStatic: true }
  // );



  // create "level 6.5" <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  /*
  let level65position = viewportH*5.5;
  balls = new Stack(world, {
    x: 0, y: level65position, cols: 60, rows: 10, colGap: 1, rowGap: 1, color: 'white',
    create: (x, y) => Matter.Bodies.circle(x, y, 15, { restitution: 0.1, friction: -0.1})
  });
  */



  // create level 5 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let level7position = viewportH * 10.5;
  terrain_6 = new BlockCore(world, {
    x: 273,
    y: level7position - 44,
    w: 130,
    h: 190,
    color: "white"
  }, {
    isStatic: true
  });
  terrain_7 = new BlockCore(world, {
    x: 233,
    y: level7position + 116,
    w: 200,
    h: 22,
    color: "white"
  }, {
    isStatic: true
  });
  terrain_8 = new BlockCore(world, {
    x: 130,
    y: level7position - 6,
    w: 40,
    h: 270,
    color: "white"
  }, {
    isStatic: true
  });
  ove = new PolygonFromSVG(world, {
    x: viewportW / 2 - 100,
    y: level7position,
    fromFile: './love.svg',
    scale: 1,
    color: 'white'
  }, {
    isStatic: true,
    friction: 1,
    density: 100
  });



  // run the engine
  Matter.Engine.run(engine);
  // setup mouse
  mouse = new Mouse(engine, canvas);
  frameRate(frameR);


}



// Create the tree function
function branch(len) {
  // Each branch will be 2/3rds the size of the previous one
  //float sw = map(len,2,120,1,10);
  //strokeWeight(sw);
  strokeWeight(8);
  line(0, 0, 0, -len);
  // Move to the end of that line
  translate(0, -len);
  len *= 0.6;
  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (len > 2) {
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta); // Rotate by theta
    branch(len); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state
    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    branch(len);
    pop();
  }
}



function shake(){
  //console.log(sekunden);
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



function branch2(len2) {
  // Each branch will be 2/3rds the size of the previous one
  //float sw = map(len,2,120,1,10);
  //strokeWeight(sw);
  strokeWeight(10);
  line(0, 0, 0, -len2);
  // Move to the end of that line
  translate(0, -len2);
  len2 *= 0.6;
  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (len2 > 2) {
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta2); // Rotate by theta
    branch2(len2); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state
    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta2);
    branch2(len2);
    pop();
  }
}

    //  //collisionen aussschalten
    //  marblin.body.collisionFilter.group = -1
    //  house.body.collisionFilter.group = -1

function draw() {
  background(backgroundColor);

  blocks.forEach(block => block.draw());

  house.draw();
        // //collisionen aussschalten
        // marblin.body.collisionFilter.group = -1;
        // house.body.collisionFilter.group = -1;

  marblinLover.draw();
  sun_moon.draw();
  terrain_1.draw();
  terrain_1edge.draw();
  // ramp.draw();
  // ramp2.draw();
    ramp3.draw();
    ramp4.draw();
  terrain_2.draw();
  // house.draw();
  // terrain_3.draw();
  // terrain_4.draw();
  // terrain_5.draw();
  // terrain_6.draw();
  // terrain_7.draw();
  // terrain_8.draw();
  terrain_9.draw();
  terrain_10.draw();
  terrain_11.draw();
  terrain_12.draw();
<<<<<<< HEAD
=======
 
  // prisonHolder.draw();

  lamp.draw();
>>>>>>> 6f32b9f697a25a10e8e223881b2d81619d1906eb


  // //balls.draw();
  // seperator_1.draw();
  // seperator_2.draw();
  // seperator_3.draw();
  // seperator_4.draw();
  // seperator_5.draw();
  // seperator_6.draw();
  // seperator_7.draw();
  marblin.draw();
  prison.draw();
  ove.draw();

  //Bäume Mappen
  theta = map(marblin.body.position.x, 300, 740, 0, PI / 4);
  //draw the stairs
  
  if (drawStair1) {
    stair1.draw();
  }

  if (drawStair2) {
    stair2.draw();
  }

  if(drawStair3) {
    stair3.draw();
  }
  
  if(drawStair4) {
    stair4.draw();
  }

  if (drawStair5) {
    stair5.draw();
  }

  if (drawStair6) {
    stair6.draw();
  }

  if (drawStair7) {
    stair7.draw();
  }

// attractors config
  // noStroke();
  // fill(255);
  // drawBodies(boxes.bodies);
  // drawBody(attractor);

  // ove.draw();
  theta = map(marblin.body.position.x, 0, width, 0, PI / 4);
  theta2 = map(marblinLover.body.position.x, 0, width, 0, PI / 12);
  //theta = 0.4
  push();
  translate(width / 2, 526);
  stroke(255);
  branch(80);
  translate(500, 80);
  stroke(255);
  branch2(80);
  pop();


  //sleepyTrigger
  if (marblin.body.position.x > 240 && marblin.body.position.x < 300 && marblin.body.position.y > 400 && marblin.body.position.y < 500) {
    sleepy = true;
  } else {
    sleepy = false;
  }

  //inLoveTrigger
  if (marblinLover.body.position.x > 1100 && marblinLover.body.position.x < 1150 && marblinLover.body.position.y > 480 && marblinLover.body.position.y < 500) {

    inLove = true;
  }

  //SLEEPY
  if (sleepy) {
    let sleepyTransparency1 = map(sleepyPosition, 0, sleepyLoop, 0, 1255);
    let sleepyTransparency2 = map((sleepyPosition + sleepyLoop / 3) % sleepyLoop, 0, sleepyLoop, 0, 1255);
    let sleepyTransparency3 = map((sleepyPosition + sleepyLoop / 3 * 2) % sleepyLoop, 0, sleepyLoop, 0, 1255);
    let sleepyPosition2 = (sleepyPosition + sleepyLoop / 3) % sleepyLoop;
    let sleepyPosition3 = (sleepyPosition + sleepyLoop / 3 * 2) % sleepyLoop;

    fill(125, sleepyTransparency1);
    textSize((sleepyLoop - sleepyPosition) / 2);
    text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition, marblin.body.position.y - sleepyOffsetY - sleepyPosition);

    fill(125, sleepyTransparency2);
    textSize((sleepyLoop - sleepyPosition2) / 2);
    text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition2, marblin.body.position.y - sleepyOffsetY - sleepyPosition2);

    fill(125, sleepyTransparency3);
    textSize((sleepyLoop - sleepyPosition3) / 2);
    text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition3, marblin.body.position.y - sleepyOffsetY - sleepyPosition3);

    sleepyPosition = (sleepyPosition + 0.5) % sleepyLoop;
    // console.log(sleepyPosition);

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

}



function colorFade(){
  //console.log("marblinnewR: " + marblinnewR + "marblinnewG: " + marblinnewG + "marblinnewB: " + marblinnewB);
  //console.log("marblinactualR: " + marblinactualR + "marblinactualG: " + marblinactualG + "marblinactualB: " + marblinactualB);
  if (marblinnewR-marblinactualR > 0) {
    marblinactualR++;
  } else if (marblinnewR-marblinactualR < 0) {
    marblinactualR--;
  }

  if (marblinnewG-marblinactualG > 0) {
    marblinactualG++;
  }else if (marblinnewG-marblinactualG < 0) {
    marblinactualG--;
  }

  if (marblinnewB-marblinactualB > 0) {
    marblinactualB++;
  }else if (marblinnewB-marblinactualB < 0) {
    marblinactualB--;
  }
  //console.log("new values: marblinactualR: " + marblinactualR + "marblinactualG: " + marblinactualG + "marblinactualB: " + marblinactualB);
  marblin.attrs.color = color(marblinactualR,marblinactualG,marblinactualB);
  if (marblinnewB-marblinactualB+marblinnewG-marblinactualG+marblinnewR-marblinactualR == 0){
    clearInterval(intervalmarblin);
    console.log("clearing interval2");
  }
}



function colorFadeTERRAIN(){
  //console.log("newR: " + newR + "newG: " + newG + "newB: " + newB);
  //console.log("actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
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
  //console.log("new values: actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  terrain_1.attrs.color = color(actualR,actualG,actualB);
  terrain_1edge.attrs.color = color(actualR,actualG,actualB);
  terrain_2.attrs.color = color(actualR,actualG,actualB);

  if (newB-actualB+newG-actualG+newR-actualR == 0){
    clearInterval(intervalTERRAIN);
    console.log("clearing intervalTERRAIN");
  }
}


function colorFadeBG(){
  //console.log("bgnewR: " + bgnewR + "bgnewG: " + bgnewG + "bgnewB: " + bgnewB);
  //console.log("bgactualR: " + bgactualR + "bgactualG: " + bgactualG + "bgactualB: " + bgactualB);
  if (bgnewR-bgactualR > 0) {
    bgactualR++;
  } else if (bgnewR-bgactualR < 0) {
    bgactualR--;
  }

  if (bgnewG-bgactualG > 0) {
    bgactualG++;
  }else if (bgnewG-bgactualG < 0) {
    bgactualG--;
  }

  if (bgnewB-bgactualB > 0) {
    bgactualB++;
  }else if (bgnewB-bgactualB < 0) {
    bgactualB--;
  }
  //console.log("new values: bgactualR: " + bgactualR + "bgactualG: " + bgactualG + "bgactualB: " + bgactualB);
  backgroundColor = color(bgactualR,bgactualG,bgactualB);

  if (bgnewB-bgactualB+bgnewG-bgactualG+bgnewR-bgactualR == 0){
    clearInterval(intervalBG);
    console.log("clearing intervalBG");
    collisionSleepOff();
  }
}


function colorFadeSUN(){
  //console.log("newR: " + newR + "newG: " + newG + "newB: " + newB);
  //console.log("actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  if (sunnewR-sunactualR > 0) {
    sunactualR++;
  } else if (sunnewR-sunactualR < 0) {
    sunactualR--;
  }

  if (sunnewG-sunactualG > 0) {
    sunactualG++;
  }else if (sunnewG-sunactualG < 0) {
    sunactualG--;
  }

  if (sunnewB-sunactualB > 0) {
    sunactualB++;
  }else if (sunnewB-sunactualB < 0) {
    sunactualB--;
  }
  //console.log("new values: actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  sun_moon.attrs.color = color(sunactualR,sunactualG,sunactualB);

  if (sunnewB-sunactualB+sunnewG-sunactualG+sunnewR-sunactualR == 0){
    clearInterval(intervalSUN);
    console.log("clearing intervalSUN");
  }
}



function changeColorSonnenaufgang(){
  newR = 101;
  newG = 67;
  newB = 33;
  intervalTERRAIN = setInterval(colorFadeTERRAIN, 5);
  bgnewR = 205;
  bgnewG = 105;
  bgnewB = 255;
  intervalBG = setInterval(colorFadeBG, 1);

  sunnewR = 255;
  sunnewG = 255;
  sunnewB = 0;
  intervalSUN = setInterval(colorFadeSUN,200);
}



function collisionSleepOff(){
  console.log("collisions aus");
          //collisionen aussschalten
  ramp2.body.collisionFilter.group = -1;
  marblin.body.collisionFilter.group = -1;
  marblin.body.friction = -0.05;
}



function toggleInLove(){
  if (inLove) {
    inLove = false;
  } else {
    inLove = true;
  }
}



function keyPressed() {
  let direction = 1;
  switch (keyCode) {
    case 90: //z
      console.log("collisions aus");
              //collisionen aussschalten
      ramp2.body.collisionFilter.group = -1
      marblin.body.collisionFilter.group = -1
      marblin.body.friction = -0.04
      break;
    case 32: //SPACE
      //TerrainColors
      event.preventDefault();
      changeColorSonnenaufgang();


      break;
    case 83:
      console.log("pressed s --> shaking ball");
      interval1 = setInterval(shake, 100);


      break;
    case 76: //L inLove
      toggleInLove();
      break;

    default:
  }
}
