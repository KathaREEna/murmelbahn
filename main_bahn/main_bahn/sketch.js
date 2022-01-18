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


//sleepy animation
let sleepy = false;
let sleepyLoop = 100;
let sleepyPosition = 0;
let sleepyOffsetX = 30;
let sleepyOffsetY = 40;


let backgroundColor = "blue";
let terrainColor = "darkblue";
let sun_moonColor = "#EBE0C5";



function preload() {
  house = loadImage('./house.jpg');
}



function setup() {
  image(house, 100, 100);
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

  // create Main Character MURMEL
  marblin = new Ball(world, {
    x: 300,
    y: 50,
    r: 40,
    color: 'white'
  }, {
    restitution: 0,
    plugin: {
      wrap: wrap
    }
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
    color: terrainColor,
    trigger: (marblin, block) => {
      // console.log("Trigger ", ball, block, puzzle);
      marblin.attrs.color = 'gray';
    }
  }, {
    isStatic: true
  });
  // turns off collisions

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



  // create level 2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
  strokeWeight(2);
  line(0, 0, 0, -len);
  // Move to the end of that line
  translate(0, -len);
  len *= 0.66;
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
  strokeWeight(2);
  line(0, 0, 0, -len2);
  // Move to the end of that line
  translate(0, -len2);
  len2 *= 0.66;
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
  marblinLover.draw();
  sun_moon.draw();
  terrain_1.draw();
  terrain_2.draw();
  // terrain_3.draw();
  // terrain_4.draw();
  // terrain_5.draw();
  // terrain_6.draw();
  // terrain_7.draw();
  // terrain_8.draw();

  //balls.draw();
  seperator_1.draw();
  seperator_2.draw();
  seperator_3.draw();
  seperator_4.draw();
  seperator_5.draw();
  seperator_6.draw();
  seperator_7.draw();

  // ove.draw();
  theta = map(marblin.body.position.x, 0, width, 0, PI / 4);
  theta2 = map(marblinLover.body.position.x, 0, width, 0, PI / 12);
  //theta = 0.4
  push();
  translate(width / 2, 530);
  stroke(255);
  branch(60);
  translate(500, 60);
  stroke(255);
  branch2(60);
  pop();


  //sleepyTrigger
  if (marblin.body.position.x > 260 && marblin.body.position.x < 300 && marblin.body.position.y > 480 && marblin.body.position.x < 500) {
    sleepy = true;
  } else {
    sleepy = false;
  }

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
    console.log(sleepyPosition);
  }
}

function keyPressed() {
  let direction = 1;
  switch (keyCode) {
    case 89: //z
      console.log("sleeping animation");
      console.log(marblin.body.position);
      if (sleepy) {
        sleepy = false;
      } else {
        sleepy = true;
      }
      break;

    default:
  }
}
