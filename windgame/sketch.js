
var w = 0;
var h = 0;
var windslider = 0;

var rainspeed = 4;
var notefq = 440;
var osc;
var playing = false;

var rain = [];
var rainCount = 100;
var raindir = 0;



var winddirectionX = 0;
var winddirectionY = 10;
var boxRotation = 90;
var boxX = 200;

var ellipseXpos = 0;
var ellipseYpos = 0;
var currposX = 0;
var currposY = 0;
var gravity = 0.2;
var speed = 0;

var dist1 = 0;


var noteBox = 50;


var x = 400;
var y = 200;
var currX = 0;
var currY = 0;

var DimX = 30;
var DimY = 30;
//var gravity = .08;
var wind = 0;
var speedY = 1;
var speedX = 0;
var noteWidth = 0;

var inlocation = true;
var currnote = 0;
var particles = [];

var tiles = [];
var pushers = [];
var opacity = 255;




function setup() {

	frameRate(50); //frame rate of sketch



	nameP = createP("WIND CONTROLL");
  button = createButton("More left wind");
  slider = createSlider(10, 100, 86);
  nameInput = createInput('More left wind');


  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(notefq);
  osc.amp(0);
  osc.start();

	w = windowWidth;
	h = windowHeight-70;
	currposX = windowWidth/2
	canvas = createCanvas(w, h);
	noStroke();
  background(0);


	for(let i = 0; i < 7; i ++){
		tiles.push(new Tile( (i)*w/7, h-30, (w/7), 90));
		//pushers.push(new Animator(0,windowHeight-10,i*(w/7),i*(w/7),1.1));
	}

	for (let i = 0; i < rainCount; i++) {
		rain.push(new Rain(random(width), random(height)));
	}



}

function draw() {



  background(0,0,0,255);

	for (var i = 0; i < rainCount; i++) {
		rain[i].update();
		rain[i].draw();
	}


	windslider = slider.value();
 	map(windslider, 0, 100, -1, 1);
	console.log(map(windslider, 0, 100, -1, 1));

	noteWidth = (w/7);
	if ( (y >= (h-noteBox/2)) ){
		currnote = Math.ceil(x/noteWidth);
	}

	fill(255);
	text(speedX + "wind", 20, 20, 70, 80); // Text wraps within text box
	text(gravity + "gravity", 20, 40, 50, 80); // Text wraps within text box

  ellipse(x,y,DimX);

  speedY = speedY + gravity;
	speedX = map(windslider, 0, 100, -3, 3);
	speedX = speedX + wind;


  y = y + speedY;
  x = x + speedX;


	for (var  i = 0 ; i < 7; i++){
			tiles[i].draw(x, y);
			//pushers[i].displayRect();
	}

	for(let i = 0; i < 7; i++){
		tiles[i].update(i);
		if(currnote  == i + 1){
			if(tiles[i].shouldDraw){
				notefq = currnote*2

				if (!playing) {
				      // ramp amplitude to 0.5 over 0.1 seconds
				      osc.amp(0.5, 0.05);
				      playing = true;
				    } else {
				      // ramp amplitude to 0 over 0.5 seconds
				      osc.amp(0, 0.5);
				      playing = false;
				    }

				console.log("Tile number " + i + " was hit");
				tiles[i].shouldDraw = false;

			}
		}
	}

 //rect(0,windowHeight-30,windowWidth,20) 			///floor






  if (y >= height-DimX/2){
    speedY = -speedY;
  }

  if (y <= DimX/2){
  	speedY = -speedY;
  }

  if (x >= width - DimX/2){
  	speedX = -speedX;
  }

  if (x <= 0+DimX/2){
  speedX = -speedX;
  }







}




///////////rain








function Rain(x, y) {
  this.x = x;
  this.y = y;
  this.len = rainspeed;
  this.r = raindir;
	this.margin = 1;

	this.update = function() {
		this.y += this.len;
		this.x += -this.len * sin(radians(this.r));

		if (this.y >= height + random(this.margin))
			this.y -= height + this.margin;

		if (this.x < -random(this.margin))
			this.x += width + this.margin;

	};

  this.draw = function() {
    stroke(255);
		push();
		translate(this.x, this.y);
		rotate(radians(this.r));
		line(0, 0, 0, this.len);
		pop();
  };
}



////////rain




function updateText() {
  nameP.html(nameInput.value());
}




function keyPressed() {
  if (keyCode === UP_ARROW) {
    gravity = gravity - .2;
    //print("gravity ", gravity);
    //print("pressed");

  } else if (keyCode === DOWN_ARROW) {
    gravity = gravity + .2;
    //print("gravity ", gravity);


  } else if (keyCode === LEFT_ARROW) {
    wind = wind - .005;
    //print("gravity ", gravity);
  }

		 else if (keyCode === RIGHT_ARROW) {
      wind = wind + .005;
    //print("gravity ", gravity);
  }

}
