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
      x: directMinusPlus*((amount) + marblin.body.velocity.x / 100),
      y: 0
    }
  );
}



function jumpIntoAbyss() {
  console.log("jump");
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
  console.log("jump");
  sleepy = false;
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
  console.log("jump");
  sleepy = false;
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: (0.15) + marblin.body.velocity.x / 100, y: -0.13}
  );
}

function fleeJump2() {
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

  console.log("jump");
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.World.remove(engine.world, marblinLover2.body);
  marblinLoverDraw = false;
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: marblin.body.velocity.x / 100, y: -0.5}
  );
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
          x: 0.10,
          y: -0.0025
        }
      );
      break;
    default:
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
}
