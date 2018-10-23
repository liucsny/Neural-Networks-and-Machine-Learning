function setup(){
  noCanvas();
  let tree = new Tree();
  // let n = new Node(5);
  tree.addValue(5);
  tree.addValue(3);
  tree.addValue(10);
  tree.addValue(2);
  console.log(tree);
  tree.traverse();

  console.log(tree.search(2));
  console.log(tree.search(10));
  console.log(tree.search(3))
  console.log(tree.search(12))
}
