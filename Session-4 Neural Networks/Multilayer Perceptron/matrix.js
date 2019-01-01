class Matrix{
    constructor (rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for (let i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

   add (val) {
        if(val instanceof Matrix){
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += val.matrix[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += val;
                }
            }
        }

        return this.matrix;
    }

   mult (val) {
       if(val instanceof Matrix){
           if(this.cols === val.rows){
               let n = this.cols;
               let result = new Matrix(this.rows, val.cols);
               for (let i = 0; i < result.rows; i++) {
                   for (let j = 0; j < result.cols; j++) {
                       let sum = 0;
                       for (let k = 0; k < n; k++) {
                           // console.log()
                           sum += this.matrix[i][k] * val.matrix[k][j]
                       }
                       result.matrix[i][j] = sum;
                   }
               }
               return result;
           } else {
               return undefined;
           }
       } else {
           for (let i = 0; i < this.rows; i++) {
               for (let j = 0; j < this.cols; j++) {
                   this.matrix[i][j] *= val;
               }
           }
           return this.matrix;
       }
    }

   randomize () {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
        return this.matrix;
   }
}