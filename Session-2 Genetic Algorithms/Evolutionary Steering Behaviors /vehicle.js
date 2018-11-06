function Vehicle({x = random(0, width), 
                  y = random(0, height), 
                  vx = random(-1 , 1), 
                  vy = random(-1 , 1), 
                  // size = random(1, 5), 
                  maxSpeed = 3, 
                  maxForce = 1, 
                  slowDownMargin = 30, 
                  scope = random(20, 100),
                  slowDownSpeed = 1, 
                  eatFoodRadius = 2,
                  eatPoisonRadius = random(4, 12),
                  walkAroundSpeed = 1,
                  initHealth = 3,
                  maxHealth = 100,
                  healthDown = 0.01,
                  separateWeight = random(-1, 3),
                  alignWeight = random(-1, 3),
                  cohesionWeight = random(-0.2, 0.2),
                  desiredSeparation = 25.0,
                  neighbordist = 50.0,
                  foodDistWeight = random(0, 1),
                  foodNutritionWeight = random(0, 1),
                  birthRate = 0.05,
                  birthHealth = random(3, 10)
                  // birthRate = 0
                } = {}){

  // physics value
  this.position = createVector(x, y);
  this.velocity = createVector(vx, vy);
  this.acceleration = createVector();
  
  // running ability params
  this.maxSpeed = maxSpeed;
  this.maxForce = maxForce;

  this.walkAroundSpeed = walkAroundSpeed;

  this.slowDownMargin = slowDownMargin;
  this.slowDownSpeed = slowDownSpeed;

  // health params
  this.size = initHealth;
  this.health = initHealth;
  this.healthDown = healthDown;
  this.maxHealth = maxHealth * sqrt(this.size);
  
  // vision params
  this.scope = scope;
  
  // flock behavior params
  this.desiredSeparation = desiredSeparation;
  this.neighbordist = neighbordist;

  this.separateWeight = separateWeight;
  this.alignWeight = alignWeight;
  this.cohesionWeight = cohesionWeight;

  // food preference params
  this.foodDistWeight = foodDistWeight;
  this.foodNutritionWeight = foodNutritionWeight;
  
  // predation radius params
  this.eatFoodRadius = eatFoodRadius;
  this.eatPoisonRadius = eatPoisonRadius;

  // reproduction params
  this.birthRate = birthRate;
  this.birthHealth = birthHealth;

  // init value
  this.noiseRands = [random(-3000, 3000), random(-3000, 3000), random(-3000, 3000)]
  this.frame = 0;

  this.dna = []

  this.count = 0;

  // this.velocity.setMag(this.maxspeed);
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
  vertex(0, -sqrt(this.size + 2) * 2);
  // console.log(this.size)
  vertex(-sqrt(this.size + 2), sqrt(this.size + 2) * 2);
  vertex(sqrt(this.size + 2), sqrt(this.size + 2) * 2);
  endShape(CLOSE);
  fill(255, 255, 255, 10)
  ellipse(0, 0, this.scope * 2)

  stroke(255, 0, 0)
  ellipse(0, 0, this.eatPoisonRadius * 2)
  pop();

  // textSize(12);
  // fill(255);
  // text(this.count, this.position.x, this.position.y)
}

Vehicle.prototype.update = function(){
  this.velocity.limit(this.maxSpeed);
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
  this.health -= this.healthDown;
  this.size -= this.healthDown;
  this.frame++;

  // this.boundaries();
  this.infintBoundaries();
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
  let highestScore = -Infinity;
  // let minDist = Infinity;
  let bestIndex = -1;

  foods.forEach((food, i) => {
    let currentDist = p5.Vector.dist(this.position, food.position);
    if(currentDist < this.eatPoisonRadius){
      this.health += food.nutrition;
      this.size += food.nutrition;
      if(this.health > this.maxHealth){
        this.health = this.maxHealth
        this.size = this.maxHealth
      }
      foods.splice(i, 1)
    }
  })

  foods.forEach((food, i) => {
    let currentDist = p5.Vector.dist(this.position, food.position);
    if(food.nutrition > 0){
      let currentScore = map(currentDist, this.scope, 0, 0 ,5) * this.foodDistWeight + food.nutrition * this.foodNutritionWeight;
      if(currentDist < this.scope){
        if(currentScore > highestScore){
          highestScore = currentScore;
          bestIndex = i
        }
      }
    }
  })


  if(bestIndex != -1){
    let distToBestFood
    try {
      distToBestFood = p5.Vector.dist(this.position, foods[bestIndex].position);
    }
    catch(err) {
      console.log(bestIndex)
      console.log(foods.length)
      console.log(foods[bestIndex])
      console.log(err.message)
    }
    if(distToBestFood < this.eatFoodRadius){
      this.health += foods[bestIndex].nutrition;
      this.size += foods[bestIndex].nutrition;
      if(this.health > this.maxHealth){
        this.health = this.maxHealth
        this.size = this.maxHealth
      }
      foods.splice(bestIndex, 1)
    } else {
      this.seek(foods[bestIndex].position);
    }
  } else {
    this.walkAround()
  }

  // Vehicle.prototype.eat = function(){

  // }

  // if(minDist < this.scope){
  //   if(minDist < this.eatFoodRadius){
  //     this.health += foods[bestIndex].nutrition
  //     this.size += foods[bestIndex].nutrition
  //     if(this.health > this.maxHealth){
  //       this.health = this.maxHealth
  //       this.size = this.maxHealth
  //     }
  //     foods.splice(bestIndex, 1)
  //   } else if(bestIndex != -1) {
  //     this.seek(foods[bestIndex].position);
  //   } else {
  //     this.walkAround()
  //   }
  // } else {
  //   this.walkAround()
  // }
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

Vehicle.prototype.birth = function(flock) {
  let r = random(1);
  this.count = 0;
  // let count = 0;

  flock.boids.forEach((vehicle,i)=>{
    let d = p5.Vector.dist(this.position, vehicle.position);
    if((d > 0) && (d < this.scope)){
      this.count++;
    }
  })

  if(this.count <= 1){
    if ((r < this.birthRate) && (this.health > this.birthHealth)) {
      // Same location, same DNA
      this.health -= 3
      this.size -= 3
      flock.addBoid(new Vehicle({x:this.position.x, y:this.position.y}));
    }
  } else {
    if ((r < this.birthRate * 0) && (this.health > this.birthHealth)) {
      // Same location, same DNA
      this.health -= 3
      this.size -= 3
      console.log('birth');
      flock.addBoid(new Vehicle({x:this.position.x, y:this.position.y}));
    }
  }


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

Vehicle.prototype.infintBoundaries = function() {
  let desired = null;
  if (this.position.x < 0) {
    this.position.x = width;
  } else if (this.position.x > width) {
    this.position.x = 0;
  }

  if (this.position.y < 0) {
    this.position.y = height;
  } else if (this.position.y > height - 0) {
    this.position.y = 0;
  }
}
