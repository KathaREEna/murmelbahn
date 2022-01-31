
//in love animation
let inLove = false;
let lovelyFadeOut = false;
let lovelyLoop = 100;
let lovelyBoundry = 60;
let lovelyPosition = 0;
let lovelyPositions; //Array welches für die einzelnen Positionen verwendet wird
let lovelyCount = 10;
let lovelySize = 20;
let inlove2trigger = true;

//sleepy animation
let sleepy = false;
let sleepyLoop = 100;
let sleepyPosition = 0;
let sleepyOffsetX = 30;
let sleepyOffsetY = 40;



//inLove
function toggleInLove(){
  if (inLove) {
    //inLove = false;
    lovelyFadeOut = true;
  } else {
    inLove = true;
  }
}

function inLoveAni(){
  for (var i = 0; i < lovelyCount; i++) {
    let heartr = 214;
    let heartg = 73;
    let heartb = 66;
    
    let lovelyTransparency = map(lovelyPositions[i][0], 0, lovelyLoop, 0, 1255)
    let lovelyTransparencyInverted = map(lovelyPositions[i][0], 0, lovelyLoop, 1255, 0)
    if (lovelyPositions[i][0] < (lovelyLoop/2)) {
      fill(heartr,heartg,heartb, lovelyTransparency);
    } else {
      fill(heartr,heartg,heartb, lovelyTransparencyInverted);
    }


    if(lovelyFadeOut){
      lovelyPositions[i][0] = (lovelyPositions[i][0] + 1);

      //testen ob alle Werte größer als lovelyloop sind
      let overflow = true;
      for (var j = 0; j < lovelyCount; j++) {
        if(lovelyPositions[j][0]<lovelyLoop){
          overflow = false;
        }
      }
      if(overflow){
        inLove = false;
        lovelyFadeOut = false;
        for (var k = 0; k < lovelyCount; k++) {
          lovelyPositions[k][0] = floor(0 - (lovelyLoop / lovelyCount)*k);
        }
      }
    } else {
      lovelyPositions[i][0] = (lovelyPositions[i][0] + 1) % lovelyLoop;
    }


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

  fill(255, sleepyTransparency1);
  textSize((sleepyLoop - sleepyPosition) / 2);
  text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition, marblin.body.position.y - sleepyOffsetY - sleepyPosition);

  fill(255, sleepyTransparency2);
  textSize((sleepyLoop - sleepyPosition2) / 2);
  text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition2, marblin.body.position.y - sleepyOffsetY - sleepyPosition2);

  fill(255, sleepyTransparency3);
  textSize((sleepyLoop - sleepyPosition3) / 2);
  text("Z", marblin.body.position.x + sleepyOffsetX + sleepyPosition3, marblin.body.position.y - sleepyOffsetY - sleepyPosition3);

  sleepyPosition = (sleepyPosition + 0.5) % sleepyLoop;
}
