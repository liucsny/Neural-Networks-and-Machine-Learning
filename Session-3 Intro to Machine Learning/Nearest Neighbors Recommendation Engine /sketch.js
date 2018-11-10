let data;

function preload() {
  data = loadJSON('./movies.json')
}

function setup(){
  noCanvas();
  let users = {};

  let dropdown1 = createSelect();
  let dropdown2 = createSelect();

  dropdown1.elt.style.marginLeft = 12 + 'px';
  dropdown2.elt.style.marginLeft = 12 + 'px';
  

  data.users.forEach(user => {
    dropdown1.option(user.name)
    dropdown2.option(user.name)
    users[user.name] = user 
  });

  let btn = createButton('Submit')

  btn.mousePressed(()=>{
    let name1 = dropdown1.value();
    let name2 = dropdown2.value();

    let ratings1 = users[name1];
    let ratings2 = users[name2];

    let titles = Object.keys(ratings1)

    titles = titles.filter(e=> (e != 'timestamp') && (e != 'name'))

    let sumSqures = 0;
    titles.forEach(title => {
      let rating1 = ratings1[title]
      let rating2 = ratings2[title]
      let diff = rating1 - rating2;
      sumSqures += diff * diff
    })

    let distance = sqrt(sumSqures);

    let simulrity = 1 / (distance + 1);
    console.log(simulrity)
  })
}