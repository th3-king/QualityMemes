function initialiseLevelOneBackground(){
  levelBackgroundObjects = [];
  levelBackgroundObjects.push(
    //Hill objects (section, blocksFromRight, size)
    //size 1 = small, 2 = large
    new Hill(0, 0, 2),
    new Hill(0, 16, 1),
    new Hill(1, 23, 2),
    new Hill(2, 14, 1),
    new Hill(3, 21, 2),
    new Hill(4, 12, 1),
    new Hill(5, 19, 2),
    new Hill(6, 10, 1),
    new Hill(7, 17, 2),

    //cloud objects (section, blocksFromRight, blocksUp, size)
    //size 1 = small, 2 = medium, 3 = large
    new Cloud(0, 8.5, 10, 1),
    new Cloud(0, 19.5, 11, 1),
    new Cloud(1, 2.5, 10, 3),
    new Cloud(1, 11.5, 11, 2),
    new Cloud(2, 6.5, 10, 1),
    new Cloud(2, 17.5, 11, 1),
    new Cloud(3, 0.5, 10, 3),
    new Cloud(3, 9.5, 11, 2),
    new Cloud(4, 4.5, 10, 1),
    new Cloud(4, 15.5, 11, 1),
    new Cloud(4, 23.5, 10, 3),
    new Cloud(5, 7.5, 11, 2),
    new Cloud(6, 2.5, 10, 1),
    new Cloud(6, 13.5, 11, 1),
    new Cloud(6, 21.5, 10, 3),
    new Cloud(7, 5.5, 11, 2),

    //bush objects (section, blocksFromRight, size)
    //size 1 = small, 2 = medium, 3 = large
    new Bush(0, 11.5, 3),
    new Bush(0, 23.5, 1),
    new Bush(1, 16.5, 2),
    new Bush(2, 9.5, 3),
    new Bush(2, 21.5, 1),
    new Bush(3, 14.5, 2),
    new Bush(4, 7.5, 3),
    new Bush(4, 19.5, 1),
    new Bush(5, 12.5, 2),
    new Bush(6, 7.5, 1),
    new Bush(6, 17.5, 1)
  )
}

function initialiseLevelOneBlocks(){
  levelBlocks = []
    //Normal blocks(section, blocksFromRight, blocksUp, image)
    levelBlocks.push(
    new NormalBlock(0, 24, 4, floatingBlock),
    new NormalBlock(0, 22, 4, floatingBlock),
    new NormalBlock(0, 20, 4, floatingBlock),
    new NormalBlock(3, 2, 4, floatingBlock),
    new NormalBlock(3, 4, 4, floatingBlock),
    new NormalBlock(4, 0, 4, floatingBlock),
    new NormalBlock(4, 18, 4, floatingBlock),
    new NormalBlock(5, 3, 8, floatingBlock),
    new NormalBlock(5, 6, 8, floatingBlock),
    new NormalBlock(6, 18, 4, floatingBlock),
    new NormalBlock(6, 19, 4, floatingBlock),
    new NormalBlock(6, 21, 4, floatingBlock),

    //MysterBoxes (section, blocksFromRight, blocksUp, image, ability, amountOfAbilities)
    new MysteryBox(0, 23, 4, mysteryBox, "coin", 1),
    new MysteryBox(0, 16, 4, mysteryBox, "coin", 1),
    new MysteryBox(0, 21, 4, mysteryBox, "coin", 1),
    new MysteryBox(0, 22, 8, mysteryBox, "coin", 1),
    new MysteryBox(2, 14, 5, empty, "coin", 1),
    new MysteryBox(3, 3, 4, mysteryBox, "coin", 1),
    new MysteryBox(3, 19, 8, mysteryBox, "coin", 1),
    new MysteryBox(3, 19, 4, floatingBlock, "coin", 1),
    new MysteryBox(4, 1, 4, mysteryBox, "coin", 1),
    new MysteryBox(4, 6, 4, mysteryBox, "coin", 1),
    new MysteryBox(4, 9, 4, mysteryBox, "coin", 1),
    new MysteryBox(4, 9, 8, mysteryBox, "coin", 1),
    new MysteryBox(4, 12, 4, mysteryBox, "coin", 1),
    new MysteryBox(5, 4, 8, mysteryBox, "coin", 1),
    new MysteryBox(5, 5, 8, mysteryBox, "coin", 1),
    new MysteryBox(6, 20, 4, mysteryBox, "coin", 1),

    new SolidBlock(7, 23, 1, solidBlock),

    //(x, lengthFromGround)
    new Pipe(screenWidth + blockSize * 3, 2),
    new Pipe(screenWidth + blockSize * 13, 3),
    new Pipe(screenWidth + blockSize * 21, 4),
    new Pipe(screenWidth*2 + blockSize * 7, 4),
    new Pipe(screenWidth*6 + blockSize * 13, 2),
    new Pipe(screenWidth*7 + blockSize * 4, 2)
  );
  createBlockPlatform(3, 5, 8, floatingBlock, 8);
  createBlockPlatform(3, 16, 8, floatingBlock, 3);
  createBlockPlatform(4, 21, 8, floatingBlock, 3);
  createBlockPlatform(5, 4, 4, floatingBlock, 2);
  createBlockStairAscendingFromLeft(5, 9, 1, solidBlock, 4);
  createBlockStairAscendingFromRight(5, 15, 1, solidBlock, 4);
  createBlockStairAscendingFromLeft(5, 23, 1, solidBlock, 4);
  createBlockStack(6, 2, 1, solidBlock, 4);
  createBlockStairAscendingFromRight(6, 5, 1, solidBlock, 4);
  createBlockStairAscendingFromLeft(7, 6, 1, solidBlock, 8);
  createBlockStack(7, 14, 1, solidBlock, 8);
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
    new Enemy(screenWidth*3/4, (groundLevelY - goombaHeight), blockSize, goombaHeight, screenWidth/1500, goomba)
  );
}

function initialiseLevelOneGround() {
  levelGround = [];
  createGroundBlocks(0,69,0,2);
  createGroundBlocks(71,86,0,2);
  createGroundBlocks(89,153,0,2);
  createGroundBlocks(155,212,0,2);
}

function initialiseLevelText(){
  levelText = [];
  levelText.push(
    new Text(screenWidth/50, screenHeight/18 ,"emulogic", screenWidth/50, "left", "black", "Mario "),
    new Text(screenWidth/50, screenHeight*2/18 ,"emulogic", screenWidth/50, "left", "black", score.toString()),
    new Text(screenWidth*3/10, screenHeight*2/18 ,"emulogic", screenWidth/50 , "left", "black", "x" + coinsCollected.toString()),
    new Text(screenWidth*3/5, screenHeight/18 ,"emulogic", screenWidth/50 , "center", "black", "world"),
    new Text(screenWidth*3/5, screenHeight*2/18 ,"emulogic", screenWidth/50 , "center", "black", "1-" + level.toString()),
    new Text(screenWidth*49/50, screenHeight/18 ,"emulogic", screenWidth/50 , "right", "black", "Time"),
    new Text(screenWidth*49/50, screenHeight*2/18 ,"emulogic", screenWidth/50 , "right", "black", gameTime.toString())
  );
}
