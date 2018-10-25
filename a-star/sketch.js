let cols = 81;
let rows = 81;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start, end;
let w, h;
let path;

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
  end = grid[10][0];
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

    let current = openSet[winner];

    if (openSet[winner] === end) {
      console.log('Done!');
      noLoop();
    }

    let temp = current;
    path = [];
    path.push(temp);
    while(!!temp.previous){
      path.push(temp.previous);
      temp = temp.previous;
    }
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
        neighbor.previous = current;
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

  path.forEach(spot=>{
    spot.show(color(0,0,235))
  })

  // for (let i = 0; i < path.length; i++) {
  //   path[i].show(color(0,0,235))
  // }

  start.show(color('#12AFD2'));
  end.show(color('#6A12D2'));
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