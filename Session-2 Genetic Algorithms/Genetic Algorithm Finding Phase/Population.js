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
  let _tempPool = [];

  this.dnas.forEach(dna => {
    dna.setFitness(this.target)
    if(dna.fitness > 0){
      _tempPool.push(dna)
    }
  })

  if(_tempPool.length == 0){
    this.init(this.maxLength)
    this.matingPool = this.dnas
  } else {
    let totalFitness = _tempPool.sum('fitness')

    _tempPool.forEach(dna=>{
      // console.log("dna.fitness: ",dna.fitness)
      let likelihood = Math.floor(dna.fitness/totalFitness * 100)
      // console.log("likelihood: ", likelihood)
      for (let i = 0; i < likelihood; i++) {
        this.matingPool.push(dna)
      }
    })
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

// STEP 3 Crossover
Population.prototype.crossover = function(mutationRate){
  for (let i = 0; i < this.population.length; i++) {
    let _a = Math.floor(Math.random() * this.matingPool.length)
    let _b = Math.floor(Math.random() * this.matingPool.length)
    let _parentA = this.matingPool[_a];
    let _parentB = this.matingPool[_b];
    // console.log(this.matingPool)
    
    // console.log(this.matingPool);
    // console.log('_parentA:' + _parentA);
    // console.log('_parentB:' + _parentB);
  
    let _child = _parentA.crossover(_parentB);
  
    _child.mutate(mutationRate);

    this.population[i] = _child.gene.join('');
    this.dnas[i] = _child
    this.dnas[i].setFitness(this.target)
  }
}



Population.prototype.show = function(x, y, s){
  for (let i = 0; i < this.population.length; i++) {
    textSize(14);
    text(this.population[i], x, i * s + y)
  }
}

Array.prototype.sum = function (prop) {
  var total = 0
  for ( let i = 0 ; i < this.length; i++ ) {
      total += this[i][prop]
  }
  return total
}