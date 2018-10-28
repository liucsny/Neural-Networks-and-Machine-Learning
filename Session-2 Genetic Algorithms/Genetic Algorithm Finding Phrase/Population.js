function Population(num, target){
  this.population = [];
  this.matingPool = [];
  this.maxLength;
  this.populationNum = num;
  this.dnas = []
  this.target = target;
}


// STEP 1 Init
Population.prototype.init = function(maxLength){
  this.population = [];
  this.maxLength = maxLength;
  for (let i = 0; i < this.populationNum; i++) {
    this.dnas.push(new DNA())
    this.dnas[i].init(maxLength);
    this.population.push(this.dnas[i].gene.join(''))
  }
}


// STEP 2 Select
Population.prototype.select = function(){
  this.matingPool = [];

  this.dnas.forEach(dna => {
    dna.setFitness(this.target)
  })

  this.dnas.sort((a, b)=>{
    return b.fitness - a.fitness
  })

  for (let i = 0; i < 100; i++) {
    if(!!this.dnas[i]){
      for (let j = 0; j < this.dnas[i].fitness * 100; j++) {
        this.matingPool.push(this.dnas[i])
      }
    }
  }

}

Population.prototype.getBestPopulation = function(){
  let _best = 0;
  let _bestFitness = this.dnas[_best].fitness;

  for (let i = 0; i < this.dnas.length; i++) {
    if(this.dnas[i].fitness > _bestFitness){
      _bestFitness = this.dnas[i].fitness
      _best = i
    }
  }

  return {
    phenotype: this.population[_best],
    fitness: this.dnas[_best].fitness,
  }
}

// STEP 3 Crossover and Mutate
Population.prototype.crossover = function(){
  for (let i = 0; i < this.population.length; i++) {
    let _a = Math.floor(Math.random() * this.matingPool.length)
    let _b = Math.floor(Math.random() * this.matingPool.length)
    let _parentDNA_A = this.matingPool[_a];
    let _parentDNA_B = this.matingPool[_b];
  
    let _childDNA = _parentDNA_A.crossover(_parentDNA_B);
    this.dnas[i] = _childDNA;
    this.dnas[i].setFitness(this.target);

  }
}

Population.prototype.mutate = function(mutationRate){
  for (let i = 0; i < this.dnas.length; i++) {
    this.dnas[i].mutate(mutationRate);
    this.dnas[i].setFitness(this.target)
  }
}

Population.prototype.reproduct = function(){
  for (let i = 0; i < this.dnas.length; i++) {
    this.population[i] = this.dnas[i].gene.join('');
  }
}


Population.prototype.show = function(x, y, s){
  for (let i = 0; i < this.population.length; i++) {
    textSize(14);
    text(this.population[i], x, i * s + y)
  }
}