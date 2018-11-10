let data;
let users = {};
let K = 5;

function preload() {
  data = loadJSON('./movies.json')
}

function setup(){
  noCanvas();

  let dropdown = createSelect();
  let btn = createButton('Submit')

  dropdown.elt.style.marginLeft = 12 + 'px';
  btn.elt.style.marginLeft = 12 + 'px';

  data.users.forEach(user => {
    dropdown.option(user.name)
    users[user.name] = user 
  });

  btn.mousePressed(function findNearestNeibhors() {
    let name = dropdown.value();
    let simulrityLargestK = [];

    data.users.forEach(e=>{
      let currentName = e.name
      if(currentName != name){
        let currentDistance = eucldeanDistance(name, e.name)
        if(simulrityLargestK.length < K){
          simulrityLargestK.push({
            name: currentName,
            distance: currentDistance
          })
        } else {
          for (let i = 0; i < simulrityLargestK.length; i++) {
            if(simulrityLargestK[i].distance < currentDistance){
              simulrityLargestK[i] = {
                name: currentName,
                distance: currentDistance
              };
              break
            }
          }
        }
      }
    })

    simulrityLargestK.sort((a, b) => b.distance - a.distance )

    console.log(simulrityLargestK)
  })
}


function eucldeanDistance(name1, name2){
  let ratings1 = users[name1];
  let ratings2 = users[name2];

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

// btn.mousePressed(()=>{
//   let name1 = dropdown1.value();
//   let name2 = dropdown2.value();

//   let ratings1 = users[name1];
//   let ratings2 = users[name2];

//   let titles = Object.keys(ratings1)

//   titles = titles.filter(e=> (e != 'timestamp') && (e != 'name'))

//   let sumSqures = 0;
//   titles.forEach(title => {
//     let rating1 = ratings1[title]
//     let rating2 = ratings2[title]
//     let diff = rating1 - rating2;
//     sumSqures += diff * diff
//   })

//   let distance = sqrt(sumSqures);

//   let simulrity = 1 / (distance + 1);
//   console.log(simulrity)
// })