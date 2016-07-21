//all enemy's and others in game

function Sprite(x, y, width, height, movementSpeed, image) {
  this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
  this.movementSpeed = movementSpeed;
  this.imageArray = image;
	this.image = this.imageArray[0];
  this.originX = x;
  this.squashed = false;
  this.removed = false;

	this.drawSprite = function (){
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
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
    this.image = this.imageArray[2];
  };
}

//clouds used in loading screen

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
  this.collisionDown = false;
  this.collisionUp = false;
  this.collisionLeft = false;
  this.collisionRight = false;
  this.collisions = [this.collisionUp, this.collisionDown, this.collisionLeft, this.collisionRight];

  this.drawMario = function (){
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
	};

  this.moveMario = function (){
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
        if (moveLeft == true) {
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

  this.jumpMario = function(){
    //check if fall through floor
    if (this.collisionDown == true && this.jump == true){
      this.velocity = 0;
      this.jump = false;
    }

    if (moveUp == true && this.jump == false) {
      moveUp = false;
      this.jump = true;
      this.velocity = screenHeight/80;
    }

    if (this.jump == true || this.collisions[0] == false) {
      this.y -= this.velocity;
      this.velocity -= this.gravity;
    }


  };

  this.gameOver = function () {
    this.y += this.movementSpeed/2;
  };
}


//all blocks in level's which is used for ground and obstacles

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

  this.detectCollision = function () {
    if(mario.x + mario.width >= this.x && mario.x <= this.x + this.width && mario.y + mario.height >= this.y && mario.y <= this.y + this.height){
      //Math.round(mario.y + mario.height) % Math.round(this.y) < 2 || >-2

      if(mario.y + mario.height <= this.y + this.height/8){
        mario.collisions[0] = true;
      } else {
        mario.collisions[0]= false;
        if(mario.y + mario.height/8 <= this.y + this.height){
          mario.collisions[1] = true;
        } else {
            mario.collisions[1] = false;
            if (mario.x + mario.width/8 >= this.x + this.width) {
              mario.collisions[2] = true;
            } else {
                mario.collisions[2] = false;
                if (mario.x + mario.width <= this.x + this.width/8) {
                  mario.collisions[3] = true;
                } else {
                  mario.collisions[3] = false;
                }
            }
        }
      }
    }
  }
}
