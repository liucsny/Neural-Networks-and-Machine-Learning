function Point(){
  this.x = random(0, width);
  this.y = random(0, height);
  // if(this.x + this.y < (width + height)/2){
  if(this.x < this.y ){
    this.lable = 1;
  } else {
    this.lable = -1;
  }
}

Point.prototype.show = function(){
  if(this.lable == 1){
    stroke(0);
    noFill();
  } else {
    noStroke();
    fill(0);
  }
  ellipse(this.x, this.y, 12);
}