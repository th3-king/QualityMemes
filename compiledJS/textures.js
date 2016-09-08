"use strict";

//textures

var groundTexture = new Image();
var blueGroundTexture = new Image();
var marioTexture = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
var bigMarioTexture = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
var titleTexture = new Image();
var playButton = new Image();
var hillSmallTexture = new Image();
var hillLargeTexture = new Image();
var cloudTextures = [new Image(), new Image(), new Image()];
var bushTextures = [new Image(), new Image(), new Image()];
var levelOneBox = new Image();
var levelTwoBox = new Image();
var levelThreeBox = new Image();
var levelLockedBox = new Image();
var pauseBox = new Image();
var gamePausedText = new Image();
var levelSelectText = new Image();
var mainMenuText = new Image();
var resumeGameText = new Image();
var helpButtons = [new Image(), new Image()];
var helpKeys = [new Image(), new Image(), new Image()];
var coin = [new Image(), new Image(), new Image(), new Image()];
var floatingBlock = new Image();
var blueFloatingBlock = new Image();
var solidBlock = new Image();
var blueSolidBlock = new Image();
var mysteryBox = new Image();
var usedBox = new Image();
var pipeHead = new Image();
var pipeBody = new Image();
var endingPole = new Image();
var endingFlag = new Image();
var empty = new Image();
var goomba = [new Image(), new Image(), new Image()];
var blueGoomba = [new Image(), new Image(), new Image()];
var turtle = [new Image(), new Image(), new Image()];
var flower = [new Image(), new Image(), new Image(), new Image()];
var blueFlower = [new Image(), new Image(), new Image(), new Image()];
var starPower = [new Image(), new Image(), new Image(), new Image(), new Image()];
var treeBlock = [new Image(), new Image(), new Image(), new Image()];
var mushroom = new Image();
var oneUp = new Image();
var castle = new Image();
var bigCastle = new Image();
var castleFlag = new Image();
var movingPlatform = new Image();

//texture sources
//marioTextures
marioTexture[0].src = "textures/marioTextures/standingMario.png";
marioTexture[1].src = "textures/marioTextures/gameOverMario.png";
marioTexture[2].src = "textures/marioTextures/run1.png";
marioTexture[3].src = "textures/marioTextures/run2.png";
marioTexture[4].src = "textures/marioTextures/run3.png";
marioTexture[5].src = "textures/marioTextures/run4.png";
marioTexture[6].src = "textures/marioTextures/jumpMario.png";
marioTexture[7].src = "textures/marioTextures/endMario.png";

bigMarioTexture[0].src = "textures/marioTextures/bigStandingMario.png";
bigMarioTexture[1].src = "textures/marioTextures/gameOverMario.png";
bigMarioTexture[2].src = "textures/marioTextures/bigRun1.png";
bigMarioTexture[3].src = "textures/marioTextures/bigRun2.png";
bigMarioTexture[4].src = "textures/marioTextures/bigRun3.png";
bigMarioTexture[5].src = "textures/marioTextures/bigRun4.png";
bigMarioTexture[6].src = "textures/marioTextures/bigJumpMario.png";
bigMarioTexture[7].src = "textures/marioTextures/endMario.png";
bigMarioTexture[8].src = "textures/marioTextures/bigCrouchMario.png";

//backgroundTextures
groundTexture.src = "textures/backgroundTextures/groundTexture.png";
blueGroundTexture.src = "textures/backgroundTextures/blueGroundTexture.png";
titleTexture.src = "textures/backgroundTextures/titleTexture.png";
playButton.src = "textures/backgroundTextures/playButton.png";
hillSmallTexture.src = "textures/backgroundTextures/hillSmallTexture.png";
hillLargeTexture.src = "textures/backgroundTextures/hillLargeTexture.png";
cloudTextures[0].src = "textures/backgroundTextures/cloudSmallTexture.png";
cloudTextures[1].src = "textures/backgroundTextures/cloudMediumTexture.png";
cloudTextures[2].src = "textures/backgroundTextures/cloudLargeTexture.png";
bushTextures[0].src = "textures/backgroundTextures/bushSmallTexture.png";
bushTextures[1].src = "textures/backgroundTextures/bushMediumTexture.png";
bushTextures[2].src = "textures/backgroundTextures/bushLargeTexture.png";
castle.src = "textures/backgroundTextures/castle.png";
bigCastle.src = "textures/backgroundTextures/bigCastle.png";
castleFlag.src = "textures/backgroundTextures/castleFlag.png";
helpButtons[0].src = "textures/backgroundTextures/help.png";
helpButtons[1].src = "textures/backgroundTextures/back.png";
helpKeys[0].src = "textures/backgroundTextures/keyboardArrows.png";
helpKeys[1].src = "textures/backgroundTextures/xKey.png";
helpKeys[2].src = "textures/backgroundTextures/zKey.png";

//levelSelectTextures
levelOneBox.src = "textures/levelSelectTextures/levelOneBox.png";
levelTwoBox.src = "textures/levelSelectTextures/levelTwoBox.png";
levelThreeBox.src = "textures/levelSelectTextures/levelThreeBox.png";
levelLockedBox.src = "textures/levelSelectTextures/levelLockedBox.png";

//pauseTextures
pauseBox.src = "textures/pauseTextures/pauseBox.png";
gamePausedText.src = "textures/pauseTextures/gamePausedText.png";
levelSelectText.src = "textures/pauseTextures/levelSelectText.png";
mainMenuText.src = "textures/pauseTextures/mainMenuText.png";
resumeGameText.src = "textures/pauseTextures/resumeGameText.png";

//blocksOfLevelsTextures
coin[0].src = "textures/blocksOfLevelsTextures/coinOne.png";
coin[1].src = "textures/blocksOfLevelsTextures/coinTwo.png";
coin[2].src = "textures/blocksOfLevelsTextures/coinThree.png";
coin[3].src = "textures/blocksOfLevelsTextures/coinFour.png";
floatingBlock.src = "textures/blocksOfLevelsTextures/floatingBlock.png";
blueFloatingBlock.src = "textures/blocksOfLevelsTextures/blueFloatingBlock.png";
solidBlock.src = "textures/blocksOfLevelsTextures/solidBlock.png";
blueSolidBlock.src = "textures/blocksOfLevelsTextures/blueSolidBlock.png";
mysteryBox.src = "textures/blocksOfLevelsTextures/mysteryBox.png";
usedBox.src = "textures/blocksOfLevelsTextures/usedBox.png";
pipeHead.src = "textures/blocksOfLevelsTextures/pipeHead.png";
pipeBody.src = "textures/blocksOfLevelsTextures/pipeBody.png";
empty.src = "textures/blocksOfLevelsTextures/empty.png";
endingPole.src = "textures/blocksOfLevelsTextures/endingPole.png";
endingFlag.src = "textures/blocksOfLevelsTextures/endingFlag.png";
movingPlatform.src = "textures/blocksOfLevelsTextures/movingPlatform.png";
treeBlock[0].src = "textures/blocksOfLevelsTextures/treeTopLeft.png";
treeBlock[1].src = "textures/blocksOfLevelsTextures/treeTopRight.png";
treeBlock[2].src = "textures/blocksOfLevelsTextures/treeTopMiddle.png";
treeBlock[3].src = "textures/blocksOfLevelsTextures/treeTrunk.png";

//powerUpTextures
mushroom.src = "textures/powerUpTextures/mushroom.png";
oneUp.src = "textures/powerUpTextures/1up.png";

//texture arrays
function setTextures() {
  imageSourceSetter(goomba, "textures/enemyTextures/goomba", 3);
  imageSourceSetter(blueGoomba, "textures/enemyTextures/blueGoomba", 3);
  imageSourceSetter(turtle, "textures/enemyTextures/turtle", 3);
  imageSourceSetter(flower, "textures/powerUpTextures/flower", 4);
  imageSourceSetter(blueFlower, "textures/powerUpTextures/blueFlower", 4);
  imageSourceSetter(starPower, "textures/powerUpTextures/star", 5);
}