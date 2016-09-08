"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* The base class for all objects due to them all
having these similar properties and methods*/

var BasicObject = function () {
  function BasicObject(x, y, width, height, image) {
    _classCallCheck(this, BasicObject);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.originX = x;
    this.originY = y;
  }

  _createClass(BasicObject, [{
    key: "draw",
    value: function draw() {
      drawImageOnCanvas(this.x, this.y, this.width, this.height, this.image);
    }
  }, {
    key: "moveWithMario",
    value: function moveWithMario() {
      this.x = this.originX - xPositionInLevel;
    }
  }]);

  return BasicObject;
}();

/* This object class is for items such as coins and abilities
it will be useful later when a lot of  */


var OneTimeObject = function (_BasicObject) {
  _inherits(OneTimeObject, _BasicObject);

  function OneTimeObject(x, y, image) {
    _classCallCheck(this, OneTimeObject);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OneTimeObject).call(this, x, y, screenHeight * 25 / 528, screenHeight / 16, image));

    _this.collected = false;
    return _this;
  }

  _createClass(OneTimeObject, [{
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this)) {
        this.collected = true;
        if (this.collected) {
          this.isCollected();
        }
      }
    }
  }]);

  return OneTimeObject;
}(BasicObject);

/* Coin object is an object which animates through the coin images
 to give off the illusion it is rotating and when player collects
 one it increments score by 25 */


var AnimatedOneTimeObject = function (_OneTimeObject) {
  _inherits(AnimatedOneTimeObject, _OneTimeObject);

  function AnimatedOneTimeObject(x, y, imageArray, speedOfAnimation) {
    _classCallCheck(this, AnimatedOneTimeObject);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(AnimatedOneTimeObject).call(this, x, y, imageArray[0]));

    _this2.imageArray = imageArray;
    _this2.index = 0;
    _this2.width = screenHeight * 25 / 528;
    _this2.height = screenHeight / 16;
    _this2.counter = 0;
    _this2.speedOfAnimation = speedOfAnimation;
    return _this2;
  }

  _createClass(AnimatedOneTimeObject, [{
    key: "draw",
    value: function draw() {
      this.image = this.imageArray[this.index];
      _get(Object.getPrototypeOf(AnimatedOneTimeObject.prototype), "draw", this).call(this);
      if (this.counter == this.speedOfAnimation) {
        if (this.index < this.imageArray.length - 1) {
          this.index++;
        } else {
          this.index = 0;
        }
        this.counter = 0;
      } else {
        ++this.counter;
      }
    }
  }]);

  return AnimatedOneTimeObject;
}(OneTimeObject);

var Coin = function (_AnimatedOneTimeObjec) {
  _inherits(Coin, _AnimatedOneTimeObjec);

  function Coin(section, blocksFromRight, blocksUp) {
    _classCallCheck(this, Coin);

    var x = section * screenWidth + ((blocksFromRight + 0.5) * blockSize - screenHeight * 25 / 1056);
    var y = groundLevelY - ((blocksUp - 0.5) * blockSize + screenHeight / 32);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Coin).call(this, x, y, coin, 6));

    _this3.width = screenHeight * 25 / 528;
    _this3.height = screenHeight / 16;
    return _this3;
  }

  _createClass(Coin, [{
    key: "isCollected",
    value: function isCollected() {
      ++coinsCollected;
      score += 25;
    }
  }]);

  return Coin;
}(AnimatedOneTimeObject);

/* any object which can be collided into by mario
  (includes spawnAbility and popUpBlock because it is used
   in MysteryBox and NormalBlock) */


var CollidableObject = function (_BasicObject2) {
  _inherits(CollidableObject, _BasicObject2);

  function CollidableObject(x, y, width, height, image) {
    _classCallCheck(this, CollidableObject);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CollidableObject).call(this, x, y, width, height, image));

    _this4.removed = false;
    _this4.popUpInterval = 0;
    _this4.spawnAbilityInterval = 0;
    _this4.removed = false;
    return _this4;
  }

  _createClass(CollidableObject, [{
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this) && !this.removed) {
        if (mario.y + mario.height <= this.y + this.height / 2) {
          if (mario.x + mario.width >= this.x + this.width / 10 && mario.x <= this.x + this.width * 9 / 10) {
            this.collisionDown();
          }
        } else if (mario.y + mario.height / 2 >= this.y + this.height) {
          if (mario.x + mario.width >= this.x + this.width / 10 && mario.x <= this.x + this.width * 9 / 10) {
            this.collisionUp();
          }
        } else if (mario.x + mario.width <= this.x + this.width / 2) {
          this.collisionRight();
        } else if (mario.x + mario.width / 2 >= this.x + this.width) {
          this.collisionLeft();
        }
      }
    }
  }, {
    key: "spawnAbility",
    value: function spawnAbility(objectArray, peakHeight, rest, speed, disappear) {
      var _this5 = this;

      var peaked = false;
      var object = objectArray[objectArray.length - 1];
      if (this.spawnAbilityInterval === undefined || this.spawnAbilityInterval === 0) {
        this.spawnAbilityInterval = setInterval(function () {
          if (object.y > object.originY - peakHeight && !peaked) {
            object.y -= speed;
          } else {
            peaked = true;
          }
          if (peaked) {
            object.y += speed;
          }
          if (peaked && object.y > object.originY - rest) {
            object.y = object.originY - rest;
            clearInterval(_this5.spawnAbilityInterval);
            _this5.spawnAbilityInterval = 0;
            _this5.spawning = false;
            if (disappear) {
              objectArray.pop();
              score += 200;
            }
          }
        }, 25);
      }
    }
  }, {
    key: "popUpBlock",
    value: function popUpBlock() {
      var _this6 = this;

      var peaked = false;
      if (this.popUpInterval === undefined || this.popUpInterval === 0) {
        this.popUpInterval = setInterval(function () {
          if (_this6.y > _this6.originY - screenHeight / 100 && !peaked) {
            _this6.y -= screenHeight / 500;
          } else {
            peaked = true;
          }
          if (peaked) {
            _this6.y += screenHeight / 500;
          }
          if (peaked && _this6.y > _this6.originY) {
            _this6.y = _this6.originY;
            clearInterval(_this6.popUpInterval);
            _this6.popUpInterval = 0;
          }
        }, 25);
      }
    }
  }, {
    key: "collisionDown",
    value: function collisionDown() {
      mario.jump = false;
      mario.velocity = 0;
      mario.y = this.y - mario.height;
    }
  }, {
    key: "collisionUp",
    value: function collisionUp() {
      mario.y = this.y + this.height * 11 / 10;
      mario.velocity = -mario.gravity;
    }
  }, {
    key: "collisionRight",
    value: function collisionRight() {
      moveRight = false;
      //has to make 101/100 due to glitching caused by being directly in contact
      mario.x = this.x - mario.width * 101 / 100;
    }
  }, {
    key: "collisionLeft",
    value: function collisionLeft() {
      moveLeft = false;
      //has to make 101/100 due to glitching caused by being directly in contact
      mario.x = this.x + this.width * 101 / 100;
    }
  }]);

  return CollidableObject;
}(BasicObject);

/* any block which doesn't have an ability yet does popUpBlock when
  mario jumps into it and breaks when mario is big*/


var NormalBlock = function (_CollidableObject) {
  _inherits(NormalBlock, _CollidableObject);

  function NormalBlock(section, blocksFromRight, blocksAboveGround, image) {
    _classCallCheck(this, NormalBlock);

    var x = screenWidth * section + blockSize * blocksFromRight;
    var y = groundLevelY - blockSize * blocksAboveGround;
    return _possibleConstructorReturn(this, Object.getPrototypeOf(NormalBlock).call(this, x, y, blockSize, blockSize, image));
  }

  _createClass(NormalBlock, [{
    key: "collisionUp",
    value: function collisionUp() {
      _get(Object.getPrototypeOf(NormalBlock.prototype), "collisionUp", this).call(this);
      if (!mario.isBig) {
        _get(Object.getPrototypeOf(NormalBlock.prototype), "popUpBlock", this).call(this);
      } else {
        this.removed = true;
      }
    }
  }]);

  return NormalBlock;
}(CollidableObject);

/* any block which mario can collide with however doesn't do anything */


var SolidBlock = function (_NormalBlock) {
  _inherits(SolidBlock, _NormalBlock);

  function SolidBlock() {
    _classCallCheck(this, SolidBlock);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SolidBlock).apply(this, arguments));
  }

  _createClass(SolidBlock, [{
    key: "collisionUp",
    value: function collisionUp() {
      mario.y = this.y + this.height * 11 / 10;
      mario.velocity = -mario.gravity;
    }
  }]);

  return SolidBlock;
}(NormalBlock);

var MovingPlatform = function (_CollidableObject2) {
  _inherits(MovingPlatform, _CollidableObject2);

  function MovingPlatform(section, startingBlocksFromRight, startingBlocksUp, width, height, image, movementSpeed) {
    _classCallCheck(this, MovingPlatform);

    var x = screenWidth * section + blockSize * startingBlocksFromRight;
    var y = groundLevelY - blockSize * startingBlocksUp;

    var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(MovingPlatform).call(this, x, y, width, height, image));

    _this9.movementSpeed = movementSpeed;
    _this9.maxY = screenHeight;
    _this9.minY = 0;
    return _this9;
  }

  _createClass(MovingPlatform, [{
    key: "draw",
    value: function draw() {
      if (this.y < this.minY) {
        this.y = this.maxY;
      }
      this.y -= this.movementSpeed;
      _get(Object.getPrototypeOf(MovingPlatform.prototype), "draw", this).call(this);
    }
  }]);

  return MovingPlatform;
}(CollidableObject);

/* any block which mario can interact with and can contain an ability
  either mushroom, coin, life or fire flower */


var MysteryBox = function (_CollidableObject3) {
  _inherits(MysteryBox, _CollidableObject3);

  function MysteryBox(section, blocksFromRight, blocksAboveGround, image, inside, amountOfAbilities) {
    _classCallCheck(this, MysteryBox);

    var x = screenWidth * section + blockSize * blocksFromRight;
    var y = groundLevelY - blockSize * blocksAboveGround;

    var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(MysteryBox).call(this, x, y, blockSize, blockSize, image));

    _this10.inside = inside;
    _this10.hit = false;
    _this10.abilitiesAlreadySpawned = 0;
    _this10.amountOfAbilities = amountOfAbilities;
    return _this10;
  }

  _createClass(MysteryBox, [{
    key: "collisionUp",
    value: function collisionUp() {
      _get(Object.getPrototypeOf(MysteryBox.prototype), "collisionUp", this).call(this);
      if (!this.hit) {
        ++this.abilitiesAlreadySpawned;
        if (this.abilitiesAlreadySpawned == this.amountOfAbilities) {
          this.hit = true;
          this.image = usedBox;
        }
        _get(Object.getPrototypeOf(MysteryBox.prototype), "popUpBlock", this).call(this);
        switch (this.inside) {
          case "star":
            levelSprites.push(new Star(0, this.originX / blockSize, screenHeight / blockSize - this.originY / blockSize - 1.5));
            break;
          case "coin":
            levelCoins.push(new Coin(this.originX + this.width / 2 - screenHeight * 25 / 1056, this.originY));
            _get(Object.getPrototypeOf(MysteryBox.prototype), "spawnAbility", this).call(this, levelCoins, screenHeight / 8, screenHeight / 10, screenHeight / 80, true);
            ++coinsCollected;
            break;
          case "mushroom":
            levelSprites.push(new Mushroom(0, this.originX / blockSize, screenHeight / blockSize - this.originY / blockSize - 1.5));
            break;
          case "oneUp":
            levelSprites.push(new OneUp(0, this.originX / blockSize, screenHeight / blockSize - this.originY / blockSize - 1.5));
            break;
          default:
            console.log("nothing inside");
            break;
        }
      }
    }
  }]);

  return MysteryBox;
}(CollidableObject);

/* pipes that act just like a solidBlock however can interact with certain pipes
  to go to secret levels */


var Pipe = function (_CollidableObject4) {
  _inherits(Pipe, _CollidableObject4);

  function Pipe(section, blocksFromRight, blocksHigh) {
    _classCallCheck(this, Pipe);

    var x = section * screenWidth + blockSize * blocksFromRight;

    var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pipe).call(this, x, groundLevelY - blockSize * blocksHeigh, blockSize * 2, blockSize * blocksHeigh, [pipeHead, pipeBody]));

    _this11.amountOfBodies = blocksHeigh - 1;
    return _this11;
  }

  _createClass(Pipe, [{
    key: "draw",
    value: function draw() {
      drawImageOnCanvas(this.x, this.y, this.width, blockSize, this.image[0]);
      for (var i = 1; i <= this.amountOfBodies; i++) {
        drawImageOnCanvas(this.x, this.y + blockSize * i, this.width, blockSize, this.image[1]);
      }
    }
  }, {
    key: "collisionUp",
    value: function collisionUp() {
      //clear collisionUp
    }
  }, {
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this)) {
        if (mario.y + mario.height <= this.y + this.height / 10) {
          if (mario.x + mario.width >= this.x + this.width / 10 && mario.x <= this.x + this.width * 9 / 10) {
            _get(Object.getPrototypeOf(Pipe.prototype), "collisionDown", this).call(this);
          }
        } else if (mario.x + mario.width <= this.x + this.width / 2) {
          _get(Object.getPrototypeOf(Pipe.prototype), "collisionRight", this).call(this);
        } else if (mario.x + mario.width / 2 >= this.x + this.width) {
          _get(Object.getPrototypeOf(Pipe.prototype), "collisionLeft", this).call(this);
        }
      }
    }
  }]);

  return Pipe;
}(CollidableObject);

var GroundBlock = function (_CollidableObject5) {
  _inherits(GroundBlock, _CollidableObject5);

  function GroundBlock(x, y, image) {
    _classCallCheck(this, GroundBlock);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GroundBlock).call(this, x, y, blockSize, blockSize, image));
  }

  _createClass(GroundBlock, [{
    key: "collisionDown",
    value: function collisionDown() {
      _get(Object.getPrototypeOf(GroundBlock.prototype), "collisionDown", this).call(this);
      floorCollision = true;
    }
  }]);

  return GroundBlock;
}(CollidableObject);

var BackgroundBlock = function (_BasicObject3) {
  _inherits(BackgroundBlock, _BasicObject3);

  function BackgroundBlock(section, blocksFromRight, blocksAboveGround, image) {
    _classCallCheck(this, BackgroundBlock);

    var x = screenWidth * section + blockSize * blocksFromRight;
    var y = groundLevelY - blockSize * blocksAboveGround;
    return _possibleConstructorReturn(this, Object.getPrototypeOf(BackgroundBlock).call(this, x, y, blockSize, blockSize, image));
  }

  return BackgroundBlock;
}(BasicObject);

/* The main chatacter of the game Mario, he only extends
 form basic object due to him having quite specific methods */


var Mario = function (_BasicObject4) {
  _inherits(Mario, _BasicObject4);

  function Mario(x, y, width, height, image) {
    _classCallCheck(this, Mario);

    var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(Mario).call(this, x, y, width, height, image));

    _this14.velocity = 0;
    _this14.imageArray = marioTexture;
    _this14.gravity = screenHeight / 5000;
    _this14.movementSpeed = screenWidth / 300;
    _this14.jump = false;
    _this14.starMode = false;
    _this14.isBig = false;
    _this14.currentSpeed = 0;
    _this14.currentImage = 3;
    _this14.flipped = false;
    _this14.runningCounter = 0;
    _this14.crouching = false;
    return _this14;
  }

  _createClass(Mario, [{
    key: "draw",
    value: function draw() {
      if (mario.isBig) {
        marioSizingBig(this.image);
      } else {
        marioSizingSmall(this.image);
      }
      if (this.flipped) {
        drawFlippedImage(this.x, this.y, this.width, this.height, this.image);
      } else {
        _get(Object.getPrototypeOf(Mario.prototype), "draw", this).call(this);
      }
    }
  }, {
    key: "animateRunning",
    value: function animateRunning() {
      if (!this.jump) {
        for (var i = 0; i < Math.floor(Math.abs(this.currentSpeed)); i++) {
          if (this.runningCounter % 10 === 0) {
            this.image = this.imageArray[this.currentImage];
            if (this.currentImage < 5) {
              ++this.currentImage;
            } else {
              this.currentImage = 3;
            }
          }
          this.runningCounter++;
        }
      }
    }
  }, {
    key: "moveAction",
    value: function moveAction() {
      if (moveRight) {
        this.flipped = false;
        if (this.currentSpeed < this.movementSpeed) {
          if (this.currentSpeed >= 0) {
            this.animateRunning();
          } else {
            this.image = this.imageArray[2];
          }
          this.currentSpeed += this.movementSpeed / 25;
        } else {
          this.animateRunning();
          this.currentSpeed = this.movementSpeed;
        }
      }
      if (moveLeft) {
        this.flipped = true;
        if (this.currentSpeed > -this.movementSpeed) {
          if (this.currentSpeed <= 0) {
            this.animateRunning();
          } else {
            this.image = this.imageArray[2];
          }
          this.currentSpeed -= this.movementSpeed / 25;
        } else {
          this.animateRunning();
          this.currentSpeed = -this.movementSpeed;
        }
      }
      if (this.x >= 0 && this.x < screenWidth / 2) {
        this.x += this.currentSpeed;
      } else if (this.x + this.width / 2 > screenWidth / 2) {
        if (moveLeft) {
          this.flipped = true;
          if (this.currentSpeed <= 0) {
            this.x = screenWidth / 2 - this.width / 2;
          }
          this.x -= this.currentSpeed;
        } else {
          this.flipped = false;
        }
        xPositionInLevel += this.currentSpeed / 2;
      } else {
        this.flipped = false;
        this.currentSpeed = 0;
        this.x = 0;
      }
      if (!moveRight && !moveLeft && !lifeLost && !ending && !this.jump) {
        if (this.currentSpeed < this.movementSpeed / 25 && this.currentSpeed > -this.movementSpeed / 25) {
          this.currentSpeed = 0;
          this.image = this.imageArray[0];
        } else {
          if (this.currentSpeed >= this.movementSpeed / 25) {
            this.currentSpeed -= this.movementSpeed / 25;
            this.flipped = false;
            this.animateRunning();
          }
          if (this.currentSpeed <= -this.movementSpeed / 25) {
            this.currentSpeed += this.movementSpeed / 25;
            this.flipped = true;
            this.animateRunning();
          }
        }
      }
      if (mario.isBig && moveDown && this.currentSpeed === 0) {
        this.image = this.imageArray[8];
        this.crouching = true;
      }
      if (!moveDown && this.crouching) {
        console.log("run");
        this.crouching = false;
        mario.y -= blockSize * 5 / 8;
      }
    }
  }, {
    key: "jumpAction",
    value: function jumpAction() {
      //check if fall through floor
      if (floorCollision && this.jump) {
        this.velocity = 0;
        this.jump = false;
        this.y = groundLevelY - this.height;
      }
      if (moveUp && !this.jump) {
        moveUp = false;
        this.jump = true;
        this.velocity = screenHeight / 90;
      }
      if (this.jump) {
        this.image = this.imageArray[6];
        this.fallAction();
      }
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.y -= this.movementSpeed * 5;
      this.image = this.imageArray[1];
      lifeLost = true;
      gameplayFreeze = true;

      if (lives === 0) {
        setTimeout(function () {
          refreshMainScene();
          refreshLevelAndGoToScene("main");
          lifeLost = false;
          lives = 3;
        }, 1000);
      } else {
        setTimeout(function () {
          --lives;
          refreshLevelAndGoToScene("preLevel");
          lifeLost = false;
        }, 1000);
      }
    }
  }, {
    key: "fallAction",
    value: function fallAction() {
      this.y -= this.velocity;
      this.velocity -= this.gravity;
    }
  }]);

  return Mario;
}(BasicObject);

/* any sprite which the user does not control and can interact with mario
it also contains built in gravity  */


var Sprite = function (_BasicObject5) {
  _inherits(Sprite, _BasicObject5);

  function Sprite(section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image) {
    _classCallCheck(this, Sprite);

    var x = screenWidth * section + blockSize * blocksFromRight;
    var y = groundLevelY - blockSize * blocksAboveGround - height;

    var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this, x, y, width, height, image));

    _this15.velocity = 0;
    _this15.removed = false;
    _this15.blocksNotCollidedWith = [];
    _this15.movementSpeed = movementSpeed;
    _this15.collideVelocity = 0;
    return _this15;
  }

  _createClass(Sprite, [{
    key: "collision",
    value: function collision() {
      this.movementSpeed = -this.movementSpeed;
    }
  }, {
    key: "moveWithMario",
    value: function moveWithMario() {
      if (inScreen(this)) {
        this.originX -= this.movementSpeed;
      }
      _get(Object.getPrototypeOf(Sprite.prototype), "moveWithMario", this).call(this);
    }
  }, {
    key: "detectCollisionWithObject",
    value: function detectCollisionWithObject(object) {
      if (isColliding(object, this) && !this.spawning) {
        this.velocity = this.collideVelocity;
        if (this.y + this.height / 2 >= object.y + object.height / 3) {
          this.collision();
          if (this.x >= object.x + object.width / 2) {
            this.x = object.x + object.width;
          }
          if (this.x + this.width <= object.x + object.width / 2) {
            this.x = object.x - this.width;
          }
        } else {
          this.y = object.y - this.height;
        }
      } else {
        this.blocksNotCollidedWith.push(0);
      }
    }
  }, {
    key: "checkFall",
    value: function checkFall() {
      if (this.blocksNotCollidedWith.length == allCollidableObjects.length) {
        this.velocity += gravity;
        this.y += this.velocity;
      }
    }
  }, {
    key: "collisions",
    value: function collisions() {
      this.blocksNotCollidedWith = [];
      for (var j = 0; j < allCollidableObjects.length; j++) {
        if (allCollidableObjects[j] != this && !allCollidableObjects[j].removed) {
          this.detectCollisionWithObject(allCollidableObjects[j]);
        } else {
          this.blocksNotCollidedWith.push(0);
        }
      }
      this.checkFall();
    }
  }, {
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this)) {
        this.collisionWithMario();
      }
    }
  }]);

  return Sprite;
}(BasicObject);

var AnimatedSprite = function (_Sprite) {
  _inherits(AnimatedSprite, _Sprite);

  function AnimatedSprite(section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image) {
    _classCallCheck(this, AnimatedSprite);

    var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(AnimatedSprite).call(this, section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image[0]));

    _this16.counter = 0;
    _this16.imageArray = image;
    _this16.index = 0;
    return _this16;
  }

  _createClass(AnimatedSprite, [{
    key: "draw",
    value: function draw() {
      _get(Object.getPrototypeOf(AnimatedSprite.prototype), "draw", this).call(this);
      if (this.counter == this.animationFrequency) {
        if (this.index < this.imageArray.length - (this.excessAnimationImages + 1)) {
          this.index++;
        } else {
          this.index = 0;
        }
        this.counter = 0;
      } else {
        ++this.counter;
      }
    }
  }]);

  return AnimatedSprite;
}(Sprite);

/* Enemy Class extends from basic object because it is also quite
unique, it is the basis for all enemies in mario */


var Enemy = function (_AnimatedSprite) {
  _inherits(Enemy, _AnimatedSprite);

  function Enemy(section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image) {
    _classCallCheck(this, Enemy);

    var _this17 = _possibleConstructorReturn(this, Object.getPrototypeOf(Enemy).call(this, section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image));

    _this17.squashed = false;
    _this17.excessAnimationImages = 1;
    return _this17;
  }

  _createClass(Enemy, [{
    key: "draw",
    value: function draw() {
      if (!this.squashed) {
        this.image = this.imageArray[this.index];
      }
      _get(Object.getPrototypeOf(Enemy.prototype), "draw", this).call(this);
    }
  }, {
    key: "moveWithMario",
    value: function moveWithMario() {
      if (!this.squashed && inScreen(this)) {
        this.originX -= this.movementSpeed;
      }
      this.x = this.originX - xPositionInLevel;
    }
  }, {
    key: "squashSprite",
    value: function squashSprite() {
      this.squashed = true;
      this.y = this.y + this.height / 2;
      this.height = this.height / 2;
      this.image = this.imageArray[2];
      score += 100;
    }
  }, {
    key: "collisionWithMario",
    value: function collisionWithMario() {
      var _this18 = this;

      if (!mario.starMode) {
        if (!unhittable) {
          if (mario.y + mario.height <= this.y + this.height / 2) {
            mario.velocity = screenHeight / 150;
            this.squashSprite();
            setTimeout(function () {
              _this18.removed = true;
            }, 1000);
          } else {
            if (mario.isBig) {
              mario.imageArray = marioTexture;
              unhittable = true;
              mario.isBig = false;
              setTimeout(function () {
                unhittable = false;
              }, 3000);
            } else {
              mario.gameOver();
            }
          }
        }
      } else {
        mario.velocity = screenHeight / 80;
        this.squashSprite();
        setTimeout(function () {
          _this18.removed = true;
        }, 1000);
      }
    }
  }]);

  return Enemy;
}(AnimatedSprite);

/* An extention for enemy class so that it is easier to declare goomba
  enemies due to preset width, height and image*/


var Goomba = function (_Enemy) {
  _inherits(Goomba, _Enemy);

  function Goomba(section, blocksFromRight, blocksAboveGround, image) {
    _classCallCheck(this, Goomba);

    var width = blockSize;
    var height = goombaHeight;
    var movementSpeed = screenWidth / 1500;

    var _this19 = _possibleConstructorReturn(this, Object.getPrototypeOf(Goomba).call(this, section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image));

    _this19.animationFrequency = 16;
    return _this19;
  }

  return Goomba;
}(Enemy);

var Star = function (_AnimatedSprite2) {
  _inherits(Star, _AnimatedSprite2);

  function Star(section, blocksFromRight, blocksAboveGround) {
    _classCallCheck(this, Star);

    var _this20 = _possibleConstructorReturn(this, Object.getPrototypeOf(Star).call(this, section, blocksFromRight, blocksAboveGround, blockSize, blockSize, -screenWidth / 2000, starPower));

    _this20.spawning = true;
    _this20.excessAnimationImages = 0;
    _this20.animationFrequency = 4;
    _this20.collideVelocity = -screenHeight / 100;
    return _this20;
  }

  _createClass(Star, [{
    key: "draw",
    value: function draw() {
      _get(Object.getPrototypeOf(Star.prototype), "draw", this).call(this);
      this.image = this.imageArray[this.index];
    }
  }, {
    key: "moveWithMario",
    value: function moveWithMario() {
      if (!this.removed && inScreen(this)) {
        this.originX -= this.movementSpeed;
      }
      _get(Object.getPrototypeOf(Star.prototype), "moveWithMario", this).call(this);
    }
  }, {
    key: "checkFall",
    value: function checkFall() {
      if (this.blocksNotCollidedWith.length == allCollidableObjects.length) {
        this.velocity += gravity;
      }
      this.y += this.velocity;
    }
  }, {
    key: "collisionWithMario",
    value: function collisionWithMario() {
      mario.starMode = true;
      this.removed = true;
      setTimeout(function () {
        mario.starMode = false;
      }, 10000);
    }
  }]);

  return Star;
}(AnimatedSprite);

var Mushroom = function (_Sprite2) {
  _inherits(Mushroom, _Sprite2);

  function Mushroom(section, blocksFromRight, blocksAboveGround) {
    _classCallCheck(this, Mushroom);

    var _this21 = _possibleConstructorReturn(this, Object.getPrototypeOf(Mushroom).call(this, section, blocksFromRight, blocksAboveGround, blockSize, blockSize, -screenWidth / 2000, mushroom));

    _this21.spawning = true;
    return _this21;
  }

  _createClass(Mushroom, [{
    key: "moveWithMario",
    value: function moveWithMario() {
      if (!this.removed && inScreen(this)) {
        this.originX -= this.movementSpeed;
      }
      _get(Object.getPrototypeOf(Mushroom.prototype), "moveWithMario", this).call(this);
    }
  }, {
    key: "collisionWithMario",
    value: function collisionWithMario() {
      if (mario.isBig) {
        score += 1000;
      }
      mario.isBig = true;
      mario.image = bigMarioTexture[0];
      mario.imageArray = bigMarioTexture;
      mario.y -= blockSize;
      this.removed = true;
    }
  }]);

  return Mushroom;
}(Sprite);

var OneUp = function (_Mushroom) {
  _inherits(OneUp, _Mushroom);

  function OneUp(section, blocksFromRight, blocksAboveGround) {
    _classCallCheck(this, OneUp);

    var _this22 = _possibleConstructorReturn(this, Object.getPrototypeOf(OneUp).call(this, section, blocksFromRight, blocksAboveGround, blockSize, blockSize, -screenWidth / 2000, mushroom));

    _this22.image = oneUp;
    return _this22;
  }

  _createClass(OneUp, [{
    key: "collisionWithMario",
    value: function collisionWithMario() {
      this.removed = true;
      lives += 1;
    }
  }]);

  return OneUp;
}(Mushroom);

/* clouds object is just an object that moves in a single
direction and when it is out of the screen loops back to the other
side presenting the illusion there are passing clouds */


var MovingCloud = function (_BasicObject6) {
  _inherits(MovingCloud, _BasicObject6);

  function MovingCloud(x, y, width, height, movementSpeed, image) {
    _classCallCheck(this, MovingCloud);

    var _this23 = _possibleConstructorReturn(this, Object.getPrototypeOf(MovingCloud).call(this, x, y, width, height, image));

    _this23.movementSpeed = movementSpeed;
    return _this23;
  }

  _createClass(MovingCloud, [{
    key: "moveCloud",
    value: function moveCloud() {
      this.x += this.movementSpeed;
      if (this.x > screenWidth) {
        this.x = 0 - this.width;
        this.y = randomNum(screenHeight * 3 / 10, screenHeight / 10);
      }
    }
  }]);

  return MovingCloud;
}(BasicObject);

/* cloud object is just a background object which mario does not
  interact with, it is a class due to simplicity of creation and
  declaration in declaringFunctions.js. There is a small medium and big size */


var Cloud = function (_BasicObject7) {
  _inherits(Cloud, _BasicObject7);

  function Cloud(section, blocksFromRight, blocksAboveGround, size) {
    _classCallCheck(this, Cloud);

    var cloudImage;
    if (size == 1) {
      cloudImage = cloudTextures[0];
    } else if (size == 2) {
      cloudImage = cloudTextures[1];
    } else {
      cloudImage = cloudTextures[2];
    }
    var x = screenWidth * section + blockSize * blocksFromRight;
    var y = groundLevelY - blockSize * blocksAboveGround;
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Cloud).call(this, x, y, blockSize * (size + 1), blockSize * 3 / 2, cloudImage));
  }

  return Cloud;
}(BasicObject);

/* cloud object is just a background object which mario does not
  interact with, it is a class due to simplicity of creation and
  declaration in declaringFunctions.js. There is a small medium and big size */


var Bush = function (_BasicObject8) {
  _inherits(Bush, _BasicObject8);

  function Bush(section, blocksFromRight, size) {
    _classCallCheck(this, Bush);

    var bushImage;
    if (size == 1) {
      bushImage = bushTextures[0];
    } else if (size == 2) {
      bushImage = bushTextures[1];
    } else {
      bushImage = bushTextures[2];
    }
    var x = screenWidth * section + blockSize * blocksFromRight;
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Bush).call(this, x, groundLevelY - blockSize, blockSize * (size + 1), blockSize, bushImage));
  }

  return Bush;
}(BasicObject);

/* cloud object is just a background object which mario does not
  interact with, it is a class due to simplicity of creation and
  declaration in declaringFunctions.js. There is a big and small size*/


var Hill = function (_BasicObject9) {
  _inherits(Hill, _BasicObject9);

  function Hill(section, blocksFromRight, size) {
    _classCallCheck(this, Hill);

    var hillImage;
    var width;
    if (size == 1) {
      hillImage = hillSmallTexture;
      width = 3;
    } else {
      hillImage = hillLargeTexture;
      width = 5;
    }
    var x = screenWidth * section + blockSize * blocksFromRight;
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Hill).call(this, x, groundLevelY - blockSize * (size + 0.1875), blockSize * width, blockSize * (size + 0.1875), hillImage));
  }

  return Hill;
}(BasicObject);

/* text objected needed as object for simplicity and so it can be
  resized easier because it uses the screen change multipler to
  reposition and resize it as an array of objects */


var Text = function () {
  function Text(x, y, font, size, alignment, colour, text) {
    _classCallCheck(this, Text);

    this.x = x;
    this.y = y;
    this.font = font;
    this.width = size;
    this.alignment = alignment;
    this.colour = colour;
    this.text = text;
  }

  _createClass(Text, [{
    key: "draw",
    value: function draw() {
      drawText(this.x, this.y, this.font, this.width, this.alignment, this.colour, this.text);
    }
  }]);

  return Text;
}();

/* the ending pole mario jumps onto and ends the level begining the next level */


var EndingPole = function (_NormalBlock2) {
  _inherits(EndingPole, _NormalBlock2);

  function EndingPole(section, blocksFromRight, blocksAboveGround) {
    _classCallCheck(this, EndingPole);

    var image = endingPole;

    var _this27 = _possibleConstructorReturn(this, Object.getPrototypeOf(EndingPole).call(this, section, blocksFromRight, blocksAboveGround, image));

    _this27.width = blockSize / 2;
    _this27.height = blockSize * 9.5;
    _this27.flagXOrigin = _this27.x - blockSize * 0.75;
    _this27.flagYOrigin = _this27.y + blockSize * 0.5625;
    _this27.counter = 0;
    return _this27;
  }

  _createClass(EndingPole, [{
    key: "draw",
    value: function draw() {
      _get(Object.getPrototypeOf(EndingPole.prototype), "draw", this).call(this);
      if (!ending) {
        this.flagX = this.flagXOrigin;
        this.flagY = this.flagYOrigin;
      }
      drawImageOnCanvas(this.flagX, this.flagY, blockSize, blockSize, endingFlag);
    }
  }, {
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this)) {
        ending = true;
        mario.image = marioTexture[7];
        mario.x = this.x - blockSize * 10 / 16;
        if (this.flagY + blockSize < this.y + this.height) {
          this.flagY = this.flagYOrigin + screenHeight / 80 * this.counter;
          this.counter++;
        } else {
          this.flagY = this.y + this.height - blockSize;
        }
        if (mario.y + mario.height < this.y + this.height) {
          mario.y += screenHeight / 80;
        } else {
          mario.y = this.y + this.height - mario.height;
        }
      }
    }
  }]);

  return EndingPole;
}(NormalBlock);

var Debris = function (_BasicObject10) {
  _inherits(Debris, _BasicObject10);

  function Debris(x, y, width, height, image, dx, dy) {
    _classCallCheck(this, Debris);

    var _this28 = _possibleConstructorReturn(this, Object.getPrototypeOf(Debris).call(this, x, y, width, height, image));

    _this28.dx = dx;
    _this28.dy = dy;
    return _this28;
  }

  return Debris;
}(BasicObject);