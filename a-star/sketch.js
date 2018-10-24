let cols = 81;
let rows = 81;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start, end;
let w, h;

function setup() {
  createCanvas(800, 800);
  console.log('A*');

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].addNeighbors(grid)
    }
  }

  // console.log(grid)

  start = grid[40][40];
  end = grid[cols - 1][rows - 1];
  w = width / cols;
  h = height / rows;

  openSet.push(start);

}



function draw(){
  background(0);
  
  if (openSet.length > 0) {

    // 找出openSet里，f值最小的
    let winner  = 0;

    for (let i = 0; i < openSet.length; i++) {
      if(openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }

    if (openSet[winner] === end) {
      console.log('Done!');
    }

    let current = openSet[winner];

    openSet.remove(current);
    closedSet.push(current);

    let neighbors = current.neighbors;




    neighbors.forEach(neighbor=>{
      
      if(!closedSet.includes(neighbor)) {
        let tempG = current.g + 1;
        if(openSet.includes(neighbor)){
          if(tempG < neighbor.g){
            neighbor.g = tempG
          }
        }else{
          neighbor.g = tempG;
          openSet.push(neighbor)
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
      }

    })

  }

  grid.forEach(array => {
    array.forEach(spot => {
      spot.show(color(255));
    });
  });

  closedSet.forEach(spot=>{
    spot.show(color(235,0,0))
  })

  openSet.forEach(spot=>{
    spot.show(color(0,235,0))
  })
}



Array.prototype.remove = function(ele){
  for (let i = 0; i < this.length; i++) {
    if(this[i] == ele){
      this.splice(i, 1);
    }
  }
}

function heuristic(a, b){
  let d = dist(a.x,a.y,b.x,b.y)
  return d;
}