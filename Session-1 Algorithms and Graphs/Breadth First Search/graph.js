function Graph(){
  this.nodes = [];
  this.graph = {};
  this.start = null;
  this.end = null;
}

Graph.prototype.addNode = function(n){
  this.nodes.push(n);
  this.graph[n.value] = n; 
}

Graph.prototype.getNode = function(actor){
  return this.graph[actor];
}

Graph.prototype.setEnd = function(actor){
  this.end = this.graph[actor];
  return this.end;
}

Graph.prototype.setStart = function(actor){
  this.start = this.graph[actor];
  return this.start;
}