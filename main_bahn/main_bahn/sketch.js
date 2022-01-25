Matter.use('matter-wrap');


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

let loveballs = [];

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
let loverPlain;
let firstPlain;
let firstRamp;
let secondRamp;
let secondPlain;
let thirdPlain;
let blueWall;
let bluePlain;

//gradient steps
let terrain_9_left;
let terrain_9_right;
let terrain_10_left;
let terrain_10_right;
let terrain_11_left;
let terrain_11_right;
let terrainX = 640;
let terrain_9_leftWall;
let terrain_9_rightWall;
let terrain_10_leftWall;
let terrain_10_rightWall;
let terrain_11_leftWall;
let terrain_11_rightWall;
let trennung;
let terrain_11_l;
let terrain_11_middle;
let terrain_11_r;
let terrain_11_links;




let house;

let backgroundColor;
let terrainColor;
let sun_moonColor;


// prison
let ps
let prisonColor = "white"
let boom = false;
let level3position;
let prisonSize;

// übergang 5, fountain
let particles = [];

const engine = Matter.Engine.create();
let world = engine.world;

/////////////////////////////// setup level 2

let level2position = viewportH * 4.5;

let stack1
function addStack1(){
  stack1 = new Stack(world, {
    x: -180, y: level2position-300 , cols: 2, rows: 5, colGap: 15, rowGap: 20, color: 'red',
    create: (x, y) => Matter.Bodies.circle(x, y, 20, { restitution: 1.1, friction: -0.03})
  });
  levelMarblin.addAttracted(stack1.body.bodies);
};


function removeStack1() {
  Matter.World.remove(engine.world, stack1.body);
  stack1 = undefined;
};



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




  // let transition5position = viewportH * 9.5;

  // loveballs = new Stack(world, {
  //   x: 0, y: transition5position-500, cols: 60, rows: 10, colGap: 1, rowGap: 1, color: 'white',
  //   create: (x, y) => Matter.Bodies.circle(x, y, 15, { restitution: 0.1, friction: -0.1})
  // });







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
  marblin = new Magnet(world, {
    x: 250,
    y: 50,
    r: 40,
    color: 'white',
    attraction: 0.45e-5
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
// attrackt lover to marblin
// marblin.addAttracted(marblinLover.body)







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

//First Level
  terrain_9 = new BlockCore(world, {
    x: 640,
    y: level2position-viewportH/3,
    w: viewportW,
    h: viewportH/3,
    color: "darkblue"
  }, { isStatic: true });

//First Level Auserhalb Plains
  terrain_9_left = new BlockCore(world, {
    x: -110,
    y: 3130,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true });

  terrain_9_right = new BlockCore(world, {
    x: terrainX + 750,
    y: 3130,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, label: "terrain_9_right" });

//Second Level
  terrain_10 = new BlockCore(world, {
    x: 640,
    y: level2position,
    w: viewportW,
    h: viewportH/3,
    color: "#050B4E"
  }, { isStatic: true });

//Second Level Auserhalb Plains
  terrain_10_left = new BlockCore(world, {
    x: -110,
    y: 3370,
    w: 220,
    h: 20,
    color: "darkblue"
  },{ isStatic: true });

  terrain_10_right = new BlockCore(world, {
    x: terrainX + 750,
    y: 3370,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, label: "terrain_10_right" });

//Third Level Auserhalb Plains
  terrain_11 = new BlockCore(world, {
    x: 960,
    y: level2position+viewportH/3,
    w: viewportW/2,
    h: viewportH/3,
    color: "black"
  }, { isStatic: true });

  terrain_11_links = new BlockCore(world, {
    x: 320,
    y: level2position+viewportH/3,
    w: viewportW/2,
    h: viewportH/3,
    color: "grey"
  }, { isStatic: true });

//Trigger Rechts unter Third Level
  terrain_11_r = new BlockCore(world, {
    x: 1270,
    y: 3610,
    w: viewportW/2,
    h: 20,
    color: "red"
  }, { isStatic: true });

//Trigger Mitte unter Third Level
  terrain_11_middle = new BlockCore(world, {
    x: 640,
    y: 3610,
    w: viewportW/2,
    h: 20,
    color: "orange"
  }, { isStatic: true });

//Trigger Links unter Third Level
  terrain_11_l = new BlockCore(world, {
    x: 160,
    y: 3610,
    w: viewportW/4,
    h: 20,
    color: "yellow"
  }, { isStatic: true });

//Third Level Auserhalb Plains
  terrain_11_left = new BlockCore(world, {
    x: -110,
    y: 3610,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true });

  terrain_11_right = new BlockCore(world, {
    x: terrainX + 750,
    y: 3610,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true });

//First Level Auserhalb Walls
  terrain_9_leftWall = new BlockCore(world, {
    x: -210,
    y: 3030,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(90) });

  terrain_9_rightWall = new BlockCore(world, {
    x: terrainX + 850,
    y: 3050,
    w: 150,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(90) });

//Second Level Auserhalb Walls
  terrain_10_leftWall = new BlockCore(world, {
    x: -200,
    y: 3280,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(45) });

  terrain_10_rightWall = new BlockCore(world, {
    x: terrainX + 850,
    y: 3300,
    w: 150,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(90) });

//Third Level Auserhalb Walls
  terrain_11_leftWall = new BlockCore(world, {
    x: -200,
    y: 3520,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(45) });

  terrain_11_rightWall = new BlockCore(world, {
    x: terrainX + 850,
    y: 3540,
    w: 150,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(90) } );

//Wall zwischen Third Level
  trennung = new BlockCore(world, {
    x: 840,
    y: 3525,
    w: 150,
    h: 20,
    color: "pink"
  }, { isStatic: true, angle: radians(90) } );

  levelMarblin = new Magnet(world, {
    x: 1100,
    y: 2300,
    r: 40,
    color: 'white',
    attraction: 0.015e-5
  }, {
    label: "labelMarblin",
    friction: 0,
    restitution: 1,
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "terrain_9_right" || bodyB.label === "terrain_9_right") {
      console.log("trigger!");
      Matter.World.remove(engine.world, terrain_10.body);
      removeStack1();
      Matter.Body.setPosition(
        levelMarblin.body,
        {x: -180, y: level2position-300}
        );

      //teleport
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "terrain_10_right" || bodyB.label === "terrain_10_right") {
      terrain_11.body.collisionFilter.group = -1;
      //teleport
    }

  });


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
    { x: 1320, y: 5050, r: 40, color: 'white'},
    { isStatic: false, friction: 0 }
  );

  marblinTest2 = new Ball(
    world,
    { x: 680, y: 5000, r: 40, color: 'white'},
    { restitution: 0, friction: 0 }
  );

  loverRamp = new Block(
    world,
    { x: 1160, y : 5480, w: 600, h: 10, color: 'yellow' },
    { isStatic: true, label: 'loverRamp', angle: radians(-45) }
  );

  loverPlain = new Block(
    world,
    { x: 1330, y : 5200, w: 100, h: 10, color: 'red' },
    { isStatic: true, label: 'loverPlain' }
  );

  firstPlain = new Block(
    world,
    { x: 680, y : 5600, w: 100, h: 10, color: 'red' },
    { isStatic: true, label: 'firstPlain' }
  );

  firstRamp = new Block(
    world,
    { x: 720, y : 5655, w: 180, h: 10, color: 'red' },
    { isStatic: true, label: 'firstRamp', angle: radians(22) }
  );

  secondRamp = new Block(
    world,
    { x: 910, y : 5730, w: 100, h: 10, color: 'red' },
    { isStatic: true, label: 'secondRamp', angle: radians(-45) }
  );

  secondPlain = new Block(
    world,
    { x: 690, y : 5780, w: 450, h: 10, color: 'red' },
    { isStatic: true, label: 'secondPlain', angle: radians(-3), }
  );

  thirdPlain = new Block(
    world,
    { x: 310, y : 5795, w: 310, h: 10, color: 'red' },
    { isStatic: true, label: 'thirdPlain' }
  );

  blueWall = new Block(
    world,
    { x: 10, y : 5700, w: 300, h: 10, color: 'blue' },
    { isStatic: true, label: 'blueWall', angle: radians(90) }
  );

  bluePlain = new Block(
    world,
    { x: 60, y : 5795, w: 180, h: 10, color: 'blue' },
    { isStatic: true, label: 'bluePlain' }
  );

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondRamp" || bodyB.label === "secondRamp") {
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "thirdPlain" || bodyB.label === "thirdPlain") {
      marblinTest2.body.friction = 0.2;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondPlain" || bodyB.label === "secondPlain") {
      marblinTest2.body.friction = -0.2;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "bluePlain" || bodyB.label === "bluePlain") {
      marblinTest.body.collisionFilter.group = -1;
      loverPlain.body.collisionFilter.group = -1;
    }

  });


  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondRamp" || bodyB.label === "secondRamp") {
      firstRamp.body.collisionFilter.group = -1;
      console.log('test');
    }

  });


  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondRamp" || bodyB.label === "secondRamp") {
      firstRamp.body.collisionFilter.group = -1;
      console.log('test');
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
  scrollFollow(marblin);
  blocks.forEach(block => block.draw());
  lamp.draw();
  house.draw();
        // //collisionen aussschalten
        // marblin.body.collisionFilter.group = -1;
        // house.body.collisionFilter.group = -1;

// loveballs.draw();


  // level 2 setup
  // let transition5position = viewportH * 9.5;
  // const engine = Matter.Engine.create();
  // let world = engine.world;
  // if (stack1) {
  //   loveballs = new Stack(world, {
  //   x: 0, y: transition5position-500, cols: 60, rows: 10, colGap: 1, rowGap: 1, color: 'white',
  //   create: (x, y) => Matter.Bodies.circle(x, y, 15, { restitution: 0.1, friction: -0.1})
  // });
  // Matter.Engine.run(engine);
  // stack1 = false;
  // stack1draw = true;
  // };

  // if (stack1draw){
  // loveballs.draw();}

  //lampe
  lamp.draw();
  loverRamp.draw();
  marblinTest.draw();
  marblinTest2.draw();
  firstPlain.draw();
  firstRamp.draw();
  secondRamp.draw();
  secondPlain.draw();
  thirdPlain.draw();
  bluePlain.draw();
  blueWall.draw();
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

  if (stack1) { 
    stack1.draw();
    
  }

  //level 2
  levelMarblin.draw();
  terrain_9_left.draw();
  terrain_9_right.draw();
  terrain_10_left.draw();
  terrain_10_right.draw();
  terrain_11_left.draw();
  terrain_11_right.draw();
  terrain_9_leftWall.draw();
  terrain_9_rightWall.draw();
  terrain_10_leftWall.draw();
  terrain_10_rightWall.draw();
  terrain_11_leftWall.draw();
  terrain_11_rightWall.draw();
  terrain_11_l.draw();
  terrain_11_middle.draw();
  trennung.draw();
  terrain_11_r.draw();
  terrain_11_links.draw();





  // shatter system/prison

  if(boom){
    ps.display();
    ps.update();
  }else {
    prison.draw();
  }
  // //balls.draw();
  marblin.draw();
  marblin.attract();
  levelMarblin.attract();


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

  //controlFunction1trigger
  if (marblinLover.body.position.x > 1100 && marblinLover.body.position.x < 1150 && marblinLover.body.position.y > 480 && marblinLover.body.position.y < 500) {
    if (controlStarter1){
      controlFunction1();
      controlStarter1 = false;
    }
    //inLove = true;
  }
  if (count) {
    controlFunction1();
    count = false;
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
    let scaleStart = 5977;
    let scaleEnd = 8000;
    let localtarget = map(marblinTest2.body.position.y,groesserAnfang,groesserYEnd,scaleStart,scaleEnd,1)

    while(marblinTest2.body.area < localtarget){
    Matter.Body.scale(marblinTest2.body, 1.03, 1.03);
    }
  }
  //marblinShrinks
  if(marblinShrinks){

    let localtarget = map(marblinTest2.body.position.y,groesserAnfang,groesserYEnd,shrinkScaleStart,shrinkScaleEnd,1);

    while(marblinTest2.body.area > localtarget){
    Matter.Body.scale(marblinTest2.body, 0.99, 0.99);
    }
  }
}



let groesserAnfang;
let groesserYEnd;

let shrinkScaleStart = 0;
let shrinkScaleEnd = 0;

//marblinGrows
let marblinGrows = false;
let marblinShrinks = false;






function collisionSleepOff(){
  console.log("collisions aus");
          //collisionen aussschalten
  ramp2.body.collisionFilter.group = -1;
  marblin.body.collisionFilter.group = -1;
  marblin.body.friction = -0.05;
}







  // for (let cols = 0; cols < 60; cols++) {
  //   for (let rows = 0; rows < 10; rows++) {
  //     ball = new Ball
      
  //   }    
  // }




function keyPressed() {
  let direction = 1;
  switch (keyCode) {


    case 73: // i stack erschaffen
    console.log("adding stack");
    addStack();
    console.log("stack added");
    break;


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
      interval1 = setInterval(shake, 120);


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


    case 70: //F: Marblin Jumps into spotlight and gets bigger
      groesserAnfang = marblinTest2.body.position.y;
      groesserYEnd = marblinTest2.body.position.y+100;
      marblinGrows = true;

      marblinTest2.body.collisionFilter.group = -1;
      firstPlain.body.collisionFilter.group = -1;

      break;

    case 66: //b
      pinterval1 = setInterval(shakePrison, 100);
      break;
    case 81: //Q = Murmel wächst
      groesserAnfang = marblinTest2.body.position.y;
      groesserYEnd = marblinTest2.body.position.y+100;
      marblinGrows = true;
    break;
    case 80:
      shrinkScaleStart = marblinTest2.body.area;
      shrinkScaleEnd = marblinTest2.body.area/3;
      shrinkAnfang = marblinTest2.body.position.y;
      shrinkEnd = marblinTest2.body.position.y+100;
      marblinShrinks = true;
    break;

    case 79: //o
      levelMarblin.body.collisionFilter.group = -1;
      terrain_9.body.collisionFilter.group = -1;
    break;

         // make marblin jump at the beginning
         case 85: // u
         console.log("jump");
         sleepy = false;
         direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
         Matter.Body.applyForce(
           marblin.body,
           {x: marblin.body.position.x, y: marblin.body.position.y},
           {x: (0.05) + marblin.body.velocity.x / 100, y: -0.2}
         );


           break;


    case 86: //v
    if (scroller) {
        scroller = false;
      } else {
        scroller = true;
      }
      break;
    case 69:
      Matter.Body.setPosition(
      marblin.body,
      {x: marblin.body.position.x, y: marblin.body.position.y-100}
      );
    break;

    default:
  }
}


let scroller = false;

function scrollFollow(matterObj) {

      const $element = $('html, body');
        if (scroller){ $element.animate({
            scrollLeft: marblin.body.position.x,
            scrollTop: marblin.body.position.y-500
          }, 10);
        }
  }

  function insideViewport(matterObj) {
    const x = matterObj.body.position.x;
    const y = matterObj.body.position.y;
    const pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;
    const pageYOffset  = window.pageYOffset || document.documentElement.scrollTop;
    if (/*x >= pageXOffset && x <= pageXOffset + windowWidth &&*/
        y >= pageYOffset && y <= pageYOffset + windowHeight) {
      return true;
    } else {
      return false;
    }
  }
