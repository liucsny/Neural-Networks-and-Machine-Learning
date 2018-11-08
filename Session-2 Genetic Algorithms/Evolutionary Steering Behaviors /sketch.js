let flockNum = 8;
let flock;

// let predatorNum = 2;
// let predatorFlock;

let foodsNum = 50;
let foods = [];

let flockNumChart;
let foodsNumChart;

function setup(){
  createCanvas(1200,600);

  flock = new Flock();

  predatorFlock = new Flock();

  for (let i = 0; i < flockNum; i++) {
    flock.addBoid(new Vehicle({dna: {
      maxSpeed: 3, 
      maxForce: 1, 
      slowDownMargin: 30, 
      scope: random(20, 100),
      slowDownSpeed: 1, 
      eatFoodRadius: 2,
      eatPoisonRadius: random(4, 12),
      walkAroundSpeed: 1,
      initHealth: 3,
      maxHealth: 100,
      healthDown: 0.01,
      separateWeight: random(-1, 3),
      alignWeight: random(-1, 3),
      cohesionWeight: random(-0.2, 0.2),
      desiredSeparation: 25.0,
      neighbordist: 50.0,
      foodDistWeight: random(0, 1),
      foodNutritionWeight: random(0, 1),
      birthRate: 0.03,
      birthHealth: random(3, 10),
      eatFoodPreference: 1,
      eatPoisonPreference: random(-1,0),
      avoidPoisonRadius: random(0, 60),
      strokeColor: color(random(30, 255),random(30, 255),random(30, 255)),
    }}))
  }

  // for (let i = 0; i < predatorNum; i++) {
  //   predatorFlock.addBoid(new Vehicle({dna: {
  //     maxSpeed: 3, 
  //     maxForce: 1, 
  //     slowDownMargin: 30, 
  //     scope: random(20, 100),
  //     slowDownSpeed: 1, 
  //     eatFoodRadius: 2,
  //     eatPoisonRadius: random(4, 12),
  //     walkAroundSpeed: 1,
  //     initHealth: 12,
  //     maxHealth: 100,
  //     healthDown: 0.01,
  //     separateWeight: random(-1, 3),
  //     alignWeight: random(-1, 3),
  //     cohesionWeight: random(-0.2, 0.2),
  //     desiredSeparation: 25.0,
  //     neighbordist: 50.0,
  //     foodDistWeight: random(0, 1),
  //     foodNutritionWeight: random(0, 1),
  //     birthRate: 0.000005,
  //     birthHealth: random(3, 10),
  //     eatFoodPreference: 1,
  //     eatPoisonPreference: random(-1,0),
  //     avoidPoisonRadius: this.eatPoisonRadius + random(0, 60)
  //   }}))
  // }

  for (let i = 0; i < foodsNum; i++) {
    foods.push(new Food({health: random(-2,6)}))
  }

  flockNumChart = new Chart(0, 600 - 150, width, 150, color(255, 255, 255));
  foodsNumChart = new Chart(0, 600 - 150, width, 150, color(0, 255, 0));
  posionNumChart = new Chart(0, 600 - 150, width, 150, color(255, 0, 0));
}

function draw(){
  background(40);

  let prob = map(foods.filter(food => food.health > 0).length, 0, 100, 0.02, 0.18)
  // let prob = map(sin(frameCount/500), -1, 1, 0.04, 0.1)
  // let prob = 0.1


  if(random() < prob){
    foods.push(new Food())
  }

  foods.forEach(food => {
    food.show();
  })

  flock.run(foods);
  // predatorFlock.run(flock.boids);

  flockNumChart.display(flock.boids.length);
  foodsNumChart.display(foods.filter(food => food.health > 0).length)
  posionNumChart.display(foods.filter(food => food.health < 0).length)

  // fill(color(255,255,255,100))
  // ellipse(mouseX, mouseY,100,100)
  fill(255);
  noStroke();
  textSize(18);
  text('当前生命数：' + flock.boids.length, 10, 30)
  text('当前食物数：' + foods.filter(food => food.health > 0).length, 10, 60)
  text('当前毒物数：' + foods.filter(food => food.health < 0).length, 10, 90)
  text('当前生产概率：' + map(prob, 0, 0.2, 0, 100).toFixed(2) + '%', 10, 120)
  // noLoop();
}

function mouseClicked() {
  flock.addBoid(new Vehicle({x: mouseX, y: mouseY, dna: {
    maxSpeed: 3, 
    maxForce: 1, 
    slowDownMargin: 30, 
    scope: random(20, 100),
    slowDownSpeed: 1, 
    eatFoodRadius: 2,
    eatPoisonRadius: random(4, 12),
    walkAroundSpeed: 1,
    initHealth: 3,
    maxHealth: 100,
    healthDown: 0.01,
    separateWeight: random(-1, 3),
    alignWeight: random(-1, 3),
    cohesionWeight: random(-0.2, 0.2),
    desiredSeparation: 25.0,
    neighbordist: 50.0,
    foodDistWeight: random(0, 1),
    foodNutritionWeight: random(0, 1),
    birthRate: 0.03,
    birthHealth: random(3, 10),
    eatFoodPreference: 1,
    eatPoisonPreference: random(-1,0),
    avoidPoisonRadius:random(0, 60),
    strokeColor: color(random(30,255), random(30,255), random(30,255)),
  }}))
  return false;
}

// function mouseClicked() {
//   noLoop();
//   return false;
// }