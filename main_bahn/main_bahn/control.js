let controlStarter1 = true;
let controlCounter = 0;
let count = false;

function controlFunction1(){
  switch (controlCounter) {
    case 0:
      controlCounter = 1;
      marblinnewR = 255;
      marblinnewG = 0;
      marblinnewB = 0;
      intervalmarblin = setInterval(colorFade,2);
      break;
    case 1:
      controlCounter = 2;
      marblinnewR = 255;
      marblinnewG = 255;
      marblinnewB = 255;
      intervalmarblin = setInterval(colorFade,10);
      inLove = true;
      break;
    case 2:
      controlCounter = 3;
      inLove = false;
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



function jumpIntoAbyss() {
  console.log("jump");
  sleepy = false;
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: (0.07) + marblin.body.velocity.x / 100, y: -0.2}
  );
}



function smallJump() {
  console.log("jump");
  sleepy = false;
  direction = 1; // ball runs left to right -> direction = -1; // ball runs right to left <-
  Matter.Body.applyForce(
    marblin.body,
    {x: marblin.body.position.x, y: marblin.body.position.y},
    {x: (0.01) + marblin.body.velocity.x / 100, y: -0.1}
  );
}
