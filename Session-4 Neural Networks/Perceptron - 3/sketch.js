// f(x) = w1 * x + w2 * y
// let f(x) = 0
// w1 * x + w2 * y = 0
// y = - (w1 / w2) * x

let perceptron;
let points = [];

function setup(){
  createCanvas(600, 600);
  perceptron = new Perceptron();

  for (let i = 0; i < 40; i++) {
    points.push(new Point())
  }

  frameRate(6)
}

function draw(){
  background(255);

  stroke(0);
  drawLineInCartesian(perceptron.weights[0]/perceptron.weights[1], 0);
  // line(0, 0, width, height);

  points.forEach(point=>{
      point.show();
      perceptron.train([point.x, point.y], point.lable);
  });

  console.log(perceptron.weights[0], perceptron.weights[1]);
}

function drawLineInCartesian(k, b){
  // let point1 = {x: 0, y: height - b}
  // let point2 = {x: width, y: height - (k * width + b)}
  let point1 = {x: 0, y: height/2 - width * k/2 + b};
  let point2 = {x: width, y: height/2 + width * k/2 + b};

  push();
  strokeWeight(2);
  stroke(color(255, 0, 255));
  line(point1.x, point1.y, point2.x, point2.y);
  pop();
}

function canvasToCartesian(x, y){
  return {
    x: x - width/2,
    y: height/2 - y
  }
}

function cartesianToCanvas(x, y){
  return {
    x: x + width/2,
    y: height/2 - y
  }
}