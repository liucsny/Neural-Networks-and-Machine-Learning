let points = []

function setup(){
  createCanvas(600, 600);
}

function draw(){
  background(0);

  noStroke();
  fill(255);

  points.forEach(point=>{
    ellipse(point.x, height - point.y, 4)
  })

  if(points.length >= 2){
    let line = linearRegression(points)
    drawLine(line.k, line.b);
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
  let point2 = {x: width, y: height - (k*width + b)}

  stroke(255);
  line(point1.x, point1.y, point2.x, point2.y)
}

function linearRegression(points) {
  if(points.length < 2){
    return null
  }
  let xSum = 0;
  let ySum = 0;

  points.forEach(point => {
    xSum += point.x
    ySum += point.y
  })

  let xMean = xSum/points.length;
  let yMean = ySum/points.length;

  let numerator = 0;
  let denominator = 0;
  points.forEach(point => {
    numerator += (point.x - xMean) * (point.y - yMean);
    denominator += (point.x - xMean) * (point.x - xMean)
  })

  let k = numerator / denominator;
  let b = yMean - k * xMean;
  
  return {k, b}
}