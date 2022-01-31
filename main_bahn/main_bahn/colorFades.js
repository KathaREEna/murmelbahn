
//Color Fade Variables
let intervalmarblin;
let marblinactualR = 255;
let marblinactualG = 255;
let marblinactualB = 255;
let marblinnewR = 255;
let marblinnewG = 255;
let marblinnewB = 255;

let intervalTERRAIN;
let actualR = 70;
let actualG = 70;
let actualB = 70;
let newR = 255;
let newG = 255;
let newB = 255;

let intervalBG;
let bgactualR = 0;
let bgactualG = 0;
let bgactualB = 0;
let bgnewR = 255;
let bgnewG = 255;
let bgnewB = 255;

let intervalSUN;
let sunactualR = 235;
let sunactualG = 224;
let sunactualB = 197;
let sunnewR = 255;
let sunnewG = 255;
let sunnewB = 255;

let intervalHouse;
let houseactualR = 128;
let houseactualG = 128;
let houseactualB = 128;
let housenewR = 255;
let housenewG = 255;
let housenewB = 255;



function changeColorSonnenaufgang(){
  newR = 101;
  newG = 67;
  newB = 33;
  intervalTERRAIN = setInterval(colorFadeTERRAIN, 5);
  bgnewR = 205;
  bgnewG = 105;
  bgnewB = 255;
  intervalBG = setInterval(colorFadeBG, 1);

  sunnewR = 255;
  sunnewG = 255;
  sunnewB = 0;
  intervalSUN = setInterval(colorFadeSUN,200);

  housenewR = 255;
  housenewG = 255;
  housenewB = 255;
  intervalHouse = setInterval(colorFadeHouse,5);
}



function colorFade(){
  //console.log("marblinnewR: " + marblinnewR + "marblinnewG: " + marblinnewG + "marblinnewB: " + marblinnewB);
  //console.log("marblinactualR: " + marblinactualR + "marblinactualG: " + marblinactualG + "marblinactualB: " + marblinactualB);
  if (marblinnewR-marblinactualR > 0) {
    marblinactualR++;
  } else if (marblinnewR-marblinactualR < 0) {
    marblinactualR--;
  }

  if (marblinnewG-marblinactualG > 0) {
    marblinactualG++;
  }else if (marblinnewG-marblinactualG < 0) {
    marblinactualG--;
  }

  if (marblinnewB-marblinactualB > 0) {
    marblinactualB++;
  }else if (marblinnewB-marblinactualB < 0) {
    marblinactualB--;
  }
  //console.log("new values: marblinactualR: " + marblinactualR + "marblinactualG: " + marblinactualG + "marblinactualB: " + marblinactualB);
  marblin.attrs.color = color(marblinactualR,marblinactualG,marblinactualB);
  if (marblinnewB-marblinactualB+marblinnewG-marblinactualG+marblinnewR-marblinactualR == 0){
    clearInterval(intervalmarblin);

      count = true;
    console.log("clearing intervalmarblin");
  }
}



function colorFadeTERRAIN(){
  //console.log("newR: " + newR + "newG: " + newG + "newB: " + newB);
  //console.log("actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
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
  //console.log("new values: actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  terrain_1.attrs.color = color(actualR,actualG,actualB);
  terrain_1edge.attrs.color = color(actualR,actualG,actualB);
  terrain_2.attrs.color = color(actualR,actualG,actualB);

  if (newB-actualB+newG-actualG+newR-actualR == 0){
    clearInterval(intervalTERRAIN);
    console.log("clearing intervalTERRAIN");
  }
}



function colorFadeBG(){
  //console.log("bgnewR: " + bgnewR + "bgnewG: " + bgnewG + "bgnewB: " + bgnewB);
  //console.log("bgactualR: " + bgactualR + "bgactualG: " + bgactualG + "bgactualB: " + bgactualB);
  if (bgnewR-bgactualR > 0) {
    bgactualR++;
  } else if (bgnewR-bgactualR < 0) {
    bgactualR--;
  }

  if (bgnewG-bgactualG > 0) {
    bgactualG++;
  }else if (bgnewG-bgactualG < 0) {
    bgactualG--;
  }

  if (bgnewB-bgactualB > 0) {
    bgactualB++;
  }else if (bgnewB-bgactualB < 0) {
    bgactualB--;
  }
  //console.log("new values: bgactualR: " + bgactualR + "bgactualG: " + bgactualG + "bgactualB: " + bgactualB);
  backgroundColor = color(bgactualR,bgactualG,bgactualB);

  if (bgnewB-bgactualB+bgnewG-bgactualG+bgnewR-bgactualR == 0){
    clearInterval(intervalBG);
    console.log("clearing intervalBG");
    collisionSleepOff();
  }
}


function colorFadeSUN(){
  //console.log("newR: " + newR + "newG: " + newG + "newB: " + newB);
  //console.log("actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  if (sunnewR-sunactualR > 0) {
    sunactualR++;
  } else if (sunnewR-sunactualR < 0) {
    sunactualR--;
  }

  if (sunnewG-sunactualG > 0) {
    sunactualG++;
  }else if (sunnewG-sunactualG < 0) {
    sunactualG--;
  }

  if (sunnewB-sunactualB > 0) {
    sunactualB++;
  }else if (sunnewB-sunactualB < 0) {
    sunactualB--;
  }
  //console.log("new values: actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  sun_moon.attrs.color = color(sunactualR,sunactualG,sunactualB);

  if (sunnewB-sunactualB+sunnewG-sunactualG+sunnewR-sunactualR == 0){
    clearInterval(intervalSUN);
    console.log("clearing intervalSUN");
  }
}


function colorFadeHouse(){
  //console.log("newR: " + newR + "newG: " + newG + "newB: " + newB);
  //console.log("actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  if (housenewR-houseactualR > 0) {
    houseactualR++;
  } else if (housenewR-houseactualR < 0) {
    houseactualR--;
  }

  if (housenewG-houseactualG > 0) {
    houseactualG++;
  }else if (housenewG-houseactualG < 0) {
    houseactualG--;
  }

  if (housenewB-houseactualB > 0) {
    houseactualB++;
  }else if (housenewB-houseactualB < 0) {
    houseactualB--;
  }
  //console.log("new values: actualR: " + actualR + "actualG: " + actualG + "actualB: " + actualB);
  house.attrs.color = color(houseactualR,houseactualG,houseactualB);

  if (housenewB-houseactualB+housenewG-houseactualG+housenewR-houseactualR == 0){
    clearInterval(intervalHouse);
    console.log("clearing intervalHouse");
  }
}
