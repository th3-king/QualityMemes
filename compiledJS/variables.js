"use strict";

//global variables
//initialisers
var currentScene = "main";
var screenWidth = 0;
var screenHeight = 0;
var levelInterval;
var startScreenInterval;
var paused = false,
    pausedBox = false;
var createdClouds = false;
var initialRun = true;
var gameplayFreeze = false;
var floorCollision = false;
var lifeLost = false,
    ending = false;
var backgroundColour = "#4B7DFA",
    textColour = "black";

//screen size related variables being declared so they can be used globally
var groundLevelY;
var blockSize;
var goombaHeight;
var hillLargeWidth, hillLargeHeight, hillSmallWidth, hillSmallHeight;
var cloudSmallWidth, cloudSmallHeight, cloudMediumWidth, cloudMediumHeight;
var gravity;

/*  his needs to be seperate to the first variable declaration due to the screen
 	height/width constantly changing */
function initialiseScreenSizeRelatedElements() {
	groundLevelY = screenHeight * 67 / 75;
	blockSize = screenWidth / 25;
	goombaHeight = blockSize * 15 / 16;
	hillLargeWidth = screenHeight / 3;
	hillLargeHeight = screenHeight / 8;
	hillSmallWidth = screenHeight / 4;
	hillSmallHeight = screenHeight / 16;
	cloudSmallWidth = screenWidth * 2 / 25;
	cloudSmallHeight = screenWidth * 3 / 50;
	cloudMediumWidth = screenWidth / 8;
	cloudMediumHeight = screenWidth / 13;
	gravity = screenHeight / 5000;
}
//sets mario as a window variable so it can be used anywhere in the program
window.mario = new Mario(screenHeight / 15, screenHeight * 3 / 5, screenHeight * 1 / 10, screenHeight * 3 / 20, screenWidth / 200, marioTexture);

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
var levelGround = [];
var levelBackgroundObjects = [];
var levelText = [];
var clouds = [];
var groundNotCollidedWith = [],
    allLevelBlocks = [],
    allCollidableObjects = [];

//game properties
var levelLoaded = false;
var xPositionInLevel = 500;
var xPositionInLevelMultiplier = 0;
var moveLeft = false;
var moveRight = false;
var moveDown = false;
var moveUp = false;
var score = 0,
    lives = 3,
    time = 0,
    coinsCollected = 0,
    level = 1;
var gameTime = 300,
    counter = 0;
var unhittable = false;

//Declare all objects for different level
function declareLevelOneObjects() {
	if (!levelLoaded) {
		textColour = "black";
		clearLevelArrays();
		initialiseLevelOneBlocks();
		initialiseLevelOneCoins();
		initialiseLevelOneBackground();
		initialiseLevelOneSprites();
		initialiseLevelOneGround();
		initialiseLevelText(textColour);
		allLevelBlocks = levelBlocks.concat(levelGround);
		allCollidableObjects = allLevelBlocks.concat(levelSprites);
	}
}

function declareLevelTwoObjects() {
	if (!levelLoaded) {
		textColour = "white";
		clearLevelArrays();
		initialiseLevelTwoBlocks();
		initialiseLevelTwoCoins();
		initialiseLevelTwoBackground();
		initialiseLevelTwoSprites();
		initialiseLevelTwoGround();
		initialiseLevelText(textColour);
		allLevelBlocks = levelBlocks.concat(levelGround);
		allCollidableObjects = allLevelBlocks.concat(levelSprites);
	}
}

function declareLevelThreeObjects() {
	if (!levelLoaded) {
		textColour = "black";
		clearLevelArrays();
		initialiseLevelThreeBackground();
		initialiseLevelThreeBlocks();
		initialiseLevelThreeCoins();
		initialiseLevelThreeSprites();
		initialiseLevelThreeGround();
		initialiseLevelText(textColour);
		allLevelBlocks = levelBlocks.concat(levelGround);
		allCollidableObjects = allLevelBlocks.concat(levelSprites);
	}
}