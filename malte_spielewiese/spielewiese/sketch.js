let blockA;
let blockB;
let ground;

let cnvs, ctx;


function setup() {
  createCanvas(800, 600);
  cnvs = document.getElementById('defaultCanvas0');
  ctx = canvas.getContext('2d');
  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // create two boxes and a ground
  blockA = new Block(world, { x: 200, y: 200, w: 80, h: 80, color: 'white' });
  blockB = new Block(world, { x: 270, y: 50, w: 160, h: 80, color: 'white' });
  ground = new Block(world, { x: 400, y: 500, w: 810, h: 15, color: 'darkblue' }, { isStatic: true });

  // run the engine
  Matter.Engine.run(engine);
}

function draw() {
  background('blue');
  color('rgb(0,0,255)')
  ctx.shadowColor = color("rgba(0, 0, 0, 0.25)");
  ctx.shadowBlur = 100;
  fill("white")
  rect(100,100,100,100);

  blockA.draw();
  blockB.draw();
  ground.draw();
}


// let cnvs, ctx;

// function setup() {
//   createCanvas(500, 500);
//   cnvs = document.getElementById('defaultCanvas0');
//   ctx = canvas.getContext('2d');
//   noStroke();
//   noLoop();
// }

// function draw() {
//   background("white");
//   // Shadow
//   ctx.shadowColor = 'black';
//   ctx.shadowBlur = 50;

//   rect(100 ,100,100,100);

//   fill(255, 10, 90, 120);
//   // ctx.fillRect(20, 20, 150, 100);

 
// }