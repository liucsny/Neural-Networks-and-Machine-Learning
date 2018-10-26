let cols, rows;
let w = 20;
let grid = [];
let current;

let stack = [];

function setup() {
  createCanvas(800, 800);
  // frameRate(10);
  cols = floor(width/w);
  rows = floor(height/w);

  for (let i = 0; i < cols; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      let cell = new Cell(i, j, w);
      grid[i].push(cell);
    }
  }
  current = grid[0][0];
  current.visited = true;

  console.log('Maze');
  // console.log(grid);
}

function draw(){
  background(51);

  grid.forEach(array=>{
    array.forEach(cell=>{
      cell.show();
    })
  })

  current.hightLight();

  let next = current.checkNeighbors()
  // console.log(current)
  // console.log(next)

  if(next){
    next.visited = true;
    
    stack.push(current);

    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0){
    current = stack.pop();
  }
}


function removeWalls(a, b){
  let x = a.i - b.i;
  if(x > 0){
    a.wall.left = false;
    b.wall.right = false;
  } else if(x < 0){
    a.wall.right = false;
    b.wall.left = false;
  } else {
    let y = a.j - b.j;
    if(y > 0){
      a.wall.top = false;
      b.wall.bottom = false;
    } else if(y < 0){
      a.wall.bottom = false;
      b.wall.top = false;
    }
  }
}