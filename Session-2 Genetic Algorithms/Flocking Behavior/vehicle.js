function Vehicle({x = random(0, width), 
                  y = random(0, height), 
                  vx = random(-1 , 1), 
                  vy = random(-1 , 1), 
                  // size = random(1, 5), 
                  maxSpeed = 3, 
                  maxForce = 1, 
                  slowDownMargin = 30, 
                  scope = 300, 
                  slowDownSpeed = 1, 
                  eatDist = 2, 
                  walkAroundSpeed = 1,
                  initHealth = random(1, 5),
                  maxHealth = 10,
                  healthDown = 0.01,
                  separateWeight = random(-2, 2),
                  alignWeight = random(-2, 2),
                  cohesionWeight = random(-0.2, 0.2),
                  desiredSeparation = 25.0,
                  neighbordist = 50.0,
                } = {}){
  
  this.position = createVector(x, y);
  this.velocity = createVector(vx, vy);
  this.acceleration = createVector();
  
  this.maxSpeed = maxSpeed;
  this.size = initHealth;
  
  this.maxForce = maxForce;
  
  this.slowDownMargin = slowDownMargin;
  this.slowDownSpeed = slowDownSpeed;
  
  this.scope = scope;
  
  // flock behavior params
  this.desiredSeparation = desiredSeparation;
  this.neighbordist = neighbordist;
  this.desiredSeparation = desiredSeparation;
  
  this.eatDist = eatDist;

  this.walkAroundSpeed = walkAroundSpeed;

  this.health = initHealth;
  this.healthDown = healthDown;
  this.maxHealth = maxHealth * sqrt(this.size);

  this.separateWeight = separateWeight;
  this.alignWeight = alignWeight;
  this.cohesionWeight = cohesionWeight;

  this.velocity.setMag(this.maxspeed);

  this.noiseRands = [random(-3000, 3000), random(-3000, 3000), random(-3000, 3000)]
  this.frame = 0;

  this.dna = []
}



Vehicle.prototype.display = function(){
  let theta = this.velocity.heading() + PI / 2;
  let opacity = map(this.health, 0, 1, 20 ,255)

  push();
  translate(this.position.x, this.position.y);
  noFill();
  ellipse(0, 0, this.scope * 2)
  rotate(theta);
  fill(color(255, 255, 255, opacity));
  // strokeWeight(1);
  // stroke(255);
  noStroke();
  beginShape();
  vertex(0, -sqrt(this.size) * 2);
  vertex(-sqrt(this.size), sqrt(this.size) * 2);
  vertex(sqrt(this.size), sqrt(this.size) * 2);
  endShape(CLOSE);
  pop();
}

Vehicle.prototype.update = function(){
  this.velocity.limit(this.maxSpeed);
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
  this.health -= this.healthDown;
  this.size -= this.healthDown;
  this.frame++;

  this.boundaries();
}



Vehicle.prototype.applyForce = function(force){
  // a = F/m
  // console.log(force.mag())
  force.div(this.size);
  force.limit(this.maxForce);
  // console.log(force.mag())
  this.acceleration.add(force)
}

Vehicle.prototype.seekForce = function(target){
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

  return steering
}

Vehicle.prototype.seek = function(target){

  let steering = this.seekForce(target);
  this.applyForce(steering);
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
    if(minDist < this.eatDist){
      this.health += foods[closetIndex].nutrition
      this.size += foods[closetIndex].nutrition
      if(this.health > this.maxHealth){
        this.health = this.maxHealth
        this.size = this.maxHealth
      }
      foods.splice(closetIndex, 1)
    } else if(closetIndex != -1) {
      this.seek(foods[closetIndex].position);
    } else {
      this.walkAround()
    }
  } else {
    this.walkAround()
  }
}

Vehicle.prototype.walkAround = function(){
  let x = noise((this.frame + this.noiseRands[0]) * 0.01) * 2 - 1;
  let y = noise(((this.frame + this.noiseRands[1]) + this.noiseRands[2]) * 0.01) * 2 - 1;

  let desired = createVector(x,y);
  desired.add(this.velocity);
  desired.normalize();
  desired.mult(this.walkAroundSpeed);

  let steering = p5.Vector.sub(desired, this.velocity);
  steering.limit(this.maxForce);

  this.applyForce(steering);
}

Vehicle.prototype.separate = function(vehicles){
  let steerForce = createVector(0, 0);
  let count = 0;

  vehicles.forEach((vehicle,i)=>{
    let d = p5.Vector.dist(this.position, vehicle.position);
    if((d > 0) && (d < this.scope) && (d < this.desiredSeparation)){
      let diff = p5.Vector.sub(this.position, vehicle.position);
      diff.normalize();
      diff.div(d);
      steerForce.add(diff);
      count++;
    }
  })

  if (count > 0) {
    steerForce.div(count);
  }

  steerForce.limit(this.maxforce);

  return steerForce;
}

Vehicle.prototype.align = function(vehicles){
  let sum = createVector(0, 0);
  let count = 0;

  vehicles.forEach((vehicle,i)=>{
    let d = p5.Vector.dist(this.position, vehicle.position);
    if((d > 0) && (d < this.scope) && (d < this.neighbordist)){
      sum.add(vehicle.velocity);
      count++;
    }
  })

  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steerForce = p5.Vector.sub(sum, this.velocity);
    steerForce.limit(this.maxforce);
    return steerForce;
  } else {
    return createVector(0, 0);
  }
}

Vehicle.prototype.cohesion = function(vehicles){
  let sum = createVector(0, 0);
  let count = 0;

  vehicles.forEach((vehicle,i)=>{
    let d = p5.Vector.dist(this.position, vehicle.position);
    if((d > 0) && (d < this.scope) && (d < this.neighbordist)){
      sum.add(vehicle.position); // Add location
      count++;
    }
  })

  if (count > 0) {
    sum.div(count);
    return this.seekForce(sum);
  } else {
    return createVector(0, 0);
  }
}


Vehicle.prototype.flock = function(vehicles){
  let separateForce = this.separate(vehicles); // Separation
  let alignForce = this.align(vehicles); // Alignment
  let cohesionForce = this.cohesion(vehicles); // Cohesion

  // Arbitrarily weight these forces
  separateForce.mult(this.separateWeight);
  alignForce.mult(this.alignWeight);
  cohesionForce.mult(this.cohesionWeight);

  // Add the force vectors to acceleration
  this.applyForce(separateForce);
  this.applyForce(alignForce);
  this.applyForce(cohesionForce);
}

Vehicle.prototype.isDead = function(){
  if(this.health < 0){
    return true;
  } else {
    return false;
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
    steer.limit(this.maxforce * 2);
    this.applyForce(steer);
  }
}

