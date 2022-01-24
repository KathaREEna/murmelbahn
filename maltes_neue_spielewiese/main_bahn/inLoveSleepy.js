
//in love animation
let inLove = false;
let lovelyLoop = 100;
let lovelyBoundry = 60;
let lovelyPosition = 0;
let lovelyPositions; //Array welches für die einzelnen Positionen verwendet wird
let lovelyCount = 10;
let lovelySize = 20;


//sleepy animation
let sleepy = false;
let sleepyLoop = 100;
let sleepyPosition = 0;
let sleepyOffsetX = 30;
let sleepyOffsetY = 40;



//inLove
function toggleInLove(){
  if (inLove) {
    inLove = false;
  } else {
    inLove = true;
  }
}

function inLoveAni(){
  for (var i = 0; i < lovelyCount; i++) {
    let lovelyTransparency = map(lovelyPositions[i][0], 0, lovelyLoop, 0, 1255)
    let lovelyTransparencyInverted = map(lovelyPositions[i][0], 0, lovelyLoop, 1255, 0)
    if (lovelyPositions[i][0] < (lovelyLoop/2)) {
      fill(255,192,203, lovelyTransparency);
    } else {
      fill(255,192,203, lovelyTransparencyInverted);
    }
    lovelyPositions[i][0] = (lovelyPositions[i][0] + 1) % lovelyLoop;

    if (lovelyPositions[i][0] == 0) {
      //lovelyOffsets
      lovelyPositions[i][1] = floor(random(lovelyBoundry, -1*lovelyBoundry));
    }
    if (lovelyPositions[i][0] > 0) {
      textSize(lovelySize);
      let wackeln = map(noise(lovelyPositions[i][0]/30)*10,0,10,-5,5);
      text("❤", marblin.body.position.x + lovelyPositions[i][1]+wackeln, marblin.body.position.y-20-lovelyPositions[i][0]);
    }
  }

}





//sleepy

function marblinSleep(){
  let sleepyTransparency1 = map(sleepyPosition, 0, sleepyLoop, 0, 1255);
  let sleepyTransparency2 = map((sleepyPosition + sleepyLoop / 3) % sleepyLoop, 0, sleepyLoop, 0, 1255);
  let sleepyTransparency3 = map((sleepyPosition + sleepyLoop / 3 * 2) % sleepyLoop, 0, sleepyLoop, 0, 1255);
  let sleepyPosition2 = (sleepyPosition + sleepyLoop / 3) % sleepyLoop;
  let sleepyPosition3 = (sleepyPosition + sleepyLoop / 3 * 2) % sleepyLoop;

  fill(125, sleepyTransparency1);
  textSize((sleepyLoop - sleepyPosition) / 2);
  text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition, marblin.body.position.y - sleepyOffsetY - sleepyPosition);

  fill(125, sleepyTransparency2);
  textSize((sleepyLoop - sleepyPosition2) / 2);
  text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition2, marblin.body.position.y - sleepyOffsetY - sleepyPosition2);

  fill(125, sleepyTransparency3);
  textSize((sleepyLoop - sleepyPosition3) / 2);
  text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition3, marblin.body.position.y - sleepyOffsetY - sleepyPosition3);

  sleepyPosition = (sleepyPosition + 0.5) % sleepyLoop;
}
