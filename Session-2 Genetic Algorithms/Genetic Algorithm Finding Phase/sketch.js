let target = 'To be or not to be that is a question.'
let population;
let populationNum = 25;
let maxLength = target.length;
let mutationRate = 0.01;

function setup() {
  createCanvas(1600, 800);
  population = new Population(populationNum, target);

  // STEP 1 Init population
  population.init(maxLength);
}

function draw(){
  background(255);
  textSize(28);
  text('Best Phrase: ', 12, 240);

  // STEP 2 Select
  population.select();

  // STEP 3 Crossover
  population.crossover(mutationRate);

  population.show(480, 24, 24);

  textSize(24);
  text(population.getBestPopulation().phenotype, 12, 280);


  textSize(16);
  text(population.getBestPopulation().fitness, 12, 300);

  // console.log(population)
  // noLoop();
}