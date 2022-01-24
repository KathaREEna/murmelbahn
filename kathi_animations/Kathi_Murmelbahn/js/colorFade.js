let interval2;
let actualR = 255;
let actualG = 255;
let actualB = 255;
let newR = 255;
let newG = 255;
let newB = 255;

function colorFade(){
  console.log("newR: " + newR + "newG: " + newG + "newB: " + newB);
  console.log("actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  if (newR-actualR > 0) {
    actualR++;
  } else if (newR-actualR < 0) {
    actualR--;
  }

  if (newG-actualG > 0) {
    actualG++;
  }else if (newG-actualG < 0) {
    actualG--;
  }

  if (newB-actualB > 0) {
    actualB++;
  }else if (newB-actualB < 0) {
    actualB--;
  }
  console.log("new values: actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  marblin.attrs.color = color(actualR,actualG,actualB);
  if (newB-actualB+newG-actualG+newR-actualR == 0){
    clearInterval(interval2);
    console.log("clearing interval2");
  }
}
