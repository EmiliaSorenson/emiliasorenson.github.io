let mic;
let circles = [];
let fond;

//-------CONFIGURACION----
let AMP_MIN = 0.01; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let AMP_MAX = 0.1; // umbral máximo de amplitud.

function setup() {
  createCanvas(windowWidth, windowHeight);  
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();

  // Crear círculos
  let numCircles = 20;
  let maxSize = min(width, height) * 0.8;
  let minSize = maxSize / numCircles;
  let sizeStep = (maxSize - minSize) / (numCircles - 1);

  for (let i = 0; i < numCircles; i++) {
    let radius = minSize + i * sizeStep;
    let x = width / 2;
    let y = height / 2;
    let circle = new Circle(x, y, radius);
    circles.push(circle);
  }
}

function draw() {
  background(153, 204, 255);
    
  // Obtener la amplitud del sonido
  let volume = mic.getLevel();
  // Recorrer los círculos
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Calcular la vibración basada en el volumen
    let vibration = map(volume, AMP_MIN, AMP_MAX, 0, 20);
    // Vibrar el círculo
    circle.vibrate(vibration);
    // Calcular el color basado en la intensidad del sonido
    let intensity = map(volume, AMP_MIN, AMP_MAX, 0, 1);
    let colorValue = lerpColor(color(0, 0, 255), color(255,0,0), intensity*intensity);
    circle.setColor(colorValue);

    // Dibujar el círculo
    circle.display();
  }
}

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color(255);
    this.vibration = 0;
  }

  vibrate(amount) {
    this.vibration = amount;
  }

  setColor(colorValue) {
    this.color = colorValue;
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(2);
    ellipse(
      this.x + random(-this.vibration, this.vibration),
      this.y + random(-this.vibration, this.vibration),
      this.radius
    );
  }
}