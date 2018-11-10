let data;
let movies;
let K = 5;

function preload() {
  data = loadJSON('./movies.json')
}

function setup(){
  noCanvas();

  let ratingScores = ['Not Seen', 1, 2, 3, 4, 5]

  // let dropdown = createSelect();
  let btn = createButton('Submit').style('margin-top', '12px').style('width', '120px');
  let ratingDiv = createDiv().style('margin', '12px');
  let resultDiv = createDiv().style('margin', '12px');
  let selects = []

  let myRatings = {}

  movies = Object.keys(data.users[0]).filter(e => (e != 'timestamp') && (e != 'name'))

  movies.forEach(movie => {
    let containerDiv = createDiv().style('margin-top', '12px');
    let movieNameDiv = createDiv(movie + ':').style('width', '80px').style('display', 'inline-block')
    let select = createSelect();

    ratingScores.forEach(e=>{
      select.option(e)
    })

    selects.push({
      title: movie,
      elt: select
    })

    containerDiv.child(movieNameDiv)
    containerDiv.child(select)
    ratingDiv.child(containerDiv)
  })

  ratingDiv.child(btn)

  let containerDivs = []

  btn.mousePressed(()=>{
    let moviesNotSeen = []

    containerDivs.forEach(e => e.remove())

    selects.forEach(select=>{
      if(select.elt.value() == ratingScores[0]){
        moviesNotSeen.push(select)
      } else {
        myRatings[select.title] = select.elt.value()
      }
    })

    moviesNotSeen.forEach(e=>{
      let containerDiv = createDiv().style('margin-top', '12px');
      let nearestKNeibhors = findNearestKNeibhors(myRatings, 5)
      let rating = predictRating(nearestKNeibhors, e.title)
      
      let movieNameDiv = createDiv(e.title + ':' + ' ' + rating.toFixed(3)).style('width', '80px').style('display', 'inline-block')

      containerDivs.push(containerDiv)

      containerDiv.child(movieNameDiv)
      resultDiv.child(containerDiv)
    })

  })

}

function predictRating(nearestNeibhorsArray, movieTitleToPredict){
  let sum = 0;
  let simulritySum = 0;
  nearestNeibhorsArray.forEach(neibhor => {
    sum += neibhor.detail[movieTitleToPredict] * neibhor.simulrity;
    simulritySum += neibhor.simulrity;
  })

  return sum/simulritySum;
}

function findNearestKNeibhors (userRatings, K){

  let simulrityLargestK = []

  data.users.forEach(e=>{
    let currentName = e.name

    let currentsimulrity = eucldeanSimulrity(userRatings, e)

    if(simulrityLargestK.length < K){
      simulrityLargestK.push({
        name: currentName,
        simulrity: currentsimulrity,
        detail: e
      })
    } else {
      for (let i = 0; i < simulrityLargestK.length; i++) {
        if(simulrityLargestK[i].distance < currentsimulrity){
          simulrityLargestK[i] = {
            name: currentName,
            simulrity: currentsimulrity,
            detail: e
          };
          break
        }
      }
    }
  })

  return simulrityLargestK
}

function eucldeanSimulrity(ratings1, ratings2){

  let titles = Object.keys(ratings1)
  titles = titles.filter(e=> (e != 'timestamp') && (e != 'name'))

  let sumSquares = 0;
  titles.forEach(title => {
    let rating1 = ratings1[title]
    let rating2 = ratings2[title]
    if (rating1 != null && rating2 != null) {
      var diff = rating1 - rating2;
      sumSquares += diff * diff;
    }
  })

  let distance = sqrt(sumSquares);
  let simulrity = 1 / (distance + 1);

  return simulrity;
}