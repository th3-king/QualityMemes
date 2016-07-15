function Sprite(x, y, width, height, movementSpeed, image) {
  this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
  this.movementSpeed = movementSpeed;
  this.imageArray = image
	this.image = this.imageArray[0];
  this.originX = x;
  this.squashed = false;
  this.removed = false;

	this.drawSprite = function (){
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
	}

  this.moveSprite = function (){
    if(this.squashed == false){
    this.originX -= this.movementSpeed;
    this.x = this.originX - xPositionInLevel;
    }
  }

  this.squashSprite = function (){
    this.squashed = true;
    this.y = this.y + this.height/2
    this.height = this.height/2
    this.image = this.imageArray[2];
  }
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
	}

  this.moveCloud = function (){
    this.x += this.movementSpeed;
    if (this.x > screenWidth) {
      this.x = 0 - this.width;
    }
  }
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

  this.drawMario = function (){
		drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
	}

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
  }

  this.jumpMario = function(){
    //check if fall through floor
    if (this.y >= screenHeight*3/5 && jump == true){
      this.velocity = 0;
      jump = false;
      this.y = screenHeight*3/5;
    }

    if (moveUp == true && jump == false) {
      moveUp = false;
      jump = true;
      this.velocity = screenHeight/80;
    }

    if (jump == true) {
      this.y -= this.velocity;
      this.velocity -= this.gravity;
    }
  }

  this.gameOver = function () {
    this.y -= this.movementSpeed/2;
  }
}
