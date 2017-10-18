
class Tile{
	constructor(_x, _y, _xsize, _ysize){
		this.x = _x;
		this.y = _y;
		this.width = _xsize;
		this.height = _ysize;
		this.shouldDraw = false;
	}
	draw(){
		if(!this.shouldDraw){
			fill(255,6,90);
			rect(this.x,this.y,this.width,this.height);
			opacity = opacity - 5;
		}
	}
	update(index){

		if ( (y >= (h-noteBox/2)) && this.shouldDraw == true){
				//console.log("collision", Math.ceil(x/noteWidth));
				if (this.shouldDraw == true){
					this.shouldDraw = false;
					currnote = Math.ceil(x/noteWidth);
					//console.log("currentnote is", currnote);

					// console.log(this.shouldDraw);
    				}
    			}
		if  (y >= (h-noteBox/2)){
			this.shouldDraw = true;
			//console.log(this.shouldDraw);
		}

	}
}
