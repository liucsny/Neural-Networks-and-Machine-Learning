function Vehicle({
  x = random(0, width), 
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
  birthRate = 0.03,
  birthHealth = random(3, 10),
  eatFoodPreference = 1,
  eatPoisonPreference = random(-1,0),
  avoidPoisonRadius = eatPoisonRadius + random(5, 50),
  strokeColor = color(random(0, 255),random(0, 255),random(0, 255)),
  dna = {}
} = {}){


  this.dna = dna

  // physics value
  this.position = createVector(x, y);
  this.velocity = createVector(vx, vy);
  this.acceleration = createVector();
  
  // running ability params
  // this.maxSpeed = this.dna.maxSpeed;
  // this.maxForce = this.dna.maxForce;

  // this.walkAroundSpeed = this.dna.walkAroundSpeed;

  // this.slowDownMargin = this.dna.slowDownMargin;
  // this.slowDownSpeed = this.dna.slowDownSpeed;

  // health params
  // this.size = this.dna.initHealth;
  // this.health = this.dna.initHealth;
  // this.healthDown = this.dna.healthDown;
  // this.maxHealth = this.dna.maxHealth * sqrt(this.size);
  
  // vision params
  // this.scope = this.dna.scope;
  
  // flock behavior params
  // this.desiredSeparation = this.dna.desiredSeparation;
  // this.neighbordist = this.dna.neighbordist;

  // this.separateWeight = this.dna.separateWeight;
  // this.alignWeight = this.dna.alignWeight;
  // this.cohesionWeight = this.dna.cohesionWeight;

  // food preference params
  // this.foodDistWeight = this.dna.foodDistWeight;
  // this.foodNutritionWeight = this.dna.foodNutritionWeight;
  
  // predation radius params
  // this.eatFoodRadius = this.dna.eatFoodRadius;
  // this.eatPoisonRadius = this.dna.eatPoisonRadius;

  // reproduction params
  // this.birthRate = this.dna.birthRate;
  // this.birthHealth = this.dna.birthHealth;

  // this.eatFoodPreference = this.dna.eatFoodPreference,
  // this.eatPoisonPreference = this.dna.eatPoisonPreference,
  // this.avoidPoisonRadius = this.dna.avoidPoisonRadius

  // running ability params
  !!this.dna.maxSpeed ? this.maxSpeed = this.dna.maxSpeed : this.maxSpeed = maxSpeed;
  !!this.dna.maxForce? this.maxForce = this.dna.maxForce : this.maxForce = maxForce;

  !!this.dna.walkAroundSpeed? this.walkAroundSpeed = !this.dna.walkAroundSpeed : this.walkAroundSpeed = walkAroundSpeed;

  !!this.dna.slowDownMargin? this.slowDownMargin = this.dna.slowDownMargin : this.slowDownMargin = slowDownMargin;
  !!this.dna.slowDownSpeed? this.slowDownSpeed = this.dna.slowDownSpeed : this.slowDownSpeed = slowDownSpeed;

  // health params
  !!this.dna.initHealth? this.size = this.dna.initHealth : this.size = initHealth;
  !!this.dna.initHealth? this.health = this.dna.initHealth : this.health = initHealth;
  !!this.dna.healthDown? this.healthDown = this.dna.healthDown : this.healthDown = healthDown;
  !!this.dna.maxHealth? this.maxHealth = this.dna.maxHealth * sqrt(this.size) : this.maxHealth = maxHealth * sqrt(this.size);
  
  // vision params
  !!this.dna.scope? this.scope = this.dna.scope : this.scope = scope;
  
  // flock behavior params
  !!this.dna.desiredSeparation? this.desiredSeparation = this.dna.desiredSeparation : this.desiredSeparation = desiredSeparation;
  !!this.dna.neighbordist? this.neighbordist = this.dna.neighbordist : this.neighbordist = neighbordist;

  !!this.dna.separateWeight? this.separateWeight = this.dna.separateWeight : this.separateWeight = separateWeight;
  !!this.dna.alignWeight? this.alignWeight = this.dna.alignWeight : this.alignWeight = alignWeight;
  !!this.dna.cohesionWeight? this.cohesionWeight = this.dna.cohesionWeight : this.cohesionWeight = cohesionWeight;

  // food preference params
  !!this.dna.foodDistWeight? this.foodDistWeight = this.dna.foodDistWeight : this.foodDistWeight = foodDistWeight;
  !!this.dna.foodNutritionWeight? this.foodNutritionWeight = this.dna.foodNutritionWeight : this.foodNutritionWeight = foodNutritionWeight;
  
  // predation radius params
  !!this.dna.eatFoodRadius? this.eatFoodRadius = this.dna.eatFoodRadius : this.eatFoodRadius = eatFoodRadius;
  !!this.dna.eatPoisonRadius? this.eatPoisonRadius = this.dna.eatPoisonRadius : this.eatPoisonRadius = eatPoisonRadius;

  // reproduction params
  !!this.dna.birthRate? this.birthRate = this.dna.birthRate : this.birthRate = birthRate;
  !!this.dna.birthHealth? this.birthHealth = this.dna.birthHealth : this.birthHealth = birthHealth;

  !!this.dna.eatFoodPreference? this.eatFoodPreference = this.dna.eatFoodPreference : this.eatFoodPreference = eatFoodPreference;
  !!this.dna.eatPoisonPreference? this.eatPoisonPreference = this.dna.eatPoisonPreference : this.eatPoisonPreference = eatPoisonPreference;
  !!this.dna.avoidPoisonRadius? this.avoidPoisonRadius = this.dna.avoidPoisonRadius : this.avoidPoisonRadius = avoidPoisonRadius;


  !!this.dna.strokeColor? this.strokeColor = this.dna.strokeColor : this.strokeColor = strokeColor;

  // init value
  this.noiseRands = [random(-3000, 3000), random(-3000, 3000), random(-3000, 3000)]
  this.initFrame = frameCount;

  this.frameAge = 0;

  this.count = 0;
  // this.velocity.setMag(this.maxspeed);
}

Vehicle.prototype.display = function(){
  let theta = this.velocity.heading() + PI / 2;
  let opacity = map(this.health, 0, 1, 20 ,255)

  push();
  translate(this.position.x, this.position.y);
  // noFill();
  // ellipse(0, 0, this.scope * 2)
  rotate(theta);
  stroke(this.strokeColor);
  strokeWeight(2);
  fill(color(this.strokeColor.levels[0], this.strokeColor.levels[1], this.strokeColor.levels[2], opacity));
  // strokeWeight(1);
  // stroke(255);
  // noStroke();
  beginShape();
  vertex(0, -sqrt(this.size + 4) * 2);
  // console.log(this.size)
  vertex(-sqrt(this.size + 2), sqrt(this.size + 2) * 2);
  vertex(sqrt(this.size + 2), sqrt(this.size + 2) * 2);
  endShape(CLOSE);

  // fill(255, 255, 255, 10);
  // stroke(255, 255, 255, 30);
  // ellipse(0, 0, this.scope * 2);

  // stroke(255, 0, 0);
  // ellipse(0, 0, this.eatPoisonRadius * 2);

  // stroke(255, 0, 0, 100);
  // fill(255, 255, 255, 5)
  // ellipse(0, 0, this.avoidPoisonRadius * 2);

  pop();

  // textSize(12);
  // fill(255);
  // text(this.count, this.position.x, this.position.y)
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

Vehicle.prototype.mutation = function(){
  let mutationRate = 0.01;
  let rand = random(0,1)
  for (const key in this.dna) {
    // console.log('dna')
    // if((random(0,1) < mutationRate) && (this.dna[key] instanceof Number) && (this.dna.hasOwnProperty(key))){
      // console.log(this.dna[key])
    if((rand < mutationRate) && isNumber(this.dna[key]) && (this.dna.hasOwnProperty(key))){

      if(rand < mutationRate * 0.4){

        random(0,1) < 0.5 ? this.dna[key] * 0.9 : this.dna[key] * 1.1;


        let r = this.dna.strokeColor.levels[0];
        let g = this.dna.strokeColor.levels[1];
        let b = this.dna.strokeColor.levels[2];
        
        random(0,1) < 0.5 ? r *= 0.8 : r *= 1.2;
        random(0,1) < 0.5 ? g *= 0.8 : g *= 1.2;
        random(0,1) < 0.5 ? b *= 0.8 : b *= 1.2;

  
        r > 255 ? r = 255:
        g > 255 ? g = 255:
        b > 255 ? b = 255:
  
        r < 30 ? r = 30:
        g < 30 ? g = 30:
        b < 30 ? b = 30:
  
        this.dna.strokeColor = color(r,g,b);
      } else { 
        this.dna[key] * random(0.95, 1.05);
        let r = this.dna.strokeColor.levels[0] * random(0.8, 1.2);
        let g = this.dna.strokeColor.levels[1] * random(0.8, 1.2);
        let b = this.dna.strokeColor.levels[2] * random(0.8, 1.2);
  
        r > 255 ? r = 255:
        g > 255 ? g = 255:
        b > 255 ? b = 255:
  
        r < 30 ? r = 30:
        g < 30 ? g = 30:
        b < 30 ? b = 30:
  
  
        this.dna.strokeColor = color(r,g,b);
      }
      // console.log('Mutation!')
    }
  }
}

Vehicle.prototype.update = function(){
  this.velocity.limit(this.maxSpeed);
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
  this.health -= this.healthDown;
  this.size -= this.healthDown;
  this.frameAge++;

  // this.boundaries();
  this.infintBoundaries();
}



Vehicle.prototype.applyForce = function(force){
  // a = F/m
  // console.log(force.mag())
  if(!!this.size){
    force.div(this.size);
  }
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

Vehicle.prototype.seek = function(target, weight = 1){
  // if(weight < 0){
  //   console.log('Poison!')
  // }
  let steering = this.seekForce(target);
  steering.mult(weight);
  this.applyForce(steering);
}



Vehicle.prototype.eat = function(foods) {
  let highestScore = -Infinity;
  // let minDist = Infinity;
  let bestFoodIndex = -1;

  foods.forEach((food, i) => {
    let currentDist = p5.Vector.dist(this.position, food.position);
    if(currentDist < this.eatPoisonRadius){
      this.health += food.health;
      this.size += food.health;
      if(this.health > this.maxHealth){
        this.health = this.maxHealth
        this.size = this.maxHealth
      }
      foods.splice(i, 1)
    }
  })

  foods.forEach((food, i) => {
    let currentDist = p5.Vector.dist(this.position, food.position);
    if(food.health > 0){
      let currentScore = map(currentDist, this.scope, 0, 0 ,5) * this.foodDistWeight + food.health * this.foodNutritionWeight;
      if(currentDist < this.scope){
        if(currentScore > highestScore){
          highestScore = currentScore;
          bestFoodIndex = i
        }
      }
    }
  })


  if(bestFoodIndex != -1){
    let distToBestFood
    try {
      distToBestFood = p5.Vector.dist(this.position, foods[bestFoodIndex].position);
    }
    catch(err) {
      console.log(bestFoodIndex)
      console.log(foods.length)
      console.log(foods[bestFoodIndex])
      console.log(err.message)
    }
    if(distToBestFood < this.eatFoodRadius){
      this.health += foods[bestFoodIndex].health;
      this.size += foods[bestFoodIndex].health;
      if(this.health > this.maxHealth){
        this.health = this.maxHealth
        this.size = this.maxHealth
      }
      foods.splice(bestFoodIndex, 1)
    } else {
      this.seek(foods[bestFoodIndex].position);
    }
  } else {
    this.walkAround()
  }
}

Vehicle.prototype.behaviors = function(foods) {
  let highestScore = -Infinity;
  let bestFood = null;
  let minDistPoison = Infinity;
  let closetPoison = null;


  foods.forEach((food, i) => {
    let currentDist = p5.Vector.dist(this.position, food.position);

    if(currentDist < this.scope){
      if(food.health > 0){
        let currentScore = map(currentDist, this.scope, 0, 0 ,5) * this.foodDistWeight + food.health * this.foodNutritionWeight;
        if(currentScore > highestScore){
          highestScore = currentScore;
          bestFood = food
        }
      } else if((currentDist < minDistPoison) && (currentDist < this.avoidPoisonRadius)) {
        minDistPoison = currentDist
        closetPoisonIndex = i
      }
    }

    if(food.health < 0){
      if(currentDist < this.eatPoisonRadius){
        this.health += food.health;
        this.size += food.health;
        if(this.health > this.maxHealth){
          this.health = this.maxHealth
          this.size = this.maxHealth
        }
        foods.splice(i, 1)
      }
    } else {
      if(currentDist < this.eatFoodRadius){
        this.health += food.health;
        this.size += food.health;
        if(this.health > this.maxHealth){
          this.health = this.maxHealth
          this.size = this.maxHealth
        }
        foods.splice(i, 1)
      }
    }
  })


  if((!!bestFood)&&(!!closetPoison)){
  // if((bestFoodIndex != -1)){
    this.seek(bestFood.position);
    this.seek(closetPoison.position, this.eatPoisonPreference);
  } else if((!!bestFood)&&(!closetPoison)){
    this.seek(bestFood.position);
  } else if((!bestFood)&&(!!closetPoison)){
    this.seek(closetPoison.position, this.eatPoisonPreference);
  } else {
    this.walkAround()
  }
}

Vehicle.prototype.walkAround = function(){
  let x = noise((this.frameAge + this.noiseRands[0]) * 0.01) * 2 - 1;
  let y = noise(((this.frameAge + this.noiseRands[1]) + this.noiseRands[2]) * 0.01) * 2 - 1;

  let desired = createVector(x,y);
  desired.add(this.velocity);
  desired.normalize();
  if(!!this.walkAroundSpeed) desired.mult(this.walkAroundSpeed);

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
    if(!!this.maxspeed) sum.mult(this.maxspeed);
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
  if(!!this.separateWeight) separateForce.mult(this.separateWeight);
  if(!!this.alignWeight) alignForce.mult(this.alignWeight);
  if(!!this.cohesionWeight) cohesionForce.mult(this.cohesionWeight);

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
      this.health -= 4
      this.size -= 4
      let child = new Vehicle({x:this.position.x, y:this.position.y, dna: this.dna});
      child.mutation();
      flock.addBoid(child);
      // console.log('Birth! - 1')
    }
  } else {
    if ((r < this.birthRate * 0.01) && (this.health > this.birthHealth)) {
      // Same location, same DNA
      this.health -= 4
      this.size -= 4
      let child = new Vehicle({x:this.position.x, y:this.position.y, dna: this.dna});
      child.mutation();
      flock.addBoid(child);
      // console.log('Birth! - 2')
    }
  }


}

Vehicle.prototype.isDead = function(){
  if(this.health < 0){
    // console.log('Dead!')
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
