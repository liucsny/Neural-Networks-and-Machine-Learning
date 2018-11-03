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
    foods.push(createVector(random(0,width), random(0,height)))
  }

}

function draw(){
  background(12);

  foods.forEach(food => {
    fill(color(0, 255, 0))
    noStroke()
    ellipse(food.x, food.y, 6, 6)
  })

  vehicles.forEach(vehicle=>{
    vehicle.update();
    // vehicle.seek(createVector(mouseX, mouseY));
    vehicle.eat(foods);
    vehicle.display();
  })

  fill(color(255,255,255,100))
  ellipse(mouseX, mouseY,100,100)
}