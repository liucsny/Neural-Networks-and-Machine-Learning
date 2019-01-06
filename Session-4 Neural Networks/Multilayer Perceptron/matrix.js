class Matrix{
    constructor (rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    add (val) {
        if(val instanceof Matrix){
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if(this.data[i][j] === undefined || val.data[i][j] === undefined){
                        console.log('Error! Size of two matrices must be the same!');
                        return undefined;
                    }else{
                        this.data[i][j] += val.data[i][j];
                    }
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += val;
                }
            }
        }

        return this.data;
    }

    static mult(a,b) {
        // console.log(this);
        if(a.cols === b.rows){
            let n = a.cols;
            let result = new Matrix(a.rows, b.cols);
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    let sum = 0;
                    for (let k = 0; k < n; k++) {
                        // console.log()
                        sum += a.data[i][k] * b.data[k][j]
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        } else {
            return undefined;
        }
    }

    static fromArray(array) {
        let m = new Matrix(array.length, 1);
        array.forEach((e, i) => {
            m.data[i][0] = e;
        });
        return m;
    }

    toArray() {
        let array = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                array.push(this.data[i][j]);
            }
        }
        return array;
    }

    mult (val) {
       if(val instanceof Matrix){
       } else {
           for (let i = 0; i < this.rows; i++) {
               for (let j = 0; j < this.cols; j++) {
                   this.data[i][j] *= val;
               }
           }
           return this.data;
       }
    }

    randomize () {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
        return this.data;
   }

   transpose() {
        let result = new Matrix(this.cols, this.rows);
        for (let i = 0; i < result.rows; i++) {
           for (let j = 0; j < result.cols; j++) {
               result.data[i][j] = this.data[j][i];
           }
        }
        return result;
   }

   print() {
        console.table(this.data)
   }

   map(fn) {
       for (let i = 0; i < this.rows; i++) {
           for (let j = 0; j < this.cols; j++) {
               let val = this.data[i][j];
               this.data[i][j] = fn(val);
           }
       }
   }
}