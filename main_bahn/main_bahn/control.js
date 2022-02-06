let controlStarter1 = true;
let controlCounter = 0;
let count = false;


let nudger = false;
let nudgeCount = 0;
let mergetrigger = true;
let marblinLoverDraw = true;

function controlFunction1() {
  switch (controlCounter) {
    case 0:
      flustered.play();
      controlCounter = 1;
      marblinnewR = 214;
      marblinnewG = 73;
      marblinnewB = 66;
      intervalmarblin = setInterval(colorFade, 2);
      break;
    case 1:
      controlCounter = 2;
      marblinnewR = 255;
      marblinnewG = 255;
      marblinnewB = 255;
      intervalmarblin = setInterval(colorFade, 10);
      inLove = true;
      break;
    case 2:
      controlCounter = 3;
      lovelyFadeOut = true;
      jumpIntoAbyss();
      break;
    case 3:
      controlCounter = 4;
      console.log("control Function Counter = 4");
      break;
    default:

  }
}


let spaceCounter = 0;
let case1barrier = true;
let case2barrier = true;
let case3barrier = true;
let case4barrier = true;
function controlfunction2(){
  switch (spaceCounter) {
    case 0:
      //TerrainColors
      changeColorSonnenaufgang();
      soundtrackplay = true;
      break;
    case 1:
      //dreier Level
      addStack1();
      scrolla = false;
      break;
    case 2:
      //PRISON BOOM
      ticking.play();
      pinterval1 = setInterval(shakePrison, 100);
      break;
    case 3:
      //spotlight
      question.play();
      groesserAnfang = marblin.body.position.y;
      groesserYEnd = marblin.body.position.y+100;
      marblinGrows = true;
      Matter.World.remove(engine.world, rightV.body);
      Matter.World.remove(engine.world, leftV.body);
      break;
    case 4:
      //Last Jump?
      jumpUp2();
      doTheEnd();
      changeColorAfterSpotlight();
      scrollOffset = 100;
      break;
    default:

  }
}

function doTheEnd(){
  Matter.World.remove(engine.world, loverRamp.body);
      Matter.World.remove(engine.world, loverRamp2.body);
      Matter.World.remove(engine.world, loverPlain.body);
      Matter.World.remove(engine.world, rightV.body);
      Matter.World.remove(engine.world, leftV.body);
      Matter.World.remove(engine.world, firstRamp.body);
      Matter.World.remove(engine.world, secondRamp.body);
      Matter.World.remove(engine.world, secondPlain.body);
      Matter.World.remove(engine.world, thirdPlain.body);
      Matter.World.remove(engine.world, blueWall.body);
      Matter.World.remove(engine.world, bluePlain.body);
      Matter.World.remove(engine.world, bluePlain2.body);
      Matter.World.remove(engine.world, bottomPulley.body);

      let transition5position = viewportH * 8.5;

     //  // spawn loveballs, trigger draw function
      loveballs = new Stack(world, {
        x: 0, y: 4570, cols: 60, rows: 10, colGap: 1, rowGap: 1, color: 'white',
        create: (x, y) => Matter.Bodies.circle(x, y, 15, { restitution: 0.1, friction: -0.1})
      });
     // //  loveballs.body.bodys.collisionFilter.group = -1;
     //  marblin.body.collisionFilter.group = -2;
      loveballser = true;
      marblin.body.collisionFilter.group = 1;
     marblin.body.collisionFilter.mask = 2;
    loveballs.body.bodies.forEach(Block => Block.collisionFilter.mask = 2);
    loveballs.body.bodies.forEach(Block => Block.collisionFilter.category = 3);
    ove.body.collisionFilter.mask = 2;
    ove.body.collisionFilter.category = 3;
    terrain_6.body.collisionFilter.mask = 2;
    terrain_6.body.collisionFilter.category = 3;

    terrain_7.body.collisionFilter.mask = 2;
    terrain_7.body.collisionFilter.category = 3;

    terrain_8.body.collisionFilter.mask = 2;
    terrain_8.body.collisionFilter.category = 3;
    lampStatus = false;

}

/*
Matter.Body.setPosition(
elevator.body,
{x: elevator.body.position.x, y: swingY}
);
*/

function nudge(direct, amount){
  let directMinusPlus;
  if (direct == "right"){
    directMinusPlus = 1;
  } else { //left
    directMinusPlus = -1
  }

  Matter.Body.applyForce(
    marblin.body, {
      x: marblin.body.position.x,
      y: marblin.body.position.y
    }, {
      x: directMinusPlus*((amount/8) + marblin.body.velocity.x / 100),
      y: 0
    }
  );
}



function jumpIntoAbyss() {
  console.log("jump");
  jump.play();
  sleepy = false;
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.Body.applyForce(
    marblin.body, {
      x: marblin.body.position.x,
      y: marblin.body.position.y
    }, {
      x: (0.06) + marblin.body.velocity.x / 100,
      y: -0.2
    }
  );
}



function smallJump() {
  console.log("smalljump");
  sleepy = false;
  jump.play();
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.Body.applyForce(
    marblin.body, {
      x: marblin.body.position.x,
      y: marblin.body.position.y
    }, {
      x: (0.01) + marblin.body.velocity.x / 100,
      y: -0.1
    }
  );
}

function fleeJump() {
  console.log("fleejump");
  sleepy = false;
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: (0.15) + marblin.body.velocity.x / 100, y: -0.13}
  );
}

function fleeJump2() {
  console.log("jumpendedreierLevel");
  scrollOffset = 550;
  scrolla = true;
  jump.play();
  console.log("jump");
  sleepy = false;
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: (0.04) + marblin.body.velocity.x / 100, y: -0.23}
  );
}

function jumpUp() {
  console.log("jumpUp");
  jump.play();
  console.log("jump");
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: marblin.body.velocity.x / 100, y: -0.23}
  );
}


function jumpUp2() {
  marblinnewR = 255;
  marblinnewG = 0;
  marblinnewB = 0;
  marblinactualR = marblinnewR;
  marblinactualG = marblinnewG;
  marblinactualB = marblinnewB;
  marblin.attrs.color = color(marblinactualR,marblinactualG,marblinactualB);

  console.log("jumpUp2");
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.World.remove(engine.world, marblinLover2.body);
  marblinLoverDraw = false;
  // Matter.Body.applyForce(
  //   marblin.body,
  //   {x: marblin.body.position.x, y: marblin.body.position.y},
  //   {x: marblin.body.velocity.x / 100, y: -0.5}
  // );
}


function stairJump(leftright) { //leftright 0 = left, 1 = right
  console.log("stairjump "+ leftright);
  switch (leftright) {
    case 1:
      if (countStairAttractor > 3){
        turnOffStairAttractor();
      }
      Matter.Body.applyForce(
        marblin.body, {
          x: marblin.body.position.x,
          y: marblin.body.position.y
        }, {
          x: 0.1,
          y: -0.0025
        }
      );
      break;
    default:
      jump.play();
      Matter.Body.applyForce(
        marblin.body, {
          x: marblin.body.position.x,
          y: marblin.body.position.y
        }, {
          x: -0.1,
          y: -0.3
        }
      );
  }
}


function endJump() {
  console.log("Ende");
  // sleepy = false;
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: 0, y: -0.3}
  );
  stopScrollingAboveLove = true;
}
