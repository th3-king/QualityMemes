/* The base class for all objects due to them all
having these similar properties and methods*/

class BasicObject {
  constructor(x, y, width, height, image) {
    this.x = x;
  	this.y = y;
  	this.width = width;
  	this.height = height;
    this.image = image;
    this.originX = x;
    this.originY = y;
  }

  draw() {
    drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
  }

  moveWithMario() {
      this.x = this.originX - xPositionInLevel;
  }
}


/* This object class is for items such as coins and abilities
it will be useful later when a lot of  */
class OneTimeObject extends BasicObject {
  constructor(x, y, image){
    super(x, y, screenHeight*25/528, screenHeight/16, image);
    this.collected = false;
  }

  detectCollisionWithMario() {
    if(isColliding(mario, this)){
      this.collected = true;
    }
  }
}


/* Coin object is an object which animates through the coin images
 to give off the illusion it is rotating and when player collects
 one it increments score by 25 */
class Coin extends OneTimeObject {
  constructor(x, y){
    super(x,y,coin[0]);
    this.index = 0;
  	this.width = screenHeight*25/528;
  	this.height = screenHeight/16;
    this.counter = 0;
  }

  detectCollisionWithMario(){
    super.detectCollisionWithMario();
    if(this.collected == true){
      score += 25;
    }
  }

  draw(){
    this.image = coin[this.index];
    super.draw();
    if(this.counter == 6){
      if(this.index < coin.length - 1){
        this.index++;
      } else {
        this.index = 0;
      }
      this.counter = 0;
    } else {
      ++this.counter;
    }
  }
}

/*  */
class CollidableObject extends BasicObject {
  constructor(x, y, width, height, image){
    super(x, y, width, height, image);
    this.removed = false;
    this.popUpInterval = 0;
    this.spawnAbilityInterval = 0;
  }

  detectCollisionWithMario() {
    if(isColliding(mario, this) == true){
      if(mario.y + mario.height <= this.y + this.height/2){
        if(mario.x + mario.width >= this.x + this.width/10 && mario.x <= this.x + this.width*9/10){
          this.collisionDown();
        }
      } else if(mario.y + mario.height/2 >= this.y + this.height){
        if(mario.x + mario.width >= this.x + this.width/10 && mario.x <= this.x + this.width*9/10){
          this.collisionUp();
        }
      } else if (mario.x + mario.width <= this.x + this.height/8) {
        this.collisionRight();
      } else if (mario.x + mario.width/8 >= this.x + this.height) {
        this.collisionLeft();
      }
    }
  }
  spawnAbility(objectArray, peakHeight, rest, speed, disappear){
    var peaked = false;
    var object = objectArray[objectArray.length - 1];
    if(this.spawnAbilityInterval == undefined || this.spawnAbilityInterval == 0){
        this.spawnAbilityInterval = setInterval(() => {
        if(object.y > object.originY - peakHeight && peaked == false){
          object.y -= speed;
        } else {
          peaked = true;
        }
        if(peaked == true){
          object.y += speed;
        }
        if(peaked == true && object.y > object.originY - rest){
          object.y = object.originY - rest;
          clearInterval(this.spawnAbilityInterval);
          this.spawnAbilityInterval = 0;
          if(disappear == true){
            objectArray.pop();
            score += 200;
          }
        }
      }, 25);
    }
  }

  popUpBlock(){
    var peaked = false;
    if(this.popUpInterval == undefined || this.popUpInterval == 0){
        this.popUpInterval = setInterval(() => {
        if(this.y > this.originY - screenHeight/100 && peaked == false){
          this.y -= screenHeight/500;
        } else {
          peaked = true;
        }
        if(peaked == true){
          this.y += screenHeight/500;
        }
        if(peaked == true && this.y > this.originY){
          this.y = this.originY;
          clearInterval(this.popUpInterval);
          this.popUpInterval = 0;
        }
      }, 25);
    }
  }

  collisionDown(){
    mario.jump = false;
    mario.velocity = 0;
    mario.y = this.y - mario.height;
  }

  collisionUp(){
    mario.y = this.y + this.height*11/10;
    mario.velocity = -mario.gravity;
  }

  collisionRight(){
    moveRight = false;
    //has to make 101/100 due to glitching caused by being directly in contact
    mario.x = this.x - mario.width*101/100;
  }

  collisionLeft(){
    moveLeft = false;
    //has to make 101/100 due to glitching caused by being directly in contact
    mario.x = this.x + this.width*101/100;
  }
}

class NormalBlock extends CollidableObject {
    collisionUp(){
      super.collisionUp();
      if(mario.isBig == false){
        super.popUpBlock();
      } else {
        console.log("break Block");
      }
    }
}

class MysteryBox extends CollidableObject {
  constructor(x, y, width, height, image, inside, amountOfAbilities){
    super(x, y, width, height, image);
    this.inside = inside;
    this.hit = false;
    this.abilitiesAlreadySpawned = 0;
    this.amountOfAbilities = amountOfAbilities;
  }

  collisionUp(){
    super.collisionUp();
    if(this.hit == false){
      ++this.abilitiesAlreadySpawned;
      if(this.abilitiesAlreadySpawned == this.amountOfAbilities){
        this.hit = true;
        this.image = usedBox;
      }
      super.popUpBlock();
      switch (this.inside) {
        case "star":
          mario.starMode = true;
          setTimeout(function(){
            starMode = false;
          }, 20000);
          break;
        case "coin":
          levelCoins.push(new Coin((this.originX + this.width/2) - screenHeight*25/1056, this.originY));
          super.spawnAbility(levelCoins, screenHeight/8, screenHeight/10, screenHeight/80, true);
          break;
        default:
          console.log("nothing inside");
          break;
      }
    }
  }

}

class Pipe extends CollidableObject {

}

class GroundBlock extends CollidableObject {
  constructor(x, y, image){
    super(x, y, blockSize, blockSize, image);
  }

  collisionDown(){
    super.collisionDown();
    floorCollision = true;
  }
}

/* The main chatacter of the game Mario, he only extends
 form basic object due to him having quite specific methods */
class Mario extends BasicObject{
  constructor(x, y, width, height, movementSpeed, image) {
    super(x, y, width, height, image);
    this.velocity = 0;
    this.gravity = screenHeight/5000;
    this.movementSpeed = movementSpeed;
    this.jump = false;
    this.starMode = false;
    this.isBig = false;
  }

  moveAction(){
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
        xPositionInLevel += this.movementSpeed/2;
    }
  }

  jumpAction(){
    //check if fall through floor
    if (floorCollision == true && this.jump == true){
      this.velocity = 0;
      this.jump = false;
      this.y = screenHeight*4/5;
    }

    if (moveUp == true && this.jump == false) {
      moveUp = false;
      this.jump = true;
      this.velocity = screenHeight/90;
    }

    if (this.jump == true) {
      this.fallAction();
    }
  };

  gameOver() {
    this.y += this.movementSpeed/2;
  };

  fallAction() {
    this.y -= this.velocity;
    this.velocity -= this.gravity;
  }
}


/* Enemy Class extends from basic object because it is also quite
unique, it is the basis for all enemies in mario */
class Enemy extends BasicObject{
  constructor(x, y, width, height, movementSpeed, image){
    super(x, y, width, height, image[0]);
    this.imageArray = image;
    this.movementSpeed = movementSpeed;
    this.index = 0;
    this.squashed = false;
    this.removed = false;
    this.counter = 0;
  }

  draw(){
    if(this.squashed == false){
      this.image = this.imageArray[this.index];
    }
    super.draw()
    if(this.counter == 16){
      if(this.index < this.imageArray.length - 2){
        this.index++;
      } else {
        this.index = 0;
      }
      this.counter = 0;
    } else {
      ++this.counter;
    }
	}

  moveWithMario(){
    if(this.squashed == false){
    this.originX -= this.movementSpeed;
    super.moveWithMario();
    }
  }

  squashSprite(){
    this.squashed = true;
    this.y = this.y + this.height/2;
    this.height = this.height/2;
    this.image = this.imageArray[2];
    score += 100;
  }

}

/* clouds object is just an object that moves in a single
direction and when it is out of the screen loops back to the other
side presenting the illusion there are passing clouds */
class Cloud extends BasicObject {
  constructor(x, y, width, height, movementSpeed, image){
    super(x, y, width, height, image);
    this.movementSpeed = movementSpeed;
  }

  moveCloud(){
    this.x += this.movementSpeed;
    if (this.x > screenWidth) {
      this.x = 0 - this.width;
      this.y = randomNum(screenHeight*3/10, screenHeight/10);
    }
  }
}
