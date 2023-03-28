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

var bg1 = Math.floor(Math.random()* 255) + 0
var bg2 = Math.floor(Math.random()* 255) + 0
var bg3 = Math.floor(Math.random()* 255) + 35

var fill1 = Math.floor(Math.random()* 255) + 0
var fill2 = Math.floor(Math.random()* 255) + 0
var fill3 = Math.floor(Math.random()* 255) + 0


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

function setup() {
  createCanvas(1200, 693)
  noStroke()
  noLoop()
  
  //Dither setup
  currentDither = Math.floor(Math.random()*ditherTemplates.length)
  console.log(currentDither)
  
  currentScene = 1
  WHITE = color(255, 255, 255, 255)
  dithers = []

  for(var i = 0; i < ditherTemplates.length; i++) {
    dithers.push(new dither(ditherTemplates[i]))
  }    

}


function draw() {

  background(57, 255, 20);  //The darker color
  fill(0, 0, 0);      //The lighter color
  
  var pxSize = Math.floor(Math.random() * 13) + 1
  
  for(var x = 0; x < width; x+=pxSize) {
    for(var y = 0; y < height; y+=pxSize) { 
      // if(x<width/2){
      //   fill(200, 20, 0);      //The lighter color
      // }  
      var colorToSend
        
      colorToSend = color(noise(x/150, y/150, cos(frameCount/10))*256);
      
          
      if(ditherColor(colorToSend, x/pxSize, y/pxSize)) {
        square(x, y, pxSize)
      }
    }
  }
}