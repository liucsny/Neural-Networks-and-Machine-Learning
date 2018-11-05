function Flock(){
  this.boids = []
}

Flock.prototype.run = function(foods){
  this.boids.forEach((vehicle, i) => {
    vehicle.update();
    vehicle.eat(foods);
    vehicle.flock(this.boids);
    vehicle.birth(this);
    vehicle.display();
    if(vehicle.isDead()){
      this.boids.splice(i, 1)
    }
  })
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}