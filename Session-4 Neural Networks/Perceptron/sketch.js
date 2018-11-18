let perceptron;
let points = [];

let trainingIndex = 0;

function setup(){
  createCanvas(600, 600);
  perceptron = new Perceptron();

  for (let i = 0; i < 40; i++) {
    points.push(new Point())
  }

  frameRate(5)
}

function draw(){
  background(255);

  stroke(0);
  line(0, 0, width, height);

  points.forEach(point=>{
    point.show();
    let guess = perceptron.guess([point.x, point.y]);

    noStroke();
    if(point.lable == guess){
    // if(guess == 1){
      fill(0, 255, 0);
    }else{
      fill(255, 0, 0);
    }
    ellipse(point.x, point.y, 6);

    fill(0);
    textSize(14);
    text(guess, point.x - 4, point.y - 8);
  })

  let trainingPoint = points[trainingIndex];
  perceptron.train([trainingPoint.x, trainingPoint.y], trainingPoint.lable);
  trainingIndex++;
  if(trainingIndex == points.length) trainingIndex = 0;

  fill(255);
  stroke(color(0,0,0,60))
  rect(0, 0, 300, 106)
  fill(0);
  noStroke();
  textSize(18);
  text('input 0: ' + perceptron.weights[0], 20, 40);
  text('input 1: ' + perceptron.weights[1], 20, 80);
}