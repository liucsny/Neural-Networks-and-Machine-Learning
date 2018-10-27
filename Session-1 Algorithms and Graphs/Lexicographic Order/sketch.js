let orders = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function setup() {
  createCanvas(800, 800);
}

function draw(){
  background(0);
  console.log(orders);
  
  let largestI = -1;
  for (let i = 0; i < orders.length; i++) {
    if(orders[i] < orders[i + 1]){
      largestI = i;
    }
  }

  if(largestI == -1){
    noLoop()
    console.log('finished')
  }

  let largestJ = -1
  for(let j = 0; j < orders.length; j++){
    if(orders[largestI] < orders[j]){
      largestJ = j
    }
  }


  orders.swap(largestI, largestJ)


  let endArray = orders.splice(largestI + 1)
  endArray.reverse()
  orders = orders.concat(endArray)
}

Array.prototype.swap = function(i, j){
  let temp = this[i];
  this[i] = this[j];
  this[j] = temp;
}