function Food({x = random(0, width), y = random(0, height)} = {}){
  this.position = createVector(x, y);
  this.nutrition = random(1, 5);
}

Food.prototype.show = function(){
  let opacity = map(this.nutrition, 0, 5, 0, 255)
  fill(color(0, 255, 0, opacity))
  noStroke()
  ellipse(this.position.x, this.position.y, sqrt(this.nutrition * 4))
}