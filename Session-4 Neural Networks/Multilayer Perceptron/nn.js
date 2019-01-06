class NeuralNetwork {
    constructor(...nodes){
        this.nodeArray = nodes;
        // this.hidden_layers = [];
        // // console.log(nodes);
        if (this.nodeArray.length < 3){
            console.log('node layers must be larger than 2')
        } else {
            // for (let i = 1; i < nodes.length - 1; i++) {
            //     this.hidden_layers.push(nodes[i]);
            // }
            // this.input_nodes = nodes[0];
            // this.output_nodes = nodes[nodes.length - 1];
            this.weights = [];
            for (let i = 0; i < this.nodeArray.length - 1; i++) {
                this.weights.push(new Matrix(this.nodeArray[i + 1], this.nodeArray[i]))
            }
            this.weights.forEach(matrix => {
                matrix.randomize();
            })
        }
        // this.weights_ih = new Matrix(this.hidden_layers[0], this.input_nodes);
        // this.weights_hh = [];
        // this.weights_ho = new Matrix(this.output_nodes, this.hidden_layers[this.hidden_layers.length - 1]);
        // this.weights_ih.randomize();
        // this.weights_ho.randomize();
        // for (let i = 0; i < this.hidden_layers.length-1; i++) {
        //     this.weights_hh.push(new Matrix(this.hidden_layers[i+1], this.hidden_layers[i]))
        // }
        // this.weights_hh.forEach(matrix => {
        //     matrix.randomize();
        // })
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

        // let hiddenInputs = Matrix.mult(this.weights_ih,inputMatrix);

        // let hiddenOutputs = this.iterateFeedForward(hiddenInputs);

        let outputsMatrix = this.iterateFeedForward(inputMatrix);

        console.log(outputsMatrix);

    }

    iterateFeedForward(inputMatrix, index = 0){
        let weight = this.weights[index];

        if(weight === undefined){
            return inputMatrix;
        }
        let iterateInput = Matrix.mult(weight,inputMatrix);

        return this.iterateFeedForward(iterateInput, index + 1);
    }

}