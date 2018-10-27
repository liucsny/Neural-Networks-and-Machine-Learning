let data;
let graph;

function preload(){
  data = loadJSON('./bacon.json')
}

function setup(){
  graph = new Graph();
  // createCanvas(1000, 800);
  noCanvas();
  let movies = data.movies;
  // console.log(data);

  movies.forEach(movie => {
    let movieNode = new Node(movie.title);
    graph.addNode(movieNode);

    movie.cast.forEach(actor => {
      let actorNode = graph.getNode(actor);
      if(actorNode == undefined){
        actorNode = new Node(actor);
      }

      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    })
  });

  // let start = graph.setStart('Mickey Rourke')
  let start = graph.setStart('Michael Cyril Creighton')
  let end = graph.setEnd('Mickey Rourke')

  let queue = [];
  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    let current = queue.shift();
    console.log(current.value)
    if(current == end){
      console.log('Found ' + current.value)
      break;
    } else {
      current.edges.forEach(neighbor => {
        if(!neighbor.searched){
          neighbor.searched = true;
          neighbor.parent = current;
          queue.push(neighbor);
        }
      });
    }
  }

  let path = [];
  path.push(graph.end);
  let next = end.parent;
  while(next != null){
    path.push(next);
    next = next.parent;
  }

  let text = '';
  for(let i = path.length - 1; i >= 0; i--){
    text += path[i].value ;
    if(i != 0){
      text += ' --> ';
    }
  }
  createP(text);
  // console.log(graph)
}
