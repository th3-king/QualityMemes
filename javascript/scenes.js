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
function preLevel() {
  //Draw background
  drawRect(0,0, screenWidth, screenHeight, "black");
  drawText(screenWidth/50, screenHeight/18 ,"emulogic", screenWidth/50 , "left", "white", "Mario ");
  drawText(screenWidth*3/10, screenHeight*2/18 ,"emulogic", screenWidth/50 , "left", "white", "x" + coinsCollected.toString());
  drawImageOnCanvas(screenWidth*3/10 - blockSize, screenHeight*2/18 - blockSize*5/6, blockSize*2/3, blockSize, coin[0]);
  drawText(screenWidth*3/5, screenHeight/18 ,"emulogic", screenWidth/50 , "center", "white", "world");
  drawText(screenWidth*3/5, screenHeight*2/18 ,"emulogic", screenWidth/50 , "center", "white", "1-" + level.toString());
  drawText(screenWidth*49/50, screenHeight/18 ,"emulogic", screenWidth/50 , "right", "white", "Time");
  drawImageOnCanvas(screenWidth/2 - blockSize*30/16, screenHeight/2 - blockSize*18/16, blockSize*24/16, blockSize*30/16, marioTexture[0]);
  drawText(screenWidth/2, screenHeight/2 ,"emulogic", screenWidth/50 , "left", "white", "x " + lives.toString());

  setTimeout(function(){
    currentScene = "levelOne";
    initialiseScene();
  } , 3000);

}

//Level One scene
function levelScene(){
  //clear
  clearScene();

  //background
  drawRect(0,0, screenWidth, screenHeight, "#4B7DFA");

  //objects and mario
  for(var i = 0; i < levelCoins.length; i++){
    if(levelCoins[i].collected == false){
      levelCoins[i].draw();
    }
  }
  drawArray(levelGround);
  drawArray(levelBackgroundObjects);
  drawArray(levelBlocks);
  drawArray(levelText);
  for(var i = 0; i < levelEnemies.length; i++){
    if (levelEnemies[i].removed == false) {
      levelEnemies[i].draw();
    }
    if (levelEnemies[i].squashed == false){
      levelEnemies[i].detectCollisionWithMario();
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
    groundNotCollidedWith = [];
    collisionWithArrayOfBlocks(groundNotCollidedWith, levelGround);
    for(var i = 0; i < levelBlocks.length; i++){
  		levelBlocks[i].moveWithMario();
  		levelBlocks[i].detectCollisionWithMario();
  	}

    if(groundNotCollidedWith.length == levelGround.length){
      floorCollision = false;
    }

    for(var i = 0; i < levelCoins.length; i++){
      if(levelCoins[i].collected == false){
        levelCoins[i].detectCollisionWithMario();
        levelCoins[i].moveWithMario();
      }
    }

    for(var i = 0; i < levelBackgroundObjects.length; i++){
      levelBackgroundObjects[i].moveWithMario();
    }

    if(floorCollision == false && mario.jump == false){
      mario.fallAction();
    }
  }
  if(mario.y + mario.height > screenHeight){
    //gameoverScene
  }
  //console.log(xPositionInLevel);
  //pause scene causing menu to appear
  pauseScene();
}
