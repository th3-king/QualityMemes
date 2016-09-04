//textures

const groundTexture     = new Image();
const marioTexture      = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
const titleTexture      = new Image();
const playButton        = new Image();
const hillSmallTexture  = new Image();
const hillLargeTexture  = new Image();
const cloudTextures     = [new Image(), new Image(), new Image()];
const bushTextures      = [new Image(), new Image(), new Image()];
const levelOneBox       = new Image();
const levelTwoBox       = new Image();
const levelThreeBox     = new Image();
const levelLockedBox    = new Image();
const pauseBox          = new Image();
const gamePausedText    = new Image();
const levelSelectText   = new Image();
const mainMenuText      = new Image();
const resumeGameText    = new Image();
const helpButton        = new Image();
const helpKeys          = [new Image(), new Image(), new Image()];
const coin              = [new Image(), new Image(), new Image(), new Image()];
const floatingBlock     = new Image();
const solidBlock        = new Image();
const mysteryBox        = new Image();
const usedBox           = new Image();
const pipeHead          = new Image();
const pipeBody          = new Image();
const endingPole        = new Image();
const endingFlag        = new Image();
const empty             = new Image();
const goomba            = [new Image(), new Image(), new Image()];
const blueGoomba        = [new Image(), new Image(), new Image()];
const turtle            = [new Image(), new Image(), new Image()];
const flower            = [new Image(), new Image(), new Image(), new Image()];
const blueFlower        = [new Image(), new Image(), new Image(), new Image()];
const starPower         = [new Image(), new Image(), new Image(), new Image(), new Image()];
const castle            = new Image();
const bigCastle         = new Image();
const castleFlag        = new Image();

//texture sources
//marioTextures
marioTexture[0].src   = "textures/marioTextures/standingMario.png";
marioTexture[1].src   = "textures/marioTextures/gameOverMario.png";
marioTexture[2].src   = "textures/marioTextures/run1.png";
marioTexture[3].src   = "textures/marioTextures/run2.png";
marioTexture[4].src   = "textures/marioTextures/run3.png";
marioTexture[5].src   = "textures/marioTextures/run4.png";
marioTexture[6].src   = "textures/marioTextures/jumpMario.png";
marioTexture[7].src   = "textures/marioTextures/endMario.png";

//backgroundTextures
groundTexture.src     = "textures/backgroundTextures/groundTexture.png";
titleTexture.src      = "textures/backgroundTextures/titleTexture.png";
playButton.src        = "textures/backgroundTextures/playButton.png";
hillSmallTexture.src  = "textures/backgroundTextures/hillSmallTexture.png";
hillLargeTexture.src  = "textures/backgroundTextures/hillLargeTexture.png";
cloudTextures[0].src  = "textures/backgroundTextures/cloudSmallTexture.png";
cloudTextures[1].src  = "textures/backgroundTextures/cloudMediumTexture.png";
cloudTextures[2].src  = "textures/backgroundTextures/cloudLargeTexture.png";
bushTextures[0].src   = "textures/backgroundTextures/bushSmallTexture.png";
bushTextures[1].src   = "textures/backgroundTextures/bushMediumTexture.png";
bushTextures[2].src   = "textures/backgroundTextures/bushLargeTexture.png";
castle.src            = "textures/backgroundTextures/castle.png";
bigCastle.src         = "textures/backgroundTextures/bigCastle.png";
castleFlag.src        = "textures/backgroundTextures/castleFlag.png";
helpButton.src        = "textures/backgroundTextures/help.png";
helpKeys[0].src       = "textures/backgroundTextures/keyboardArrows.png";
helpKeys[1].src       = "textures/backgroundTextures/xKey.png";
helpKeys[2].src       = "textures/backgroundTextures/zKey.png";

//levelSelectTextures
levelOneBox.src       = "textures/levelSelectTextures/levelOneBox.png";
levelTwoBox.src       = "textures/levelSelectTextures/levelTwoBox.png";
levelThreeBox.src     = "textures/levelSelectTextures/levelThreeBox.png";
levelLockedBox.src    = "textures/levelSelectTextures/levelLockedBox.png";

//pauseTextures
pauseBox.src          = "textures/pauseTextures/pauseBox.png";
gamePausedText.src    = "textures/pauseTextures/gamePausedText.png";
levelSelectText.src   = "textures/pauseTextures/levelSelectText.png";
mainMenuText.src      = "textures/pauseTextures/mainMenuText.png";
resumeGameText.src    = "textures/pauseTextures/resumeGameText.png";

//blocksOfLevelsTextures
coin[0].src           = "textures/blocksOfLevelsTextures/coinOne.png";
coin[1].src           = "textures/blocksOfLevelsTextures/coinTwo.png";
coin[2].src           = "textures/blocksOfLevelsTextures/coinThree.png";
coin[3].src           = "textures/blocksOfLevelsTextures/coinFour.png";
floatingBlock.src     = "textures/blocksOfLevelsTextures/floatingBlock.png";
solidBlock.src        = "textures/blocksOfLevelsTextures/solidBlock.png";
mysteryBox.src        = "textures/blocksOfLevelsTextures/mysteryBox.png";
usedBox.src           = "textures/blocksOfLevelsTextures/usedBox.png";
pipeHead.src          = "textures/blocksOfLevelsTextures/pipeHead.png";
pipeBody.src          = "textures/blocksOfLevelsTextures/pipeBody.png";
empty.src             = "textures/blocksOfLevelsTextures/empty.png";
endingPole.src        = "textures/blocksOfLevelsTextures/endingPole.png";
endingFlag.src        = "textures/blocksOfLevelsTextures/endingFlag.png";

//texture arrays
function setTextures(){
  imageSourceSetter(goomba, "textures/enemyTextures/goomba", 3);
  imageSourceSetter(blueGoomba, "textures/enemyTextures/blueGoomba", 3);
  imageSourceSetter(turtle, "textures/enemyTextures/turtle", 3);
  imageSourceSetter(flower, "textures/powerUpTextures/flower", 4);
  imageSourceSetter(blueFlower, "textures/powerUpTextures/blueFlower", 4);
  imageSourceSetter(starPower, "textures/powerUpTextures/star", 5);

}
