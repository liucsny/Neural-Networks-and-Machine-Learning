function sigmoid(x) {
    return 1/(1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(...nodes){
        this.nodeArray = nodes;

        if (this.nodeArray.length < 3){
            console.log('node layers must be larger than 2')
        } else {
            this.weights = [];
            this.bias_weights = [];

            for (let i = 0; i < this.nodeArray.length - 1; i++) {
                this.weights.push(new Matrix(this.nodeArray[i + 1], this.nodeArray[i]));
                this.bias_weights.push(new Matrix(this.nodeArray[i + 1],1))
            }

            this.weights.forEach(matrix => {
                matrix.randomize();
            });

            this.bias_weights.forEach(matrix => {
                matrix.randomize();
            });


        }
    }

    feedForward(inputArray) {
        //format the input array so that length of input array can match the number of the input nodes
        let format_inputArray = [];
        for (let i = 0; i < this.nodeArray[0]; i++) {
            if(inputArray[i] !== undefined ){
                format_inputArray[i] = inputArray[i];
            } else {
                format_inputArray[i] = 0;
            }
        }

        let inputMatrix = Matrix.fromArray(format_inputArray);

        let outputsMatrix = this.iterateFeedForward(inputMatrix);
        let outputArray = outputsMatrix.toArray();

        return outputArray;
    }

    iterateFeedForward(inputMatrix, index = 0){
        let weight = this.weights[index];
        let bias = this.bias_weights[index];

        if(weight === undefined){
            return inputMatrix;
        }
        let iterateInput = Matrix.mult(weight,inputMatrix);
        iterateInput.add(bias);
        iterateInput.map(sigmoid);
        return this.iterateFeedForward(iterateInput, index + 1);
    }

}