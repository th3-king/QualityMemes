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

var groundLevelY;
var blockSize;
var goombaSize;
var hillLargeWidth;
var hillLargeHeight;
var hillSmallWidth;
var hillSmallHeight;

function initialiseScreenSizeRelatedElements(){
	groundLevelY = screenHeight*67/75;
	blockSize = screenHeight*16/225;
	goombaSize = screenHeight*32/675;
	hillLargeWidth = screenHeight/3;
	hillLargeHeight = screenHeight/8;
	hillSmallWidth = screenHeight/4;
	hillSmallHeight = screenHeight/16;
}
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
var levelBlocks = [];
var levelCoins = [];
var levelBackgroundObjects = [];
var clouds = [];
var blocksNotCollidedWith = [];

//game properties
var levelLoaded = false;
var xPositionInLevel = 0;
var xPositionInLevelMultiplier = 0;
var lives = 3;
var moveLeft = false;
var moveRight = false;
var moveDown = false;
var moveUp = false;
var score = 0;

//Declare Characters for level
function declareLevelOneObjects() {
	if (levelLoaded == false){
		levelSprites = [];
		levelSprites[0] = new Enemy(screenWidth*3/4, (groundLevelY - goombaSize), goombaSize, goombaSize, screenWidth/1000, goomba);

		levelBlocks = [];
		levelBlocks[0] = new CollidableObject(screenWidth - blockSize, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock);
		levelBlocks[1] = new CollidableObject(screenWidth - blockSize*2, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox);
		levelBlocks[2] = new CollidableObject(screenWidth - blockSize*3, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock);
		levelBlocks[3] = new CollidableObject(screenWidth - blockSize*4, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox);
		levelBlocks[4] = new CollidableObject(screenWidth - blockSize*5, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock);
		levelBlocks[5] = new CollidableObject(screenWidth - blockSize*9, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox);
		levelBlocks[6] = new CollidableObject(screenWidth - blockSize*3, groundLevelY - blockSize*8, blockSize, blockSize, mysteryBox);

		levelCoins = [];
		//levelCoins[0] = new Coin(screenWidth*7/8, screenHeight/3);
		levelCoins[0] = new Coin(screenWidth*6/8, screenHeight/3);
		levelCoins[1] = new Coin(screenWidth*5/8, screenHeight/3);
		levelCoins[2] = new Coin(screenWidth*4/8, screenHeight/3);

		initialiseBackgroundLevelOne();
	};
};
