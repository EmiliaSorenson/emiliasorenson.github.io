let x;
let y;
let mic;
let amp;

function setup() {
  createCanvas(400, 400);
  x = 200;
  y = 200;
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  amp = mic.getLevel();
  drawEllipse();
}

function drawEllipse() {
  let ellipseSize = map(amp, 0, 1, 0, 100);
  ellipse(x, y, ellipseSize, ellipseSize);
}
