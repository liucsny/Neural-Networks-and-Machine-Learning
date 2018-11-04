let flockNum = 200;
let flock;

let foodsNum = 100;
let foods = [];

function setup(){
  createCanvas(1200,600);

  flock = new Flock();

  for (let i = 0; i < flockNum; i++) {
    flock.addBoid(new Vehicle())
  }

  for (let i = 0; i < foodsNum; i++) {
    foods.push(new Food())
  }

}

function draw(){
  background(12);

  let prob = map(sin(frameCount/500), -1, 1, 0.04, 0.2)


  if(random() < prob){
    foods.push(new Food())
  }

  foods.forEach(food => {
    food.show();
  })

  flock.run();

  // fill(color(255,255,255,100))
  // ellipse(mouseX, mouseY,100,100)
  fill(255);
  noStroke();
  textSize(18);
  text('当前生命数：' + flock.boids.length, 10, 30)
  text('当前食物数：' + foods.length, 10, 60)
  text('当前生产概率：' + map(prob, 0, 0.2, 0, 100).toFixed(2) + '%', 10, 90)
}