
let theta;
let theta2;
//Mach Baum
function branch(len) {
  strokeWeight(8);
  line(0, 0, 0, -len);

  translate(0, -len);
  len *= 0.6;

  if (len > 2) {
    push();
    rotate(theta);
    branch(len);
    pop();

    push();
    rotate(-theta);
    branch(len);
    pop();
  }
}

function branch2(len2) {
  strokeWeight(8);
  line(0, 0, 0, -len2);
  translate(0, -len2);
  len2 *= 0.6;
  if (len2 > 2) {
    push();
    rotate(theta2);
    branch2(len2);
    pop();
    
    push();
    rotate(-theta2);
    branch2(len2);
    pop();
  }
}
