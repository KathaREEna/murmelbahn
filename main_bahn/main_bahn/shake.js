//Shake
let interval1;
let sekunden = 0;
let dauer = 3; //Zeit Sekunden
let countertestzahl = 0;
let alternate = 0;
let anzahlshakes = 10;



//onStairShake
let leftright = 0;
let stairInterval;
let stairsekunden = 0;
let stairdauer = 3; //Zeit Sekunden
let staircountertestzahl = 0;
let stairalternate = 0;
let stairanzahlshakes = 20;



//ShakePrison
let pinterval1;
let psekunden = 0;
let pdauer = 3; //Zeit Sekunden
let pcountertestzahl = 0;
let palternate = 0;

let pforce = 1;


function shake(){
  countertestzahl++;
  if (countertestzahl >= anzahlshakes) {
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


let countStairAttractor = 4;
function turnOffStairAttractor(){
  switch (countStairAttractor) {
    case 4:
      countStairAttractor++;
      stair4attractor.isActive = 0;
      break;
    case 5:
      countStairAttractor++;
      stair5attractor.isActive = 0;
      break;
    case 6:
      countStairAttractor++;
      stair6attractor.isActive = 0;
      break;
    default:
      console.log("countStairAttractor out of range");
      console.log(countStairAttractor);
  }
}



function onStairShake(){ //0 = left, 1 = right
  marblin.body.friction = 1;
  staircountertestzahl++;
  if (leftright == 1 && staircountertestzahl == floor(stairanzahlshakes/3)){
    //nudge("right",0.12);
  }
  if (staircountertestzahl > (stairanzahlshakes/2)){
    if (staircountertestzahl >= stairanzahlshakes) {
      clearInterval(stairInterval);
      staircountertestzahl = 0;
      //marblin.body.friction = 0;
      console.log("clearing stairInterval");
      stairJump(leftright);
    }
    let direction = 1;
    if (stairalternate == 0) {
      direction = -1; // ball runs right to left <-
      stairalternate = 1; // ball runs left to right ->
    }else {
      direction = 1;
      stairalternate = 0;
    }
    Matter.Body.applyForce(
      marblin.body,
      {x: marblin.body.position.x, y: marblin.body.position.y},
      {x: (0.04 * direction) /*+ marblin.body.velocity.x */, y: 0.01}
    );
  }
}


let boomtransparency = 255;
function shakePrison(){
  pcountertestzahl++;

  if (pcountertestzahl >= 30) {
    clearInterval(pinterval1);
    pcountertestzahl = 0;
    ps = new ParticleSystem(prison.body.position.x-(prison.attrs.w / 2), prison.body.position.y-(prison.attrs.h / 2), prisonSize);
    boom = true;
    ps.shatter();
    Matter.World.remove(engine.world, prison.body);
    jumper3 = true;
    terrain_12.body.collisionFilter.group = -1;
  }
  let pdirection = 1;
  if (palternate == 0) {
    pdirection = -1; // ball runs right to left <-
    palternate = 1; // ball runs left to right ->
  }else {
    pdirection = 1;
    palternate = 0;
  }
  Matter.Body.applyForce(
    prison.body,
    {x: prison.body.position.x, y: prison.body.position.y},
    {x: (pforce * pdirection) /*+ marblin.body.velocity.x */, y: 0.0}
  );
  pforce += 0.5;
  console.log(pforce);

}
