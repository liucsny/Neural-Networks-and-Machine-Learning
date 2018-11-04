function Food({x = random(0, width), y = random(0, height)} = {}){
  this.position = createVector(x, y)
}

Food.prototype.show = function(){
  fill(color(0, 255, 0))
  noStroke()
  ellipse(this.position.x, this.position.y, 6, 6)
}