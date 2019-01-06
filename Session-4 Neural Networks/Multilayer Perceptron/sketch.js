let brain;

function setup() {
    brain = new NeuralNetwork(6, 2,5,6,7,9, 9);
    brain.feedForward([2, 3, 4, 5, 7]);
}

function draw() {
    
}