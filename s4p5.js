//******************* s4p5.js library (Marco Gammanossi)**********************
var s4p5 = {
  numSprites: [],
  animationArray: [],
  //class Sprite-----------------------------------
  Sprite: function(anArrayPaths, x, y) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.deg = 0;
    this.img = [];
    this.index = 0;
    this.start = false;
    this.countFrames = 0;
    this.count = 1;
    this.animationName = [];
    this._repeat = 0;
    this.f = 0;
    this.visible = true;
    imageMode(CENTER);
    angleMode(DEGREES);
    s4p5.numSprites.push(this);

    this.preload = function() {
      for (var j in anArrayPaths) {
        this.img[j] = loadImage(anArrayPaths[j]);
      }
    };
    this.preload();
    this.show = function() {
      if (this.visible) {
        this.w = this.img[0].width;
        this.h = this.img[0].height;
        push();
        translate(this.x, this.y);
        rotate(this.deg);
        image(this.img[this.index], 0, 0, this.w, this.h);
        pop();
      }
    };
    this.setImageIndex = function(index) {
      this.index = index;
    };
    this.setX = function(nx) {
      this.x = nx;
    };

    this.getX = function() {
      return this.x;
    };

    this.setY = function(ny) {
      this.y = ny;
    };
    this.getY = function() {
      return this.y;
    };

    this.setPosition = function(nx, ny) {
      this.x = nx;
      this.y = ny;
    };

    this.moveToDirection = function(direction, speed) {
      this.direction = direction;
      this.speed = speed;
      this.x += this.speed * Math.cos((this.direction - 90) * Math.PI / 180);
      this.y += this.speed * Math.sin((this.direction - 90) * Math.PI / 180);
    };

    this.mouseIn = function() {
      if (mouseX > (this.x - this.w / 2) && mouseX < this.x + this.w / 2) {
        if (mouseY > (this.y - this.h / 2) && mouseY < this.y + this.h / 2) {
          return true;
        }
      }
      return false;
    };
    this.onpressed = function(func1, func2) {
      if (this.mouseIn() && mouseIsPressed) {
        func1.apply(this);
      }else{
        if(func2 != null){
          func2.apply(this);
        }
      }
    };
    this.rotateBy = function(aDeg) {
      this.deg = aDeg;
    };

    this.hit = function(r, func) {
      if (this.x < r.x + r.w && this.x + this.w > r.x && this.y < r.y + r.h && this.y + this.h > r.y) {
        if (func != null) {
          func.apply(this);
        } else {
          return true;
        }
      }
    };
    this.remove = function() {
      this.visible = false;
    };
  },
  ShowSprites: function() {
    if (s4p5.numSprites != null) {
      for (var i in s4p5.numSprites) {
        s4p5.numSprites[i].show();
      }
    }
  },
  //class Animation---------------------------------------
  Animation: function(sprite_to_animate, array_frames) {
    this.array_frames = array_frames;
    this.sprite = sprite_to_animate;
    this.counter = 0;
    this.delay = 5;
    this.enabled = false;
    s4p5.animationArray.push(this);
    this.run = function() {
      if (this.enabled) {
        if (frameCount % this.delay == 0) this.counter++;
        var s = this.counter % this.array_frames.length;
        this.sprite.setImageIndex(this.array_frames[s]);
      }
    };
    this.stop = function() {
      this.enabled = false;
    };
    this.play = function() {
      this.enabled = true;
    };
  },
  EnableAnimations: function() {
    if (s4p5.animationArray != null) {
      for (var i in s4p5.animationArray) {
        s4p5.animationArray[i].run();
      }
    }
  }
};
s4p5.Sprite.prototype.toggle = function(objArray) {
  if (this.mouseIn()) {
    this.index++;
    this.setImage(this.index % 2);
    if (objArray != null) {
      for (var i in objArray) {
        objArray[i].setImage(this.index);
      }
    }
  }
}
