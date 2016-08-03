'use strict';

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
var floorCollision = false;

var groundLevelY;
var blockSize;
var goombaHeight;
var hillLargeWidth;
var hillLargeHeight;
var hillSmallWidth;
var hillSmallHeight;
var cloudSmallWidth;
var cloudSmallHeight;
var cloudMediumWidth;
var cloudMediumHeight;

function initialiseScreenSizeRelatedElements() {
	groundLevelY = screenHeight * 67 / 75;
	blockSize = screenHeight * 16 / 225;
	goombaHeight = blockSize * 15 / 16;
	hillLargeWidth = screenHeight / 3;
	hillLargeHeight = screenHeight / 8;
	hillSmallWidth = screenHeight / 4;
	hillSmallHeight = screenHeight / 16;
	cloudSmallWidth = screenWidth * 2 / 25;
	cloudSmallHeight = screenWidth * 3 / 50;
	cloudMediumWidth = screenWidth / 8;
	cloudMediumHeight = screenWidth / 13;
}
window.mario = new Mario(screenHeight / 15, screenHeight * 3 / 5, screenHeight * 1 / 10, screenHeight * 3 / 20, screenWidth / 200, marioTexture);

//audio setup
function play() {
	document.getElementById('themeSong').play();
}
function pause() {
	document.getElementById('themeSong').pause();
}

//arrays
var levelEnemies = [];
var levelBlocks = [];
var levelCoins = [];
var levelGround = [];
var levelBackgroundObjects = [];
var clouds = [];
var groundNotCollidedWith = [];

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
	if (levelLoaded == false) {
		initialiseLevelOneBlocks();
		initialiseLevelOneCoins();
		initialiseLevelOneBackground();
		initialiseLevelOneEnemies();
		initialiseLevelOneGround();
	};
};
