function Vehicle({x = random(0, width), y = random(0, height), vx = random(-1 , 1), vy = random(-1 , 1), size = random(1, 5), maxSpeed = 8, maxForce = 0.5} = {}){
  this.position = createVector(x, y);
  this.velocity = createVector(vx, vy);
  this.acceleration = createVector();
  this.maxSpeed = maxSpeed;
  this.size = size;
  this.maxForce = maxForce;

  this.velocity.setMag(this.maxspeed);
}

Vehicle.prototype.display = function(){
  let theta = this.velocity.heading() + PI / 2;
  push();
  translate(this.position.x, this.position.y);
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

  // steering = maxDesired - velocity
  let steering = p5.Vector.sub(maxDesired, this.velocity);

  steering.limit(this.maxForce)

  // console.log(steering.mag())
  

  this.applyForce(steering)
}

Vehicle.prototype.boundaries = function() {
  // let margin = 10;
  // let desired = null;
  // if (this.position.x < margin) {
  //   desired = createVector(this.maxspeed, this.velocity.y);
  // } else if (this.position.x > width - margin) {
  //   desired = createVector(-this.maxspeed, this.velocity.y);
  // }

  // if (this.position.y < margin) {
  //   desired = createVector(this.velocity.x, this.maxspeed);
  // } else if (this.position.y > height - margin) {
  //   desired = createVector(this.velocity.x, -this.maxspeed);
  // }

  // if (desired !== null) {
  //   desired.setMag(this.maxspeed);
  //   let steer = p5.Vector.sub(desired, this.velocity);
  //   // steer.limit(this.maxforce);
  //   this.applyForce(steer);
  // }
}

