function Vehicle({x = random(0, width), y = random(0, height), vx = random(-1 , 1), vy = random(-1 , 1), size = random(1, 5), maxSpeed = 3, maxForce = 0.5, slowDownMargin = 30, scope = 300, slowDownSpeed = 1} = {}){
  this.position = createVector(x, y);
  this.velocity = createVector(vx, vy);
  this.acceleration = createVector();
  this.maxSpeed = maxSpeed;
  this.size = size;
  this.maxForce = maxForce;
  this.slowDownMargin = slowDownMargin;
  this.slowDownSpeed = slowDownSpeed;
  this.scope = scope;
  this.velocity.setMag(this.maxspeed);

  this.dna = []
}



Vehicle.prototype.display = function(){
  let theta = this.velocity.heading() + PI / 2;
  push();
  translate(this.position.x, this.position.y);
  noFill();
  ellipse(0, 0, this.scope * 2)
  rotate(theta);
  fill(255);
  strokeWeight(1);
  stroke(255);
  beginShape();
  vertex(0, -this.size * 2);
  vertex(-this.size, this.size * 2);
  vertex(this.size, this.size * 2);
  endShape(CLOSE);
  pop();
}

Vehicle.prototype.update = function(){
  this.velocity.limit(this.maxSpeed);
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);

  this.boundaries();
}



Vehicle.prototype.applyForce = function(force){
  // a = F/m
  // console.log(force.mag())
  force.div(this.size);
  // console.log(force.mag())
  this.acceleration.add(force)
}



Vehicle.prototype.seek = function(target){
  // desired = target - postion
  let desired = p5.Vector.sub(target, this.position);
  let maxDesired = desired.normalize().mult(this.maxSpeed)
  // let maxDesired = desired

  // steering = maxDesired - velocity
  let steering = p5.Vector.sub(maxDesired, this.velocity);

  steering.limit(this.maxForce)

  let distance = p5.Vector.dist(this.position, target)
  
  if(distance < this.slowDownMargin){
    let max = map(distance, 0, this.slowDownMargin, this.slowDownSpeed, this.maxSpeed);
    this.velocity.limit(max);
  }

  // console.log(steering.mag())
  

  this.applyForce(steering)
}



Vehicle.prototype.eat = function(foods) {
  let minDist = Infinity;
  let closetIndex = -1;

  foods.forEach((food, i) => {
    let currentDist = p5.Vector.dist(this.position, food.position);
    if(currentDist < minDist){
      minDist = currentDist;
      closetIndex = i
    }
  })

  if(minDist < this.scope){
    if(minDist < 2){
      foods.splice(closetIndex, 1)
    } else if(closetIndex != -1) {
      this.seek(foods[closetIndex].position);
    }
  }
}



Vehicle.prototype.boundaries = function() {
  let margin = 0;
  let desired = null;
  if (this.position.x < margin) {
    desired = createVector(this.maxSpeed, this.velocity.y);
  } else if (this.position.x > width - margin) {
    desired = createVector(-this.maxSpeed, this.velocity.y);
  }

  if (this.position.y < margin) {
    desired = createVector(this.velocity.x, this.maxSpeed);
  } else if (this.position.y > height - margin) {
    desired = createVector(this.velocity.x, -this.maxSpeed);
  }

  if (desired !== null) {
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
}

