function Chart(x, y, w, h, lineC = color(255, 0, 0), bgC = color(255, 255, 255, 5)){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.BGcolor = bgC;
  this.lineC = lineC;
  this.vertexArray = [];
}

Chart.prototype.display = function(num){
  this.vertexArray.push(num)

  push();
  translate(this.x, this.y)
  fill(this.BGcolor);
  // stroke(255);
  rect(0, 0, this.w, this.h);

  stroke(this.lineC)
  beginShape();

  this.vertexArray.forEach((v,i)=>{
    let x = i * 0.1;
    if(x > this.w * 10){
      this.vertexArray.shift();
    }
    let y = map(v, 0, 100, this.h, 0);
    vertex(x, y);
  })
  endShape();

  pop();
}