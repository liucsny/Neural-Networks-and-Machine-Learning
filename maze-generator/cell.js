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
  fill(color(225, 0, 225, 150))
  noStroke();
  if(this.visited) rect(this.x, this.y, this.w, this.w)

  stroke(255);
  noFill();
  if(this.wall.top) line(this.x, this.y, this.x + this.w, this.y) //top
  if(this.wall.left) line(this.x, this.y, this.x, this.y + this.w) //left
  if(this.wall.right) line(this.x + this.w, this.y, this.x + this.w, this.y + this.w) //right
  if(this.wall.bottom) line(this.x, this.y + this.w, this.x + this.w, this.y + this.w) //bottom

}

Cell.prototype.checkNeighbors = function(){
  let neighbors = [];
  let top, right, bottom, left;

  if(this.j - 1 >= 0) top = grid[this.i][this.j - 1]
  if(this.i + 1 < cols) right = grid[this.i + 1][this.j]
  if(this.j + 1 < rows) bottom = grid[this.i][this.j + 1]
  if(this.i - 1 >= 0) left = grid[this.i - 1][this.j]

  if(top && !top.visited) neighbors.push(top);
  if(right && !right.visited) neighbors.push(right);
  if(bottom && !bottom.visited) neighbors.push(bottom);
  if(left && !left.visited) neighbors.push(left);

  if(neighbors.length > 0){
    // console.log(neighbors)
    let r = neighbors[floor(random(0, neighbors.length))];
    return r;
  } else {
    return undefined
  }
}

Cell.prototype.hightLight = function(){
  fill(color(0, 255, 0))
  noStroke();
  rect(this.x, this.y, this.w, this.w)
}