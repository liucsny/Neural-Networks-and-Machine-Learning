function Perceptron(){
  this.weights = [random(-1, 1), random(-1, 1)];
  this.learningRate = 0.1;
  // console.log(this.weights)
}

Perceptron.prototype.guess = function(locationArray){
  let sum = 0;
  locationArray.forEach((e,i) => {
    sum += e * this.weights[i]
  });
  return this.sign(sum)
};

Perceptron.prototype.train = function(locationArray, target){
  let guess = this.guess(locationArray);
  let error = target - guess;
  for (let i = 0; i < this.weights.length; i++) {
    this.weights[i] += error * locationArray[i] * this.learningRate; //???
  }
};

Perceptron.prototype.sign = function(input){
  if(input >= 0){
    return 1;
  } else {
    return -1;
  }
};