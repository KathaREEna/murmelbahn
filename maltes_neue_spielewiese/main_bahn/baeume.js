
let theta;
let theta2;
// Create the tree function
function branch(len) {
  // Each branch will be 2/3rds the size of the previous one
  //float sw = map(len,2,120,1,10);
  //strokeWeight(sw);
  strokeWeight(8);
  line(0, 0, 0, -len);
  // Move to the end of that line
  translate(0, -len);
  len *= 0.6;
  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (len > 2) {
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta); // Rotate by theta
    branch(len); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state
    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    branch(len);
    pop();
  }
}

function branch2(len2) {
  // Each branch will be 2/3rds the size of the previous one
  //float sw = map(len,2,120,1,10);
  //strokeWeight(sw);
  strokeWeight(10);
  line(0, 0, 0, -len2);
  // Move to the end of that line
  translate(0, -len2);
  len2 *= 0.6;
  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (len2 > 2) {
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta2); // Rotate by theta
    branch2(len2); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state
    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta2);
    branch2(len2);
    pop();
  }
}
