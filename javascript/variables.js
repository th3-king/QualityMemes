//global variables
//initialisers
var currentScene = "main";
var screenWidth = 0;
var screenHeight = 0;
var levelInterval;
var startScreenInterval;
var paused = false;
var createdClouds = false;
var initialRun = true;
var gameplayFreeze = false;
window.mario = new Mario(screenHeight/15, screenHeight*3/5, screenHeight*1/10, screenHeight*3/20, screenWidth/200, marioTexture);

//audio setup
function play() {
	document.getElementById('themeSong').play();
}
function pause() {
	document.getElementById('themeSong').pause();
}

//arrays
var levelSprites = [];
var levelObstacles = [];
var levelBlocks = [];
var clouds = [];
var groundBlocks = [];


//game properties
var levelLoaded = false;
var xPositionInLevel = 0;
var xPositionInLevelMultiplier = 0;
var lives = 3;
var moveLeft = false;
var moveRight = false;
var moveDown = false;
var moveUp = false;

//Declare Characters for level
function declareLevelOneSprites() {
	if (levelLoaded == false){
		levelSprites = [];
		levelSprites[0] = new Sprite(screenWidth*3/4, screenHeight*2/3, screenHeight/12, screenHeight/12, screenWidth/500, gooba);
	};
};

function declareLevelOneBlocks() {
	if (levelLoaded == false){
		levelObstacles = [];
		levelObstacles[0] = new Block(screenWidth * 1.5, screenHeight*5/8, screenHeight/8, screenHeight/8, groundTexture);
		groundBlocks = [];
		groundBlocks = createGround();
	};
};
