"use strict";

/*
      LEVEL ONE
                    */

function initialiseLevelOneBackground() {
  levelBackgroundObjects.push(
  //Hill objects (section, blocksFromRight, size)
  //size 1 = small, 2 = large
  new Hill(0, 0, 2), new Hill(0, 16, 1), new Hill(1, 23, 2), new Hill(2, 14, 1), new Hill(3, 21, 2), new Hill(4, 12, 1), new Hill(5, 19, 2), new Hill(6, 10, 1), new Hill(7, 17, 2), new Hill(8, 8, 1),

  //cloud objects (section, blocksFromRight, blocksUp, size)
  //size 1 = small, 2 = medium, 3 = large
  new Cloud(0, 8.5, 10, 1), new Cloud(0, 19.5, 11, 1), new Cloud(1, 2.5, 10, 3), new Cloud(1, 11.5, 11, 2), new Cloud(2, 6.5, 10, 1), new Cloud(2, 17.5, 11, 1), new Cloud(3, 0.5, 10, 3), new Cloud(3, 9.5, 11, 2), new Cloud(4, 4.5, 10, 1), new Cloud(4, 15.5, 11, 1), new Cloud(4, 23.5, 10, 3), new Cloud(5, 7.5, 11, 2), new Cloud(6, 2.5, 10, 1), new Cloud(6, 13.5, 11, 1), new Cloud(6, 21.5, 10, 3), new Cloud(7, 5.5, 11, 2),

  //bush objects (section, blocksFromRight, size)
  //size 1 = small, 2 = medium, 3 = large
  new Bush(0, 11.5, 3), new Bush(0, 23.5, 1), new Bush(1, 16.5, 2), new Bush(2, 9.5, 3), new Bush(2, 21.5, 1), new Bush(3, 14.5, 2), new Bush(4, 7.5, 3), new Bush(4, 19.5, 1), new Bush(5, 12.5, 2), new Bush(6, 7.5, 1), new Bush(6, 17.5, 1), new Bush(8, 5.5, 1),

  //final castle
  new BasicObject(blockSize * 202, groundLevelY - blockSize * 5, blockSize * 5, blockSize * 5, castle));
}

function initialiseLevelOneBlocks() {
  //Normal blocks(section, blocksFromRight, blocksUp, image)
  levelBlocks.push(new NormalBlock(0, 24, 4, floatingBlock), new NormalBlock(0, 22, 4, floatingBlock), new NormalBlock(0, 20, 4, floatingBlock), new NormalBlock(3, 2, 4, floatingBlock), new NormalBlock(3, 4, 4, floatingBlock), new NormalBlock(4, 0, 4, floatingBlock), new NormalBlock(4, 18, 4, floatingBlock), new NormalBlock(5, 3, 8, floatingBlock), new NormalBlock(5, 6, 8, floatingBlock), new NormalBlock(6, 18, 4, floatingBlock), new NormalBlock(6, 19, 4, floatingBlock), new NormalBlock(6, 21, 4, floatingBlock),

  //MysterBoxes (section, blocksFromRight, blocksUp, image, ability, amountOfAbilities)
  new MysteryBox(0, 23, 4, mysteryBox, "coin", 1), new MysteryBox(0, 16, 4, mysteryBox, "coin", 1), new MysteryBox(0, 21, 4, mysteryBox, "mushroom", 1), new MysteryBox(0, 22, 8, mysteryBox, "coin", 1), new MysteryBox(2, 14, 5, empty, "coin", 1), new MysteryBox(3, 3, 4, mysteryBox, "mushroom", 1), new MysteryBox(3, 19, 8, mysteryBox, "coin", 1), new MysteryBox(3, 19, 4, floatingBlock, "coin", 1), new MysteryBox(4, 1, 4, mysteryBox, "coin", 1), new MysteryBox(4, 6, 4, mysteryBox, "coin", 1), new MysteryBox(4, 9, 4, mysteryBox, "coin", 1), new MysteryBox(4, 9, 8, mysteryBox, "mushroom", 1), new MysteryBox(4, 12, 4, mysteryBox, "coin", 1), new MysteryBox(5, 4, 8, mysteryBox, "coin", 1), new MysteryBox(5, 5, 8, mysteryBox, "coin", 1), new MysteryBox(6, 20, 4, mysteryBox, "coin", 1), new SolidBlock(7, 23, 1, solidBlock), new EndingPole(7, 23.25, 10.5),

  //(x, lengthFromGround)
  new Pipe(1, 3, 2), new Pipe(1, 13, 3), new Pipe(1, 21, 4), new Pipe(2, 7, 4), new Pipe(6, 13, 2), new Pipe(7, 4, 2));
  createBlockPlatform(3, 5, 8, floatingBlock, 8);
  createBlockPlatform(3, 16, 8, floatingBlock, 3);
  createBlockPlatform(4, 21, 8, floatingBlock, 3);
  createBlockPlatform(5, 4, 4, floatingBlock, 2);
  createBlockStairAscendingFromLeft(5, 9, 1, solidBlock, 4);
  createBlockStairAscendingFromRight(5, 15, 1, solidBlock, 4);
  createBlockStairAscendingFromLeft(5, 23, 1, solidBlock, 4);
  createBlockStack(6, 2, 1, solidBlock, 4, SolidBlock);
  createBlockStairAscendingFromRight(6, 5, 1, solidBlock, 4);
  createBlockStairAscendingFromLeft(7, 6, 1, solidBlock, 8);
  createBlockStack(7, 14, 4, solidBlock, 8, SolidBlock);
}

function initialiseLevelOneCoins() {
  levelCoins.push();
}

function initialiseLevelOneSprites() {
  levelSprites.push(
  //Enemy(section, blocksFromRight, blocksAboveGround)

  //new AnimatedSprite(blockSize*20.5625, groundLevelY - goombaHeight, blockSize, goombaHeight, screenWidth/1500, goomba),
  new Goomba(0, 20.5625, 0, goomba), new Goomba(1, 15.25, 0, goomba), new Goomba(2, 2.5625, 0, goomba), new Goomba(2, 4.0625, 0, goomba), new Goomba(3, 3.75, 5.375, goomba), new Goomba(3, 6.5, 8, goomba), new Goomba(3, 19.8125, 0, goomba), new Goomba(3, 21.3125, 0, goomba), new Goomba(4, 23.375, 0, goomba), new Goomba(4, 24.8125, 0, goomba), new Goomba(5, 1.8125, 0, goomba), new Goomba(5, 3.25, 0, goomba), new Goomba(6, 23.1875, 0, goomba), new Goomba(6, 24.625, 0, goomba));
}

function initialiseLevelOneGround() {
  createGroundBlocks(0, 69, 0, 2, groundTexture);
  createGroundBlocks(71, 86, 0, 2, groundTexture);
  createGroundBlocks(89, 153, 0, 2, groundTexture);
  createGroundBlocks(155, 212, 0, 2, groundTexture);
}

function initialiseLevelText(colour) {
  levelText = [];
  levelText.push(new Text(screenWidth / 50, screenHeight / 18, "emulogic", screenWidth / 50, "left", colour, "Mario "), new Text(screenWidth / 50, screenHeight * 2 / 18, "emulogic", screenWidth / 50, "left", colour, score.toString()), new Text(screenWidth * 3 / 10, screenHeight * 2 / 18, "emulogic", screenWidth / 50, "left", colour, "x" + coinsCollected.toString()), new Text(screenWidth * 3 / 5, screenHeight / 18, "emulogic", screenWidth / 50, "center", colour, "world"), new Text(screenWidth * 3 / 5, screenHeight * 2 / 18, "emulogic", screenWidth / 50, "center", colour, "1-" + level.toString()), new Text(screenWidth * 49 / 50, screenHeight / 18, "emulogic", screenWidth / 50, "right", colour, "Time"), new Text(screenWidth * 49 / 50, screenHeight * 2 / 18, "emulogic", screenWidth / 50, "right", colour, gameTime.toString()));
}

/*
    LEVEL TWO
                */

function initialiseLevelTwoBackground() {
  levelBackgroundObjects.push();
}

function initialiseLevelTwoBlocks() {
  levelBlocks.push(new MysteryBox(0, 10, 4, mysteryBox, "mushroom", 1), new MysteryBox(0, 11, 4, mysteryBox, "coin", 1), new MysteryBox(0, 12, 4, mysteryBox, "coin", 1), new MysteryBox(0, 13, 4, mysteryBox, "coin", 1), new MysteryBox(0, 14, 4, mysteryBox, "coin", 1), new MysteryBox(1, 4, 5, blueFloatingBlock, "coin", 7), new MysteryBox(1, 21, 6, blueFloatingBlock, "star", 1), new MysteryBox(2, 19, 5, blueFloatingBlock, "mushroom", 1), new MysteryBox(2, 23, 5, blueFloatingBlock, "coin", 1), new MysteryBox(3, 14, 11, blueFloatingBlock, "oneUp", 1), new MysteryBox(6, 0, 5, blueFloatingBlock, "mushroom", 1), new NormalBlock(1, 15, 4, blueFloatingBlock), new NormalBlock(1, 17, 6, blueFloatingBlock), new NormalBlock(1, 18, 6, blueFloatingBlock), new NormalBlock(1, 20, 4, blueFloatingBlock), new NormalBlock(2, 23, 4, blueFloatingBlock), new MovingPlatform(5, 14.8125, 8.5625, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new MovingPlatform(5, 14.8125, 2.625, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new MovingPlatform(6, 4.6875, 8.25, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new MovingPlatform(6, 4.6875, 0.25, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new Pipe(4, 3, 3), new Pipe(4, 9, 4), new Pipe(4, 15, 2));

  createBlockStack(0, 0, 1, blueFloatingBlock, 11, SolidBlock);
  createBlockStack(0, 17, 1, blueSolidBlock, 1, SolidBlock);
  createBlockStack(0, 19, 1, blueSolidBlock, 2, SolidBlock);
  createBlockStack(0, 21, 1, blueSolidBlock, 3, SolidBlock);
  createBlockStack(0, 23, 1, blueSolidBlock, 4, SolidBlock);
  createBlockStack(0, 25, 1, blueSolidBlock, 4, SolidBlock);
  createBlockStack(1, 2, 1, blueSolidBlock, 3, SolidBlock);
  createBlockStack(1, 6, 1, blueSolidBlock, 3, SolidBlock);
  createBlockStack(1, 8, 1, blueSolidBlock, 2, SolidBlock);
  createBlockStack(1, 14, 4, blueFloatingBlock, 3, NormalBlock);
  createBlockStack(1, 16, 4, blueFloatingBlock, 3, NormalBlock);
  createBlockStack(1, 19, 4, blueFloatingBlock, 3, NormalBlock);
  createBlockStack(1, 21, 4, blueFloatingBlock, 2, NormalBlock);
  createBlockPlatform(0, 6, 11, blueFloatingBlock, 83);
  createBlockRectangle(2, 2, 8, blueFloatingBlock, 2, 5, NormalBlock);
  createBlockRectangle(2, 4, 10, blueFloatingBlock, 2, 2, NormalBlock);
  createBlockRectangle(2, 4, 4, blueFloatingBlock, 2, 3, SolidBlock);
  createBlockRectangle(2, 8, 10, blueFloatingBlock, 6, 2, NormalBlock);
  createBlockRectangle(2, 12, 8, blueFloatingBlock, 2, 4, NormalBlock);
  createBlockPlatform(2, 8, 4, blueFloatingBlock, 6, NormalBlock);
  createBlockRectangle(2, 16, 10, blueFloatingBlock, 4, 2, NormalBlock);
  createBlockStack(2, 17, 5, blueFloatingBlock, 4, NormalBlock);
  createBlockPlatform(2, 17, 4, blueFloatingBlock, 3, NormalBlock);
  createBlockStack(2, 22, 4, blueFloatingBlock, 5, NormalBlock);
  createBlockStack(2, 23, 6, blueFloatingBlock, 3, NormalBlock);
  createBlockRectangle(3, 1, 10, blueFloatingBlock, 4, 2, NormalBlock);
  createBlockPlatform(3, 1, 4, blueFloatingBlock, 4, NormalBlock);
  createBlockRectangle(3, 9, 6, blueFloatingBlock, 6, 2, NormalBlock);
  createBlockPlatform(3, 15, 11, blueFloatingBlock, 48);
  createBlockRectangle(4, 22, 3, blueFloatingBlock, 2, 3, SolidBlock);
  createBlockStairAscendingFromLeft(5, 8, 1, blueSolidBlock, 4);
  createBlockStack(5, 12, 1, blueSolidBlock, 4, SolidBlock);
  createBlockPlatform(5, 20, 5, blueFloatingBlock, 5);
  createBlockRectangle(6, 10, 3, blueFloatingBlock, 25, 3, SolidBlock);
  createBlockRectangle(6, 20, 11, blueFloatingBlock, 15, 8, SolidBlock);
  createBlockPlatform(6, 11, 11, blueFloatingBlock, 7);
}

function initialiseLevelTwoCoins() {
  levelCoins.push(new Coin(1, 15, 5), new Coin(1, 16, 8), new Coin(1, 17, 8), new Coin(1, 18, 8), new Coin(1, 19, 8), new Coin(1, 20, 5), new Coin(2, 8, 5), new Coin(2, 9, 5), new Coin(2, 10, 5), new Coin(2, 11, 5), new Coin(2, 18, 5), new Coin(3, 9, 8), new Coin(3, 10, 8), new Coin(3, 11, 8), new Coin(3, 12, 8), new Coin(3, 13, 8), new Coin(3, 14, 8));
}

function initialiseLevelTwoSprites() {
  levelSprites.push();
}

function initialiseLevelTwoGround() {
  createGroundBlocks(0, 80, 0, 2, blueGroundTexture);
  createGroundBlocks(83, 120, 0, 2, blueGroundTexture);
  createGroundBlocks(122, 124, 0, 2, blueGroundTexture);
  createGroundBlocks(126, 138, 0, 2, blueGroundTexture);
  createGroundBlocks(145, 153, 0, 2, blueGroundTexture);
  createGroundBlocks(160, 184, 0, 2, blueGroundTexture);
}

function initialiseLevelThreeBlocks() {
  levelBlocks.push(new MovingPlatform(2, 1.6875, 2.5625, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new MovingPlatform(3, 10.9375, 4.9375, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new MovingPlatform(3, 18.9375, 3.9375, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new MovingPlatform(5, 2.875, 6.9375, blockSize * 3, blockSize / 2, movingPlatform, screenHeight / 500), new SolidBlock(6, 2, 1, solidBlock), new EndingPole(6, 2.25, 10.5), new MysteryBox(2, 9, 3, mysteryBox, "mushroom", 1));
  createTreeTop(0, 18, 1, 4, 1.5);
  createTreeTop(0, 24, 4, 8, 4.5);
  createTreeTop(1, 1, 8, 5, 3);
  createTreeTop(1, 7, 1, 3, 1.5);
  createTreeTop(1, 10, 5, 5, 5.5);
  createTreeTop(1, 15, 9, 7, 9.5);
  createTreeTop(2, 0, 0, 4, 0.5);
  createTreeTop(2, 10, 7, 4, 7);
  createTreeTop(2, 9, 0, 5, 0.5);
  createTreeTop(2, 15, 0, 5, 0.5);
  createTreeTop(2, 20, 4, 3, 4.5);
  createTreeTop(3, 1, 7, 6, 7.5);
  createTreeTop(3, 23, 2, 4, 2.5);
  createTreeTop(4, 4, 6, 8, 6.5);
  createTreeTop(4, 13, 0, 3, 0.5);
  createTreeTop(4, 16, 4, 4, 4.5);
  createTreeTop(4, 22, 4, 4, 4.5);
  createBlockRectangle(5, 13, 4, solidBlock, 6, 4, SolidBlock);
  createBlockRectangle(5, 15, 6, solidBlock, 4, 2, SolidBlock);
  createBlockRectangle(5, 17, 8, solidBlock, 2, 2, SolidBlock);
}
function initialiseLevelThreeCoins() {
  levelCoins.push(new Coin(1, 2, 9), new Coin(1, 3, 9), new Coin(1, 4, 9), new Coin(1, 8, 2), new Coin(1, 12, 11), new Coin(1, 13, 11), new Coin(2, 0, 7), new Coin(2, 1, 7), new Coin(2, 10, 9), new Coin(2, 11, 9), new Coin(2, 12, 9), new Coin(2, 13, 9), new Coin(3, 10, 8), new Coin(3, 11, 8), new Coin(3, 18, 9), new Coin(3, 19, 9), new Coin(3, 22, 9), new Coin(3, 23, 9), new Coin(4, 13, 1), new Coin(4, 14, 1), new Coin(4, 15, 1), new Coin(4, 20, 8), new Coin(4, 21, 8));
}
function initialiseLevelThreeBackground() {
  levelBackgroundObjects.push(new BasicObject(0, groundLevelY - blockSize * 5, blockSize * 5, blockSize * 5, castle), new Cloud(0, 3.5, 10, 2), new Cloud(0, 9.5, 6, 1), new Cloud(0, 18.5, 11, 2), new Cloud(1, 10.5, 6, 1), new Cloud(1, 13.5, 7, 1), new Cloud(1, 21.5, 2, 1), new Cloud(2, 1.5, 10, 2), new Cloud(2, 7.5, 6, 1), new Cloud(2, 16.5, 11, 2), new Cloud(3, 1.5, 2, 1), new Cloud(3, 8.5, 6, 1), new Cloud(3, 11.5, 7, 1), new Cloud(3, 19.5, 2, 1), new Cloud(3, 24.5, 10, 2), new Cloud(4, 14.5, 11, 2), new Cloud(4, 24.5, 2, 1), new Cloud(5, 6.5, 6, 1), new Cloud(5, 9.5, 7, 1), new Cloud(5, 17.5, 2, 1), new Cloud(5, 22.5, 10, 2), new Cloud(6, 3.5, 6, 1), new Cloud(6, 12.5, 11, 2), new BasicObject(blockSize * 155, groundLevelY - blockSize * 11, blockSize * 9, blockSize * 11, bigCastle));
}
function initialiseLevelThreeSprites() {
  levelSprites.push(new Goomba(1, 15.875, 10, goomba), new Goomba(1, 18.875, 10, goomba), new Goomba(3, 3, 8, goomba));
}
function initialiseLevelThreeGround() {
  createGroundBlocks(0, 16, 0, 2, groundTexture);
  createGroundBlocks(129, 170, 0, 2, groundTexture);
}