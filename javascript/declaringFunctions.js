function initialiseLevelOneBackground(){
  levelBackgroundObjects = [];

  //Hill objects
  levelBackgroundObjects[0] = new BasicObject(0, groundLevelY - hillLargeHeight, hillLargeWidth, hillLargeHeight, hillLargeTexture);
  levelBackgroundObjects[1] = new BasicObject(screenWidth - blockSize*9, groundLevelY - hillSmallHeight, hillSmallWidth, hillSmallHeight, hillSmallTexture);

  //cloud objects
  levelBackgroundObjects[2] = new BasicObject(screenWidth*15/50, groundLevelY - blockSize*10, cloudSmallWidth, cloudSmallHeight, cloudSmallTexture);
  levelBackgroundObjects[3] = new BasicObject(screenWidth - blockSize*5.5, groundLevelY - blockSize*11, cloudSmallWidth, cloudSmallHeight, cloudSmallTexture);
}

function initialiseLevelOneBlocks(){
  levelBlocks = [];

  levelBlocks[0] = new NormalBlock(screenWidth - blockSize, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock);
  levelBlocks[1] = new NormalBlock(screenWidth - blockSize*2, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox);
  levelBlocks[2] = new NormalBlock(screenWidth - blockSize*3, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock);
  levelBlocks[3] = new NormalBlock(screenWidth - blockSize*4, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox);
  levelBlocks[4] = new NormalBlock(screenWidth - blockSize*5, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock);
  levelBlocks[5] = new NormalBlock(screenWidth - blockSize*9, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox);
  levelBlocks[6] = new NormalBlock(screenWidth - blockSize*3, groundLevelY - blockSize*8, blockSize, blockSize, mysteryBox);

}

function initialiseLevelOneCoins() {
  levelCoins = [];

  levelCoins[0] = new Coin(screenWidth*6/8, screenHeight/3);
  levelCoins[1] = new Coin(screenWidth*5/8, screenHeight/3);
  levelCoins[2] = new Coin(screenWidth*4/8, screenHeight/3);
}

function initialiseLevelOneEnemies() {
  levelEnemies = [];
  levelEnemies[0] = new Enemy(screenWidth*3/4, (groundLevelY - goombaSize), goombaSize, goombaSize, screenWidth/1000, goomba);
}
