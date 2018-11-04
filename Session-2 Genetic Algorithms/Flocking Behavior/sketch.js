let vehiclesNum = 20;
let vehicles = [];

let foodsNum = 200;
let foods = [];

function setup(){
  createCanvas(1200,600);
  for (let i = 0; i < vehiclesNum; i++) {
    vehicles.push(new Vehicle())
  }

  for (let i = 0; i < foodsNum; i++) {
    foods.push(new Food())
  }

}

function draw(){
  background(12);

  let prob = map(sin(frameCount/500), -1, 1, 0.02, 0.06)


  if(random() < prob){
    foods.push(new Food())
  }

  foods.forEach(food => {
    food.show();
  })

  vehicles.forEach((vehicle, i)=>{
    vehicle.update();
    // vehicle.seek(createVector(mouseX, mouseY));
    vehicle.eat(foods);
    vehicle.display();

    if(vehicle.isDead()){
      vehicles.splice(i, 1)
    }
  })

  // fill(color(255,255,255,100))
  // ellipse(mouseX, mouseY,100,100)
  fill(255);
  noStroke();
  textSize(18);
  text('当前生命数：' + vehicles.length, 10, 30)
  text('当前食物数：' + foods.length, 10, 60)
  text('当前生产概率：' + map(prob, 0, 0.06, 0, 100).toFixed(2) + '%', 10, 90)
}