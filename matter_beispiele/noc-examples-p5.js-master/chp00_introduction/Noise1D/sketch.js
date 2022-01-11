
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let xoff = 0;
let xincrement = 0.015;

function setup() {
  createCanvas(640,360);
  background("blue");
  noStroke();
}

function draw() {

  fill("blue");
  rect(0,0,width,height);
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ball I
  //var n = random(0,width);  // Try this line instead of noise

  // Get a noise value based on xoff and scale it according to the window's width
  let n = noise(xoff);

  let x = map(n,0,1,0,70);

  // With each cycle, increment xoff
  xoff += xincrement;

  // Draw the ellipse at the value produced by perlin noise
  fill("white");
  ellipse(x+200,height/2, 64, 64);
  ellipse(-x+370,height/2, 64, 64);
  print(n);

  
}
