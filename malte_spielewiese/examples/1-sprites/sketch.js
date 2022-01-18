// let box;
let boxImg;
let ball;
let ballImg;
let ground;
let mouse;


function setup() {
  const canvas = createCanvas(800, 600);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;
  const wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };
  // load images
  // ballImg = loadImage('ball.png');
  // boxImg = loadImage('box.png');

  // add bodies
  // box = new Block(world, { x: 100, y: 200, w: 64, h: 64, color: "white"});
  ball = new Ball(world, { x: 200, y: 50, r: 45, color: "white"}, {restitution: 0.5, friction: -0.01, plugin: { wrap: wrap }});
  ground = new Block(world,
    { x: 400, y: 600, w: 1000, h: 400, color: 'white'},
    { friction: 100, isStatic: true, angle: Math.PI * 0.06 }
  );

  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Engine.run(engine);
}

function draw() {
  background(0);
  // box.draw();
  ball.draw();
  ground.draw();
  mouse.draw();
}
