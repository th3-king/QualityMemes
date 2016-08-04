function initialiseLevelOneBackground(){
  levelBackgroundObjects = [];
  levelBackgroundObjects.push(
    //Hill objects (x, size)
    new Hill(0, 2),
    new Hill(screenWidth - blockSize*9, 1),
    new Hill(screenWidth + blockSize*23, 2),
    new Hill(screenWidth*2 + blockSize*14, 1),

    //cloud objects (x, y, size)
    new Cloud(screenWidth*15/50, groundLevelY - blockSize*10, 1),
    new Cloud(screenWidth - blockSize*5.5, groundLevelY - blockSize*11, 1),
    new Cloud(screenWidth + blockSize*2.5, groundLevelY - blockSize*10, 3),
    new Cloud(screenWidth + blockSize*11.5, groundLevelY - blockSize*11, 2),
    new Cloud(screenWidth*2 + blockSize*6.5, groundLevelY - blockSize*10, 1),
    new Cloud(screenWidth*2 + blockSize*17.5, groundLevelY - blockSize*11, 1),

    //bush objects (x, size)
    new Bush(blockSize*11.5, 3),
    new Bush(screenWidth - blockSize*1.5, 1),
    new Bush(screenWidth + blockSize*16.5, 2),
    new Bush(screenWidth*2 + blockSize*9.5, 3),
    new Bush(screenWidth*2 + blockSize*21.5, 1)
  )
}

function initialiseLevelOneBlocks(){
  levelBlocks = []
    //Normal blocks(x, y, width, height, texture)
    levelBlocks.push(
    new NormalBlock(screenWidth - blockSize, groundLevelY - blockSize*4, floatingBlock),
    new NormalBlock(screenWidth - blockSize*3, groundLevelY - blockSize*4, floatingBlock),
    new NormalBlock(screenWidth - blockSize*5, groundLevelY - blockSize*4, floatingBlock),

    //MysterBoxes (x, y, width, height, texture)
    new MysteryBox(screenWidth - blockSize*2, groundLevelY - blockSize*4, mysteryBox, "coin", 3),
    new NormalBlock(screenWidth - blockSize*9, groundLevelY - blockSize*4, mysteryBox),
    new NormalBlock(screenWidth - blockSize*4, groundLevelY - blockSize*4, mysteryBox),
    new NormalBlock(screenWidth - blockSize*3, groundLevelY - blockSize*8, mysteryBox),

    //(x, lengthFromGround)
    new Pipe(screenWidth + blockSize * 3, 2),
    new Pipe(screenWidth + blockSize * 13, 3),
    new Pipe(screenWidth + blockSize * 21, 4),
    new Pipe(screenWidth*2 + blockSize * 7, 4)
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
