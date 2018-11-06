function Food({x = random(0, width), y = random(0, height)} = {}){
  this.position = createVector(x, y);
  this.nutrition = random(-3, 6);
}

Food.prototype.show = function(){
  noStroke()
  if(this.nutrition > 0){
    let opacity = map(this.nutrition, 0, 5, 0, 255)
    fill(color(0, 255, 0, opacity))
    ellipse(this.position.x, this.position.y, sqrt(abs(this.nutrition) * 4))
  } else {
    fill(color(255, 0, 0))
    ellipse(this.position.x, this.position.y, sqrt(abs(this.nutrition) * 8))
  }
}