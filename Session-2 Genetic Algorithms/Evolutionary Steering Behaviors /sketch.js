let flockNum = 4;
let flock;

let foodsNum = 10;
let foods = [];

let flockNumChart;
let foodsNumChart;

function setup(){
  createCanvas(1200,600);

  flock = new Flock();

  for (let i = 0; i < flockNum; i++) {
    flock.addBoid(new Vehicle({initHealth: 6}))
  }

  for (let i = 0; i < foodsNum; i++) {
    foods.push(new Food())
  }

  flockNumChart = new Chart(0, 600 - 150, width, 150, color(255, 255, 255));
  foodsNumChart = new Chart(0, 600 - 150, width, 150, color(0, 255, 0));
  posionNumChart = new Chart(0, 600 - 150, width, 150, color(255, 0, 0));
}

function draw(){
  background(12);

  let prob = map(foods.filter(food => food.nutrition > 0).length, 0, 100, 0.02, 0.2)
  // let prob = map(sin(frameCount/500), -1, 1, 0.04, 0.1)
  // let prob = 0.2


  if(random() < prob){
    foods.push(new Food())
  }

  foods.forEach(food => {
    food.show();
  })

  flock.run(foods);

  flockNumChart.display(flock.boids.length);
  foodsNumChart.display(foods.filter(food => food.nutrition > 0).length)
  posionNumChart.display(foods.filter(food => food.nutrition < 0).length)

  // fill(color(255,255,255,100))
  // ellipse(mouseX, mouseY,100,100)
  fill(255);
  noStroke();
  textSize(18);
  text('当前生命数：' + flock.boids.length, 10, 30)
  text('当前食物数：' + foods.length, 10, 60)
  text('当前生产概率：' + map(prob, 0, 0.2, 0, 100).toFixed(2) + '%', 10, 90)
}

function mouseClicked() {
  flock.addBoid(new Vehicle({x: mouseX, y: mouseY, initHealth: 6}))

  return false;
}