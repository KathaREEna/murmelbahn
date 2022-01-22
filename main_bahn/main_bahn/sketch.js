Matter.use('matter-wrap');

let marblin;
let marblinLover;
let canvasW = 1280;
let canvasH = 720 * 7;
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
let number = 0;
let spiel = [];
let blocks = [];
let theta;
let theta2;

//Color Fade Variables
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




function setup() {
  rectMode(CORNER);
  const canvas = createCanvas(canvasW, canvasH);

  // create an engine
  const engine = Matter.Engine.create();
  const world = engine.world;

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

  // create Main Character MURMEL
  marblin = new Ball(world, {
    x: 300,
    y: 50,
    r: 40,
    color: 'white',
    trigger: (marblin, terrain_1) => {
      console.log("test");
    }
  }, 
  
  {
    restitution: 0,
    plugin: {
      wrap: wrap
    },
  });
  marblinLover = new Ball(world, {
    x: 1100,
    y: 50,
    r: 40,
    color: 'white'
  }, {
    restitution: 0,
    plugin: {
      wrap: wrap
    }
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

  //create house
  house = new PolygonFromSVG(world, {
    x: 100,
    y: 100,
    fromFile: './house.svg',
    scale: 3,
    color: 'white'
  });

  
  seperator_1 = new BlockCore(world, {
    x: viewportW / 2,
    y: viewportH,
    w: viewportW,
    h: 2,
    color: "white"
  }, {
    isStatic: true
  });
  seperator_2 = new BlockCore(world, {
    x: viewportW / 2,
    y: 2 * viewportH,
    w: viewportW,
    h: 2,
    color: "white"
  }, {
    isStatic: true
  });
  seperator_3 = new BlockCore(world, {
    x: viewportW / 2,
    y: 3 * viewportH,
    w: viewportW,
    h: 2,
    color: "white"
  }, {
    isStatic: true
  });
  seperator_4 = new BlockCore(world, {
    x: viewportW / 2,
    y: 4 * viewportH,
    w: viewportW,
    h: 2,
    color: "white"
  }, {
    isStatic: true
  });
  seperator_5 = new BlockCore(world, {
    x: viewportW / 2,
    y: 5 * viewportH,
    w: viewportW,
    h: 2,
    color: "white"
  }, {
    isStatic: true
  });
  seperator_6 = new BlockCore(world, {
    x: viewportW / 2,
    y: 6 * viewportH,
    w: viewportW,
    h: 2,
    color: "white"
  }, {
    isStatic: true
  });
  seperator_7 = new BlockCore(world, {
    x: viewportW / 2,
    y: 7 * viewportH,
    w: viewportW,
    h: 2,
    color: "white"
  }, {
    isStatic: true
  });


  terrain_1 = new BlockCore(world, {
    x: viewportW * 1 / 5,
    y: 620,
    w: viewportW * 4 / 5,
    h: viewportH / 4,
    color: terrainColor
  }, {
    isStatic: true
  });

  terrain_2 = new BlockCore(world, {
    x: viewportW,
    y: 620,
    w: viewportW * 2 / 5,
    h: viewportH / 4,
    color: terrainColor
  }, {
    isStatic: true,
    restitution: 1.0
  });

  // create zwischensequenz 1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // create level 2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let level2position = viewportH * 4.5;
  // marblin als attractor definieren
  attractor = Bodies.circle(400, viewportH * 3, 20, {
    isStatic: false,
    plugin: {
      attractors: [
        function(bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };
        }
      ]
    }
  });
  World.add(engine.world, attractor);

  boxes = Composites.stack(viewportW/2, viewportH * 3, 3, 20, 3, 3, function(x, y) {
    return Bodies.circle(x, y, 10);
  });
  World.add(engine.world, boxes);

  terrain_9 = new BlockCore(world, {
    x: viewportW/2,
    y: level2position-viewportH/3,
    w: viewportW,
    h: viewportH/3,
    color: "darkblue"
  });
  terrain_10 = new BlockCore(world, {
    x: viewportW/2,
    y: level2position,
    w: viewportW,
    h: viewportH/3,
    color: "#050B4E"
  });
  terrain_11 = new BlockCore(world, {
    x: viewportW/2,
    y: level2position+viewportH/3,
    w: viewportW,
    h: viewportH/3,
    color: "black"
  });


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



  // create level 7 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let level7position = viewportH * 6.5;
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



function draw() {
  background(backgroundColor);
  
  blocks.forEach(block => block.draw());
  marblin.draw();
  house.draw();
        //collisionen aussschalten
        // marblin.body.collisionFilter.group = -1
        // house.body.collisionFilter.group = -1

  marblinLover.draw();
  sun_moon.draw();
  terrain_1.draw();
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

  //balls.draw();
  seperator_1.draw();
  seperator_2.draw();
  seperator_3.draw();
  seperator_4.draw();
  seperator_5.draw();
  seperator_6.draw();
  seperator_7.draw();

// attractors config
  noStroke();
  fill(255);
  drawBodies(boxes.bodies);
  drawBody(attractor);

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
  /*
  if (marblin.body.position.x > 260 && marblin.body.position.x < 300 && marblin.body.position.y > 480 && marblin.body.position.x < 500) {
    sleepy = true;
  } else {
    sleepy = false;
  }*/

  //SLEEPY
  if (sleepy) {
    //fill(color(0,180,255));
    //rectMode(CENTER);
    //rect(marblin.body.position.x-30,marblin.body.position.y+15,200,50);
    //rect(marblin.body.position.x-120,marblin.body.position.y,20,60);
    //rect(marblin.body.position.x+60.5,marblin.body.position.y,20,80);

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



function keyPressed() {
  let direction = 1;
  switch (keyCode) {
    case 90: //z
      console.log("collisions aus");
              //collisionen aussschalten
      marblin.body.collisionFilter.group = -1
      house.body.collisionFilter.group = -1
      break;
    case 32:
      //TerrainColors
      newR = 101;
      newG = 67;
      newB = 33;
      intervalTERRAIN = setInterval(colorFadeTERRAIN, 5);
      //backgroundColor 205, 105, 255
      bgnewR = 205;
      bgnewG = 105;
      bgnewB = 255;
      intervalBG = setInterval(colorFadeBG, 1);

      sunnewR = 255;
      sunnewG = 255;
      sunnewB = 0;
      intervalSUN = setInterval(colorFadeSUN,200);

      break;

    default:
  }
}
