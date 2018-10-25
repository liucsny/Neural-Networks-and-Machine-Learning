let cols, rows;
let w = 40;
let grid = [];
let current;

function setup() {
  createCanvas(800, 800);
  cols = floor(width/w);
  rows = floor(height/w);

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      let cell = new Cell(i, j, w);
      grid.push(cell);
    }
  }
  current = grid[0];
  current.visited = true;
  
  console.log('Maze');
}

function draw(){
  background(51);

  grid.forEach(cell=>{
    cell.show();
  })
}