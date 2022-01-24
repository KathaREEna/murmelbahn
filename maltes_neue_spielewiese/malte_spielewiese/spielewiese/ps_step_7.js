Homeworks.aufgabe = 7;

const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let world;
let mouse;
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');

  engine = Engine.create();
  world = engine.world;

  // create some blocks
  // the blue box triggers a function on collisions

  // RECHTECK ERSCHAFFEN <<<<<<<<<<<<<<<<<<<<<<<
  // blocks.push(new BlockCore(
  //   world,
  //   {
  //     x: 200, y: 200, w: 50, h: 50,
  //     color: 'lightgrey',
  //     trigger: (ball, block) => {
  //       // console.log("Trigger ", ball, block, puzzle);
  //       ball.attrs.color = (Math.floor(Math.random() * 256));
  //       block.attrs.color = (Math.floor(Math.random() * 256));

  //     }
  //   },
  //   { isStatic: false, density: 0.5 }
  // ));

    // SCHNURSPIEL ERSCHAFFEN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // let number = 0
  // let spiel = []
  // for (let i=0; i<30; i++){
  //   for (let j=0; j<10; j++){
  //   const kugel = new Ball(
  //   world,
  //   {
  //     x: 20+i*50, y: 50*j, r: 20,
  //     color: '#44A8FA'
  //   },
  //   { isStatic: false, restitution: 0.3 }
  // );
  // kugel.constrainTo(null, { pointB: { x: 20+i*50, y: 50*j }, length: 300, draw: false });
  // blocks.push(kugel);
  // }}




    // RECHTECK ERSCHAFFEN HÄNGT AN RECHTECK DRÜBER<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // const fixed2 = new Block(
  //   world,
  //   {
  //     x: 800, y: 200, w: 40, h: 40,
  //     color: 'red'
  //   },
  //   { isStatic: false }
  // );
  // fixed2.constrainTo(fixed1, { length: 150, stiffness: 0.1 });
  // blocks.push(fixed2);


      // BODEN ERSCHAFFEN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const boden = (new BlockCore(
    world,
    {
      x: 0.5*windowWidth, y: 1*windowHeight, w: 1.5*windowWidth, h: 1*windowHeight,
      color: 'darkblue',
      // rotate: { angle: 0, delta: 0 }
    },
    {  angle: 0, isStatic: true }
    
  ));
  blocks.push(boden)
  // console.log(boden.attrs.rotate.delta)
  // boden.attrs.rotate.delta = 0
  // blocks.push(new BlockCore(
  //   world,
  //   {
  //     x: -100, y: 450, w: 800, h: 10,
  //     color: 'red'
  //   },
  //   { angle: PI / 3, isStatic: true }
  // ));
      // BANDE ERSCHAFFEN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // blocks.push(new BlockCore(
  //   world,
  //   {
  //     x: windowWidth + 150, y: windowHeight-400, w: 800, h: 100,
  //     color: 'darkblue'
  //   },
  //   { angle: -PI / 3, isStatic: true }
  // ));

  // the ball has a label and can react on collisions>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  blocks.push(new Ball(
    world,
    {
      x: 600, y: 0, r: 35,
      color: 'white'
    },
    { label: "murmel", restitution: 1, isStatic: false }
  ));
 

  // create a rotating block - propeller
  // blocks.push(new Block(
  //   world,
  //   {
  //     x: 640, y: 440, w: 100, h: 5,
  //     color: 'white',
  //     rotate: { angle: 0, delta: 0.07 }
  //   },
  //   { isStatic: true }
  // ));

  // create a body from multiple parts<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // blocks.push(new Parts(
  //   world,
  //   {
  //     x: 900, y: 730,
  //     color: 'red'
  //   },
  //   {
  //     parts: [
  //       Bodies.rectangle(4, 20, 5, 20),
  //       Bodies.rectangle(40 - 4, 20, 5, 20),
  //       Bodies.rectangle(20, +40 - 4, 50, 5)
  //     ],
  //     isStatic: true,
  //     friction: 0.0
  //   }
  // ));

  // create a body from points<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // blocks.push(new PolygonFromPoints(
  //   world,
  //   {
  //     x: 300,
  //     y: 580,
  //     points: [
  //       { x: 0, y: 0 }, { x: 250, y: 75 },{ x: 300, y: 75 },{ x: 300, y: 100 }, { x: 250, y: 100 },{ x: 0, y: 25 }
  //     ],
  //     color: 'red'
  //   }, { isStatic: true, friction: 1000.0}));

  // create a body from a SVG path<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // the puzzle can apply a force on collisions
  // const puzzle = new PolygonFromSVG(
  //   world,
  //   {
  //     x: 3/4*windowWidth, y: 500,
  //     elem: 'puzzle',
  //     scale: 0.3, color: 'white',
  //     force: { x: 0.0, y: -0.04 }
  //   },
  //   { isStatic: true, friction: 0.0 }
  // );
  // blocks.push(puzzle);

  // blocks.push(new PolygonFromSVG(
  //   world,
  //   {
  //     x: 580, y: 710,
  //     file: './path.svg',
  //     scale: 0.6, color: 'white'
  //   },
  //   { isStatic: true, friction: 0.0 }
  // ));

  // create a group of identical bodies
  // blocks.push(new Stack(
  //   world,
  //   {
  //     x: 10,
  //     y: 10,
  //     cols: 1,
  //     rows: 1,
  //     colGap: 5,
  //     rowGap: 5,
  //     color: (0,255,50),
  //     create: (bx, by) => Bodies.circle(bx, by, 10, { restitution: 0.9 })
  //   }, {}));

  // add a mouse so that we can manipulate Matter objects
  mouse = new Mouse(engine, canvas, { stroke: 'white', strokeWeight: 3 });

  // process mouseup events in order to drag objects or add more balls
  mouse.on("startdrag", evt => {
    isDrag = true;
  });
  mouse.on("mouseup", evt => {
    if (!isDrag) {
      let ball = new Ball(world, { x: evt.mouse.position.x, y: evt.mouse.position.y, r: 15, color: 'white' }, { isStatic: false, restitution: 1, friction: -1, label: 'Murmel' });
      blocks.push(ball);
    }
    isDrag = false;
  });

  // process collisions - check whether block "Murmel" hits another Block
  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    pairs.forEach((pair, i) => {
      if (pair.bodyA.label == 'Murmel') {
        pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block)
      }
      if (pair.bodyB.label == 'Murmel') {
        pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block)
      }
    })
  })
  // run the engine
  Engine.run(engine);
}

function draw() {
  background("blue");
  blocks.forEach(block => block.draw());
  mouse.draw();
}
