let data;

function preload() {
  data = loadJSON('./movies.json')
}

function setup(){
  noCanvas();
  // console.log(data)
  let dropdown1 = createSelect();
  let dropdown2 = createSelect();
  

  dropdown1.elt.style.marginLeft = 12 + 'px';
  dropdown2.elt.style.marginLeft = 12 + 'px';
  
  data.users.forEach(element => {
    dropdown1.option(element.name)
    dropdown2.option(element.name)
    // console.log(element)
  });

  let btn = createButton('Submit')

}