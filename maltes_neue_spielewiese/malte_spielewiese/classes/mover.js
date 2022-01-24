/*
Usage:
// define ball radius via r attribute
let block = new Ball(world, { x: 300, y: 300, r: 30, color: 'magenta' }, { isStatic: true });
*/
class Ball extends Block {
  constructor(world, attrs, options) {
    super(world, attrs, options);
  }
  attract(mover) {
    // Calculate direction of force
    let force = p5.Vector.sub(this.position, mover.position);
    // Distance between objects
    let distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 5, 25);

    // Calculate gravitional force magnitude
    let strength = (this.G * this.mass * mover.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.setMag(strength);
    return force;
  }

  addBody() {
    this.body = Matter.Bodies.circle(this.attrs.x, this.attrs.y, this.attrs.r, this.options);
  }
}
