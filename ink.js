class Drop {
  constructor(x, y, r, col) {
    this.x = x;
    this.y = y;
    this.center = createVector(x, y);
    this.r = r;
    this.circleDetail = 60;
    this.vertices = [];

    let sinCache = [];
    let cosCache = [];

    for (let i = 0; i < this.circleDetail; i++) {
      let angle = map(i, 0, this.circleDetail, 0, TWO_PI);
      sinCache[i] = sin(angle);
      cosCache[i] = cos(angle);
    }

    for (let i = 0; i < this.circleDetail; i++) {
      let angle = map(i, 0, this.circleDetail, 0, TWO_PI);
      let v = createVector((16 * pow(sinCache[i], 3)) / 6, -(13 * cosCache[i] - 5 * cosCache[i * 2 % this.circleDetail] - 2 * cosCache[i * 3 % this.circleDetail] - cosCache[i * 4 % this.circleDetail]) / 6);
      v.mult(this.r);
      v.add(this.center);
      this.vertices[i] = v;
    }

    this.col = col;
  }

  marble(other) {
    for (let v of this.vertices) {
      let c = other.center;
      let r = other.r;
      let p = v.copy();
      p.sub(c);
      let m = p.mag();
      let root = sqrt(1 + (r * r) / (m * m)) * 1.01;
      p.mult(root);
      p.add(c);
      v.set(p);
    }
  }

  show() {
    fill(this.col);
    noStroke();

    beginShape();
    for (let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
