//Scenes

//main/opening scene
function mainScene() {
  //clear scene
  clearScene();

  //background
  drawRect(0,0, screenWidth, screenHeight, "#4B7DFA");
  //floor
  imageRepeat(groundTexture, 0, screenHeight*6/8, screenHeight/8, screenHeight/8, screenWidth/(screenHeight*1/8), 2);
  //two hills
  drawImageOnCanvas(screenWidth/6, screenHeight*11/16, hillSmallWidth, hillSmallHeight, hillSmallTexture);
  drawImageOnCanvas(screenWidth*2/7, screenHeight*10/16, hillLargeWidth, hillLargeHeight, hillLargeTexture);

  //sprites
  mario.draw();

  //draws clouds and moves clouds
  for(var i = 0; i < clouds.length; i++){
    clouds[i].draw();
    clouds[i].moveCloud();
  }

  //title has to go after cloud due to layering
  drawImageOnCanvas(screenWidth/4, screenHeight/8, screenWidth/2, screenHeight/3, titleTexture);

  //play button
  drawImageOnCanvas(screenWidth*5/16, screenHeight*9/16, screenWidth*3/8, screenHeight/16, playButton);
}


//Level Selection scene
function levelSelect() {
  //clear
  clearScene();

  //Draw background
  drawRect(0,0, screenWidth, screenHeight, "#4B7DFA");
  imageRepeat(groundTexture, 0, screenHeight*6/8, screenHeight/8, screenHeight/8, screenWidth/(screenHeight/8), 2);
  drawImageOnCanvas(screenWidth/6, screenHeight*11/16, screenHeight/4, screenHeight/16, hillSmallTexture);
  drawImageOnCanvas(screenWidth*2/7, screenHeight*10/16, screenHeight/3, screenHeight/8, hillLargeTexture);

  //Level boxes
  drawImageOnCanvas(screenWidth*5/23, screenHeight*2/7, screenWidth*3/23, screenWidth*3/23, levelOneBox);
  drawImageOnCanvas(screenWidth*10/23, screenHeight*2/7, screenWidth*3/23, screenWidth*3/23, levelLockedBox);
  drawImageOnCanvas(screenWidth*15/23, screenHeight*2/7, screenWidth*3/23, screenWidth*3/23, levelLockedBox);

}

//Level One scene
function levelOneScene(){
  //clear
  clearScene();

  //draw
  drawRect(0,0, screenWidth, screenHeight, "#4B7DFA");
  imageRepeat(groundTexture, groundXPosition(), groundLevelY, blockSize, blockSize, screenWidth/blockSize + 1, 2);
  drawText(screenWidth/50, screenHeight/18 ,"emulogic", "20px", "left", "black", ("score: " + score.toString()))

  for(var i = 0; i < levelBlocks.length; i++){
    levelBlocks[i].draw();
  }
  for(var i = 0; i < levelBackgroundObjects.length; i++){
    levelBackgroundObjects[i].draw();
  }
  for(var i = 0; i < levelEnemies.length; i++){
    if (levelEnemies[i].removed == false) {
      levelEnemies[i].draw();
    }
    if (levelEnemies[i].squashed == false){
      enemyDetectCollision(mario, levelEnemies[i]);
    }
  }
  for(var i = 0; i < levelCoins.length; i++){
    if(levelCoins[i].collected == false){
      levelCoins[i].draw();
    }
  }
  mario.draw();
  
  //update
  if (gameplayFreeze == false){
    //mario update
    mario.moveAction();
    mario.jumpAction();
    //sprite update
    for(var i = 0; i < levelEnemies.length; i++){
      levelEnemies[i].moveWithMario();
    }
    //blocks update
    blocksNotCollidedWith = [];
    for(var i = 0; i < levelBlocks.length; i++){
      levelBlocks[i].moveWithMario();
      if(isColliding(mario, levelBlocks[i]) == true){
        levelBlocks[i].detectCollisionWithMario();
      } else {
        blocksNotCollidedWith.push(false);
      };
    };

    //checks to see if colliding with any blocks, otherwise falls to ground
    if(blocksNotCollidedWith.length == levelBlocks.length){
      if(mario.y + mario.height < screenHeight*67/75 && mario.jump == false) {
        mario.fallAction()
      };
    };

    for(var i = 0; i < levelCoins.length; i++){
      if(levelCoins[i].collected == false){
        levelCoins[i].detectCollisionWithMario();
        levelCoins[i].moveWithMario();
      }
    }
    for(var i = 0; i < levelBackgroundObjects.length; i++){
      levelBackgroundObjects[i].moveWithMario();
    }
  }

  //console.log(xPositionInLevel);
  //pause scene causing menu to appear
  pauseScene();
}
