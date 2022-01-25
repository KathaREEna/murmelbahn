Matter.use('matter-wrap');

//marblinGrows
let marblinGrows = false;

Matter.use('matter-attractors');

let marblin;
let marblinLover;
let canvasW = 1280;
let canvasH = 720 * 11;
let viewportW = 1280;
let viewportH = 720;
let frameR = 60;
let sun_moon;
let terrain_1;
let terrain_2;
let terrain_1edge;
let ramp;
let number = 0;
let spiel = [];
let blocks = [];

//leon treppen
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

//spotlight lampe
let loverRamp;
let marblinTest2;
let marblinTest;
let lampePlain;
let plainRamp;
let bluePain;
let firstPlain;
let firstRamp;
let secondPlain;
let secondRamp;
let loverPlain;

let house;

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

// prison
let ps
let prisonColor = "white"
let boom = false;
let level3position;
let prisonSize;

// übergang 5, fountain
let particles = [];









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
     prison.body.collisionFilter.group = -1;
     terrain_9.body.collisionFilter.group = -1;
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
  );

  stair7 = new Block(
    world,
    { x: 100, y : 2640, w: 1100, h: 110, color: '#1CD0F8' },
    { isStatic: true, restitution: 1, label: 'stair7' }
  );


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



 //attractor code BEGINN


  boxes = Composites.stack(viewportW/2, level2position-viewportH, 3, 20, 3, 3, function(x, y) {
    return Bodies.circle(x, y, 10);
  });
  World.add(engine.world, boxes);

//attractor code ENDE



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
  level3position = viewportH * 6.5;

  // variablen: ParticleSystem(x, y, r)
  // r ist höhe und breite eines particles
  // ParticleSystem besteht aus 15 reihen und 15 columns, zu ändern in particlesystem.js
  prisonSize = 25;
  //ps = new ParticleSystem(viewportW/2, level3position-184, prisonSize);

  prison = new BlockCore(world, {
    x: viewportW/4,
    y: level3position,
    w: 15*prisonSize,
    h: 15*prisonSize,
    color: prisonColor
  },{ isStatic: false });

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


  



  // create "level 6.5" <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  /*
  let level65position = viewportH*5.5;
  balls = new Stack(world, {
    x: 0, y: level65position, cols: 60, rows: 10, colGap: 1, rowGap: 1, color: 'white',
    create: (x, y) => Matter.Bodies.circle(x, y, 15, { restitution: 0.1, friction: -0.1})
  });
  */

  // create übergang 5 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let transition5position = viewportH * 9.5;


  // loveballs = new Stack(world, {
  //   x: 0, y: transition5position-500, cols: 60, rows: 10, colGap: 1, rowGap: 1, color: 'white',
  //   create: (x, y) => Matter.Bodies.circle(x, y, 15, { restitution: 0.1, friction: -0.1})
  // });




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

  //create lampe level
  marblinTest = new Ball(
    world,
    { x: 1400, y: 5050, r: 40, color: 'white'},
    { isStatic: false, friction: 0 }
  );

  marblinTest2 = new Ball(
    world,
    { x: 600, y: 5000, r: 40, color: 'white'},
    { restitution: 0, friction: 0 }
  );

  loverRamp = new Block(
    world,
    { x: 1160, y : 5480, w: 600, h: 5, color: 'yellow' },
    { isStatic: true, label: 'loverRamp', angle: radians(-45) }
  );

  loverPlain = new Block(
    world,
    { x: 1430, y : 5200, w: 100, h: 5, color: 'yellow' },
    { isStatic: true, label: 'loverPlain' }
  );

  firstPlain = new Block(
    world,
    { x: 580, y : 5620, w: 100, h: 5, color: 'yellow' },
    { isStatic: true, label: 'firstPlain' }
  );

  firstRamp = new Block(
    world,
    { x: 720, y : 5655, w: 180, h: 5, color: 'yellow' },
    { isStatic: true, label: 'firstRamp', angle: radians(22) }
  );

  secondPlain = new Block(
    world,
    { x: 910, y : 5730, w: 100, h: 5, color: 'yellow' },
    { isStatic: true, label: 'secondPlain', angle: radians(-45) }
  );

  secondRamp = new Block(
    world,
    { x: 690, y : 5780, w: 450, h: 5, color: 'yellow' },
    { isStatic: true, label: 'secondRamp', angle: radians(-3), }
  );

  lampePlain = new Block(
    world,
    { x: 310, y : 5795, w: 310, h: 5, color: 'yellow' },
    { isStatic: true, label: 'lampePlain' }
  );

  plainRamp = new Block(
    world,
    { x: 10, y : 5700, w: 300, h: 5, color: 'blue' },
    { isStatic: true, label: 'plainRamp', angle: radians(90) }
  );

  bluePlain = new Block(
    world,
    { x: 60, y : 5795, w: 180, h: 5, color: 'blue' },
    { isStatic: true, label: 'bluePlain', friction: 1 }
  );

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondRamp" || bodyB.label === "secondRamp") {
      marblinTest2.body.friction = -0.3;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "lampePlain" || bodyB.label === "lampePlain") {
      marblinTest2.body.friction = 0.4;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondPlain" || bodyB.label === "secondPlain") {
      marblinTest2.body.friction = 0.4;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "bluePlain" || bodyB.label === "bluePlain") {
      marblinTest.body.friction = -0.2;
    }

  });


  //MAIN ENGINE////////////////////////////////////////////////////////////////
  // run the engine
  Matter.Engine.run(engine);
  // setup mouse
  mouse = new Mouse(engine, canvas);
  frameRate(frameR);

  //END MAIN ENGINE////////////////////////////////////////////////////////////
}









function draw() {
  background(backgroundColor);

  blocks.forEach(block => block.draw());
  lamp.draw();
  house.draw();
        // //collisionen aussschalten
        // marblin.body.collisionFilter.group = -1;
        // house.body.collisionFilter.group = -1;

  //lampe
  lamp.draw();
  loverRamp.draw();
  marblinTest.draw();
  marblinTest2.draw();
  lampePlain.draw();
  plainRamp.draw();
  bluePlain.draw();
  firstPlain.draw();
  firstRamp.draw();
  secondPlain.draw();
  secondRamp.draw();
  loverPlain.draw();

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
  // terrain_4.draw();
  // terrain_5.draw();
  // terrain_6.draw();
  // terrain_7.draw();
  // terrain_8.draw();
  terrain_9.draw();
  terrain_10.draw();
  terrain_11.draw();
  terrain_12.draw();

  // shatter system/prison

  if(boom){
    ps.display();
    ps.update();
  }else {
    prison.draw();
  }
  // //balls.draw();
  marblin.draw();


   // ove.draw();

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
  noStroke();
  fill(255);
  drawBodies(boxes.bodies);


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
    marblinSleep();
  }
  //LIEBEN
  if (inLove) {
    inLoveAni();
  }
  //marblinGrows
  if(marblinGrows){
    let scaleStart = 5400;
    let scaleEnd = 6000;
    let localtarget = map(marblinTest2.body.position.y,groesserAnfang,groesserYEnd,scaleStart,scaleEnd,1)

    while(marblinTest2.body.area < localtarget){
    Matter.Body.scale(marblinTest2.body, 1.01, 1.01);
    }
  }
}



let groesserAnfang;
let groesserYEnd;







function collisionSleepOff(){
  console.log("collisions aus");
          //collisionen aussschalten
  ramp2.body.collisionFilter.group = -1;
  marblin.body.collisionFilter.group = -1;
  marblin.body.friction = -0.05;
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


      case 71: // G gravity attractor on
      marblin.body.plugin.attractors = [
        function(bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };
        }
      ];

        break;


        case 72: // H gravity attractor off
        marblin.body.plugin.attractors = "";

        break;


    case 70:
      marblinTest2.body.friction = -0.03;

      break;

    case 66: //b
      pinterval1 = setInterval(shakePrison, 100);
      break;
    case 81: //Q = Murmel wächst
      groesserAnfang = marblinTest2.body.position.y;
      groesserYEnd = marblinTest2.body.position.y+100;
      marblinGrows = true;
    break;
    default:
  }
}
