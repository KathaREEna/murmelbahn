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

let blocks = [];

const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;

let engine;
let attractor;
let boxes;
let marblin;
let ps;

function setup() {
  const canvas = createCanvas(800, 600);
  // ps = new ParticleSystem(210, 400, 10);

  
  // create an engine
  engine = Engine.create();
  const world = engine.world;

 
  magnet = new Magnet(
    world, {
      x: 400,
      y: 200,
      r: 30,
      color: 'yellow',
      attraction: 0.45e-5,
    // Set the shadow color of the circle to RGB black:
    shadowColor: "black",
    // Set the shadow blur radius to 12:
    shadowBlur: 12,
    shadowOffset: { x: 100, y: 100},
    penis: 1
    }, { isStatic: true }
  );
  blocks.push(magnet);




//   var circle = new Path.Circle({
//     center: [80, 50],
//     radius: 35,
//     fillColor: 'white',
//     // Set the shadow color of the circle to RGB black:
//     shadowColor: new Color(0, 0, 0),
//     // Set the shadow blur radius to 12:
//     shadowBlur: 12,
//     // Offset the shadow by { x: 5, y: 5 }
//     shadowOffset: new Point(5, 5)
// });
  



  // create a group of identical bodies
  let stack = new Stack(
    world, {
      x: 550,
      y: 100,
      cols: 10,
      rows: 10,
      colGap: 5,
      rowGap: 5,
      color: 'red',
      create: (bx, by) => Bodies.circle(bx, by, 10, { restitution: 0.9 })
    }, {})
  blocks.push(stack);

  magnet.addAttracted(stack.body.bodies)


  terrain_1 = new BlockCore(world,
    { x: viewportW*1/5, y: 620, w: viewportW*3, h: viewportH/4, color: "darkblue"},
    { isStatic: true }
  );

  // run the engine
  Engine.run(engine);
}

function draw() {
  background("white");
  magnet.draw();
  blocks.forEach(block => block.draw());
  magnet.attract();

  terrain_1.draw();

}


console.log("ende")