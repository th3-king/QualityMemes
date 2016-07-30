//functions which are used to manipulate variables
//creates level interval if none exist for specific scene
function createLevelInterval(functionOfScene){
		if (levelInterval == undefined || levelInterval == 0){
	    levelInterval = setInterval(functionOfScene, 10);
	  }
}

//creates a multiplier for an object which is used for screen resizing
function createScreenChangeMultiplier(object) {
		object.multiplierX = object.x/screenWidth;
		object.multiplierY = object.y/screenHeight;
		object.multiplierWidth = object.width/screenWidth;
		object.multiplierHeight = object.height/screenHeight;
		object.multiplierMovementSpeed = object.movementSpeed/screenWidth;
		object.multiplierVelocity = object.velocity/screenHeight;
		object.multiplierGravity = object.gravity/screenHeight;
}

//creates a multiplier for an array of objects which is used for screen resizing
function createScreenChangeMultiplierArray(arrayOfObjects) {
	for(var i = 0; i < arrayOfObjects.length; i++){
		createScreenChangeMultiplier(arrayOfObjects[i]);
    arrayOfObjects[i].multiplierOriginX = arrayOfObjects[i].originX/screenWidth;
	}
}

/* uses multiplier created from createScreenChangeMultiplier
function and uses to reposition objects correctly */
function updateObjectToScreenChange(object) {
		object.x = object.multiplierX * screenWidth;
		object.y = object.multiplierY * screenHeight;
		object.width = object.multiplierWidth * screenWidth;
		object.height = object.multiplierHeight * screenHeight;
		object.movementSpeed = object.multiplierMovementSpeed*screenWidth;
		object.velocity = object.multiplierVelocity*screenHeight;
		object.gravity = object.multiplierGravity*screenHeight;
}

/*does the same as updateObjectToScreenChange, except for array of objects*/
function updateObjectToScreenChangeArray(arrayOfObjects) {
	for(var i = 0; i < arrayOfObjects.length; i++){
		updateObjectToScreenChange(arrayOfObjects[i]);
    arrayOfObjects[i].originX = arrayOfObjects[i].multiplierOriginX*screenWidth;
	}
}

/*checks if paused, if it is it freezes the animation and
draws the paused box waiting for user input*/
function pauseScene(){
	if(paused == true){
		gameplayFreeze = true;
	}
	if (gameplayFreeze == true) {
		drawPausedBox();
	}
}

/*clears the current interval and resets all necessary
 level variables so it can progress to next scene*/
function refreshLevelAndGoToScene(scene){
  clearInterval(levelInterval);
  levelInterval = 0;
  currentScene = scene;
  gameplayFreeze = false;
  levelLoaded = false;
  initialiseScene();
  for(var i = 0; i < levelEnemies.length; i ++){
    levelEnemies[i].removed = false;
    levelEnemies[i].squashed = false;
  }
}

/*specifically for main scene but stops main scene interval
allows you to move to new scene*/
function refreshMainScene(){
  clearInterval(startScreenInterval);
  startScreenInterval = 0;
  clouds = [];
  createdClouds = false;
}

function groundDetectCollision(){

}

/*detects if mario collides with enemy, it then checks whether he
got hit or squashed the enemy and does specific actions for either*/
function enemyDetectCollision(marioObject, enemyObject){
  if(marioObject.x + marioObject.width >= enemyObject.x && marioObject.x <= enemyObject.x + enemyObject.width && marioObject.y + marioObject.height >= enemyObject.y && marioObject.y <= enemyObject.y + enemyObject.height){
		if(mario.starMode == false){
	    if(marioObject.y + marioObject.height <= enemyObject.y + enemyObject.height/2){
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
		} else {
	      mario.velocity = screenHeight/80;
	      enemyObject.squashSprite();
	      setTimeout(function () {
	        removeSprite(enemyObject);
	      }, 1000);
		}
  }
}

function test(){
  console.log("test");
}

/*set's the curret sprite removed to true*/
function removeSprite(sprite){
  sprite.removed = true;
}

/*returns the X position used for the ground image so it moves
with the players movement*/
function groundXPosition() {
	return -(xPositionInLevel % (screenWidth/25));
};

function isColliding(objectOne, objectTwo) {
	if(objectOne.x + objectOne.width >= objectTwo.x && objectOne.x <= objectTwo.x + objectTwo.width && objectOne.y + objectOne.height >= objectTwo.y && objectOne.y <= objectTwo.y + objectTwo.height){
		return true;
	} else {
		return false;
	}
}
