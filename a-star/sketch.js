let cols = 86;
let rows = 86;
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

  start = grid[70][78];
  end = grid[10][0];
  start.isWall = false;
  end.isWall = false;

  w = width / cols;
  h = height / rows;

  openSet.push(start);

}



function draw(){
  background(255);
  
  if (openSet.length > 0) {

    // 找出openSet里，f值最小的，赋给current
    // neighbor.f = neighbor.g + neighbor.h;
    // 也就是说，总是从openSet里 找到f最优的那个进行检查
    let winner  = 0;

    for (let i = 0; i < openSet.length; i++) {
      if(openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }
    let current = openSet[winner];
    // ======================

    // 如果最小的那个是目标，结束
    if (openSet[winner] === end) {
      console.log('Done!');
      noLoop();
    }
    // ======================

    // 把当前current push到path数组中
    let temp = current;
    path = [];
    path.push(temp);

    // 沿着previous 把当前的路径链push到数组中
    while(!!temp.previous){
      path.push(temp.previous);
      temp = temp.previous;
    }

    // 把current 从openSet 转到closedSet
    openSet.remove(current);
    closedSet.push(current);

    // 找出当前格 所有的neighbor
    let neighbors = current.neighbors;

    // 对每个neighbor执行
    neighbors.forEach(neighbor=>{

      // 如果当前neighbor 没有被检查完毕，而且不是墙
      if(!closedSet.includes(neighbor) && !neighbor.isWall ) {
        
        // 把current的的g+1值 存储到tempG中

        // console.log(dist(current.x, current.y, neighbor.x, neighbor.y))
        let tempG = current.g + dist(current.x, current.y, neighbor.x, neighbor.y);

        // 假设还没有找到新的路线
        let newPath = true;

        // 如果当前neighbor 已经被检查过
        if(openSet.includes(neighbor)){

          // 检查当前neighbor的g值 如果大于 current的的g+1 就把current的的g+1替换原先的g
          if(tempG < neighbor.g){
            neighbor.g = tempG

          }else{
            // 这个neighbor已经被检查过了 而且新的路线并不比之前检查的路线好
            // 没找到新的路线
            newPath = false;
          }
        } else {
        // 如果当前neighbor 还没被检查过 就把current的的g+1赋给 这个neighbor的g
          neighbor.g = tempG;

          // 把这个neighbor放到待检查的 openset里
          openSet.push(neighbor)
        }

        // 只有当找到新的路线时 才去更新这个neighbor的 h f 和 previous
        // 如果不是新路线也进行更新 就会用现在的路线把之前可能优化的路线覆盖
        if(newPath){
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }

      }

    })

  } else {
    console.log('No Path');
    noLoop();
  }

  grid.forEach(array => {
    array.forEach(spot => {
      spot.show(color(255));
    });
  });

  closedSet.forEach(spot=>{
    spot.show(color(235,235,235))
  })

  openSet.forEach(spot=>{
    spot.show(color(0,235,0))
  })


  beginShape();
  stroke(color('#FA00FF'));
  strokeWeight(8);
  noFill();
  path.forEach(spot=>{
    // spot.show(color(0,0,235))
    vertex(spot.x * w + w/2, spot.y  * h + h/2)
  })
  endShape();

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
  // let d = abs(a.x - b.x) + abs(a.y - b.y)
  return d;
}