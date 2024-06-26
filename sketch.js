let drops = [];
let palette, bk, currentColor;
let counter = 0;
let img = new Image();
let isPortrait, showText = true;
let w = window.innerWidth, h = window.innerHeight;
let thdrops, simg, wimg, himg;

function setup() {
  createCanvas(w, h);

  palette = [
    color(227, 11, 92, 70), color(220, 20, 60, 70), color(178, 34, 34, 70),
    color(255, 49, 49, 70), color(255, 0, 0, 70), color(210, 4, 45, 70),
    color(139, 0, 0, 70), color(255, 99, 71, 70), color(255, 69, 0, 70)
  ];

  let palette2 = [
    color(25, 25, 112), color(65, 105, 225), color(72, 61, 139),
    color(106, 90, 205), color(95, 158, 160), color(70, 130, 180),
    color(100, 149, 237), color(135, 206, 235), color(139, 0, 0),
    color(173, 216, 230), color(176, 224, 230)
  ];

  let paletteP1 = [
    "assets/us0.jpg", "assets/us1.jpg", "assets/us2.jpg", 
    "assets/us3.jpg", "assets/us4.jpg", "assets/us5.jpg", "assets/us6.jpg"
  ];

  let paletteP2 = [
    "assets/sa0.jpg", "assets/sa1.jpg", "assets/sa2.jpg", 
    "assets/sa3.jpg", "assets/sa4.jpg", "assets/sa5.jpg", "assets/sa6.jpg"
  ];

  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(50, 50, 50);
  
  bk = random(palette2);
  currentColor = random(palette);

  // Set image source and load event
  isPortrait = h > w;
  img.src = isPortrait ? random(paletteP2) : random(paletteP1);
  img.onload = calculateImageScale;
}

function calculateImageScale() {
  if (isPortrait) {
    thdrops = 25;
    simg = w / img.width;
    wimg = 0;
    himg = (h / simg - img.height) / 2;
  } else {
    thdrops = 50;
    simg = h / img.height;
    wimg = (w / simg - img.width) / 2;
    himg = 0;
  }
  draw(); // Force a draw after image is loaded
}

function addInk(x, y, r, col) {
  let drop = new Drop(x, y, r, col);
  for (let other of drops) {
    other.marble(drop);
  }
  drops.push(drop);
  if (drops.length > thdrops) drops.shift();
}

function mouseReleased() {
  newDrop = true;
}

function mousePressed() {
  showText = false;
}

function touchEnded() {
  newDrop = true;
}

function touchStarted() {
  showText = false;
}

function draw() {
  background(bk);
  
  if (img.complete) {
    // Draw image only if it's fully loaded
    drawingContext.save();
    drawingContext.scale(simg, simg);
    drawingContext.drawImage(img, wimg, himg);
    drawingContext.restore();

    if (showText) {
      textAlign(CENTER, CENTER);
      textFont('Verdana', 36);
      fill(255);
      text('Click on it!', w/2, 5*h/6);
    }

    drops.forEach(drop => drop.show());

    if (mouseIsPressed) {
      currentColor = palette[counter % palette.length];
      counter++;
      addInk(mouseX, mouseY, 36, currentColor);

      textSize(36);
      textAlign(CENTER);
      noStroke();
      fill(255);
      text('🐱+🐶', mouseX, mouseY - 80);
    }
  }
}
