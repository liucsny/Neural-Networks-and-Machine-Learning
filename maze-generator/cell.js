function Cell(i, j, w){
  this.i = i;
  this.j = j;
  this.w = w;
  this.x = i * w;
  this.y = j * w;
  this.wall = {
    top: true,
    right: true,
    bottom: true,
    left: true,
  }
  this.visited = false;
}

Cell.prototype.show = function(){
  stroke(255);
  noFill();

  if(this.wall.top) line(this.x, this.y, this.x + this.w, this.y) //top
  if(this.wall.left) line(this.x, this.y, this.x, this.y + this.w) //left
  if(this.wall.right) line(this.x + this.w, this.y, this.x + this.w, this.y + this.w) //right
  if(this.wall.bottom) line(this.x, this.y + this.w, this.x + this.w, this.y + this.w) //bottom

  fill(color(225, 0, 225))
  noStroke();
  if(this.visited) rect(this.x, this.y, this.w, this.w)
}