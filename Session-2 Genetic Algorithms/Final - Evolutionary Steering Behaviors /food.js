function Food({x = random(0, width), y = random(0, height), health = random(-2, 6)} = {}){
  this.position = createVector(x, y);
  this.health = health;
}

Food.prototype.show = function(){
  noStroke()
  if(this.health > 0){
    let opacity = map(this.health, 0, 5, 0, 255)
    fill(color(0, 255, 0, opacity))
    ellipse(this.position.x, this.position.y, sqrt(abs(this.health) * 4))
  } else {
    fill(color(255, 0, 0))
    ellipse(this.position.x, this.position.y, sqrt(abs(this.health) * 4))
  }
}