function dither(image) {
    this.image = image;
    this.width = this.image.width;
    this.steps = this.image.height/this.width;
    this.image.loadPixels();
    //console.log(this.file + ", " + this.image + ", " + this.width + ", " + this.steps);
  }
  
  function ditherColor(color, x1, y1) {
    var c = brightness(color);
    var mX = x1 % dithers[currentDither].width;
    var mY = y1 % dithers[currentDither].width;
    var level = ceil(map(c, 0, 100, dithers[currentDither].steps, 0));
    
    var newColor = dithers[currentDither].image.get(mX, mY+(level-1)*dithers[currentDither].width);
  
    if(newColor.toString('#rrggbb') == "255,255,255,255") {
       return true
       }
    else {
      return false
    }
  }
  
  
  
  
  // ---------------------------------------  dither variables  ------------------------------------------- 
  
  
  var ditherTemplates;
  var dithers;
  var currentDither;
  var scenes;
  var currentScene;
  var WHITE;
  
  function preload() {
    ditherTemplates = [
      loadImage('assets/4x28.png'), 
      loadImage('assets/4x36.png'), 
      loadImage('assets/4x68.png'), 
      loadImage('assets/6x42 LINES.png'), 
      loadImage('assets/5x30 CIRCLES.png'),
      loadImage('assets/5x30 CIRCUITS.png'),
      loadImage('assets/5x45 DiagLines.png')
    ]
  }
  
  
  
  
  // ---------------------------------------  setup  ------------------------------------------- 
  
  var w = window.innerWidth,
  h = window.innerHeight,
  resolution = 8.5,
  resolutionH = 11,
  dimDif = resolution / resolutionH,
  sizeH = h,
  sizeW = h * dimDif;
  
  let slider;
  let input
  // let input, button, greeting;
  var name = "..."
  
  
  function setup() {
    createCanvas(500, 500)
    noStroke()
    // noLoop()
    
    //Dither setup
    currentDither = Math.floor(Math.random()*ditherTemplates.length)
    console.log(currentDither)
    
    currentScene = 1
    WHITE = color(255, 255, 255, 255)
    dithers = []
  
    for(var i = 0; i < ditherTemplates.length; i++) {
      dithers.push(new dither(ditherTemplates[i]))
    }    
  
  
    slider = createSlider(2.5, 40, 4);
    // sliderText = createSlider(0, 255, 255);
    // input = createInput();
    // button = createButton('submit');
    // button.mousePressed(draw);
  }
  
  
  
  
  // ---------------------------------------  game color palettes  ------------------------------------------- 
  
  localStorage.setItem('test', 'hi, I am a test');
  
  var bgColors = ['#000000']
  // var fillColors = ['#00FF00', '#0203e2','#FFFF00','#00FFFF','#FF00FF']
  
  var marioBros = ['#cc4b0a', '#febaa9', '#5d94fb', '#127c22', '#dcfcfb']
  var marioBros2 = ['#eb8634', '#005761', '#409995', '#83d221', '#0ca817']
  var donkeyKong = ['#ae949a', '#050405', '#5a3f59', '#6e509a', '#768438', '#39451e']
  var sonic = ['#2e89db', '#bb9c6e', '#2405a4', '#3a1c06', '#55b306', '#695f83', '#4d6cd9']
  var undertale = ['#3d120e', '#ffc90e', '#67a4e0', '#e607f8']
  var fbwg = ['#02b3ff', '#83dbff', '#ff0801', '#fe4a01', '#fdcd03', '#746b32', '#28290a', '#746b32', '#28290a', '#746b32', '#28290a', '#746b32', '#28290a','#746b32', '#746b32', '#746b32']
  var threeFootNinja = ['#2c222f', '#6a527a', '#998fa5', '#896e55', '#c79b5e', '#646463', '#9a9da2']
  var powerPamplona = ['#000000', '#a98f67', '#5a3f18', '#6a251d', '#c08742', '#d5cabb']
  var run = ['#31e801', '#000000', '#5c5c5c', '#a6a6a6']
  var run2 = ['#55e9e7', '#000000', '#476c6b', '#a6a6a6']
  var snake = ['#2d4533', '#5e7e42', '#b1c358', '#d9e79e']
  
  var overwatch = ['#face59', '#aba29d', '#212226', '#fe8222', '#edebeb']
  var valorant = ['#fd4556', '#bd3944', '#53212b', '#fffbf5']
  // var gameboy2 = ['#202f30', '#5c7769', '#aebfb1', '#e4efe8']
  // var gameboy3 = ['#38382b', '#787164', '#aea572', '#e0d6a3']
  
  
  var palettes = [marioBros, marioBros2, donkeyKong, sonic, undertale, fbwg, threeFootNinja, powerPamplona, run, run2, snake]
  
  var selectedPalette = palettes[Math.floor(Math.random()*palettes.length)]
  
  
  
  
  // ---------------------------------------  randomization  ------------------------------------------- 
  
  
  var randomBg
  var randomFill
  var randomInt
  var int = 80
  
  function getRandom(){
    randomBg = bgColors[Math.floor(Math.random()*bgColors.length)]
    randomFill = selectedPalette[Math.floor(Math.random()*selectedPalette.length)]
  }
  
  getRandom()
  
  
  var randomInt1 = Math.floor(Math.random()* (600-70)) + 70
  var randomInt2 = Math.floor(Math.random()* (200-70)) + 70
  var randomInt3 = Math.floor(Math.random()* (200-50)) + 50
  var randomInt4 = Math.floor(Math.random()* (200-10)) + 200
  
  var randomInts = [randomInt1, randomInt2, randomInt3, randomInt4]
  
  function getRandomInt(){
    randomInt = randomInts[Math.floor(Math.random()*randomInts.length)]
  }
  
  getRandomInt()
  
  
  
  
  // ---------------------------------------  draw function (img generator)  ------------------------------------------- 
  
  
  function draw() {
  
    background(randomBg)
  
    // var pxSize = 5
    // var pxSize = 4
    //var pxSize
  
    let pxSize = slider.value()
    
    for(var x = 0; x < width; x+=pxSize) {
      for(var y = 0; y < height; y+=pxSize) { 
  
        getRandom()
  
        fill(randomFill)
  
        var colorToSend
        switch(currentScene) {
  
          case 0:
            //dither gradient
            colorToSend = color(y/height*255);
            break
  
          case 1:
            //random map
            colorToSend = color(noise(x/150, y/150, cos(frameCount/10))*randomInt);
            break
        }
            
        if(ditherColor(colorToSend, x/pxSize, y/pxSize)) {
          square(x, y, pxSize)
        }
      }
    }
  }
  
  
  
  
  // -------------------------------------------  metadata  ------------------------------------------- 
  
  console.log(localStorage);
  // var gameName = document.getElementById('game')
  console.log(localStorage.getItem('gameName'));
  
  var ditherNumber = document.getElementById('dither')
  console.log(ditherNumber)
  
  var paintPalette = document.querySelectorAll('color')
  console.log(paintPalette)
  
  
  console.log(selectedPalette)
  
  
  // function getMetadata (){
  //   if (selectedPalette == marioBros || marioBros2){
      
  //   }
  // }
  
  // getMetadata()
  
  
  
  
  
  
    //sizing variables
  
  