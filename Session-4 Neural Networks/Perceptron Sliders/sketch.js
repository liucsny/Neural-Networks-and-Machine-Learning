// f(x) = w1 * x + w2 * y
// let f(x) = 0
// w1 * x + w2 * y = 0
// y = - (w1 / w2) * x

let perceptron;
let points = [];
let gap = 10;

function setup(){
  createCanvas(600, 600);
  input1 = createSlider(-1, 1, 0, 0.001).position(80, 34);
  input2 = createSlider(-1, 1, 0, 0.001).position(80, 66);

  perceptron = new Perceptron();

  for (let i = 0; i < width / gap; i++) {
    for (let j = 0; j < height / gap; j++) {
      points.push({
        x: i * gap + width / 2,
        y: height - (j * gap)
        // x: i * gap,
        // y: j * gap
      })
    }
  }
}

function draw(){
  background(255);

  perceptron.changeWeights(input1.value(), input2.value())
  points.forEach(point=>{
    let reslut = perceptron.guess([point.x, point.y]);

    noStroke();
    if(reslut == 1){
      fill(0, 255, 0);
    }else{
      fill(255, 0, 0);
    }

    ellipse((point.x - width / 2), height - point.y, 4);
    // ellipse(point.x , point.y, 4);
  })
  
  fill(255);
  rect(10,10,200,70)
  fill(0);
  textSize(16);
  text(input1.value().toFixed(2), 20, 34);
  text(input2.value().toFixed(2), 20, 66);
}