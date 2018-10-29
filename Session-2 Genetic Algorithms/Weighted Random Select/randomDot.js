class Dot {
  constructor(toTop, H){
    this.x = 0;
    this.y = Math.random() * H + toTop;
    this.color = '#4753C8';
  }

  display(){
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, 6, 6);
  }

  update(){
    this.x += 2
  }

  check(array){
    let _changeColor = false;
    let _count = false;

    array.forEach(element => {
      // if(Math.abs(element.point - this.x) < barW/2 * 0.8) {
      //   _changeColor = true;
      // }

      if(this.x - element.point == barW/2 * 0.8) {
        this.y += element.height;
      }

      if((Math.abs(element.point - this.x) < barW/2 * 0.8)&&(this.y > H + topMargin - element.height)) {
        _changeColor = true;
        _count = true;
      }
    });
    
    if(_changeColor){
      this.color = '#E9563E'
    } else {
      this.color = '#4753C8'
    }

    if(!_count){
      this.update();
    }
  }
}