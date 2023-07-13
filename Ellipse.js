class Ellipse {
    constructor(x, y, an, al) {
      this.x = x;
      this.y = y;
      this.alto=al;
      this.ancho=an;
  
    }
    mostrarEcriptis(){
      let ancho = map(mouseX,0,400,0,this.ancho);
      fill(ancho, 0, 0);
  
      ellipse(this.x, this.y, ancho, this.alto);
    }
  }
  