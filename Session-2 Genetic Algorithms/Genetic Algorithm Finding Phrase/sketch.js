let target = 'To be, or not to be, that is a question.'
let population;
let populationNum = 100;
let maxLength = target.length;
let mutationRate = 0.005;

let generations = 0;

function setup() {
  textFont('monospace');
  createCanvas(1600, 5800);
  population = new Population(populationNum, target);

  // STEP 1 Init population
  population.init(maxLength);
}

function draw(){
  generations++;
  background(255);
  textSize(28);
  text('Best Phrase: ', 12, 240);

  // STEP 2 Select
  population.select();

  // STEP 3 Crossover and Mutate
  population.crossover();
  population.mutate(mutationRate);

  // STEP 4 Reproduct
  population.reproduct();

  population.show(680, 24, 24);

  // console.log(population.matingPool)

  textSize(24);
  text(population.getBestPopulation().phenotype, 12, 280);


  textSize(16);
  text('Fitness: ' + pow(population.getBestPopulation().fitness, 1/4), 12, 340);
  // text('Fitness: ' + population.getBestPopulation().fitness, 12, 340);
  text('Generations: ' + generations, 12, 365);

  if(population.getBestPopulation().phenotype === target){
    noLoop();
  }

  // console.log(population.matingPool)
  // noLoop();
}