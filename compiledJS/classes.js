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

  function Coin(x, y) {
    _classCallCheck(this, Coin);

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

var Star = function (_AnimatedOneTimeObjec2) {
  _inherits(Star, _AnimatedOneTimeObjec2);

  function Star(x, y) {
    _classCallCheck(this, Star);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Star).call(this, x, y, starPower, 4));

    _this4.width = blockSize * 14 / 16;
    _this4.height = blockSize / 16;
    return _this4;
  }

  _createClass(Star, [{
    key: "isCollected",
    value: function isCollected() {
      mario.starMode = true;
      setTimeout(function () {
        mario.starMode = false;
      }, 10000);
    }
  }]);

  return Star;
}(AnimatedOneTimeObject);
/* any object which can be collided into by mario
  (includes spawnAbility and popUpBlock because it is used
   in MysteryBox and NormalBlock) */


var CollidableObject = function (_BasicObject2) {
  _inherits(CollidableObject, _BasicObject2);

  function CollidableObject(x, y, width, height, image) {
    _classCallCheck(this, CollidableObject);

    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(CollidableObject).call(this, x, y, width, height, image));

    _this5.removed = false;
    _this5.popUpInterval = 0;
    _this5.spawnAbilityInterval = 0;
    return _this5;
  }

  _createClass(CollidableObject, [{
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this) == true) {
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
      var _this6 = this;

      var peaked = false;
      var object = objectArray[objectArray.length - 1];
      if (this.spawnAbilityInterval == undefined || this.spawnAbilityInterval == 0) {
        this.spawnAbilityInterval = setInterval(function () {
          if (object.y > object.originY - peakHeight && peaked == false) {
            object.y -= speed;
          } else {
            peaked = true;
          }
          if (peaked == true) {
            object.y += speed;
          }
          if (peaked == true && object.y > object.originY - rest) {
            object.y = object.originY - rest;
            clearInterval(_this6.spawnAbilityInterval);
            _this6.spawnAbilityInterval = 0;
            if (disappear == true) {
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
      var _this7 = this;

      var peaked = false;
      if (this.popUpInterval == undefined || this.popUpInterval == 0) {
        this.popUpInterval = setInterval(function () {
          if (_this7.y > _this7.originY - screenHeight / 100 && peaked == false) {
            _this7.y -= screenHeight / 500;
          } else {
            peaked = true;
          }
          if (peaked == true) {
            _this7.y += screenHeight / 500;
          }
          if (peaked == true && _this7.y > _this7.originY) {
            _this7.y = _this7.originY;
            clearInterval(_this7.popUpInterval);
            _this7.popUpInterval = 0;
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
      if (mario.isBig == false) {
        _get(Object.getPrototypeOf(NormalBlock.prototype), "popUpBlock", this).call(this);
      } else {
        console.log("break Block");
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

/* any block which mario can interact with and can contain an ability
  either mushroom, coin, life or fire flower */


var MysteryBox = function (_CollidableObject2) {
  _inherits(MysteryBox, _CollidableObject2);

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
      if (this.hit == false) {
        ++this.abilitiesAlreadySpawned;
        if (this.abilitiesAlreadySpawned == this.amountOfAbilities) {
          this.hit = true;
          this.image = usedBox;
        }
        _get(Object.getPrototypeOf(MysteryBox.prototype), "popUpBlock", this).call(this);
        switch (this.inside) {
          case "star":
            mario.starMode = true;
            setTimeout(function () {
              starMode = false;
            }, 20000);
            break;
          case "coin":
            levelCoins.push(new Coin(this.originX + this.width / 2 - screenHeight * 25 / 1056, this.originY));
            _get(Object.getPrototypeOf(MysteryBox.prototype), "spawnAbility", this).call(this, levelCoins, screenHeight / 8, screenHeight / 10, screenHeight / 80, true);
            ++coinsCollected;
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


var Pipe = function (_CollidableObject3) {
  _inherits(Pipe, _CollidableObject3);

  function Pipe(x, blocksHeigh) {
    _classCallCheck(this, Pipe);

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
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this) == true) {
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

var GroundBlock = function (_CollidableObject4) {
  _inherits(GroundBlock, _CollidableObject4);

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

/* The main chatacter of the game Mario, he only extends
 form basic object due to him having quite specific methods */


var Mario = function (_BasicObject3) {
  _inherits(Mario, _BasicObject3);

  function Mario(x, y, width, height, image) {
    _classCallCheck(this, Mario);

    var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(Mario).call(this, x, y, width, height, image));

    _this13.velocity = 0;
    _this13.gravity = screenHeight / 5000;
    _this13.movementSpeed = screenWidth / 300;
    _this13.jump = false;
    _this13.starMode = false;
    _this13.isBig = false;
    _this13.currentSpeed = 0;
    _this13.currentImage = 3;
    _this13.flipped = false;
    _this13.runningCounter = 0;
    return _this13;
  }

  _createClass(Mario, [{
    key: "draw",
    value: function draw() {
      marioSizing(this.image);
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
          if (this.runningCounter % 10 == 0) {
            this.image = marioTexture[this.currentImage];
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
            this.image = marioTexture[2];
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
            this.image = marioTexture[2];
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
          this.image = marioTexture[0];
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
    }
  }, {
    key: "jumpAction",
    value: function jumpAction() {
      //check if fall through floor
      if (floorCollision == true && this.jump == true) {
        this.velocity = 0;
        this.jump = false;
        this.y = screenHeight * 4 / 5;
      }

      if (moveUp == true && this.jump == false) {
        moveUp = false;
        this.jump = true;
        this.velocity = screenHeight / 90;
      }

      if (this.jump == true) {
        this.image = marioTexture[6];
        this.fallAction();
      }
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.y -= this.movementSpeed * 5;
      this.image = marioTexture[1];
      lifeLost = true;
      gameplayFreeze = true;

      if (lives == 0) {
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


var Sprite = function (_BasicObject4) {
  _inherits(Sprite, _BasicObject4);

  function Sprite() {
    _classCallCheck(this, Sprite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).apply(this, arguments));
  }

  _createClass(Sprite, [{
    key: "detectCollisionWithObject",
    value: function detectCollisionWithObject(object) {
      if (isColliding(object, this)) {
        this.velocity = 0;
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
        if (allCollidableObjects[j] != this) {
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

/* Enemy Class extends from basic object because it is also quite
unique, it is the basis for all enemies in mario */


var Enemy = function (_Sprite) {
  _inherits(Enemy, _Sprite);

  function Enemy(section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image) {
    _classCallCheck(this, Enemy);

    var x = screenWidth * section + blockSize * blocksFromRight;
    var y = groundLevelY - blockSize * blocksAboveGround - height;

    var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(Enemy).call(this, x, y, width, height, image[0]));

    _this15.imageArray = image;
    _this15.movementSpeed = movementSpeed;
    _this15.velocity = 0;
    _this15.index = 0;
    _this15.squashed = false;
    _this15.removed = false;
    _this15.counter = 0;
    _this15.blocksNotCollidedWith = [];
    return _this15;
  }

  _createClass(Enemy, [{
    key: "draw",
    value: function draw() {
      if (this.squashed == false) {
        this.image = this.imageArray[this.index];
      }
      _get(Object.getPrototypeOf(Enemy.prototype), "draw", this).call(this);
      if (this.counter == 16) {
        if (this.index < this.imageArray.length - 2) {
          this.index++;
        } else {
          this.index = 0;
        }
        this.counter = 0;
      } else {
        ++this.counter;
      }
    }
  }, {
    key: "moveWithMario",
    value: function moveWithMario() {
      if (!this.squashed && inScreen(this)) {
        this.originX -= this.movementSpeed;
      }
      _get(Object.getPrototypeOf(Enemy.prototype), "moveWithMario", this).call(this);
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
      var _this16 = this;

      if (mario.starMode == false) {
        if (mario.y + mario.height <= this.y + this.height / 2) {
          mario.velocity = screenHeight / 150;
          this.squashSprite();
          setTimeout(function () {
            _this16.removed = true;
            for (var j = 0; j < allCollidableObjects.length; j++) {
              if (allCollidableObjects[j] == _this16) {
                var index = allCollidableObjects.indexOf(_this16);
                if (index > -1) {
                  allCollidableObjects.splice(index, 1);
                }
              }
            }
          }, 1000);
        } else {
          mario.gameOver();
        }
      } else {
        mario.velocity = screenHeight / 80;
        this.squashSprite();
        setTimeout(function () {
          _this16.removed = true;
        }, 1000);
      }
    }
  }, {
    key: "collision",
    value: function collision() {
      this.movementSpeed = -this.movementSpeed;
    }
  }]);

  return Enemy;
}(Sprite);

/* An extention for enemy class so that it is easier to declare goomba
  enemies due to preset width, height and image*/


var Goomba = function (_Enemy) {
  _inherits(Goomba, _Enemy);

  function Goomba(section, blocksFromRight, blocksAboveGround) {
    _classCallCheck(this, Goomba);

    var width = blockSize;
    var height = goombaHeight;
    var image = goomba;
    var movementSpeed = screenWidth / 1500;
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Goomba).call(this, section, blocksFromRight, blocksAboveGround, width, height, movementSpeed, image));
  }

  return Goomba;
}(Enemy);

/* clouds object is just an object that moves in a single
direction and when it is out of the screen loops back to the other
side presenting the illusion there are passing clouds */


var MovingCloud = function (_BasicObject5) {
  _inherits(MovingCloud, _BasicObject5);

  function MovingCloud(x, y, width, height, movementSpeed, image) {
    _classCallCheck(this, MovingCloud);

    var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(MovingCloud).call(this, x, y, width, height, image));

    _this18.movementSpeed = movementSpeed;
    return _this18;
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


var Cloud = function (_BasicObject6) {
  _inherits(Cloud, _BasicObject6);

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


var Bush = function (_BasicObject7) {
  _inherits(Bush, _BasicObject7);

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


var Hill = function (_BasicObject8) {
  _inherits(Hill, _BasicObject8);

  function Hill(section, blocksFromRight, size) {
    _classCallCheck(this, Hill);

    var hillImage;
    if (size == 1) {
      hillImage = hillSmallTexture;
      var width = 3;
    } else {
      hillImage = hillLargeTexture;
      var width = 5;
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

    var _this22 = _possibleConstructorReturn(this, Object.getPrototypeOf(EndingPole).call(this, section, blocksFromRight, blocksAboveGround, image));

    _this22.width = blockSize / 2;
    _this22.height = blockSize * 9.5;
    return _this22;
  }

  _createClass(EndingPole, [{
    key: "draw",
    value: function draw() {
      _get(Object.getPrototypeOf(EndingPole.prototype), "draw", this).call(this);
      if (!ending) {
        this.flagX = this.x - blockSize * 0.75;
        this.flagY = this.y + blockSize * 0.5625;
      }
      drawImageOnCanvas(this.flagX, this.flagY, blockSize, blockSize, endingFlag);
    }
  }, {
    key: "detectCollisionWithMario",
    value: function detectCollisionWithMario() {
      if (isColliding(mario, this) == true) {
        ending = true;
        mario.image = marioTexture[7];
        mario.x = this.x - blockSize * 10 / 16;
        if (this.flagY + blockSize < this.y + this.height) {
          this.flagY += screenHeight / 80;
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