let cities = [];
let totalCities = 7;
let recordDistance;
let bestEver;
let orders = [];

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < totalCities; i++) {
    let c = createVector(random(width), random(height))
    cities.push(c);
    orders.push(i);
  }

  recordDistance = calcDistance(cities, orders);
  bestEver = orders.slice();
}

function draw(){
  background(0);

  // 画出所有城市
  fill(255);
  cities.forEach(city=>{
    ellipse(city.x, city.y, 8, 8)
  })

  // 按照order画出所有连线路径
  stroke(255,255,255,100);
  noFill();
  beginShape();
  for (let i = 0; i < orders.length; i++) {
    let n = orders[i]
    vertex(cities[n].x, cities[n].y)
  }
  endShape();

  // 画出最短的那个路径
  stroke(255, 255, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  bestEver.forEach(order=>{
    // console.log(bestEver)
    vertex(cities[order].x, cities[order].y)
  })
  endShape();

  // let i = floor(random(cities.length))
  // let j = floor(random(cities.length))
  // cities.swap(i, j)

  let d = calcDistance(cities, orders);
  if(d < recordDistance){
    recordDistance = d;
    bestEver = orders.slice();
    console.log(recordDistance);
  }

  textSize(32);
  let s = '';
  for (let i = 0; i < orders.length; i++) {
    s += orders[i];
  }
  fill(255);
  noStroke();
  text(s, 20, 50);

  orders = nextOrder(orders);
}

function calcDistance(points, orders) {
  let sum = 0;
  for (let i = 0; i < orders.length - 1; i++) {
    let pointAIndex = orders[i]
    let pointBIndex = orders[i + 1]

    let pointA = points[pointAIndex]
    let pointB = points[pointBIndex]

    let d = dist(pointA.x, pointA.y, pointB.x, pointB.y);
    sum += d;
  }
  return sum;
}




function nextOrder(array) {
  let largestI = -1;

  for (let i = 0; i < array.length; i++) {
    if(array[i] < array[i + 1]){
      largestI = i;
    }
  }


  if(largestI == -1){
    noLoop()
    console.log('finished')
  }

  let largestJ = -1
  for(let j = 0; j < array.length; j++){
    if(array[largestI] < array[j]){
      largestJ = j
    }
  }

  array.swap(largestI, largestJ)

  let endArray = array.splice(largestI + 1)
  endArray.reverse()
  array = array.concat(endArray)

  return array;
}

Array.prototype.swap = function(i, j){
  let temp = this[i];
  this[i] = this[j];
  this[j] = temp;
}