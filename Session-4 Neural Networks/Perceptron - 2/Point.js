function Point(){
  this.x = random(-width/2, width/2);
  this.y = random(-height/2, height/2);
  // if(this.x + this.y < (width + height)/2){
  if(this.x < this.y ){
    this.lable = 1;
  } else {
    this.lable = -1;
  }
}

Point.prototype.show = function(){
  if(this.lable === 1){
    stroke(0);
    noFill();
  } else {
    noStroke();
    fill(0);
  }
  let canvasXY = cartesianToCanvas(this.x, this.y);
  ellipse(canvasXY.x, canvasXY.y, 6);
}