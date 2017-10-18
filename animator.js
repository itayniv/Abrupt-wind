
class Animator{

  	constructor(_x, _y, _xanim, _yanim, _animspeed){
    this.x = _x;
    this.y = _y;
		this.xanim = _xanim;
    this.yanim = _yanim;
    this.animspeed = _animspeed;
  }



    displayRect(){
    translate(width, height);
		rotate(PI/1.0);
  	push();
  	fill(40,255,90);
  	rect(0,0,this.xanim,this.yanim);
  	pop();
    this.animateRect();
  }

  animateRect(){
    //var animspeed = 1.1;
    this.yanim = Math.ceil(this.yanim *= this.animspeed);

    //this.yanim = this.yanim + 1;




    if (this.yanim > 400){
    console.log("invertspeed");
    this.animspeed = 0.9;
    }

    if (this.yanim < 20){
    this.animspeed = 1.1;
    console.log("invertspeed");


		}

  }
}
  
