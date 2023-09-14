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
let rightSliderX = 330
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

  myCanvas = createCanvas(500, 500);

  // Making the checkboxes
  checkboxBase= createCheckbox("Base", true);
  checkboxEyes = createCheckbox("Eyes", true);
  checkboxNose = createCheckbox("Nose", true);
  checkboxMouth = createCheckbox("Mouth", true);
  checkboxDashStroke= createCheckbox("Stroke", false);
  checkboxCurse= createCheckbox("Curse", false);
  checkboxRed = createCheckbox("Red Stroke", false);
  checkboxReal = createCheckbox("realistic", false);
  
  // Making the sliders
  sliderBaseW = createSlider(100, 300, 150)
  sliderBaseH = createSlider(100, 300, 230)
  sliderEyeX = createSlider(150, 250, 200)
  sliderEyeY = createSlider(140, 240, 190)
  sliderEyeDist = createSlider(80, 150, 100)
  sliderPupilX = createSlider(-15, 15, 1)
  sliderNoseX = createSlider(200, 300, 250)
  sliderNoseHeight = createSlider(190, 270, 240)
  sliderMouthXPos = createSlider(-150, -50, -100)
  sliderMouthYPos = createSlider(-100, 100, 20)
  sliderMouthCurve = createSlider(-100, 100, -100)
  sliderDash1 = createSlider(0, 10, 2)
  sliderStrkWeight = createSlider(0.5, 10, 1)

  // Adding UI to classes
  baseContainer = createDiv()
  baseContainer.addClass('base-container')
  baseContainer.child(checkboxBase)
  baseSliders = createDiv()
  baseSliders.addClass('base-sliders')
  baseSliders.child(sliderBaseW)
  baseSliders.child(sliderBaseH)
  baseContainer.child(baseSliders)

  eyeContainer = createDiv()
  eyeContainer.addClass('eye-container')
  eyeContainer.child(checkboxEyes)
  eyeSliders = createDiv()
  eyeSliders.addClass('eye-sliders')
  eyeSliders.child(sliderEyeX)
  eyeSliders.child(sliderEyeY)
  eyeSliders.child(sliderEyeDist)
  eyeSliders.child(sliderPupilX)
  eyeContainer.child(eyeSliders)

  noseContainer = createDiv()
  noseContainer.addClass('nose-container')
  noseContainer.child(checkboxNose)
  noseSliders = createDiv()
  noseSliders.addClass('nose-sliders')
  noseSliders.child(sliderNoseX)
  noseSliders.child(sliderNoseHeight)
  noseContainer.child(noseSliders)

  mouthContainer = createDiv()
  mouthContainer.addClass('mouth-container')
  mouthContainer.child(checkboxMouth)
  mouthSliders = createDiv()
  mouthSliders.addClass('mouth-sliders')
  mouthSliders.child(sliderMouthXPos)
  mouthSliders.child(sliderMouthYPos)
  mouthSliders.child(sliderMouthCurve)
  mouthContainer.child(mouthSliders)

  strokeContainer = createDiv()
  strokeContainer.addClass('stroke-container')
  strokeContainer.child(checkboxDashStroke)
  strokeSliders = createDiv()
  strokeSliders.addClass('stroke-sliders')
  strokeSliders.child(sliderDash1)
  strokeSliders.child(sliderStrkWeight)
  strokeContainer.child(strokeSliders)

  curseContainer = createDiv()
  curseContainer.addClass('curse-container')
  curseContainer.child(checkboxCurse)
  curseCheckboxes = createDiv()
  curseCheckboxes.addClass('curse-checkboxes')
  curseCheckboxes.child(checkboxRed)
  curseContainer.child(curseCheckboxes)

  uiContainer = createDiv()
  uiContainer.addClass('ui-container')
  uiContainer.child(baseContainer)
  uiContainer.child(eyeContainer)
  uiContainer.child(noseContainer)
  uiContainer.child(mouthContainer)
  uiContainer.child(strokeContainer)
  uiContainer.child(curseContainer)

  canvasContainer = createDiv()
  canvasContainer.addClass('canvas-container')
  canvasContainer.child(myCanvas)

  
  // Adding buttons to save and reset the canvas
//   resetButton = createButton("Reset");
//   resetButton.mousePressed(setup());

  saveButton = createButton("Save PNG");
  saveButton.mousePressed(saveImg);

  collectButton = createButton("Save to Collection");
  collectButton.mousePressed(saveCanvasToCloud);

  viewButton = createButton("View Collection");
  viewButton.mousePressed(viewCollection);
  viewButton.id("view-button")

  // Adding buttons to container

  buttonContainer = createDiv()
  buttonContainer.addClass('button-container')
  buttonContainer.child(saveButton)
  buttonContainer.child(collectButton)
  buttonContainer.child(viewButton)

  mainContainer = createDiv()
  mainContainer.addClass('main-container')
  mainContainer.child(uiContainer)
  mainContainer.child(canvasContainer)
  canvasContainer.child(buttonContainer)

  footer = createDiv('© 2023 Shruti Pathak')
  footer.addClass('footer')


  checkboxRed.id('checkbox-red')

  bgcolor = color("white");
  ellipsecolor = color("white");
}


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
    }

    else {
      sliderDash1.hide();
      sliderStrkWeight.hide();
    }

  // Checked Base
    if (checkboxBase.checked()) {
      sliderBaseH.show();
      sliderBaseW.show();

      increaseY = 30
    }

    else {
      sliderBaseH.hide();
      sliderBaseW.hide();
    }

  // Checked Eyes
    if (checkboxEyes.checked()) {
      sliderEyeX.show();
      sliderEyeY.show();
      sliderEyeDist.show();
      sliderPupilX.show();
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
    }

    else {
      sliderMouthXPos.hide();
      sliderMouthYPos.hide();
      sliderMouthCurve.hide();
    }


  function drawFace() {
    background("white");
    stroke("black");

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

    if (checkboxRed.checked()) {
      stroke("red");

    } else {
      stroke("black");
    }

    noFill();
    strokeWeight(sliderStrkWeight.value());
    setLineDash([0.5, sliderDash1.value()]);

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

function viewCollection(){
    window.location= "collection.html"
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
  collectButton.mousePressed(alertMessage());
}

function alertMessage(){
    window.alert('Saved to Collection')
}

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
