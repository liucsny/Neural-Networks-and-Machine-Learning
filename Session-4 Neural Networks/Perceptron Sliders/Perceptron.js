function Perceptron(){
  this.weights = [0, 0];
}

Perceptron.prototype.changeWeights = function(a, b){
  this.weights[0] = a;
  this.weights[1] = b;
}

Perceptron.prototype.guess = function(array){
  let sum = 0;
  array.forEach((e,i) => {
    sum += e * this.weights[i]
  });
  return this.sign(sum)
}

Perceptron.prototype.train = function(inputs, target){
  let guess = this.guess(inputs);
  let error = target - guess;

  
}

Perceptron.prototype.sign = function(input){
  if(input >= 0){
    return 1;
  } else {
    return -1;
  }
}