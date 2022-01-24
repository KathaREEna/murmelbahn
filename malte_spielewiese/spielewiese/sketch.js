// Benedikt Groß
// Example for matter-attractors an attractors plugin for matter.js
// https://github.com/liabru/matter-attractors

Matter.use('matter-attractors');

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composites = Matter.Composites;

let backgroundColor = "blue";
let terrainColor = "darkblue";
let sun_moonColor = "#EBE0C5";

let canvasW = 1280;
let canvasH = 720*7;
let viewportW = 1280;
let viewportH = 720;

const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;

let engine;
let attractor;
let boxes;
let marblin;
let ps;

function setup() {
  const canvas = createCanvas(800, 600);
  ps = new ParticleSystem(0, 400, 10);

  
  
  // create an engine
  engine = Engine.create();
  const world = engine.world;
  const wrap = {
    min: {
      x: 0,
      y: 0
    },
    max: {
      x: width,
      y: height
    }
  };
  // no gravity
  // engine.world.gravity.scale = 0;


   // create Main Character MURMEL
   marblin = new Ball(world, {
    x: 300,
    y: 50,
    r: 40,
    color: 'white'
  }
  );
  // marblin.body.position.x
  // add attractor
  // attractor = Bodies.circle(400, 400, 20, {
  //   isStatic: false,
  //   plugin: {
  //     attractors: [
  //       function(bodyA, bodyB) {
  //         return {
  //           x: (bodyA.position.x - bodyB.position.x) * 1e-6,
  //           y: (bodyA.position.y - bodyB.position.y) * 1e-6,
  //         };
  //       }
  //     ]
  //   }
  // });
  // World.add(engine.world, attractor);

  // add boxes
  // xx, yy, columns, rows, columnGap, rowGap
  // boxes = Composites.stack(width/2, 0, 3, 20, 3, 3, function(x, y) {
  //   return Bodies.circle(x, y, 10);
  // });
  // World.add(engine.world, boxes);

  terrain_1 = new BlockCore(world,
    { x: viewportW*1/5, y: 620, w: viewportW*3, h: viewportH/4, color: "darkblue"},
    { isStatic: true }
  );

  // run the engine
  Engine.run(engine);
}

function draw() {
  background("blue");
  ps.display();
  ps.update();
  marblin.draw();
  function mousePressed() {
    ps.shatter();
  }
  // move attractor
  // if (mouseIsPressed) {
  //   // smoothly move the attractor body towards the mouse
  //   Body.translate(attractor, {
  //     x: (mouseX - attractor.position.x) * 0.25,
  //     y: (mouseY - attractor.position.y) * 0.25
  //   });
  // }
  terrain_1.draw();
  // noStroke();
  // fill(255);
  // drawBodies(boxes.bodies);
  // drawBody(attractor);
}


function keyPressed() {
  switch (keyCode) {
    case 32: //space
    ps.shatter();
      break;

    default:
  }
}


// let ps;

// function setup() {
//   createCanvas(500, 300);
//   ps = new ParticleSystem(200, 100, 10);
// }

// function draw() {
//   background(200);

//   ps.display();
//   ps.update();
// }

// function mousePressed() {
//   ps.shatter();
// }