let controlStarter1 = true;
let controlCounter = 0;
let count = false;

function controlFunction1(){
  switch (controlCounter) {
    case 0:
      controlCounter = 1;
      marblinnewR = 255;
      marblinnewG = 162;
      marblinnewB = 173;
      intervalmarblin = setInterval(colorFade,10);
      break;
    case 1:
      controlCounter = 2;
      marblinnewR = 255;
      marblinnewG = 255;
      marblinnewB = 255;
      intervalmarblin = setInterval(colorFade,20);
      inLove = true;
      break;
    case 2:
      controlCounter = 3;
      inLove = false;
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
