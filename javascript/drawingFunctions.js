//random functions

function randomColour() {
  return "rgb(" + String(randomNum(255,0)) +"," + String(randomNum(255,0)) + "," + String(randomNum(255,0)) + ")";
}

function randomNum(topValue, bottomValue) {
  return Math.floor((Math.random() * topValue) + bottomValue);
}

//drawing functions

function drawCross(x, y, size, colour, thickness) {
	drawRect(x , y + size/2 - size/thickness, size, size*2/thickness, colour);
	drawRect(x + size/2 - size/thickness, y, size*2/thickness, size, colour);
}

function drawRect(x,y, xLength, yLength, colour) {
	canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  context.beginPath();
  context.rect(x, y, xLength, yLength);
  context.fillStyle = colour;
  context.closePath();
  context.fill();
}

function drawSolidSquare(x, y, size, colour) {
  drawRect(x,y,size,size,colour);
}

function drawSolidTriangle(x, y, size, colour) {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x + size, y);
  context.lineTo(x + size/2, y - size);
  context.fillStyle = colour;
  context.closePath();
  context.fill();
  }

function drawCircle(x, y, radius, colour){
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  context.beginPath();
	context.arc(x,y,radius,0, 2 * Math.PI);
  context.fillStyle = colour;
  context.closePath();
	context.fill();
}

function imageRepeat(image, x, y, width, height, xRepeat, yRepeat) {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	for (var dx = 0; dx < xRepeat; dx++) {
		for (var dy = 0; dy < yRepeat; dy++) {
			context.drawImage(image, x + dx*width, y + dy*height, width, height);
		}
	}
}

function drawImageOnCanvas(x, y, width, height, image) {
  canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.drawImage(image, x, y, width, height);
}

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
			cloudImage = cloudSmallTexture;
			width = screenWidth/9;
			height = screenWidth/13;
		} else {
			cloudImage = cloudLargeTexture;
			width = screenWidth/8;
			height = screenWidth/13;
		}
		clouds.push(new Cloud(x , y, width, height, movementSpeed, cloudImage));
	}
}

function clearScene(){
	drawRect(0, 0, screenWidth, screenHeight, "white");
}


function drawPausedBox (){
	drawImageOnCanvas(screenWidth/4, screenHeight/8, screenWidth/2, screenHeight/2, pauseBox);
	drawImageOnCanvas(screenWidth*5/16, screenHeight*7/32, screenWidth*3/8, screenHeight/14, gamePausedText);
	drawImageOnCanvas(screenWidth*3/8, screenHeight*5/16, screenWidth/4, screenHeight/20, resumeGameText);
	drawImageOnCanvas(screenWidth*3/8, screenHeight*3/8, screenWidth/4, screenHeight/20, levelSelectText);
	drawImageOnCanvas(screenWidth*3/8, screenHeight*7/16, screenWidth/4, screenHeight/20, mainMenuText);
}
