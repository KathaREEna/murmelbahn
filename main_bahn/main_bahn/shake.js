//Shake
let interval1;
let sekunden = 0;
let dauer = 3; //Zeit Sekunden
let countertestzahl = 0;
let alternate = 0;

//ShakePrison
let pinterval1;
let psekunden = 0;
let pdauer = 3; //Zeit Sekunden
let pcountertestzahl = 0;
let palternate = 0;

let pforce = 1;


function shake(){
  //console.log(sekunden);
  countertestzahl++;
  if (countertestzahl >= 10) {
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




function shakePrison(){
  //console.log(sekunden);
  pcountertestzahl++;

  if (pcountertestzahl >= 30) {
    clearInterval(pinterval1);
    pcountertestzahl = 0;
    ps = new ParticleSystem(prison.body.position.x-(prison.attrs.w / 2), prison.body.position.y-(prison.attrs.h / 2), prisonSize);
    boom = true;
    ps.shatter();
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
