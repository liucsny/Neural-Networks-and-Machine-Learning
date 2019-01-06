let brain;

function setup() {
    brain = new NeuralNetwork(6, 12, 4, 8, 6, 1);
    brain.feedForward([2, 3, 4, 5, 7]);
}

function draw() {
    
}