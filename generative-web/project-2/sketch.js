//simple ellipse slider with a button to change the color
var slider;
x = 300;
y = 200;

let bgcolor;
let bgimg;
let checkbox;
let ellipsecolor;
let myCanvas

let leftCheckboxX = 100
let leftSliderX = 130
let rightCheckboxX = 300
let righSliderX = 330
let sliderSpacing = 25
let increaseY = 0

let leftEye;
let rightEye;

function preload() {
  leftEye = loadImage("assets/L-eye.png");
  rightEye = loadImage("assets/R-eye.png");
}

function setup() {
  const firebaseConfig = {
    apiKey: "AIzaSyBvR9FphB1ns1VShlU98nklEtjxab0X6oo",
    authDomain: "goofy-ahh-face.firebaseapp.com",
    projectId: "goofy-ahh-face",
    storageBucket: "goofy-ahh-face.appspot.com",
    messagingSenderId: "902436933447",
    appId: "1:902436933447:web:1c35fad096eff2180e8662",
    measurementId: "G-Y0S2L9L9L9"
  };
  firebase.initializeApp(firebaseConfig);

  // if(!firebase.apps.length) {
  //   firebase.initializeApp({})
  // }

 

  let containerDiv = createDiv();
  containerDiv.parent('main-container')
  containerDiv.addClass('slider-container');
  
  myCanvas = createCanvas(500, 500);
  myCanvas.parent("canvas-container")


  sliderBaseW = createSlider(100, 300, 150).parent(containerDiv);
  sliderBaseH = createSlider(100, 300, 230).parent(containerDiv);
  sliderEyeX = createSlider(150, 250, 200).parent(containerDiv);
  sliderEyeY = createSlider(140, 240, 190).parent(containerDiv);
  sliderEyeDist = createSlider(80, 150, 100).parent(containerDiv);
  sliderPupilX = createSlider(-15, 15, 1).parent(containerDiv);
  sliderNoseX = createSlider(200, 300, 250).parent(containerDiv);
  sliderNoseHeight = createSlider(190, 270, 240).parent(containerDiv);
  sliderMouthXPos = createSlider(-150, -50, -100).parent(containerDiv);
  sliderMouthYPos = createSlider(-20, 100, 20).parent(containerDiv);
  sliderMouthCurve = createSlider(-100, 100, -100).parent(containerDiv);
  sliderDash1 = createSlider(0, 10, 2).parent(containerDiv);
  sliderStrkWeight = createSlider(0.5, 10, 1).parent(containerDiv);


  sliderBaseW.position(leftSliderX, 160);
  sliderBaseH.position(leftSliderX, 185);
  sliderEyeX.position(leftSliderX, 190 + increaseY);
  sliderEyeY.position(leftSliderX, 190 + sliderSpacing + increaseY);
  sliderEyeDist.position(leftSliderX, 190 + (2*sliderSpacing) + increaseY);
  sliderPupilX.position(leftSliderX, 190 + (3*sliderSpacing) + increaseY);
  sliderNoseX.position(leftSliderX, 220 + increaseY);
  sliderNoseHeight.position(leftSliderX, 220 + sliderSpacing + increaseY);
  sliderMouthXPos.position(leftSliderX, 250 + increaseY);
  sliderMouthYPos.position(leftSliderX, 250 + sliderSpacing + increaseY);
  sliderMouthCurve.position(leftSliderX, 250 + (2*sliderSpacing) + increaseY);
  sliderDash1.position(righSliderX, 160);
  sliderStrkWeight.position(righSliderX, 185);

  
  // checkboxBgColor = createCheckbox('invert', false);
  // checkboxBgColor.changed(myCheckedEvent);  


  checkboxBase= createCheckbox("Base", true);
  checkboxEyes = createCheckbox("Eyes", true);
  checkboxNose = createCheckbox("Nose", true);
  checkboxMouth = createCheckbox("Mouth", true);
  checkboxDashStroke= createCheckbox("Stroke", false);
  checkboxCurse= createCheckbox("Curse", false);
  checkboxRed = createCheckbox("Red Outline", false);
  checkboxReal = createCheckbox("realistic", false);

  checkboxBase.position(leftCheckboxX, 120)
  checkboxEyes.position(leftCheckboxX, 150 + increaseY)
  checkboxNose.position(leftCheckboxX, 180 + increaseY)
  checkboxMouth.position(leftCheckboxX, 210 + increaseY)
  checkboxDashStroke.position(rightCheckboxX, 120 + increaseY)
  checkboxCurse.position(rightCheckboxX, 160)
  checkboxRed.position(325, 195)
  checkboxReal.position(325, 230)




  
  // Add a button to save the canvas
  saveButton = createButton("Save PNG");
  saveButton.position(290, 450)
  saveButton.mousePressed(saveImg);

  collectButton = createButton("Save to Collection");
  collectButton.position(290, 495)
  collectButton.mousePressed(saveCanvasToCloud);


  checkboxRed.id('checkbox-red')

  bgcolor = color("white");
  ellipsecolor = color("white");
}

// function myCheckedEvent() {
//   if (checkboxBgColor.checked()) {
//     console.log('Checking!');
//   } else {
//     console.log('Unchecking!');
//   }
// }

function draw() {

  // Checked Cursed
    if (checkboxCurse.checked()) {
      sliderStrkWeight.value() == 1
      sliderDash1.value() == 2

      drawFaceAgain();
      checkboxRed.show();
      checkboxReal.hide();

      // document.getElementById("title").innerHTML = "c̴̨̢̻̦͉͍͔̮͕̀̋̃͊̉̄̏̇͘͜͝ú̴̡̨̩̠̱̤̖̼͚̫̬̘͍͙ŗ̴̭̗̞̤̔̀̊s̶͚̭̬͛̾̾̌̉̏̆͠ḙ̶̐̒͆̂d̶̨͉̦̳̤̝̹̞̹͕̮̦̜͓͆̓́̈́͊͝ Ahh Face"
      document.getElementById("title").innerHTML = "C̵̛̗̀̽̿̽͌͋͋̓͊̑̃́͠͠U̵̓̿̀͐̚Ŗ̶̫͕͖͉̘͔̺̹̥͎̥̀̏́̀S̷̱̆̏͌̓͌̔̑̕͜͝Ę̷̢̛̣̤͇͚̠̞̤͓̬̹̅̓̐̑͛̿́̾͊͝D̴͕̜̮̗̍̃̆͆̂̕͜ Ahh Face"
      document.title = "C̵̛̗̀̽̿̽͌͋͋̓͊̑̃́͠͠U̵̪̲͈͕̓̿̀͐̚ͅŖ̶̫͕͖͉̘͔̺̹̥͎̥̀̏́̀S̷̱̆̏͌̓͌̔̑̕͜͝Ę̷̢̛̣̤͇͚̠̞̤͓̬̹̅̓̐̑͛̿́̾͊͝D̴͕̜̮̗̍̃̆͆̂̕͜ Ahh Face"
    } 
    
    else {
      drawFace();
      checkboxRed.hide();
      checkboxReal.hide();

      document.getElementById("title").innerHTML = "Goofy Ahh Face"
      document.title = "Goofy Ahh Face"
    }


  // Checked stroke
    if (checkboxDashStroke.checked()) {
      sliderDash1.show();
      sliderStrkWeight.show();

      checkboxCurse.position(rightCheckboxX, 230)
      checkboxRed.position(325, 265)
      checkboxReal.position(325, 290)
    }

    else {
      sliderDash1.hide();
      sliderStrkWeight.hide();

      checkboxCurse.position(rightCheckboxX, 150)
      checkboxRed.position(325, 185)
      checkboxReal.position(325, 220)
    }

  // Checked Base
    if (checkboxBase.checked()) {
      sliderBaseH.show();
      sliderBaseW.show();

      increaseY = 30

      // checkboxEyes.position(leftCheckboxX, 220)
      // checkboxNose.position(leftCheckboxX, 250)
      // checkboxMouth.position(leftCheckboxX, 280)

    }

    else {
      sliderBaseH.hide();
      sliderBaseW.hide();

      // checkboxEyes.position(leftCheckboxX, 150)
      // checkboxNose.position(leftCheckboxX, 180)
      // checkboxMouth.position(leftCheckboxX,210)
    }

  // Checked Eyes
    if (checkboxEyes.checked()) {
      sliderEyeX.show();
      sliderEyeY.show();
      sliderEyeDist.show();
      sliderPupilX.show();
  
      // checkboxNose.position(leftCheckboxX, 360)
      // checkboxMouth.position(leftCheckboxX, 390)
    }
  
    else {
      sliderEyeX.hide();
      sliderEyeY.hide();
      sliderEyeDist.hide();
      sliderPupilX.hide();
    }
  
  // Checked Nose
    if (checkboxNose.checked()) {
      sliderNoseX.show();
      sliderNoseHeight.show();

      // checkboxMouth.position(leftCheckboxX, 450)
    }

    else {
      sliderNoseX.hide();
      sliderNoseHeight.hide();
    }

  // Checked Mouth
    if (checkboxMouth.checked()) {
      sliderMouthXPos.show();
      sliderMouthYPos.show();
      sliderMouthCurve.show();

      // checkboxCurse.position(300, 230)
      // checkboxRed.position(325, 265)
      // checkboxReal.position(325, 290)
    }

    else {
      sliderMouthXPos.hide();
      sliderMouthYPos.hide();
      sliderMouthCurve.hide();
    }


  function drawFace() {
    background("white");
    stroke("black");

    // noStroke()
    // fill('white')
    noFill();
    strokeWeight(sliderStrkWeight.value());
    setLineDash([0.5, sliderDash1.value()]);

    //base
    ellipse(x - 50, y+40, sliderBaseW.value(), sliderBaseH.value());

    //nose
    line(
      sliderNoseX.value(),
      sliderNoseHeight.value(),
      sliderNoseX.value(),
      190
    );

    //mouth

    noFill();
    bezier(
      300 + sliderMouthXPos.value(),
      300 + sliderMouthYPos.value(),
      340 + sliderMouthXPos.value(),
      300 + sliderMouthYPos.value() + sliderMouthCurve.value(),
      370 + sliderMouthXPos.value(),
      300 + sliderMouthYPos.value() + sliderMouthCurve.value(),
      400 + sliderMouthXPos.value(),
      300 + sliderMouthYPos.value()
    );

    //eyes

    // ellipse(300,100,50,25)
    // ellipse(300+80,100,50,25)
    // ellipse(300,100,7,20)
    // ellipse(300+80,100,7,20)

    fill("white");

    ellipse(sliderEyeX.value(), sliderEyeY.value(), 50, 25);
    ellipse(
      sliderEyeX.value() + sliderEyeDist.value(),
      sliderEyeY.value(),
      50,
      25
    );

    fill("black");
    ellipse(
      sliderEyeX.value() + sliderPupilX.value(),
      sliderEyeY.value(),
      7,
      20
    );

    //change "sliderPupilX" to "sliderPupilY" for changing them differently, and uncomment out sliderPupilY
    ellipse(
      sliderEyeX.value() + sliderPupilX.value() + sliderEyeDist.value(),
      sliderEyeY.value(),
      7,
      20
    );

    // granulateWithSet(10)

    if (checkboxReal.checked()) {
      image(leftEye, sliderEyeX.value() - 26, sliderEyeY.value() - 15, 50, 30);
      image(
        rightEye,
        sliderEyeX.value() - 26 + sliderEyeDist.value(),
        sliderEyeY.value() - 15,
        50,
        30
      );
    }
  }

  function drawFaceAgain() {
    // background('white');

    if (checkboxRed.checked()) {
      // background('black');
      stroke("red");
      // background(bgimg)
    } else {
      // background('white')
      stroke("black");
    }

    // noStroke()
    // fill('white')
    noFill();
    strokeWeight(sliderStrkWeight.value());
    setLineDash([0.5, sliderDash1.value()]);

    // strokeWeight(0.5)
    // setLineDash([0.5, 7]);

    //base
    ellipse(x - 50 + 5, y +40 + 5, sliderBaseW.value(), sliderBaseH.value());

    //nose
    line(
      sliderNoseX.value() + 5,
      sliderNoseHeight.value(),
      sliderNoseX.value() + 5,
      190
    );

    //mouth

    noFill();
    bezier(
      300 + sliderMouthXPos.value() + 5,
      300 + sliderMouthYPos.value(),
      340 + sliderMouthXPos.value() + 5,
      300 + sliderMouthYPos.value() + sliderMouthCurve.value(),
      370 + sliderMouthXPos.value() + 5,
      300 + sliderMouthYPos.value() + sliderMouthCurve.value(),
      400 + sliderMouthXPos.value() + 5,
      300 + sliderMouthYPos.value()
    );

    //eyes

    // ellipse(300,100,50,25)
    // ellipse(300+80,100,50,25)
    // ellipse(300,100,7,20)
    // ellipse(300+80,100,7,20)

    fill("white");

    ellipse(sliderEyeX.value() + 5, sliderEyeY.value(), 50, 25);
    ellipse(
      sliderEyeX.value() + 5 + sliderEyeDist.value(),
      sliderEyeY.value(),
      50,
      25
    );

    fill("black");
    ellipse(
      sliderEyeX.value() + 5 + sliderPupilX.value(),
      sliderEyeY.value(),
      7,
      20
    );

    //change "sliderPupilX" to "sliderPupilY" for changing them differently, and uncomment out sliderPupilY
    ellipse(
      sliderEyeX.value() + 5 + sliderPupilX.value() + sliderEyeDist.value(),
      sliderEyeY.value(),
      7,
      20
    );

    if (checkboxReal.checked()) {
      image(
        leftEye,
        sliderEyeX.value() - 26 + 5,
        sliderEyeY.value() - 15,
        50,
        30
      );
      image(
        rightEye,
        sliderEyeX.value() - 26 + 5 + sliderEyeDist.value(),
        sliderEyeY.value() - 15,
        50,
        30
      );
    }

    // granulateWithSet(10)
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function saveImg() {
  // Save the canvas as a PNG using the p5.js saveCanvas function
  saveCanvas(canvas, "canvas", "png");
}



// ----------------------------------------- FIREBASE ----------------------------------------------


// saves the canvas to firebase
function saveCanvasToCloud() {
  // get the data URL of the saved image
  let canvasDataURL = canvas.toDataURL('image/png');

  // allows you to put in images into the firebase storage
  let storageRef = firebase.storage().ref();

  // give the file a unique name starting with the date
  let filename = Date.now() + '_my-face.png';
  
  // uploads the file name and image to firebase
  let uploadTask = storageRef.child(filename).putString(canvasDataURL, 'data_url');

  // triggers an alert so the user knows its been saved to firebase and thus the collection
  // savedToCloud();
}

// let myAlert = document.querySelector("#savedAlert");

// // sets an alert that notifies the user that its been sent to the collection
// function savedToCloud() {
//   console.log("Working")
//   myAlert.style.display = "block";
//   setTimeout(function(){ 
//     myAlert.style.opacity = 0;
//   }, 2000);
//   setTimeout(function(){ 
//     myAlert.style.display = "none"; 
//     myAlert.style.opacity = 1;
//   }, 3000);
// }



// function granulateWithSet(amount) {
//   loadPixels();
//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       const pixel = get(x, y);
//       const granulatedColor = color(
//         pixel[0] + random(-amount, amount),
//         pixel[1] + random(-amount, amount),
//         pixel[2] + random(-amount, amount)
//         // comment in, if you want to granulate the alpha value
//         // pixel[3] + random(-amount, amount),
//       );
//       set(x, y, granulatedColor);
//     }
//   }
//   updatePixels();
// }



