let drops = [];
let palette, bk, currentColor, img, simg, wimg, himg;
let w = window.innerWidth;
let h = window.innerHeight;
let counter = 0;
let isPortrait;
let showText = true;

function preload() {
  // Preload images
  this.paletteP1 = [
    loadImage("assets/us0.jpg"),
    loadImage("assets/us1.jpg"),
    loadImage("assets/us2.jpg"),
    loadImage("assets/us3.jpg"),
    loadImage("assets/us4.jpg"),
    loadImage("assets/us5.jpg"),
    loadImage("assets/us6.jpg")
  ];

  this.paletteP2 = [
    loadImage("assets/sa0.jpg"),
    loadImage("assets/sa1.jpg"),
    loadImage("assets/sa2.jpg"),
    loadImage("assets/sa3.jpg"),
    loadImage("assets/sa4.jpg"),
    loadImage("assets/sa5.jpg"),
    loadImage("assets/sa6.jpg")
  ];
}

function setup() {
  createCanvas(w, h);

  palette = [
    color(227, 11, 92, 70),
    color(220, 20, 60, 70),
    color(178, 34, 34, 70),
    color(255, 49, 49, 70),
    color(255, 0, 0, 70),
    color(210, 4, 45, 70),
    color(139, 0, 0, 70),
    color(255, 99, 71, 70),
    color(255, 69, 0, 70)
  ];

  const palette2 = [
    color(25, 25, 112),
    color(65, 105, 225),
    color(72, 61, 139),
    color(106, 90, 205),
    color(95, 158, 160),
    color(70, 130, 180),
    color(100, 149, 237),
    color(135, 206, 235),
    color(139, 0, 0),
    color(173, 216, 230),
    color(176, 224, 230)
  ];

  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(50, 50, 50);

  bk = random(palette2);
  currentColor = random(palette);

  isPortrait = h > w;
  img = isPortrait ? random(this.paletteP2) : random(this.paletteP1);
  calculateImageScale();
}

function calculateImageScale() {
  if (isPortrait) {
    simg = w / img.width;
    wimg = 0;
    himg = (h / simg - img.height) / 2;
  } else {
    simg = h / img.height;
    wimg = (w / simg - img.width) / 2;
    himg = 0;
  }
}

function addInk(x, y, r, col) {
  let drop = new Drop(x, y, r, col);
  drops.forEach(other => other.marble(drop));
  drops.push(drop);
  if (drops.length > (isPortrait ? 25 : 50)) drops.shift();
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

  if (img) {
    drawingContext.save();
    drawingContext.scale(simg, simg);
    drawingContext.drawImage(img, wimg, himg);
    drawingContext.restore();

    if (showText) {
      textAlign(CENTER, CENTER);
      textFont('Verdana', 36);
      fill(255);
      text('Click on it!', w / 2, (5 * h) / 6);
    }

    drops.forEach(drop => drop.show());

    if (mouseIsPressed) {
      currentColor = palette[counter % palette.length];
      counter++;
      addInk(mouseX, mouseY, 36, currentColor);

      textSize(36);
      textAlign(CENTER);
      noStroke();
      fill(255, 255, 255);
      text('🐱+🐶', mouseX, mouseY - 80);
    }
  }
}
