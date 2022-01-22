//the ball jumps on 4 invisible platforms and then continues to fall into the next level

let marblin;
let stair;
let stairTwo;
let stairThree;
let stairFour;
let stairFive;
let stairSix;
let stairSeven;
let drawStair = false;
let drawStair2 = false;
let drawStair3 = false;
let drawStair4 = false;
let drawStair5 = false;
let drawStair6 = false;
let drawStair7 = false;

let rest = 1.2;
let frict = -1.2;

function setup() {
  const canvas = createCanvas(1280, 1440);

  // create an engine
  const engine = Matter.Engine.create();
  const world = engine.world;

  // create the obects

  marblin = new Ball(world, { x: 140, y: 50, r: 20, color: 'white' }, { isStatic: false, label: 'marblin' } );

  stair = new Block(
    world,
    { x: 95, y: 300, w: 80, h: 80, color: 'darkblue' },
    { isStatic: true, friction: frict, restitution: rest, label: 'stairOne' }
  );

  stairTwo = new Block(
    world, 
    { x: 355, y : 350, w: 80, h: 80, color: 'darkblue' }, 
    { isStatic: true, friction: frict, restitution: rest, label: 'stairTwo' }
  );

  stairThree = new Block(
    world, 
    { x: 610, y : 450, w: 80, h: 80, color: 'darkblue' }, 
    { isStatic: true, restitution: rest, label: 'stairThree' }
  );

  stairFour = new Block(
    world, 
    { x: 1180, y : 800, w: 200, h: 80, color: '#050D7F' }, 
    { isStatic: true, friction: 0.5, restitution: 0, label: 'stairFour' }
  );

  stairFive = new Block(
    world, 
    { x: 1180, y : 880, w: 500, h: 80, color: '#0794DB' }, 
    { isStatic: true, restitution: rest, label: 'stairFive' }
  );

  stairSix = new Block(
    world, 
    { x: 1180, y : 960, w: 800, h: 80, color: '#00BFEC' }, 
    { isStatic: true, restitution: rest, label: 'stairSix' }
  );
  stairSeven = new Block(
    world, 
    { x: 1180, y : 1040, w: 1260, h: 80, color: '#1CD0F8' }, 
    { isStatic: true, restitution: rest, label: 'stairSeven' }
  );
  

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stairOne" || bodyB.label === "stairOne") {
      drawStair = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stairTwo" || bodyB.label === "stairTwo") {
      drawStair2 = true;
      drawStair = false;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stairThree" || bodyB.label === "stairThree") {
      drawStair3 = true;
      drawStair2 = false;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stairFour" || bodyB.label === "stairFour") {
      drawStair4 = true;
      drawStair3 = false;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stairFive" || bodyB.label === "stairFive") {
      drawStair5 = true;
      rest = 10;
      console.log('rest');
      bodyA.restitution = 10;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stairSix" || bodyB.label === "stairSix") {
      drawStair6 = true;
    }
  });

  Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "stairSeven" || bodyB.label === "stairSeven") {
      drawStair7 = true;
    }
  });


  // run the engine
  Matter.Engine.run(engine);
}

function draw() {
  background('blue');
  marblin.draw();

  if (drawStair) {
    stair.draw();
  }

  if (drawStair2) {
    stairTwo.draw();
  }

  if(drawStair3) {
    stairThree.draw();
  }
  
  if(drawStair4) {
    stairFour.draw();
  }

  if (drawStair5) {
    stairFive.draw();
  }

  if (drawStair6) {
    stairSix.draw();
  }

  if (drawStair7) {
    stairSeven.draw();
  }


}
