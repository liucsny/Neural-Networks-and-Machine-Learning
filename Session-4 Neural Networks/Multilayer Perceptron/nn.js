class NeuralNetwork {
    constructor(...nodes){
        this.hidden_layers = [];
        // console.log(nodes);
        if (nodes.length < 3){
            console.log('node layers must be larger than 2')
        } else {
            for (let i = 1; i < nodes.length - 1; i++) {
                this.hidden_layers.push(nodes[i]);
            }
            this.input_nodes = nodes[0];
            this.output_nodes = nodes[nodes.length - 1];
        }
        this.weights_ih = new Matrix(this.hidden_layers[0], this.input_nodes);
        this.weights_hh = [];
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_layers[this.hidden_layers.length - 1]);
        this.weights_ih.randomize();
        this.weights_ho.randomize();
        for (let i = 0; i < this.hidden_layers.length-1; i++) {
            this.weights_hh.push(new Matrix(this.hidden_layers[i+1], this.hidden_layers[i]))
        }
        this.weights_hh.forEach(matrix => {
            matrix.randomize();
        })
    }

    feedForward(inputArray) {
        //format the input array so that length of input array can match the number of the input nodes
        let format_inputArray = [];
        for (let i = 0; i < this.input_nodes; i++) {
            if(inputArray[i] !== undefined ){
                format_inputArray[i] = inputArray[i];
            } else {
                format_inputArray[i] = 0;
            }
        }

        let inputMatrix = Matrix.fromArray(format_inputArray);

        let hiddenInputs = Matrix.mult(this.weights_ih,inputMatrix);

        let hiddenOutputs = this.iterateHiddenFeedForward(hiddenInputs);

        console.log(hiddenOutputs);
        // result.print()
    }

    iterateHiddenFeedForward(inputMatrix, index = 0){
        // console.log(inputMatrix, ' + ', index);
        let weights = this.weights_hh[index];
        // console.log(weights);
        // console.log(inputMatrix);
        if(weights === undefined){
            return inputMatrix;
        }
        let iterateInput = Matrix.mult(weights,inputMatrix);
        return this.iterateHiddenFeedForward(iterateInput, index + 1);
    }

}