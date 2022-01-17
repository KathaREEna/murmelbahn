Matter.use('matter-wrap');

let ball;
let canvasW = 1280;
let canvasH = 720*7;
let viewportW = 1280;
let viewportH = 720;
let house = document.getElementById("house");
let sun_moon;
let terrain_1;
let terrain_2;
let number = 0;
let spiel = [];
let blocks = [];
 
let backgroundColor = "lightgrey";
let terrainColor = "grey";
let sun_moonColor = "#EBE0C5";
let houseColor = "darkgrey";

// function preload (){
//   house = loadImage('./house.svg');
// }
function setup() {
  rectMode(CORNER);
  const canvas = createCanvas(canvasW, canvasH);

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

  // create the world <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  sun_moon = new Ball(world,
    { x: viewportW*4/5, y: viewportH*1/5, r: 70, color: sun_moonColor },
      
    { isStatic: true }
  );


 terrain_1 = new BlockCore(world,
    { x: viewportW*1/5, y: 620, w: viewportW*4/5, h: viewportH/3, color: terrainColor},
    { isStatic: true }
  );

  terrain_2 = new BlockCore(world,
    { x: viewportW, y: 620, w: viewportW*2/5, h: viewportH/3, color: terrainColor},
    { isStatic: true, restitution: 1.0}
  );





  // create the house <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 

  // create the schnurspiel <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


for (let i=0; i<30; i++){
  for (let j=0; j<20; j++){
  const kugel = new Ball(
  world,
  {
    x: 20+i*50, y: viewportH+50*j, r: 20,
    color: terrainColor
  },
  { isStatic: false, restitution: 0.3 }
);
kugel.constrainTo(null, { pointB: { x: 20+i*50, y: viewportH+50*j }, length: 300, draw: false });
blocks.push(kugel);
}}


  // run the engine
  Matter.Engine.run(engine);
  // setup mouse
  mouse = new Mouse(engine, canvas);
}




function draw() {
  background(backgroundColor);
  // image(house, 0, 0, 400, 400);
  blocks.forEach(block => block.draw());
  ball.draw();
  sun_moon.draw();
  terrain_1.draw();
  terrain_2.draw();
  terrain_2.draw();
 


}


