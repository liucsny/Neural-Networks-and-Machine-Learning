let brain;

function setup() {
    brain = new NeuralNetwork(6, 2, 5, 6, 7, 9, 2);
    let result = brain.feedForward([2, 3, 4, 5, 7]);
    console.log(result);
}

function draw() {
    
}