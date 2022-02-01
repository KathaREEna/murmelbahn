Matter.use('matter-wrap');


Matter.use('matter-attractors');

let cnvs, ctx;


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

let loveballser = false;
let loveballs = [];


//spotlight lampe
let loverRamp;
let lampStatus = false;
let marblinTest2;
let marblinLover2; //war mal marblinTest
let loverPlain;
let firstPlain;
let firstRamp;
let secondRamp;
let secondPlain;
let thirdPlain;
let blueWall;
let bluePlain;
let bluePLain2;
let marblinPulley;
let plainPulley;
let bottomPulley;
let miniRamp;

//gradient steps
// let marblin;
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
let terrain_10_links;

let underplain_Left;
let underplain_right;




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
let jumper3 = false;

// übergang 5, fountain
let particles = [];

const engine = Matter.Engine.create();
let world = engine.world;

/////////////////////////////// setup level 2

let level2position = viewportH * 4.5;

let stack1;
let stack2;
let stack3;
function addStack1(){
  stack1 = new Stack(world, {
    x: -200, y: level2position-470 , cols: 2, rows: 5, colGap: 15, rowGap: 20, color: 'red',
    create: (x, y) => Matter.Bodies.circle(x, y, 20, { restitution: 0, friction: 0.3})
  });
  marblin.addAttracted(stack1.body.bodies);
};


function removeStack1() {
  Matter.World.remove(engine.world, stack1.body);
  stack1 = undefined;
};

function addStack2(){
  stack2 = new Stack(world, {
    x: -200, y: level2position-200 , cols: 2, rows: 5, colGap: 15, rowGap: 20, color: 'red',
    create: (x, y) => Matter.Bodies.circle(x, y, 20, { restitution: 1.0, friction: 0.1})
  });
  marblin.addAttracted(stack2.body.bodies);
};


function removeStack2() {
  Matter.World.remove(engine.world, stack2.body);
  stack2 = undefined;
};

function addStack3(){
  stack3 = new Stack(world, {
    x: 1480, y: level2position-100 , cols: 2, rows: 5, colGap: 15, rowGap: 20, color: 'red',
    create: (x, y) => Matter.Bodies.circle(x, y, 20, { restitution: 0.8, friction: 0.2, density: 0.008})
  });
  marblin.addAttracted(stack3.body.bodies);
};


function removeStack3() {
  Matter.World.remove(engine.world, stack3.body);
  stack3 = undefined;
};




function preload() {
  const engine = Matter.Engine.create();
  let world = engine.world;
  //create house
  house = new PolygonFromSVG(world, {
    x: 350,
    y: 417,
    fromFile: './house.svg',
    scale: 3,
    color: color(houseactualR,houseactualG,houseactualB)
  },
  { isStatic: true}
  );
  // Matter.World.remove(engine.world, house.body);


  img = loadImage('./spotlight.png');


  let levelmover = viewportH;

  let level4position = viewportH * 7.5;
  lamp = new PolygonFromSVG(world, {
    x: viewportW / 2 +200,
    y: level4position + 200 + levelmover,
    fromFile: './lamp.svg',
    scale: 1,
    color: 'yellow'
  },
  { isStatic: true}
  );
  // Matter.World.remove(engine.world, lamp.body);


  Matter.Engine.run(engine);
}

function setup() {
  rectMode(CORNER);
  const canvs = createCanvas(canvasW, canvasH);
  cnvs = document.getElementById('defaultCanvas0');
  ctx = canvas.getContext('2d');


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
  marblin = new Magnet(world, {
    x: 350,
    y: 50,
    r: 40,
    color: 'white',
    attraction: 0.25e-5
  },
  {
    restitution: 0,
    friction: 0,
    label: "marblin",
    plugin: {
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
     marblinLover.body.friction = 0.0001;
     prison.body.collisionFilter.group = -1;
     terrain_9.body.collisionFilter.group = -1;
    }

  });

  marblinLover = new Ball(world, {
    x: 1350,
    y: 250,
    r: 40,
    color: "#D64942"
  }, {
    friction: 0.00,
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
    x: viewportW * 1 / 5 + 85,
    y: 500,
    w: 30,
    h: 30,
    color: terrainColor
  }, {
    isStatic: true, angle: radians(45), label: 'ramp'
  });

  ramp2 = new BlockCore(world, {
    x: viewportW * 1 / 5+100,
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
    x: (viewportW * 1 / 5)-50,
    y: 620,
    w: viewportW * 3 / 5,
    h: viewportH / 4,
    color: terrainColor
  }, {
    isStatic: true,
    label: "terrain_1"
  });

  terrain_1edge = new BlockCore(world, {
    x: (viewportW * 3 / 5)-50,
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


  //Stairs left to right

  createStair456();
  createStairENDattractor();
/*
  stair7 = new Block(
    world,
    { x: 100, y : 2640, w: 1100, h: 110, color: '#1CD0F8' },
    { isStatic: true, restitution: 1, label: 'stair7' }
  );*/





  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stair4" || bodyB.label === "stair4") {
      //drawStair3 = false;
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
    color: "#0025c9"
  }, { isStatic: true });
  Matter.World.remove(engine.world, terrain_9.body);

//First Level Auserhalb Plains
  terrain_9_left = new BlockCore(world, {
    x: -350,
    y: 3130,
    w: 700,
    h: 20,
    color: "red"
  }, { isStatic: true });

  terrain_9_right = new BlockCore(world, {
    x: 1730,
    y: 3130,
    w: 900,
    h: 20,
    color: "pink"
  }, { isStatic: true, label: 'terrain_9_right' });

  //First Level Auserhalb Walls
  terrain_9_leftWall = new BlockCore(world, {
    x: -520,
    y: 3290,
    w: 220,
    h: 20,
    color: "pink"
  }, { isStatic: true, angle: radians(45) });

  terrain_9_rightWall = new BlockCore(world, {
    x: 2190,
    y: 3040,
    w: 200,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(90), label: 'terrain_9_rightWall' });

//Second Level
  terrain_10 = new BlockCore(world, {
    x: 800,
    y: level2position,
    w: 960,
    h: viewportH/3,
    color: "darkblue"
  }, { isStatic: true, label: 'terrain_10' });

  //Second Level
  terrain_10_links = new BlockCore(world, {
    x: 160,
    y: level2position,
    w: 320,
    h: viewportH/3,
    color: "darkblue"
  }, { isStatic: true, label: 'terrain_10_links' });

//Second Level Auserhalb Plains
  terrain_10_left = new BlockCore(world, {
    x: -350,
    y: 3370,
    w: 700,
    h: 20,
    color: "darkblue"
  },{ isStatic: true });

  terrain_10_right = new BlockCore(world, {
    x: 1630,
    y: 3370,
    w: 700,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, label: 'terrain_10_right' });

  //Second Level Auserhalb Walls
  terrain_10_leftWall = new BlockCore(world, {
    x: -760,
    y: 3280,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(45) });

  terrain_10_rightWall = new BlockCore(world, {
    x: 1990,
    y: 3280,
    w: 200,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(90), label: "terrain_10_rightWall" });

//Third Level Auserhalb Plains
  terrain_11 = new BlockCore(world, {
    x: 960,
    y: level2position+viewportH/3,
    w: viewportW/2,
    h: viewportH/3,
    color: "#000c42"
  }, { isStatic: true, label: 'terrain_11'});

  terrain_11_links = new BlockCore(world, {
    x: 320,
    y: level2position+viewportH/3,
    w: viewportW/2,
    h: viewportH/3,
    color: "#000c42"
  }, { isStatic: true, label: 'terrain_11_links' });

  terrain_11_right = new BlockCore(world, {
    x: 1630,
    y: 3610,
    w: 700,
    h: 20,
    color: "darkblue"
  }, { isStatic: true });

//Trigger Rechts unter Third Level
  terrain_11_r = new BlockCore(world, {
    x: 1270,
    y: 3610,
    w: viewportW/2,
    h: 20,
    color: "red"
  }, { isStatic: true, label: "terrain_11_r"});

//Trigger Mitte unter Third Level
  terrain_11_middle = new BlockCore(world, {
    x: 640,
    y: 3610,
    w: viewportW/2,
    h: 20,
    color: "orange"
  }, { isStatic: true, label: "terrain_11_middle" });

//Trigger Links unter Third Level
  terrain_11_l = new BlockCore(world, {
    x: 160,
    y: 3610,
    w: viewportW/4,
    h: 20,
    color: "yellow"
  }, { isStatic: true, label: "terrain_11_l" });

//Third Level Auserhalb Plains
  terrain_11_left = new BlockCore(world, {
    x: -350,
    y: 3610,
    w: 700,
    h: 20,
    color: "darkblue"
  }, { isStatic: true });

//Third Level Auserhalb Walls
  terrain_11_leftWall = new BlockCore(world, {
    x: -760,
    y: 3520,
    w: 220,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(45) });

  terrain_11_rightWall = new BlockCore(world, {
    x: 1990,
    y: 3520,
    w: 200,
    h: 20,
    color: "darkblue"
  }, { isStatic: true, angle: radians(90) } );

//Wall zwischen Third Level
  // trennung = new BlockCore(world, {
  //   x: 840,
  //   y: 3525,
  //   w: 150,
  //   h: 20,
  //   color: "#000c42"
  // }, { isStatic: true, angle: radians(90) } );

  // marblin = new Magnet(world, {
  //   x: viewportW/2,
  //   y: 2800,
  //   r: 40,
  //   color: 'white',
  //   attraction: 0.015e-5
  // }, {
  //   label: "labelMarblin",
  //   friction: 0,
  //   restitution: 0,
  // });

//Ball gains friction and starts rolling
  // Matter.Events.on(engine, 'collisionStart', function(event) {
  //   const pairs = event.pairs[0];
  //   const bodyA = pairs.bodyA;
  //   const bodyB = pairs.bodyB;
  //   if (bodyA.label === "terrain_10" || bodyB.label === "terrain_10") {
  //       marblin.body.friction = 0;
  //   }

  // });

  //red balls touch ground, marblin jumps and runs away
  let jumpPrevent = true
  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "terrain_10_links" || bodyB.label === "terrain_10_links") {
      marblin.body.friction = -0.04;
      if (jumpPrevent){
      jumper = true;
      jumpPrevent = false;
    }

    };
  });

//Ball rolls right and ends up lower
  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "terrain_9_rightWall" || bodyB.label === "terrain_9_rightWall") {
      console.log('test');
      Matter.Body.setPosition(
        marblin.body,
        {x: -100, y: 3270}
        );
        //teleport
        // jumper = true;
        removeStack1();
        Matter.World.remove(engine.world, terrain_9_leftWall.body);
        Matter.World.remove(engine.world, terrain_9_left.body);
        Matter.World.remove(engine.world, terrain_10.body);
        Matter.World.remove(engine.world, terrain_10_links.body);
        Matter.World.add(engine.world, terrain_9.body);
    }

  });

//Ball rolls right again and ends up on lowest level

Matter.Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs[0];
  const bodyA = pairs.bodyA;
  const bodyB = pairs.bodyB;
  if (bodyA.label === "terrain_10_rightWall" || bodyB.label === "terrain_10_rightWall") {
    console.log('test');
    Matter.Body.setPosition(
      marblin.body,
      {x: -40, y: 3510}
      );
      //teleport
      removeStack2();
      Matter.World.remove(engine.world, terrain_10_leftWall.body);
      Matter.World.remove(engine.world, terrain_10_links.body);
      Matter.World.remove(engine.world, terrain_11.body);
      Matter.World.remove(engine.world, terrain_11_links.body);
      Matter.World.add(engine.world, terrain_10.body);
      Matter.World.add(engine.world, terrain_10_links.body);
  }

});
// marblin enters 1. time from left, triggers stack2

let stackPrevent = true;
Matter.Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs[0];
  const bodyA = pairs.bodyA;
  const bodyB = pairs.bodyB;
  if (bodyA.label === "terrain_11_links" || bodyB.label === "terrain_11_links") {
    if (stackPrevent){
    marblin.body.friction = -0.08;
    addStack2();
    stackPrevent = false;
    };
  }
});


// marblin slows down 3. stage
Matter.Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs[0];
  const bodyA = pairs.bodyA;
  const bodyB = pairs.bodyB;
  if (bodyA.label === "terrain_11_l" || bodyB.label === "terrain_11_l") {
    stackPrevent = true;
    if (stackPrevent){
    marblin.body.friction = 0;
    stackPrevent = false;
    };
  }
});


// marblin entered 3. stage and triggers stack near middle
let stackPrevent2 = true;
Matter.Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs[0];
  const bodyA = pairs.bodyA;
  const bodyB = pairs.bodyB;
  if (bodyA.label === "terrain_11_middle" || bodyB.label === "terrain_11_middle") {
    if (stackPrevent2){
      addStack3();
    stackPrevent2 = false;
    };

    Matter.World.remove(engine.world, terrain_10_right.body);
    Matter.World.remove(engine.world, terrain_10_rightWall.body);
  }

});


// red balls enter and trigger jump marblin stage 3
jumper2 = false;
jumpPrevent2 = true;
Matter.Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs[0];
  const bodyA = pairs.bodyA;
  const bodyB = pairs.bodyB;
  if (bodyA.label === "terrain_11_r" || bodyB.label === "terrain_11_r") {
    if (jumpPrevent2){ //nur einmal jumpen
    jumper2 = true;
    jumpPrevent2 = false;
    terrain_11_middle.body.collisionFilter.group = -1;
    marblin.body.collisionFilter.group = -1;
    prison.body.collisionFilter.group = -1;

    }
  }
});

Matter.Events.on(engine, 'collisionStart', function(event) {
  const pairs = event.pairs[0];
  const bodyA = pairs.bodyA;
  const bodyB = pairs.bodyB;
  if (bodyA.label === "trennung" || bodyB.label === "trennung") {
      marblin.body.friction = 1;
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
          color: "#382307"
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

  //remove vorhang
  //blocks.forEach(block => Matter.World.remove(engine.world, block.body));





  // create level 3 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  level3position = viewportH * 6.5;

  // variablen: ParticleSystem(x, y, r)
  // r ist höhe und breite eines particles
  // ParticleSystem besteht aus 15 reihen und 15 columns, zu ändern in particlesystem.js
  prisonSize = 25;
  //ps = new ParticleSystem(viewportW/2, level3position-184, prisonSize);

  prison = new BlockCore(world, {
    x: viewportW/2,
    y: level3position,
    w: 15*prisonSize,
    h: 15*prisonSize,
    color: "#6B420D"
  },{ isStatic: false });

 terrain_12 = new BlockCore(world, {
    x: viewportW/2,
    y: level3position+viewportH/6*2,
    w: viewportW,
    h: viewportH/3,
    color: "#382307"
  },{ isStatic: true, label: "terrain_12"});


  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "marblin", bodyB.label === "terrain_12") {
      console.log('setPosition x: viewportW/2, y: 4759');
      Matter.Body.setPosition(
        marblin.body,
        {x: viewportW/2, y: 4759}
        );
        //teleport
        // removeStack2();
        // Matter.World.remove(engine.world, terrain_10_leftWall.body);
        // Matter.World.remove(engine.world, terrain_10_links.body);
        // Matter.World.remove(engine.world, terrain_11.body);
        // Matter.World.remove(engine.world, terrain_11_links.body);
        // Matter.World.add(engine.world, terrain_10.body);
        // Matter.World.add(engine.world, terrain_10_links.body);
    }});


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



  //create lampe level + 2*viewportH







  let levelmover = viewportH

  marblinLover2 = new Magnet(
    world,
    { x: 1330, y: 5050, r: 55, color: 'red'},
    { isStatic: false, friction: 0, attraction: 0.25e-5 }
  );

  /*
  marblinTest2 = new Ball(
    world,
    { x: 640, y: 5000+ levelmover, r: 40, color: 'white'},
    { restitution: 0, friction: 0 }
  );
  */

  marblinPulley = new Ball(
    world,
    { x: 200, y: 4500+ levelmover, r: 40, color: 'white'},
    { restitution: 0, friction: 0 }
  );

  plainPulley = new Block(
    world,
    { x: 200, y : 4700 + levelmover, w: 100, h: 10, color: 'white' },
    { isStatic: true, label: 'plainPulley' }
  );

  bottomPulley= new Block(
    world,
    { x: 200, y : 5500 + levelmover, w: 100, h: 10, color: 'white' },
    { isStatic: true, label: 'bottomPulley' }
  );

  miniRamp = new Block(
    world,
    { x: 810, y : 5807 + levelmover, w: 30, h: 20, color: 'white' },
    { isStatic: true, label: 'miniRamp', angle: radians(-30) }
  );

  loverRamp = new Block(
    world,
    { x: 1160, y : 5520 + levelmover, w: 600, h: 10, color: 'red' },
    { isStatic: true, label: 'loverRamp', angle: radians(-45) }
  );

  loverPlain = new Block(
    world,
    { x: 1330, y : 5200 + levelmover, w: 100, h: 10, color: 'red' },
    { isStatic: true, label: 'loverPlain' }
  );

  firstPlain = new Block(
    world,
    { x: 640, y : 5620 + levelmover, w: 100, h: 10, color: 'red' },
    { isStatic: true, label: 'firstPlain' }
  );

  firstRamp = new Block(
    world,
    { x: 710, y : 5645 + levelmover, w: 180, h: 10, color: 'red' },
    { isStatic: true, label: 'firstRamp', angle: radians(10) }
  );

  secondRamp = new Block(
    world,
    { x: 910, y : 5760 + levelmover, w: 100, h: 10, color: 'red' },
    { isStatic: true, label: 'secondRamp', angle: radians(-30) }
  );

  secondPlain = new Block(
    world,
    { x: 690, y : 5792 + levelmover, w: 450, h: 10, color: 'blue' },
    { isStatic: true, label: 'secondPlain' }
  );

  thirdPlain = new Block(
    world,
    { x: 308, y : 5796 + levelmover, w: 314, h: 10, color: 'red' },
    { isStatic: true, label: 'thirdPlain' }
  );

  blueWall = new Block(
    world,
    { x: 20, y : 5701 + levelmover, w: 300, h: 10, color: 'blue' },
    { isStatic: true, label: 'blueWall', angle: radians(90) }
  );

  bluePlain = new Block(
    world,
    { x: 50, y : 5797 + levelmover, w: 100, h: 10, color: 'blue' },
    { isStatic: true, label: 'bluePlain' }
  );

  bluePlain2 = new Block(
    world,
    { x: 125, y : 5797 + levelmover, w: 51, h: 10, color: 'orange' },
    { isStatic: true, label: 'bluePlain2' }
  );

  underplain_left = new Block(
    world,
    { x: 308, y : 5797 + levelmover, w: 314, h: 10, color: 'pink' },
    { isStatic: true, label: 'underplain_left' }
  );

  underplain_right = new Block(
    world,
    { x: 690, y : 5796 + levelmover, w: 450, h: 10, color: 'green' },
    { isStatic: true, label: 'underplain_right' }
  );

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "firstPlain" || bodyB.label === "firstPlain") {
      lampStatus = true;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondPlain" || bodyB.label === "secondPlain") {
      marblin.body.friction = 1;

      Matter.World.remove(engine.world, plainPulley.body);
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "thirdPlain" || bodyB.label === "thirdPlain") {
      marblin.body.friction = 0.05;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "bottomPulley" || bodyB.label === "bottomPulley") {
      nudger = true;
      marblinLover2.attrs.attraction = 0.6e-4;
      marblinLover2.isActive = 0.6e-4;
      marblin.body.collisionFilter.group = -1;
      marblinLover2.body.collisionFilter.group = -1;
      Matter.World.remove(engine.world, secondPlain.body);
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "loverRamp" || bodyB.label === "loverRamp") {
      marblinLover2.body.friction = 0.2;
      Matter.World.remove(engine.world, miniRamp.body);
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "bluePlain" || bodyB.label === "bluePlain") {
      marblin.body.friction = 1;
      Matter.World.remove(engine.world, secondPlain.body);
      Matter.World.remove(engine.world, loverPlain.body);
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "bluePlain2" || bodyB.label === "bluePlain2") {
      marblin.body.friction = 1;
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "blueWall" || bodyB.label === "blueWall") {
      marblin.body.friction = 1;
    }

  });


  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "secondRamp" || bodyB.label === "secondRamp") {
      Matter.World.remove(engine.world, firstRamp.body);
    }

  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "underplain_right" || bodyB.label === "underplain_right") {
      marblinLover2.body.friction = 1;
    }

  });



    // create liebestaumel
    // let taumelposition = viewportH * 9.5;

    // magnet1 = new Magnet(world, {
    //   x: 350,
    //   y: taumelposition+350,
    //   r: 40,
    //   color: 'white',
    //   attraction: 0.35e-5
    // },
    // {
    //   restitution: 0,
    //   friction: 0,
    //   label: "marblin",
    //   isStatic: true,
    //   plugin: {
    //   },
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
  terrainColor = color(actualR, actualG, actualB);
  ctx.shadowColor = color("rgba(0, 0, 0, 0.5)");
  ctx.shadowBlur = 0;
    //lampe
  if (lampStatus) {
  image(img, 150, viewportH * 7+450, 1500, 1200);
  };

  scrollFollow(marblin);


  blocks.forEach(block => block.draw());

        // //collisionen aussschalten
        // marblin.body.collisionFilter.group = -1;
        // house.body.collisionFilter.group = -1;





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

  // level 2 trigger
  if (jumper){
    fleeJump();
    console.log("jumped");
    jumper = false;
  }

  if (jumper2){
    fleeJump2();
    jumper2 = false;
  }


  // level 3 trigger

  if (jumper3){
    jumpUp();
    jumper3 = false;

    //Color Fade to DARKNESS
    changeColorToDarkness();
    controlCounter = 7;
    marblin.body.friction = 0;
    console.log("jumped and STARTED DARKNESS");
  }

  //BÄUMLI
  theta = map(marblin.body.position.x, 350, width, 0, PI / 4);
  theta2 = map(marblinLover.body.position.x, 0, 1350, PI / 1.5, 0);
  //theta = 0.4
  push();
  translate(width / 2, 526+5);
  stroke(color(houseactualR,houseactualG,houseactualB));
  branch(80);
  translate(500, 80);
  stroke(color(houseactualR,houseactualG,houseactualB));
  branch2(80);
  pop();






  //draw the stairs
  ctx.shadowBlur = 100;
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
    //stairBegrenzungLinks.draw();
  }

  if (drawStair5) {
    stair5.draw();
  }

  if (drawStair6) {
    stair6.draw();
  }

  if (drawStairEND) {
    stairEND.draw();
  }
  ctx.shadowBlur = 0;



  //loverRamp.draw();
  //marblinTest2.draw();
  firstPlain.draw();
  firstRamp.draw();
  secondRamp.draw();
  secondPlain.draw();
  thirdPlain.draw();
  bluePlain.draw();
  bluePlain2.draw();
  blueWall.draw();
  loverPlain.draw();
  underplain_left.draw();
  underplain_right.draw();
  plainPulley.draw();
  bottomPulley.draw();
  marblinPulley.draw();
  miniRamp.draw();



  push();
  ctx.shadowColor = "yellow";
  ctx.shadowBlur = 200;
  sun_moon.draw();
  pop();


  terrain_1.draw();
  terrain_1edge.draw();
  // ramp.draw();
  // ramp2.draw();
    ramp3.draw();
    ramp4.draw();
    ctx.shadowBlur = 100;
  terrain_2.draw();
  ctx.shadowBlur = 0;
  // house.draw();
  // terrain_4.draw();
  // terrain_5.draw();
  // terrain_6.draw();
  // terrain_7.draw();
  // terrain_8.draw();

  //level 2
  terrain_10_links.draw();

  let level2position2 = viewportH * 4.5 + viewportH*0.5;
  /// level 2
  push();
  ctx.shadowBlur = 100;

  fill("#8F5811");
  rect (0,level2position2-viewportH*3/3,viewportW,viewportH/3)

  fill("#6B420D");
  rect (0,level2position2-viewportH*2/3,viewportW,viewportH/3)
  fill("#382307");
  rectMode(CORNER);
  rect (0,level2position2-viewportH/3,viewportW,viewportH/3)
  ctx.shadowBlur = 0;
  // ctx.shadowBlur = 100;
  // terrain_9.draw();
  // terrain_10.draw();
  // terrain_11.draw();
  // ctx.shadowBlur = 0;
  // terrain_11_links.draw();
  // ctx.shadowBlur = 100;


  // ctx.shadowBlur = 0;






  stair4attractor.attract();
  stair5attractor.attract();
  stair6attractor.attract();
  stairENDattractor.attract();

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
  // terrain_11_l.draw();
  // terrain_11_middle.draw();
  // trennung.draw();
  // terrain_11_r.draw();

  if (stack1) {
    stack1.draw();
  }
  if (stack2) {
    stack2.draw();
  }
  if (stack3) {
    stack3.draw();
  }


  // shatter system/prison
  ctx.shadowBlur = 100;


  // //balls.draw();
  ctx.shadowBlur = 0;
  ctx.shadowBlur = 100;
  fill(terrainColor);
  rectMode(CORNER);
  rect (-178,530,viewportW * 3 / 5 + viewportW * 1 / 5,viewportH / 4)


  //level 4
  terrain_12.draw();
  ctx.shadowBlur = 0;

  marblin.draw();
  marblin.attract();

  ctx.shadowBlur = 100;
  if(boom){
    if (boomtransparency >0){
      boomtransparency-=2;
    }
    ps.display();
    ps.update();
  }else {
    prison.draw();
  }
  ctx.shadowBlur = 0;

  house.draw();
  if(marblinLoverDraw){
    marblinLover2.draw();
    marblinLover2.attract();
  }

  //  ove.draw();

  //Bäume Mappen
  theta = map(marblin.body.position.x, 300, 740, 0, PI / 4);



  //STAIR TRIGGER DYNAMIX
  if (marblin.body.position.y > 1350 && marblin.body.position.y < 1400) {
    if (stair1trigger){ //nur einmal auslösen
      createStair1();
      drawStair1 = true;
      stair1trigger = false;
      clearInterval(stairInterval);
      stairInterval = setInterval(onStairShake,100);
      console.log("STAIR 1!!!!!!!");
    }
  }

  if (marblin.body.position.y > 1550 && marblin.body.position.y < 1600) {
    if (stair2trigger){ //nur einmal auslösen
      console.log("STAIR 2!!!!!!!");
      createStair2();
      drawStair2 = true;
      stair2trigger = false;
      clearInterval(stairInterval);
      stairInterval = setInterval(onStairShake,100);
    }
  }

  if (marblin.body.position.y > 1750 && marblin.body.position.y < 1800) {
    if (stair3trigger){ //nur einmal auslösen
      console.log("STAIR 3!!!!!!!");
      createStair3();
      drawStair3 = true;
      stair3trigger = false;
      clearInterval(stairInterval);
      stairInterval = setInterval(onStairShake,100);
    }
  }
//420
  if (marblin.body.position.y > 2290 && marblin.body.position.y < 2310) {
    if (stair4trigger){ //nur einmal auslösen
      console.log("STAIR 4!!!!!!!");
      stair4attractor.addAttracted(marblin.body);
        console.log("stair4attr. add attracted");
      drawStair4 = true;
      stair4trigger = false;
      leftright = 1;
      clearInterval(stairInterval);
      stairInterval = setInterval(onStairShake,100);
    }
  }

  if (marblin.body.position.y > 2470 && marblin.body.position.y < 2490) {
    if (stair5trigger){ //nur einmal auslösen
      console.log("STAIR 5!!!!!!!");
      stair5attractor.addAttracted(marblin.body);
      drawStair5 = true;
      stair5trigger = false;
      leftright = 1;
      clearInterval(stairInterval);
      stairInterval = setInterval(onStairShake,100);
    }
  }

  if (marblin.body.position.y > 2650 && marblin.body.position.y < 2670) {
    if (stair6trigger){ //nur einmal auslösen
      console.log("STAIR 6!!!!!!!");
      stair6attractor.addAttracted(marblin.body);
      drawStair6 = true;
      stair6trigger = false;
      leftright = 1;
      clearInterval(stairInterval);
      stairInterval = setInterval(onStairShake,100);
    }
  }


  ////STAIR AT THE END
  if (marblin.body.position.y > 6900 && marblin.body.position.y < 6950) {
    if (stairENDtrigger){ //nur einmal auslösen
      console.log("STAIR at the END!!!!!!!");
      createStairEND();
      stairENDtrigger = false;
      stairENDattractor.addAttracted(marblin.body);
      drawStairEND = true;
      endInterval = setInterval(endJump, 500);
    }
  }


  //marblinLover2 Trigger for MERGE
  if (marblinLover2.body.position.x > 510 && marblinLover2.body.position.x < 520) {
    if (mergetrigger){ //nur einmal auslösen
      marblinLover2.addAttracted(marblin.body);
      console.log("sie werden eins");
    }
    mergetrigger = false;
  }

  if ((marblinLover2.body.position.x - marblin.body.position.x) < 100) {
    if (inlove2trigger){ //nur einmal auslösen
      inLove = true;
    }
    inlove2trigger = false;
  }





  // ove.draw();

  //sleepyTrigger
  if (marblin.body.position.x > 340 && marblin.body.position.x < 400 && marblin.body.position.y > 400 && marblin.body.position.y < 500) {
    sleepy = true;
  } else {
    sleepy = false;
  }





  //controlFunction1trigger
  if (marblinLover.body.position.x > 1040 && marblinLover.body.position.x < 1100 && marblinLover.body.position.y > 480 && marblinLover.body.position.y < 500) {
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
    let scaleStart = 4900;
    let scaleEnd = 9000;
    let localtarget = map(marblin.body.position.y,groesserAnfang,groesserYEnd,scaleStart,scaleEnd,1)

    while(marblin.body.area < localtarget){
    Matter.Body.scale(marblin.body, 1.01, 1.01);
    }
  }
  //marblinShrinks
  if(marblinShrinks){

    let localtarget = map(marblin.body.position.y,groesserAnfang,groesserYEnd,shrinkScaleStart,shrinkScaleEnd,1);

    while(marblin.body.area > localtarget){
    Matter.Body.scale(marblin.body, 0.99, 0.99);
    }
  }

  if (loveballser){
    loveballs.draw();
    };
// draw liebestaumel
  // magnet1.draw();




  if (nudger) {
    if (nudgeCount < 30) {
      nudgeCount++;
    } else {
    nudge("left",0.5);
    console.log("nudge left");
    marblin.body.friction = 0;
    nudger = false;
    }
  }
  /*
  stair4attractor.draw();
  stair5attractor.draw();
  stair6attractor.draw();
  stairENDattractor.draw();
  */

  // masks

  marblinLover.draw();

    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
    //END OF DRAW FUNCTION END OF DRAW FUNCTION END OF DRAW FUNCTION
}






// level 2 trigger
let jumper = false

let groesserAnfang;
let groesserYEnd;

let shrinkScaleStart = 0;
let shrinkScaleEnd = 0;

//marblinGrows
let marblinGrows = false;
let marblinShrinks = false;

let jumpalternator = true;



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

    case 48: //0 Color Fade nach spotlight
      changeColorAfterSpotlight();
      break;
    case 49: // 1 addStack1
      console.log("adding stack");
      addStack1();
      console.log("stack added");
      break;

    case 50: // 2 addStack2
      console.log("adding stack");
      addStack2();
      console.log("stack added");
      break;

    case 51: // 3 addStack3
      console.log("adding stack");
      addStack3();
      console.log("stack added");
      break;

    case 52: // 4 removeStack1
      removeStack1();
      break;

    case 53: // 5 removeStack2
      removeStack2();
      break;

    case 54: // 6 removeStack3
      removeStack3();
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
    case 83: //S
      console.log("pressed s --> shaking ball");
      //interval1 = setInterval(shake, 120);
      stairInterval = setInterval(onStairShake,100);
      break;

    case 76: //L inLove
      toggleInLove();
      break;


    case 71: // G gravity attractor on
    fleeJump();
      break;


    case 72: // H gravity attractor off
      marblin.body.plugin.attractors = "";

      break;


    case 70: //F: Marblin Jumps into spotlight and gets bigger
      groesserAnfang = marblin.body.position.y;
      groesserYEnd = marblin.body.position.y+100;
      marblinGrows = true;
      Matter.World.remove(engine.world, firstPlain.body);
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
      Matter.World.remove(engine.world, terrain_9.body);
      break;

   // make marblin jump at the beginning
   case 85: // u
     //first jump
     if (jumpalternator){
       jumpalternator = false;
       jumpIntoAbyss();
     } else {
       smallJump();
       jumpalternator = true;
     }
     //second Jump

     break;

   case 85: // u
     //first jump
     if (jumpalternator){
       jumpalternator = false;
       jumpIntoAbyss();
     } else {
       smallJump();
       jumpalternator = true;
     }
     //second Jump

     break;

     case 77: // M
     //make loveballs spawn

     let transition5position = viewportH * 8.5;

    // remove all terrains of spotlight level
     Matter.World.remove(engine.world, loverRamp.body);
     Matter.World.remove(engine.world, loverPlain.body);
     Matter.World.remove(engine.world, firstPlain.body);
     Matter.World.remove(engine.world, firstRamp.body);
     Matter.World.remove(engine.world, secondRamp.body);
     Matter.World.remove(engine.world, secondPlain.body);
     Matter.World.remove(engine.world, thirdPlain.body);
     Matter.World.remove(engine.world, blueWall.body);
     Matter.World.remove(engine.world, bluePlain.body);
     Matter.World.remove(engine.world, bluePlain2.body);
     Matter.World.remove(engine.world, underplain_left.body);
     Matter.World.remove(engine.world, underplain_right.body);
     Matter.World.remove(engine.world, underplain_right.body);

     // spawn loveballs, trigger draw function
     loveballs = new Stack(world, {
       x: 0, y: transition5position-500, cols: 60, rows: 10, colGap: 1, rowGap: 1, color: 'white',
       create: (x, y) => Matter.Bodies.circle(x, y, 15, { restitution: 0.1, friction: -0.1})
     });
    //  loveballs.body.bodys.collisionFilter.group = -1;
     marblin.body.collisionFilter.group = -2;
     loveballser = true;

     break;




    case 86: //v
    if (scroller) {
        scroller = false;
      } else {
        scroller = true;
      }
      break;
    case 69: //e
      Matter.Body.setPosition(
      marblin.body,
      {x: mouseX, y: mouseY}
      );
      break;
    case 84: //t
      stair4attractor.addAttracted(marblin.body);
      console.log("stair4attractor.addAttracted(marblin.body);")
      break;
    case 88:
      jumpUp2();
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
