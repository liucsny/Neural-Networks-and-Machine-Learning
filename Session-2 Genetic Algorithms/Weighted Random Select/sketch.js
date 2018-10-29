let population = [
  ["unicron", 100],
  ["popcorn", 404],
  ["aaaaaah", 788],
  ["isotope", 220]
]

let checkPoints = [];

let bars = [0,0,0,0]

let weightedArray;
let maxWeight;

let topMargin = 20;
let leftMargin = 140;
let H = 400;
let w = 200;
let barW = 40;

let dots = [];
let dotsCount = 200;

function setup(){
  createCanvas(1200, 640);
  for (let i = 0; i < dotsCount; i++) {    
    dots.push(new Dot(topMargin, H));
  }

  weightedArray = population.map((element) => [element[0], element[1] / population.reduce((acc, element) => acc + element[1], 0)])

  population.forEach((array,i)=>{
    checkPoints.push({
      height: weightedArray[i][1] * H,
      point: i * w + leftMargin
    });
  })

  console.log(checkPoints)
}


function draw(){
  background(250);
  dots.forEach(dot => {
    dot.display()
  });

  stroke(0)
  line(0, topMargin, width, topMargin);
  line(0, topMargin + H, width, topMargin + H);

  population.forEach((array,i)=>{
    textAlign(CENTER, TOP)
    fill(0);
    noStroke();
    textSize(18);
    text(array[0], i * w + leftMargin, topMargin + H)

    fill(color(0,0,0,0));
    stroke(color(0,0,0));
    rect(i * w + leftMargin - barW/2, H + topMargin - weightedArray[i][1] * H, barW, weightedArray[i][1] * H);
  })

  dots.forEach(dot => {
    dot.check(checkPoints);
  });
}


function select(array) {
  let random = Math.random();
  for (let i = 0; i < array.length; i++) {
    let _a = array[i], 
        value = _a[0], 
        weight = _a[1];

    if (random < weight) {
      return value;
    } else {
      random -= weight;
    }
  }
};