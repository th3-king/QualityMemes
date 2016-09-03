//functions which are used to manipulate variables

//checks device and changes html file accordingly
function browserDeviceCheck(){
	var isChromium = window.chrome,
	    winNav = window.navigator,
	    vendorName = winNav.vendor,
	    isOpera = winNav.userAgent.indexOf("OPR") > -1,
	    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
	    isIOSChrome = winNav.userAgent.match("CriOS"),
			prePathname = "/Users/Dan/Desktop/@ll%20Programs/Html/Canvas%20tasks/projectMario/";

	if(isIOSChrome){
	  // is Google Chrome on IOS
		if(window.location.pathname != prePathname + "marioMobile.html"){
			window.location = "marioMobile.html";
		}
	} else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
	  // is Google Chrome
		if(window.location.pathname != prePathname + "mario.html"){
			window.location = "mario.html";
		}
	} else {
	  // not Google Chrome
		if(window.location.pathname != prePathname + "marioEs5.html") {
		 	window.location = "marioEs5.html";
	 	}
	}
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	// Take the user to a different screen here.
		if(window.location.pathname != prePathname + "marioMobile.html"){
			window.location = "marioMobile.html";
		}
	}
}

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
		arrayOfObjects[i].multiplierOriginY = arrayOfObjects[i].originY/screenHeight;
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
		arrayOfObjects[i].originY = arrayOfObjects[i].multiplierOriginY*screenHeight;
	}
}

/*checks if paused, if it is it freezes the animation and
draws the paused box waiting for user input*/
function pauseScene(){
	if(paused == true){
		gameplayFreeze = true;
		pausedBox = true;
	}
	if(pausedBox){
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

/*positions the mobile buttons on the mobile devices
	will only run if running marioMobile.html*/
function mobileButtons(){
	setSizeOfId("controlButtons", canvas.width, window.innerHeight/4, 'px');
	setSizeOfId("movementControls", 25, 100, '%');
	setSizeOfId("up", 100/3, 100/3 , '%');
	setSizeOfId("down", 100/3, 100/3, '%');
	setSizeOfId("left", 100/3, 100/3, '%');
	setSizeOfId("right", 100/3, 100/3, '%');
	setSizeOfId("actionControls", 25, 100, '%');
	setSizeOfId("aButton", 100/3, 100/3, '%');
	setSizeOfId("bButton", 100/3, 100/3, '%');

	setPositionOfId("movementControls", 0, 0, '%');
	setPositionOfId("up", 100/3, 0, '%');
	setPositionOfId("down", 100/3, 200/3, '%');
	setPositionOfId("left", 0, 100/3, '%');
	setPositionOfId("right", 200/3, 100/3, '%');
	setPositionOfId("actionControls", 75, 0, '%');
	setPositionOfId("aButton", 100/6, 100/6, '%');
	setPositionOfId("bButton", 300/6, 300/6, '%');
}

/* just a function to simplify typing when setting sizes for
	html elements with Id's*/
function setSizeOfId(id, width, height, unit){
	document.getElementById(id).style.width = Math.floor(width) + unit;
	document.getElementById(id).style.height = Math.floor(height) + unit;
}

/* just a function to simplify typing when setting positions for
	html elements with Id's */
function setPositionOfId(id, left, top, unit){
	document.getElementById(id).style.left = Math.floor(left) + unit;
	document.getElementById(id).style.top = Math.floor(top) + unit;
}

/* function which returns true or false if two objects are colliding */
function isColliding(objectOne, objectTwo) {
	if(objectOne.x + objectOne.width >= objectTwo.x && objectOne.x <= objectTwo.x + objectTwo.width && objectOne.y + objectOne.height >= objectTwo.y && objectOne.y <= objectTwo.y + objectTwo.height){
		return true;
	} else {
		return false;
	}
}

/* function for creating ground blocks. Note: if you use this function
 	use it in the declaringFunctions.js file and then run that function
	to declare it BEFORE the level begins*/
function createGroundBlocks(startingX, finishingX, startingY, finishingY){
	for(var x = startingX; x < finishingX; x++){
		for(var y = startingY; y < finishingY; y++){
			levelGround.push(new GroundBlock(0 + blockSize*x, groundLevelY + blockSize*y, groundTexture));
		}
	}
}

/* checks to see if the object is currently within the users visible screen
	can be used to reduce amount of processing needed due to less statements run
 	also can be used to run certain functions only when a object enters the
	visible screen */
function inScreen(object){
	if(object.x + object.width > 0 && object.x < screenWidth){
		return true;
	} else {
		return false;
	}
}

/* a handy function used to simplify drawing an array of objects */
function drawArray(arrayOfObjects){
	for(var i = 0; i < arrayOfObjects.length; i++){
		if (inScreen(arrayOfObjects[i]) == true){
    	arrayOfObjects[i].draw();
		}
  }
}

/* checks to see if the array of collidable blocks is colliding with mario
 	if it isn't it appends the array of "non collisions" this is used */
function collisionWithArrayOfBlocks(arrayOfNonCollisions, arrayOfCollidableBlocks){
	for(var i = 0; i < arrayOfCollidableBlocks.length; i++){
		arrayOfCollidableBlocks[i].moveWithMario();
		if(isColliding(mario, arrayOfCollidableBlocks[i]) == true){
			arrayOfCollidableBlocks[i].detectCollisionWithMario();
		} else {
			arrayOfNonCollisions.push(false);
		}
	}
}

/* creates a row of blocks (horizontal) above the ground which mario can stand on
 	they are of class NormalBlock*/
function createBlockPlatform(section, blocksFromRight, blocksUp, image, length){
	for(var i = 0; i < length; i++){
		levelBlocks.push(new NormalBlock(section, blocksFromRight + i, blocksUp, image));
	}
}

/* create a stack of blocks (vertical) above the ground which mario can stand on
	they are of class SolidBlock*/
function createBlockStack(section, blocksFromRight, blocksUp, image, length){
	for(var i = 0; i < length; i++){
		levelBlocks.push(new SolidBlock(section, blocksFromRight, blocksUp + i, image));
	}
}

/* create a staircase of blocks ASCENDING from left to right which mario can stand on
	they are of class SolidBlock*/
function createBlockStairAscendingFromLeft(section, blocksFromRight, blocksUp, image, height){
	for(var h = 0; h < height; h++){
		createBlockStack(section, blocksFromRight + h, blocksUp, image, h + 1);
	}
}

/* create a staircase of blocks DESCENDING from left to right which mario can stand on
	they are of class SolidBlock*/
function createBlockStairAscendingFromRight(section, blocksFromRight, blocksUp, image, height){
	for(var h = height - 1; h >= 0; h--){
		createBlockStack(section, blocksFromRight + h, blocksUp, image, height - h);
	}
}

/* decrements time every half a second (due to scene running every 10 milliseconds
	by modding counter by 50 it is every half second) */
function updateTime(){
	if((counter % 50) == 0){
		gameTime -= 1;
	}
	++counter
}

/* function which analyses what image mario is currently and changes the
 dimensions accordingly. This is due to marios different images having different
 dimensions so when it changes the dimensions of mario it doesn't distort image and
 makes collsion detection more accurate */
function marioSizing(image){
	switch (image) {
		case marioTexture[0]:
			setMarioSize(13, 16);
			break;
		case marioTexture[1]:
			setMarioSize(15, 14);
			break;
		case marioTexture[2]:
			setMarioSize(14, 16);
			break;
		case marioTexture[3]:
			setMarioSize(12, 16);
			break;
		case marioTexture[4]:
			setMarioSize(14, 15);
			break;
		case marioTexture[5]:
			setMarioSize(16, 16);
			break;
		case marioTexture[6]:
			setMarioSize(17, 16);
			break;
		case marioTexture[6]:
			setMarioSize(13, 15);
			break;
		default:
			setMarioSize(13, 16);
			break;
	}
}

/* just a function to simplify the sizing of mario in marioSizing function */
function setMarioSize(pixelsWide, pixelsHigh){
	mario.height = blockSize*pixelsHigh/16;
	mario.width = blockSize*pixelsWide/16;
}

function imageSourceSetter(imageArray, imagePrefix, amount){
	for(var i = 0; i < amount; i++){
		imageArray[i].src = imagePrefix + (i+1).toString() + ".png"
	}
}
