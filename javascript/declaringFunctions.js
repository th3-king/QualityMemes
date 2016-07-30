function initialiseLevelOneBackground(){
  levelBackgroundObjects = [];
  levelBackgroundObjects.push(
    //Hill objects
    new BasicObject(0, groundLevelY - hillLargeHeight, hillLargeWidth, hillLargeHeight, hillLargeTexture),
    new BasicObject(screenWidth - blockSize*9, groundLevelY - hillSmallHeight, hillSmallWidth, hillSmallHeight, hillSmallTexture),

    //cloud objects
    new BasicObject(screenWidth*15/50, groundLevelY - blockSize*10, cloudSmallWidth, cloudSmallHeight, cloudSmallTexture),
    new BasicObject(screenWidth - blockSize*5.5, groundLevelY - blockSize*11, cloudSmallWidth, cloudSmallHeight, cloudSmallTexture)
  )
}

function initialiseLevelOneBlocks(){
  levelBlocks = [];
  levelBlocks.push(
    new NormalBlock(screenWidth - blockSize, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock),
    new MysteryBox(screenWidth - blockSize*2, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox, "coin"),
    new NormalBlock(screenWidth - blockSize*3, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock),
    new NormalBlock(screenWidth - blockSize*4, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox),
    new NormalBlock(screenWidth - blockSize*5, groundLevelY - blockSize*4, blockSize, blockSize, floatingBlock),
    new NormalBlock(screenWidth - blockSize*9, groundLevelY - blockSize*4, blockSize, blockSize, mysteryBox),
    new NormalBlock(screenWidth - blockSize*3, groundLevelY - blockSize*8, blockSize, blockSize, mysteryBox)
  );
}

function initialiseLevelOneCoins() {
  levelCoins = [];
  levelCoins.push(
    new Coin(screenWidth*6/8, screenHeight/3),
    new Coin(screenWidth*5/8, screenHeight/3),
    new Coin(screenWidth*4/8, screenHeight/3)
  )
}

function initialiseLevelOneEnemies() {
  levelEnemies = [];
  levelEnemies.push(
    new Enemy(screenWidth*3/4, (groundLevelY - goombaSize), goombaSize, goombaSize, screenWidth/1000, goomba)
  );
}
