let points = []
let lineKB = {  
  k: 0,
  b: 0
};

function setup(){
  createCanvas(600, 600);
}

function draw(){
  background(0);

  noStroke();
  fill(255);

  points.forEach(point=>{
    ellipse(point.x, height - point.y, 5)
  })

  if(points.length >= 2){
    gradientDescent(points)
    drawLine(lineKB.k, lineKB.b);
  }
}

function mousePressed(){
  points.push({
    x: mouseX,
    y: height - mouseY,
  })
}

function drawLine(k, b){
  let point1 = {x: 0, y: height - b}
  let point2 = {x: width, y: height - (k * width + b)}

  stroke(255);
  line(point1.x, point1.y, point2.x, point2.y)
}

function gradientDescent(points) {
  let learning_rate = 0.000001;


  points.forEach(point=>{
    // console.log(point);
    let guess = lineKB.k * point.x + lineKB.b;
    let loss = point.y - guess;

    // console.log(loss," + ", point.x, " + ", loss * point.x * learning_rate);

    lineKB.k = lineKB.k + (loss * point.x) * learning_rate;
    lineKB.b = lineKB.b + loss * learning_rate * 5000;
    // console.log('lineKB.k: ' + lineKB.k);
    // console.log('lineKB.b: ' + lineKB.b);
    // console.log('loss * learning_rate: ' + loss * learning_rate);
  })
}