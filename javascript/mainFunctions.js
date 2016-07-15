function createLevelInterval(functionOfScene){
		if (levelInterval == undefined || levelInterval == 0){
	    levelInterval = setInterval(functionOfScene, 15);
	  }
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
}

function groundDetectCollision(){

}

function enemyDetectCollision(objectOne, objectTwo){
  if(objectOne.x + objectOne.width >= objectTwo.x && objectOne.x <= objectTwo.x + objectTwo.width
  && objectOne.y + objectOne.height >= objectTwo.y && objectOne.y <= objectTwo.y + objectTwo.height){
    if(objectOne.y + objectOne.height <= objectTwo.y + objectTwo.height/8){
      mario.velocity = screenHeight/80;
    } else {
      refreshLevelAndGoToScene("levelSelect");
    }
  }
}
