function Sprite(x, y, width, height, movementSpeed, image) {
  this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
  this.movementSpeed = movementSpeed;
  this.index = 0;
	this.image = image[this.index];
  this.originX = x;
  this.squashed = false;
  this.removed = false;
  this.counter = 0;

	this.drawSprite = function (){
    if(this.squashed == false){
      this.image = image[this.index];
    }
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
    if(this.counter == 16){
      if(this.index < image.length - 2){
        this.index++;
      } else {
        this.index = 0;
      }
      this.counter = 0;
    } else {
      ++this.counter;
    }
	};

  this.moveSprite = function (){
    if(this.squashed == false){
    this.originX -= this.movementSpeed;
    this.x = this.originX - xPositionInLevel;
    }
  };

  this.squashSprite = function (){
    this.squashed = true;
    this.y = this.y + this.height/2;
    this.height = this.height/2;
    this.image = image[2];
  };
}

function Cloud(x, y, width, height, movementSpeed, image) {
  this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
  this.movementSpeed = movementSpeed;
	this.image = image;

	this.drawCloud = function (){
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
	};

  this.moveCloud = function (){
    this.x += this.movementSpeed;
    if (this.x > screenWidth) {
      this.x = 0 - this.width;
    }
  };
}

//mario object

function Mario(x,y, width, height, movementSpeed, image){
  this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.velocity = 0;
  this.gravity = screenHeight/3000;
  this.movementSpeed = movementSpeed;
	this.image = image;
  this.jump = false;

  this.drawMario = function (){
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
	};

  this.moveAction = function (){
    if (this.x >= screenWidth/2 - this.width/2) {
      if(moveLeft == true) {
        //console.log("left");
        this.x -= this.movementSpeed;
      }
    } else if (this.x >= 0) {
        if (moveRight == true) {
          //console.log("right");
          this.x += this.movementSpeed;
        }
        if(moveLeft == true) {
          //console.log("left");
          this.x -= this.movementSpeed;
        }
      } else if (moveRight == true) {
            //console.log("right");
            this.x += this.movementSpeed;
      }
    if (this.x >= screenWidth/2 - this.width/2 && moveRight == true){
        xPositionInLevel += movementSpeed/2;
    }
  };

  this.jumpAction = function(){
    //check if fall through floor
    if (this.y >= screenHeight*3/5 && this.jump == true){
      this.velocity = 0;
      this.jump = false;
      this.y = screenHeight*3/5;
    }

    if (moveUp == true && this.jump == false) {
      moveUp = false;
      this.jump = true;
      this.velocity = screenHeight/80;
    }

    if (this.jump == true) {
      this.fallAction();
    }
  };

  this.gameOver = function () {
    this.y += this.movementSpeed/2;
  };

  this.fallAction = function () {
    this.y -= this.velocity;
    this.velocity -= this.gravity;
  }
}

function Block(x, y, width, height, image) {
  this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
  this.image = image;
  this.originX = x;
  this.removed = false;

	this.drawBlock = function (){
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
	};

  this.moveBlock = function (){
    this.x = this.originX - xPositionInLevel;
  };

  this.detectCollisionWithMario = function () {
    if(mario.x + mario.width >= this.x && mario.x <= this.x + this.width && mario.y + mario.height >= this.y && mario.y <= this.y + this.height){
      if(mario.y + mario.height <= this.y + this.height/8){
        if(mario.x + mario.width >= this.x + this.width/100 && mario.x <= this.x + this.width*99/100){
          mario.jump = false;
          mario.y = this.y - mario.height;
        }
      } else if(mario.y + mario.height/8 >= this.y + this.height){
        if(mario.x + mario.width >= this.x + this.width/100 && mario.x <= this.x + this.width*99/100){
          mario.y = this.y + this.height;
          mario.velocity = -mario.gravity;
        }
      } else if (mario.x + mario.width <= this.x + this.height/8) {
        moveRight = false;
        mario.x = this.x - mario.width;
      } else if (mario.x + mario.width/8 >= this.x + this.height) {
        moveLeft = false;
        mario.x = this.x + this.width;
      }
    }
  }

  this.isCollidingWith = function (){
    if(mario.x + mario.width >= this.x && mario.x <= this.x + this.width && mario.y + mario.height >= this.y && mario.y <= this.y + this.height){
      return true;
    } else {
      return false;
    }
  }
}

function Coin(x, y){
  this.x = x;
  this.y = y;
  this.originX = x;
  this.index = 0;
  this.image = coin[this.index];
  this.width = screenHeight*25/528;
  this.height = screenHeight/16;
  this.counter = 0;
  this.collected = false;

  this.drawCoin = function(){
    this.image = coin[this.index];
    drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
    if(this.counter == 4){
      if(this.index < coin.length - 1){
        this.index++;
      } else {
        this.index = 0;
      }
      this.counter = 0;
    } else {
      ++this.counter;
    }
  };

  this.detectCollisionWithMario = function(){
    if(mario.x + mario.width >= this.x && mario.x <= this.x + this.width && mario.y + mario.height >= this.y && mario.y <= this.y + this.height){
      this.collected = true;
    }
  }

  this.moveCoin = function (){
    this.x = this.originX - xPositionInLevel;
  };
};
