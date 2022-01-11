// Benedikt Groß

// setup wrap coordinates plugin
Matter.use('matter-wrap');

let ball;
let obstacle;
let slide;
let onOff;


function setup() {
  const canvas = createCanvas(800, 1600);

  // create an engine
  const engine = Matter.Engine.create();
  const world = engine.world;
  onOff=true

 

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
  ground = new BlockCore(world,
    { x: 400, y: 500, w: 400, h: 50, color: 'darkblue',
    trigger: (block, ball) => {
      console.log("Trigger ");
      ball.attrs.color = (Math.floor(Math.random() * 256));
      block.attrs.color = (Math.floor(Math.random() * 256));} },
    { isStatic: true }
  );

  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Engine.run(engine);
}

function draw() {
  background('blue');
  ball.draw();
  ground.draw();
  mouse.draw();

  
}

function keyPressed() {
  // is SPACE pressed?
  if (keyCode === 87) {
    let direction = 1; // ball runs left to right ->
    if ((ball.body.position.x - ball.body.positionPrev.x) < 0) {
      direction = -1; // ball runs right to left <-
    }
    // use current direction and velocity for the jump
    Matter.Body.applyForce(
      ball.body,
      {x: ball.body.position.x, y: ball.body.position.y},
      {x: (0.01 * direction) + ball.body.velocity.x / 100, y: -0.1}
    );
  }
}


