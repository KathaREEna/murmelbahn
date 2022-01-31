//leon & kathi treppen

let stair1;
let stair2;
let stair3;

let stair4;
let stairBegrenzungLinks;
let stair5;
let stair6;
let stair7;

let drawStair1 = false;
let drawStair2 = false;
let drawStair3 = false;
let drawStair4 = true;
let drawStair5 = true;
let drawStair6 = true;
let stair1trigger = true;
let stair2trigger = true;
let stair3trigger = true;
let stair4trigger = true;
let stair5trigger = true;
let stair6trigger = true;


let stair1interval;

function createStair1() {
  stair1 = new Block(
      world,
      { x: marblin.body.position.x+30, y: marblin.body.position.y+150, w: 150, h: 150, color: 'darkblue' },
      { isStatic: true, restitution: 0, friction: 1, label: 'stair' }
    );

}

function createStair2() {
  stair2 = new Block(
      world,
      { x: marblin.body.position.x-30, y: marblin.body.position.y+150, w: 150, h: 150, color: 'darkblue' },
      { isStatic: true, restitution: 0, friction: 1, label: 'stair' }
    );
}

function createStair3() {
  stair3 = new Block(
      world,
      { x: marblin.body.position.x-30, y: marblin.body.position.y+150, w: 150, h: 150, color: 'darkblue' },
      { isStatic: true, restitution: 0, friction: 1, label: 'stair' }
    );
}



function createStair456(){
  stair4 = new Block(
    world,
    { x: 100, y : 2430, w: 200, h: viewportH/4, color: '#050D7F' },
    { isStatic: true, friction: 1, restitution: 0, label: 'stair4' }
  );
  stairBegrenzungLinks = new Block(
    world,
    { x: 0, y : 1690, w: 10, h: 1300, color: '#FF0000' },
    { isStatic: true, friction: 1, restitution: 0, label: 'stair4' }
  );

  stair5 = new Block(
    world,
    { x: 100, y : 2610, w: 700, h: viewportH/4, color: '#0794DB' },
    { isStatic: true, friction: 1, restitution: 0, label: 'stair5' }
  );

  stair6 = new Block( //y: 2740
    world,
    { x: 100, y : 2790, w: 1200, h: viewportH/4, color: '#00BFEC' },
    { isStatic: true, friction: 1, restitution: 0, label: 'stair6' }
  );
}
