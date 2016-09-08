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
      if(this.collected){
        this.isCollected();
      }
    }
  }
}


/* Coin object is an object which animates through the coin images
 to give off the illusion it is rotating and when player collects
 one it increments score by 25 */
class AnimatedOneTimeObject extends OneTimeObject {
  constructor(x, y, imageArray, speedOfAnimation){
    super(x,y,imageArray[0]);
    this.imageArray = imageArray;
    this.index = 0;
  	this.width = screenHeight*25/528;
  	this.height = screenHeight/16;
    this.counter = 0;
    this.speedOfAnimation = speedOfAnimation;
  }

  draw(){
    this.image = this.imageArray[this.index];
    super.draw();
    if(this.counter == this.speedOfAnimation){
      if(this.index < this.imageArray.length - 1){
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

class Coin extends AnimatedOneTimeObject{
  constructor(section, blocksFromRight, blocksUp){
    var x = section * screenWidth + (((blocksFromRight + 0.5) * blockSize) - screenHeight*25/1056);
    var y = groundLevelY - (((blocksUp - 0.5) * blockSize) + screenHeight/32);
    super(x,y,coin, 6);
    this.width = screenHeight*25/528;
  	this.height = screenHeight/16;
  }

  isCollected(){
      ++coinsCollected;
      score += 25;
  }
}

/* any object which can be collided into by mario
  (includes spawnAbility and popUpBlock because it is used
   in MysteryBox and NormalBlock) */
class CollidableObject extends BasicObject {
  constructor(x, y, width, height, image){
    super(x, y, width, height, image);
    this.removed = false;
    this.popUpInterval = 0;
    this.spawnAbilityInterval = 0;
    this.removed = false;
  }

  detectCollisionWithMario() {
    if(isColliding(mario, this) && !this.removed){
      if(mario.y + mario.height <= this.y + this.height/2){
        if(mario.x + mario.width >= this.x + this.width/10 && mario.x <= this.x + this.width*9/10){
          this.collisionDown();
        }
      } else if(mario.y + mario.height/2 >= this.y + this.height){
        if(mario.x + mario.width >= this.x + this.width/10 && mario.x <= this.x + this.width*9/10){
          this.collisionUp();
        }
      } else if (mario.x + mario.width <= this.x + this.width/2) {
        this.collisionRight();
      } else if (mario.x + mario.width/2 >= this.x + this.width) {
        this.collisionLeft();
      }
    }
  }
  spawnAbility(objectArray, peakHeight, rest, speed, disappear){
    var peaked = false;
    var object = objectArray[objectArray.length - 1];
    if(this.spawnAbilityInterval === undefined || this.spawnAbilityInterval === 0){
        this.spawnAbilityInterval = setInterval(() => {
        if(object.y > object.originY - peakHeight && !peaked){
          object.y -= speed;
        } else {
          peaked = true;
        }
        if(peaked){
          object.y += speed;
        }
        if(peaked && object.y > object.originY - rest){
          object.y = object.originY - rest;
          clearInterval(this.spawnAbilityInterval);
          this.spawnAbilityInterval = 0;
          this.spawning = false;
          if(disappear){
            objectArray.pop();
            score += 200;
          }
        }
      }, 25);
    }
  }

  popUpBlock(){
    var peaked = false;
    if(this.popUpInterval === undefined || this.popUpInterval === 0){
        this.popUpInterval = setInterval(() => {
        if(this.y > this.originY - screenHeight/100 && !peaked){
          this.y -= screenHeight/500;
        } else {
          peaked = true;
        }
        if(peaked){
          this.y += screenHeight/500;
        }
        if(peaked && this.y > this.originY){
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

/* any block which doesn't have an ability yet does popUpBlock when
  mario jumps into it and breaks when mario is big*/
class NormalBlock extends CollidableObject {
    constructor(section, blocksFromRight, blocksAboveGround, image){
      var x = screenWidth*section + blockSize*blocksFromRight;
      var y = groundLevelY - blockSize*blocksAboveGround;
      super(x, y, blockSize, blockSize, image);
    }
    collisionUp(){
      super.collisionUp();
      if(!mario.isBig){
        super.popUpBlock();
      } else {
        this.removed = true;
      }
    }
}

/* any block which mario can collide with however doesn't do anything */
class SolidBlock extends NormalBlock {
    collisionUp(){
      mario.y = this.y + this.height*11/10;
      mario.velocity = -mario.gravity;
    }
}

class MovingPlatform extends CollidableObject {
  constructor(section, startingBlocksFromRight, startingBlocksUp, width, height, image, movementSpeed){
    var x = screenWidth*section + blockSize*startingBlocksFromRight;
    var y = groundLevelY - blockSize*startingBlocksUp;
    super(x, y, width, height, image);
    this.movementSpeed = movementSpeed;
    this.maxY = screenHeight;
    this.minY = 0;
  }

  draw(){
    if(this.y < this.minY){
      this.y = this.maxY;
    }
    this.y -= this.movementSpeed;
    super.draw();
  }
}

/* any block which mario can interact with and can contain an ability
  either mushroom, coin, life or fire flower */
class MysteryBox extends CollidableObject {
  constructor(section, blocksFromRight, blocksAboveGround, image, inside, amountOfAbilities){
    var x = screenWidth*section + blockSize*blocksFromRight;
    var y = groundLevelY - blockSize*blocksAboveGround;
    super(x, y, blockSize, blockSize, image);
    this.inside = inside;
    this.hit = false;
    this.abilitiesAlreadySpawned = 0;
    this.amountOfAbilities = amountOfAbilities;
  }

  collisionUp(){
    super.collisionUp();
    if(!this.hit){
      ++this.abilitiesAlreadySpawned;
      if(this.abilitiesAlreadySpawned == this.amountOfAbilities){
        this.hit = true;
        this.image = usedBox;
      }
      super.popUpBlock();
      switch (this.inside) {
        case "star":
          levelSprites.push(new Star(0, this.originX/blockSize, screenHeight/blockSize - this.originY/blockSize - 1.5));
          break;
        case "coin":
          levelCoins.push(new Coin((this.originX + this.width/2) - screenHeight*25/1056, this.originY));
          super.spawnAbility(levelCoins, screenHeight/8, screenHeight/10, screenHeight/80, true);
          ++coinsCollected;
          break;
        case "mushroom":
          levelSprites.push(new Mushroom(0, this.originX/blockSize, screenHeight/blockSize - this.originY/blockSize - 1.5));
          break;
        case "oneUp":
          levelSprites.push(new OneUp(0, this.originX/blockSize, screenHeight/blockSize - this.originY/blockSize - 1.5));
          break;
        default:
          console.log("nothing inside");
          break;
      }
    }
  }

}

/* pipes that act just like a solidBlock however can interact with certain pipes
  to go to secret levels */
class Pipe extends CollidableObject {
  constructor(section, blocksFromRight, blocksHigh){
    var x = section * screenWidth + blockSize * blocksFromRight;
    super(x, groundLevelY - blockSize * blocksHeigh, blockSize*2, blockSize * blocksHeigh, [pipeHead, pipeBody]);
    this.amountOfBodies = blocksHeigh - 1;
  }

  draw(){
    drawImageOnCanvas(this.x, this.y, this.width, blockSize, this.image[0]);
    for(var i = 1; i <= this.amountOfBodies; i++){
      drawImageOnCanvas(this.x , this.y + blockSize * i, this.width, blockSize, this.image[1]);
    }
  }

  collisionUp(){
    //clear collisionUp
  }

  detectCollisionWithMario() {
    if(isColliding(mario, this)){
      if(mario.y + mario.height <= this.y + this.height/10){
        if(mario.x + mario.width >= this.x + this.width/10 && mario.x <= this.x + this.width*9/10){
          super.collisionDown();
        }
      } else if (mario.x + mario.width <= this.x + this.width/2) {
        super.collisionRight();
      } else if (mario.x + mario.width/2 >= this.x + this.width) {
        super.collisionLeft();
      }
    }
  }
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

class BackgroundBlock extends BasicObject{
  constructor(section, blocksFromRight, blocksAboveGround, image){
    var x = screenWidth*section + blockSize*blocksFromRight;
    var y = groundLevelY - blockSize*blocksAboveGround;
    super(x, y, blockSize, blockSize, image);
  }
}

/* The main chatacter of the game Mario, he only extends
 form basic object due to him having quite specific methods */
class Mario extends BasicObject{
  constructor(x, y, width, height, image) {
    super(x, y, width, height, image);
    this.velocity = 0;
    this.imageArray = marioTexture;
    this.gravity = screenHeight/5000;
    this.movementSpeed = screenWidth/300;
    this.jump = false;
    this.starMode = false;
    this.isBig = false;
    this.currentSpeed = 0;
    this.currentImage = 3;
    this.flipped = false;
    this.runningCounter = 0;
    this.crouching = false;
  }

  draw(){
    if(mario.isBig){
      marioSizingBig(this.image);
    } else {
      marioSizingSmall(this.image);
    }
    if(this.flipped){
      drawFlippedImage(this.x, this.y, this.width, this.height, this.image);
    } else {
      super.draw();
    }
  }

  animateRunning(){
    if(!this.jump){
      for(var i = 0; i < Math.floor(Math.abs(this.currentSpeed)); i++){
        if(this.runningCounter % 10 === 0){
          this.image = this.imageArray[this.currentImage];
          if(this.currentImage < 5){
            ++this.currentImage;
          } else {
            this.currentImage = 3;
          }
        }
        this.runningCounter++;
      }
    }
  }

  moveAction(){
    if(moveRight){
      this.flipped = false;
      if(this.currentSpeed < this.movementSpeed){
        if(this.currentSpeed >= 0){
          this.animateRunning();
        } else {
          this.image = this.imageArray[2];
        }
        this.currentSpeed += this.movementSpeed/25;
      } else {
        this.animateRunning();
        this.currentSpeed = this.movementSpeed;
      }
    }
    if(moveLeft){
      this.flipped = true;
      if(this.currentSpeed > -this.movementSpeed){
        if(this.currentSpeed <= 0){
          this.animateRunning();
        } else {
          this.image = this.imageArray[2];
        }
        this.currentSpeed -= this.movementSpeed/25;
      } else {
        this.animateRunning();
        this.currentSpeed = -this.movementSpeed;
      }
    }
    if(this.x >= 0 && this.x < screenWidth/2){
      this.x += this.currentSpeed;
    } else if(this.x + this.width/2 > screenWidth/2){
      if(moveLeft){
        this.flipped = true;
        if(this.currentSpeed <= 0){
          this.x = screenWidth/2 - this.width/2;
        }
        this.x -= this.currentSpeed;
      } else {
        this.flipped = false;
      }
      xPositionInLevel += this.currentSpeed/2;
    } else {
      this.flipped = false;
      this.currentSpeed = 0;
      this.x = 0;
    }
    if(!moveRight && !moveLeft && !lifeLost && !ending && !this.jump){
      if(this.currentSpeed < this.movementSpeed/25 && this.currentSpeed > -this.movementSpeed/25){
        this.currentSpeed = 0;
        this.image = this.imageArray[0];
      } else {
        if(this.currentSpeed >= this.movementSpeed/25){
          this.currentSpeed -= this.movementSpeed/25;
          this.flipped = false;
          this.animateRunning();
        }
        if(this.currentSpeed <= -this.movementSpeed/25){
          this.currentSpeed += this.movementSpeed/25;
          this.flipped = true;
          this.animateRunning();
        }
      }
    }
    if(mario.isBig && moveDown && this.currentSpeed === 0){
      this.image = this.imageArray[8];
      this.crouching = true;
    }
    if(!moveDown && this.crouching){
      console.log("run");
      this.crouching = false;
      mario.y -= blockSize*5/8;
    }
  }

  jumpAction(){
    //check if fall through floor
    if (floorCollision && this.jump){
      this.velocity = 0;
      this.jump = false;
      this.y = groundLevelY - this.height;
    }
    if (moveUp && !this.jump) {
      moveUp = false;
      this.jump = true;
      this.velocity = screenHeight/90;
    }
    if (this.jump) {
      this.image = this.imageArray[6];
      this.fallAction();
    }
  }

  gameOver() {
    this.y -= this.movementSpeed*5;
    this.image = this.imageArray[1];
    lifeLost = true;
    gameplayFreeze = true;

    if(lives === 0){
      setTimeout(function (){
        refreshMainScene();
        refreshLevelAndGoToScene("main");
        lifeLost = false;
        lives = 3;
      }, 1000);
    } else {
      setTimeout(function (){
        --lives;
        refreshLevelAndGoToScene("preLevel");
        lifeLost = false;
      }, 1000);
    }
  }

  fallAction() {
    this.y -= this.velocity;
    this.velocity -= this.gravity;
  }
}

/* any sprite which the user does not control and can interact with mario
it also contains built in gravity  */
class Sprite extends BasicObject{
  constructor(section ,blocksFromRight, blocksAboveGround, width, height, movementSpeed, image){
    var x = screenWidth*section + blockSize*blocksFromRight;
    var y = groundLevelY - blockSize*blocksAboveGround - height;
    super(x, y, width, height, image);
    this.velocity = 0;
    this.removed = false;
    this.blocksNotCollidedWith = [];
    this.movementSpeed = movementSpeed;
    this.collideVelocity = 0;
  }

  collision(){
    this.movementSpeed = -this.movementSpeed;
  }

  moveWithMario(){
    if(inScreen(this)){
      this.originX -= this.movementSpeed;
    }
    super.moveWithMario();
  }

  detectCollisionWithObject(object){
    if(isColliding(object, this) && !this.spawning){
      this.velocity = this.collideVelocity;
      if(this.y + this.height/2 >= object.y + object.height/3){
        this.collision();
        if(this.x >= object.x + object.width/2){
          this.x = object.x + object.width;
        }
        if(this.x + this.width <= object.x + object.width/2){
          this.x = object.x - this.width;
        }
      } else {
        this.y = object.y - this.height;
      }
    } else {
      this.blocksNotCollidedWith.push(0);
    }
  }

  checkFall(){
    if(this.blocksNotCollidedWith.length == allCollidableObjects.length){
      this.velocity += gravity;
      this.y += this.velocity;
    }
  }

  collisions() {
    this.blocksNotCollidedWith = [];
    for(var j = 0; j < allCollidableObjects.length; j++){
      if(allCollidableObjects[j] != this && !allCollidableObjects[j].removed){
        this.detectCollisionWithObject(allCollidableObjects[j]);
      } else {
        this.blocksNotCollidedWith.push(0);
      }
    }
    this.checkFall();
  }

  detectCollisionWithMario(){
    if(isColliding(mario, this)){
      this.collisionWithMario();
    }
  }

}

class AnimatedSprite extends Sprite {
  constructor(section ,blocksFromRight, blocksAboveGround, width, height, movementSpeed, image){
    super(section ,blocksFromRight, blocksAboveGround, width, height, movementSpeed, image[0]);
    this.counter = 0;
    this.imageArray = image;
    this.index = 0;
  }

  draw(){
    super.draw();
    if(this.counter == this.animationFrequency){
      if(this.index < this.imageArray.length - (this.excessAnimationImages + 1)){
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

/* Enemy Class extends from basic object because it is also quite
unique, it is the basis for all enemies in mario */
class Enemy extends AnimatedSprite {
  constructor(section ,blocksFromRight, blocksAboveGround, width, height, movementSpeed, image){
    super(section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image);
    this.squashed = false;
    this.excessAnimationImages = 1;
  }

  draw(){
    if(!this.squashed){
      this.image = this.imageArray[this.index];
    }
    super.draw();
	}

  moveWithMario(){
    if(!this.squashed && inScreen(this)){
      this.originX -= this.movementSpeed;
    }
    this.x = this.originX - xPositionInLevel;
  }

  squashSprite(){
    this.squashed = true;
    this.y = this.y + this.height/2;
    this.height = this.height/2;
    this.image = this.imageArray[2];
    score += 100;
  }

  collisionWithMario(){
    if(!mario.starMode){
      if(!unhittable){
        if(mario.y + mario.height <= this.y + this.height/2){
          mario.velocity = screenHeight/150;
          this.squashSprite();
          setTimeout(() => {
            this.removed = true;
          }, 1000);
        } else {
          if(mario.isBig){
            mario.imageArray = marioTexture;
            unhittable = true;
            mario.isBig = false;
            setTimeout(function(){
              unhittable = false;
            }, 3000);
          } else {
            mario.gameOver();
          }
        }
      }
    } else {
        mario.velocity = screenHeight/80;
        this.squashSprite();
        setTimeout(() => {
          this.removed = true;
        }, 1000);
    }
  }
}

/* An extention for enemy class so that it is easier to declare goomba
  enemies due to preset width, height and image*/
class Goomba extends Enemy {
  constructor(section ,blocksFromRight, blocksAboveGround, image){
    var width = blockSize;
    var height = goombaHeight;
    var movementSpeed = screenWidth/1500;
    super(section ,blocksFromRight, blocksAboveGround, width, height, movementSpeed, image);
    this.animationFrequency = 16;
  }
}

class Star extends AnimatedSprite{
  constructor(section ,blocksFromRight, blocksAboveGround){
    super(section ,blocksFromRight, blocksAboveGround, blockSize, blockSize, -screenWidth/2000, starPower);
    this.spawning = true;
    this.excessAnimationImages = 0;
    this.animationFrequency = 4;
    this.collideVelocity = -screenHeight/100;
  }

  draw(){
    super.draw();
    this.image = this.imageArray[this.index];
  }

  moveWithMario(){
    if(!this.removed && inScreen(this)){
      this.originX -= this.movementSpeed;
    }
    super.moveWithMario();
  }

  checkFall(){
    if(this.blocksNotCollidedWith.length == allCollidableObjects.length){
      this.velocity += gravity;
    }
    this.y += this.velocity;
  }

  collisionWithMario(){
    mario.starMode = true;
    this.removed = true;
    setTimeout(function(){
      mario.starMode = false;
    }, 10000);
  }
}

class Mushroom extends Sprite{
  constructor(section ,blocksFromRight, blocksAboveGround){
    super(section ,blocksFromRight, blocksAboveGround, blockSize, blockSize, -screenWidth/2000, mushroom);
    this.spawning = true;
  }

  moveWithMario(){
    if(!this.removed && inScreen(this)){
      this.originX -= this.movementSpeed;
    }
    super.moveWithMario();
  }

  collisionWithMario(){
    if(mario.isBig){
      score += 1000;
    }
    mario.isBig = true;
    mario.image = bigMarioTexture[0];
    mario.imageArray = bigMarioTexture;
    mario.y -= blockSize;
    this.removed = true;
  }
}

class OneUp extends Mushroom {
  constructor(section ,blocksFromRight, blocksAboveGround){
    super(section ,blocksFromRight, blocksAboveGround, blockSize, blockSize, -screenWidth/2000, mushroom)
    this.image = oneUp;
  }

  collisionWithMario(){
    this.removed = true;
    lives += 1;
  }
}

/* clouds object is just an object that moves in a single
direction and when it is out of the screen loops back to the other
side presenting the illusion there are passing clouds */
class MovingCloud extends BasicObject {
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

/* cloud object is just a background object which mario does not
  interact with, it is a class due to simplicity of creation and
  declaration in declaringFunctions.js. There is a small medium and big size */
class Cloud extends BasicObject {
  constructor(section, blocksFromRight, blocksAboveGround, size){
    var cloudImage;
    if(size == 1){
      cloudImage = cloudTextures[0];
    } else if (size == 2){
      cloudImage = cloudTextures[1];
    } else {
      cloudImage = cloudTextures[2];
    }
    var x = screenWidth*section + blockSize*blocksFromRight;
    var y = groundLevelY - blockSize*blocksAboveGround;
    super(x , y, blockSize * (size+1), blockSize*3/2, cloudImage);
  }
}

/* cloud object is just a background object which mario does not
  interact with, it is a class due to simplicity of creation and
  declaration in declaringFunctions.js. There is a small medium and big size */
class Bush extends BasicObject {
  constructor(section, blocksFromRight, size){
    var bushImage;
    if(size == 1){
      bushImage = bushTextures[0];
    } else if (size == 2){
      bushImage = bushTextures[1];
    } else {
      bushImage = bushTextures[2];
    }
    var x = screenWidth*section + blockSize*blocksFromRight;
    super(x, (groundLevelY - blockSize), blockSize * (size+1), blockSize,bushImage);
  }
}

/* cloud object is just a background object which mario does not
  interact with, it is a class due to simplicity of creation and
  declaration in declaringFunctions.js. There is a big and small size*/
class Hill extends BasicObject {
  constructor(section, blocksFromRight, size){
    var hillImage;
    var width;
    if(size == 1){
      hillImage = hillSmallTexture;
      width = 3;
    } else {
      hillImage = hillLargeTexture;
      width = 5;
    }
    var x = screenWidth*section + blockSize*blocksFromRight;
    super(x, groundLevelY - (blockSize* (size+0.1875)), blockSize * (width), blockSize* (size+0.1875),hillImage);
  }
}

/* text objected needed as object for simplicity and so it can be
  resized easier because it uses the screen change multipler to
  reposition and resize it as an array of objects */
class Text {
  constructor(x, y ,font, size, alignment, colour, text){
    this.x = x;
    this.y = y;
    this.font = font;
    this.width = size;
    this.alignment = alignment;
    this.colour = colour;
    this.text = text;
  }

  draw(){
    drawText(this.x, this.y ,this.font, this.width, this.alignment, this.colour, this.text);
  }
}

/* the ending pole mario jumps onto and ends the level begining the next level */
class EndingPole extends NormalBlock {
  constructor(section, blocksFromRight, blocksAboveGround){
    var image = endingPole;
    super(section, blocksFromRight, blocksAboveGround, image);
    this.width = blockSize/2;
    this.height = blockSize * 9.5;
    this.flagXOrigin = this.x - blockSize * 0.75;
    this.flagYOrigin = this.y + blockSize * 0.5625;
    this.counter = 0;
  }

  draw(){
    super.draw();
    if(!ending){
      this.flagX = this.flagXOrigin;
      this.flagY = this.flagYOrigin;
    }
    drawImageOnCanvas(this.flagX, this.flagY, blockSize, blockSize, endingFlag);
  }

  detectCollisionWithMario() {
    if(isColliding(mario, this)){
      ending = true;
      mario.image = marioTexture[7];
      mario.x = this.x - blockSize*10/16;
      if(this.flagY + blockSize < this.y + this.height){
        this.flagY = this.flagYOrigin + (screenHeight/80)*this.counter;
        this.counter++
      } else {
        this.flagY =  this.y + this.height - blockSize;
      }
      if(mario.y + mario.height < this.y + this.height){
        mario.y += screenHeight/80;
      } else {
        mario.y = this.y + this.height - mario.height;
      }
    }
  }
}

class Debris extends BasicObject {
  constructor(x, y, width, height, image, dx, dy){
    super(x, y, width, height, image);
    this.dx = dx;
    this.dy = dy;
  }

}
