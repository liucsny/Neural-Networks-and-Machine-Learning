let vals = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function setup() {
  createCanvas(800, 800);
}

function draw(){
  background(0);
  console.log(vals);
  
  let largestI = -1;
  for (let i = 0; i < vals.length; i++) {
    if(vals[i] < vals[i + 1]){
      largestI = i;
    }
  }

  if(largestI == -1){
    noLoop()
    console.log('finished')
  }

  let largestJ = -1
  for(let j = 0; j < vals.length; j++){
    if(vals[largestI] < vals[j]){
      largestJ = j
    }
  }


  vals.swap(largestI, largestJ)


  let endArray = vals.splice(largestI + 1)
  endArray.reverse()
  vals = vals.concat(endArray)

  textSize(64);
  let s = '';
  for (let i = 0; i < vals.length; i++) {
    s += vals[i];
  }
  fill(255);
  text(s, 20, height/2)
}

Array.prototype.swap = function(i, j){
  let temp = this[i];
  this[i] = this[j];
  this[j] = temp;
}