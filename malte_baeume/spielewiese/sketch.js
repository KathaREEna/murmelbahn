// Benedikt Groß
// pimmel
// setup wrap coordinates plugin
Matter.use('matter-wrap');

let ball;
let obstacle;
let slide;
let theta;   


function setup() {
  rectMode(CORNER);
  const canvas = createCanvas(1280, 720);

  // create an engine
  const engine = Matter.Engine.create();
  const world = engine.world;


  // config wrap area
  const wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };


  // create cirle, slide and obstacle
  ball = new Ball(world,
    { x: 300, y: 50, r: 40, color: 'white' },
      
    { restitution: 0, plugin: { wrap: wrap } }
  );

  // create the ground
  ground = new BlockCore(world,
    { x: 1280/2, y: 620, w: 1280, h: 720/3, color: 'darkblue',
    trigger: (block, ball) => {
      console.log("Trigger ");
      ball.attrs.color = (Math.floor(Math.random() * 256));
      block.attrs.color = (Math.floor(Math.random() * 256));} },
    { isStatic: true }
  );

  // run the engine
  Matter.Engine.run(engine);
  // setup mouse
  mouse = new Mouse(engine, canvas);
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
    push();    // Save the current state of transformation (i.e. where are we now)
    rotate(theta);   // Rotate by theta
    branch(len);       // Ok, now call myself to draw two new branches!!
    pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    branch(len);
    pop();
  }
}

function draw() {
  background('blue');

  theta = map(ball.attrs.x,0,width,0,PI/12);

  ball.draw();
  ground.draw();

  translate(width/2, 500);
  stroke(255);
  branch(120);
}


