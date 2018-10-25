function Spot(x,y){
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.x = x;
  this.y = y;
  this.pervious = undefined;
  this.neighbors = [];
}

Spot.prototype.show = function(color){
  fill(color);
  noStroke();
  rect(this.x * w, this.y * h, w, h);
}

Spot.prototype.addNeighbors = function(grid){
  let x = this.x;
  let y = this.y;

  if( x < grid.length - 1 ) this.neighbors.push(grid[x + 1][y])
  if( x > 0 ) this.neighbors.push(grid[x - 1][y])
  if( y < grid[0].length  - 1 ) this.neighbors.push(grid[x][y + 1])
  if( y > 0 ) this.neighbors.push(grid[x][y - 1])
}