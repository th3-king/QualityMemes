//random functions

function randomColour() {
  return "rgb(" + String(randomNum(255,0)) +"," + String(randomNum(255,0)) + "," + String(randomNum(255,0)) + ")";
}

function randomNum(topValue, bottomValue) {
  return Math.floor((Math.random() * topValue) + bottomValue);
}

//drawing functions

function drawRect(x,y, xLength, yLength, colour) {
	var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.beginPath();
  context.rect(x, y, xLength, yLength);
  context.fillStyle = colour;
  context.closePath();
  context.fill();
}

function drawText(x, y ,font, size, alignment, colour, text){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.font = (size.toString() + "px " + font);
  context.fillStyle = colour;
  context.textAlign = alignment;
  context.fillText(text, x,y);
}

function imageRepeat(image, x, y, width, height, xRepeat, yRepeat) {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	for (var dx = 0; dx < xRepeat; dx++) {
		for (var dy = 0; dy < yRepeat; dy++) {
			context.drawImage(image, x + dx*width, y + dy*height, width, height);
		}
	}
}

function drawImageOnCanvas(x, y, width, height, image) {
  var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.drawImage(image, x, y, width, height);
}

//draws a flipped image and replaces it in same place as drawn normally
function drawFlippedImage(x, y, width, height, image){
  var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

  context.save();
  context.scale(-1, 1);
  context.drawImage(image, -x - width, y, width, height);
  context.restore();
}

//creates clouds used only in main scene for aesthetics
function createClouds(amountOfClouds) {
	var cloudType = 0;
	var cloudImage;
	var width = 0;
	var height = 0;

	for(var i = 0; i <= amountOfClouds-1; i++){
		cloudType = randomNum(2,1);
		var x = randomNum(screenWidth*4/5, screenWidth/5);
		var y = randomNum(screenHeight*3/10, screenHeight/10);
		var movementSpeed = randomNum(screenWidth/500, screenWidth/550)+0.2;

		if (cloudType == 1) {
			cloudImage = cloudTextures[0];
			width = screenWidth/9;
			height = screenWidth/13;
		} else {
			cloudImage = cloudTextures[1];
			width = screenWidth/8;
			height = screenWidth/13;
		}
		clouds.push(new MovingCloud(x , y, width, height, movementSpeed, cloudImage));
	}
}

//simple function for clearing screen
function clearScene(){
	drawRect(0, 0, screenWidth, screenHeight, "white");
}

//draws paused box when game is paused in level
function drawPausedBox() {
	drawImageOnCanvas(screenWidth/4, screenHeight/8, screenWidth/2, screenHeight/2, pauseBox);
	drawImageOnCanvas(screenWidth*5/16, screenHeight*7/32, screenWidth*3/8, screenHeight/14, gamePausedText);
	drawImageOnCanvas(screenWidth*3/8, screenHeight*5/16, screenWidth/4, screenHeight/20, resumeGameText);
	drawImageOnCanvas(screenWidth*3/8, screenHeight*3/8, screenWidth/4, screenHeight/20, mainMenuText);
}

//draws the top bar of text without time number used for preLevel and main scene
function drawTopBar(colour) {
  drawText(screenWidth/50, screenHeight/18 ,"emulogic", screenWidth/50 , "left", colour, "Mario ");
  drawText(screenWidth/50, screenHeight*2/18 ,"emulogic", screenWidth/50 , "left", colour, score.toString());
  drawText(screenWidth*3/10, screenHeight*2/18 ,"emulogic", screenWidth/50 , "left", colour, "x" + coinsCollected.toString());
  drawImageOnCanvas(screenWidth*3/10 - blockSize, screenHeight*2/18 - blockSize*5/6, blockSize*2/3, blockSize, coin[0]);
  drawText(screenWidth*3/5, screenHeight/18 ,"emulogic", screenWidth/50 , "center", colour, "world");
  drawText(screenWidth*3/5, screenHeight*2/18 ,"emulogic", screenWidth/50 , "center", colour, "1-" + level.toString());
  drawText(screenWidth*49/50, screenHeight/18 ,"emulogic", screenWidth/50 , "right", colour, "Time");
}
