var s;
var scl = 20;
var food;

var mc;


function setup() {
	var myCan = createCanvas(windowWidth, windowHeight);
	console.log(windowWidth,windowHeight);
  mc = new Hammer(myCan.elt);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	setupDoubleTap();

  s = new Snake();
  frameRate(10);
  pickLocation();

}

function pickLocation() {
  var cols = floor(windowWidth/scl);
  var rows = floor(windowHeight/scl);
  food = createVector(floor(random(0,cols)), floor(random(0,rows)));
  food.mult(scl);
	console.log(food);
}


function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }

  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

//on computer
function keyPressed() {
  if (keyCode === UP_ARROW && s.yspeed!=1) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && s.yspeed!=-1) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && s.xspeed!=-1) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && s.xspeed!=1) {
    s.dir(-1, 0);
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 10) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);
		if(this.x < 0){
			this.x += windowWidth;
		}
		if(this.y < 0){
			this.y += windowHeight;
		}
    this.x = (this.x + this.xspeed * scl)%windowWidth;
    this.y = (this.y + this.yspeed * scl)%windowHeight;
	  // this.x = constrain(this.x, 0, width - scl);
    // this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }
}
//swipe on phones
function setupDoubleTap() {
  mc.on("swipeleft", function(e){
		if(s.xspeed!=1)
			s.dir(-1, 0);
  });
	mc.on("swiperight", function(e){
		if(s.xspeed!=-1)
			s.dir(1, 0);
  });
	mc.on("swipeup", function(e){
		if(s.yspeed!=-1)
			s.dir(0, -1);
  });
	mc.on("swipedown", function(e){
		if(s.yspeed!=-1)
			s.dir(0, 1);
  });
}
