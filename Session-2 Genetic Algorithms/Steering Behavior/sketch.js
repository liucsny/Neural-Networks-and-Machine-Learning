let vehiclesNum = 1;
let vehicles = [];

function setup(){
  createCanvas(1200,600);
  for (let i = 0; i < vehiclesNum; i++) {
    vehicles.push(new Vehicle())
  }
}

function draw(){
  background(12);
  vehicles.forEach(vehicle=>{
    vehicle.update();
    vehicle.seek(createVector(mouseX, mouseY));
    vehicle.display();
    // console.log(vehicle)
  })

  fill(color(255,255,255,100))
  // fill(color(255,0,0))
  // strokeWeight(5);
  // stroke(color('#FFE305'))
  // textAlign(CENTER);
  // textSize(64);
  ellipse(mouseX, mouseY,20,20)
  // text('习近平',mouseX, mouseY)
  // noLoop();
  // frameRate(5);
}