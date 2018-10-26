let cities = [];
let totalCities = 20;
let recordDistance;
let bestEver;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < totalCities; i++) {
    let c = createVector(random(width), random(height))
    cities.push(c);
  }

  recordDistance = calcDistance(cities);
  bestEver = cities.slice();
}

function draw(){
  background(0);

  fill(255);
  cities.forEach(city=>{
    ellipse(city.x, city.y, 8, 8)
  })

  stroke(255,255,255,100);
  noFill();
  beginShape();
  cities.forEach(city=>{
    vertex(city.x, city.y)
  })
  endShape();

  stroke(255, 255, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  bestEver.forEach(city=>{
    vertex(city.x, city.y)
  })
  endShape();

  let i = floor(random(cities.length))
  let j = floor(random(cities.length))
  cities.swap(i, j)

  let d = calcDistance(cities);
  if(d < recordDistance){
    recordDistance = d;
    bestEver = cities.slice();
    console.log(recordDistance);
  }
}

Array.prototype.swap = function(i, j){
  let temp = this[i];
  this[i] = this[j];
  this[j] = temp;
}

function calcDistance(points) {
  let sum = 0;
  // points.forEach(point=>{
  //   let d = 
  // })
  for (let i = 0; i < points.length - 1; i++) {
    let d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum += d;
  }

  return sum;
}