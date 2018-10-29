function DNA(maxLength = 0){
  this.gene = [];
  this.fitness = 0;
  this.posibile = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,'

}

DNA.prototype.init = function(maxLength = 0){
  this.gene = [];

  // let _stringLength = Math.floor(Math.random() * maxLength)
  let _stringLength = maxLength

  for (let i = 0; i < _stringLength; i++) {
    let _random = Math.floor(Math.random() * this.posibile.length)
    let _randomChar = this.posibile.charAt(_random)
    this.gene.push(_randomChar) 
  }
}

DNA.prototype.setFitness = function(target){
  let _score = 0;

  for (let i = 0; i < target.length; i++) {
    if(this.gene[i] != undefined){
      if(this.gene[i] == target.charAt(i)){
        _score++;
      }
    } else {
      break;
    }
  }

  this.fitness = _score/target.length;
  this.fitness = pow(this.fitness, 4)
}

DNA.prototype.crossover = function(dna){
  let _newDna = new DNA();
  // console.log(dna)

  let _newDnaLength = Math.round((this.gene.length + dna.gene.length)/2)

  for (let i = 0; i < _newDnaLength; i++) {
    let _random = Math.random()

    if(_random > 0.5){
      if(!!this.gene[i]){
        _newDna.gene.push(this.gene[i])
      }else{
        _newDna.gene.push(dna.gene[i])
      }
    }else{
      if(!!dna.gene[i]){
        _newDna.gene.push(dna.gene[i])
      }else{
        _newDna.gene.push(this.gene[i])
      }
    }
  }
  return _newDna
}

DNA.prototype.mutate = function(mutationRate){
  for (let i = 0; i < this.gene.length; i++) {
    if(Math.random() < mutationRate){
      let _random = Math.floor(Math.random() * this.posibile.length)
      this.gene[i] = this.posibile.charAt(_random)
    }
  }
}