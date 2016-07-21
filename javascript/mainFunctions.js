function createLevelInterval(functionOfScene){
		if (levelInterval == undefined || levelInterval == 0){
	    levelInterval = setInterval(functionOfScene, 15);
	  }
}

function createGround() {
	var groundBlocks = []
	var size = screenHeight/8
	for (var dx = 0; dx < screenWidth/(screenHeight/8) + 1; dx++){
		for (var dy = 0; dy < 2; dy++) {
			groundBlocks.push(new Block(0 + dx*size, screenHeight*6/8 + dy*size, size, size, groundTexture));
		};
	};
	return groundBlocks;
}

function createScreenChangeMultiplier(object) {
		object.multiplierX = object.x/screenWidth;
		object.multiplierY = object.y/screenHeight;
		object.multiplierWidth = object.width/screenWidth;
		object.multiplierHeight = object.height/screenHeight;
		object.multiplierMovementSpeed = object.movementSpeed/screenWidth;
		object.multiplierVelocity = object.velocity/screenHeight;
		object.multiplierGravity = object.gravity/screenHeight;
}

function createScreenChangeMultiplierArray(arrayOfObjects) {
	for(var i = 0; i < arrayOfObjects.length; i++){
		createScreenChangeMultiplier(arrayOfObjects[i]);
    arrayOfObjects[i].multiplierOriginX = arrayOfObjects[i].originX/screenWidth;
	}
}

function updateObjectToScreenChange(object) {
		object.x = object.multiplierX * screenWidth;
		object.y = object.multiplierY * screenHeight;
		object.width = object.multiplierWidth * screenWidth;
		object.height = object.multiplierHeight * screenHeight;
		object.movementSpeed = object.multiplierMovementSpeed*screenWidth;
		object.velocity = object.multiplierVelocity*screenHeight;
		object.gravity = object.multiplierGravity*screenHeight;
}

function updateObjectToScreenChangeArray(arrayOfObjects) {
	for(var i = 0; i < arrayOfObjects.length; i++){
		updateObjectToScreenChange(arrayOfObjects[i]);
    arrayOfObjects[i].originX = arrayOfObjects[i].multiplierOriginX*screenWidth;
	}
}

function pauseScene(){
	if(paused == true){
		gameplayFreeze = true;
	}
	if (gameplayFreeze == true) {
		drawPausedBox();
	}
}

function refreshLevelAndGoToScene(scene){
  clearInterval(levelInterval);
  levelInterval = 0;
  currentScene = scene;
  gameplayFreeze = false;
  levelLoaded = false;
  initialiseScene();
  for(var i = 0; i < levelSprites.length; i ++){
    levelSprites[i].removed = false;
    levelSprites[i].squashed = false;
  }
}

function refreshMainScene(){
  clearInterval(startScreenInterval);
  startScreenInterval = 0;
  clouds = [];
  createdClouds = false;
}

function groundDetectCollision(){

}

function enemyDetectCollision(marioObject, enemyObject){
  if(marioObject.x + marioObject.width >= enemyObject.x && marioObject.x <= enemyObject.x + enemyObject.width && marioObject.y + marioObject.height >= enemyObject.y && marioObject.y <= enemyObject.y + enemyObject.height){
    if(marioObject.y + marioObject.height <= enemyObject.y + enemyObject.height/8){
      mario.velocity = screenHeight/80;
      enemyObject.squashSprite();
      setTimeout(function () {
        removeSprite(enemyObject);
      }, 1000);
    } else {
      gameplayFreeze = true;
      mario.gameOver();
      setTimeout(function (){
        refreshLevelAndGoToScene("levelSelect");
      }, 1000);
    }
  }
}

function test(){
  console.log("test");
}

function removeSprite(sprite){
  sprite.removed = true;
}

function groundXPosition() {
	return -(xPositionInLevel % (screenHeight/8));
};

function declareLevelBlocks() {
	var BlocksArray = [];
	for (var i = 0; i < groundBlocks.length; i++){
		BlocksArray.push(groundBlocks[i]);
	};
	for (var i = 0; i < levelObstacles.length; i++){
		BlocksArray.push(levelObstacles[i]);
	};
	return BlocksArray;
}
