function Flock(){
  this.boids = []
}

Flock.prototype.run = function(foods){
  this.boids.forEach((vehicle, i) => {
    // console.log(vehicle)
    vehicle.update();
    vehicle.behaviors(foods);
    vehicle.flock(this.boids);
    vehicle.birth(this);
    vehicle.display();
    if(vehicle.isDead()){
      if(random(0,1) < 0.5){
        foods.push(new Food({x: vehicle.position.x, y: vehicle.position.y, health: random(3, 5)}))
      }
      // console.log(foods)
      this.boids.splice(i, 1)
    }
  })
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}