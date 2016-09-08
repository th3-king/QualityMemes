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
  drawImageOnCanvas(screenHeight/15, screenHeight*3/5, screenHeight*1/10, screenHeight*3/20, marioTexture[0]);

  //draws clouds and moves clouds
  for(var i = 0; i < clouds.length; i++){
    clouds[i].draw();
    clouds[i].moveCloud();
  }

  drawTopBar("black");

  //title and speach bubble has to go after cloud due to layering
  drawImageOnCanvas(screenWidth/4, screenHeight/8, screenWidth/2, screenHeight/3, titleTexture);
  drawImageOnCanvas(screenWidth*3/40, screenHeight/2, screenHeight*1.56/7, screenHeight/7, helpButtons[0]);

  //play button
  drawImageOnCanvas(screenWidth*5/16, screenHeight*9/16, screenWidth*3/8, screenHeight/16, playButton);
}

function helpScene() {
  clearScene();

  //background
  drawRect(0,0, screenWidth, screenHeight, "#4B7DFA");
  //floor
  imageRepeat(groundTexture, 0, screenHeight*6/8, screenHeight/8, screenHeight/8, screenWidth/(screenHeight*1/8), 2);
  //two hills
  drawImageOnCanvas(screenWidth/6, screenHeight*11/16, hillSmallWidth, hillSmallHeight, hillSmallTexture);
  drawImageOnCanvas(screenWidth*2/7, screenHeight*10/16, hillLargeWidth, hillLargeHeight, hillLargeTexture);


  //mario drawing
  drawImageOnCanvas(screenHeight/15, screenHeight*3/5, screenHeight*1/10, screenHeight*3/20, marioTexture[0]);

  //help text
  drawText(screenWidth/2, screenHeight*3/20 ,"emulogic", screenHeight/10, "center", "black", "help");
  drawText(screenWidth*4/20, screenHeight*5/20 ,"emulogic", screenHeight/26, "left", "black", "Uses theses keys to move Mario");
  drawText(screenWidth*4/20, screenHeight*6/20 ,"emulogic", screenHeight/26, "left", "black", "around");
  drawText(screenWidth*12/20, screenHeight*9/20 ,"emulogic", screenHeight/26, "left", "black", "Press X key to");
  drawText(screenWidth*12/20, screenHeight*10/20 ,"emulogic", screenHeight/26, "left", "black", "jump");
  drawText(screenWidth*2/20, screenHeight*9/20 ,"emulogic", screenHeight/26, "left", "black", "Press Z key to run");

  //keyboard key images
  drawImageOnCanvas(screenWidth/40, screenHeight*4/20, screenWidth*3/20, screenHeight/6, helpKeys[0]);
  drawImageOnCanvas(screenWidth*16/30, screenHeight*8/20, screenHeight/10, screenHeight/10, helpKeys[1]);
  drawImageOnCanvas(screenWidth/30, screenHeight*8/20, screenHeight/10, screenHeight/10, helpKeys[2]);

  //speach bubble
  drawImageOnCanvas(screenWidth*3/40, screenHeight*16/32, screenHeight*1.56/7, screenHeight/7, helpButtons[1]);
}

//Level Selection scene
function preLevel() {
  //Draw background
  drawRect(0,0, screenWidth, screenHeight, "black");
  drawTopBar("white");
  drawText(screenWidth/2, screenHeight/3, "emulogic", screenWidth/45 , "center", "white", "world 1-" + level.toString());
  drawImageOnCanvas(screenWidth/2 - blockSize*30/16, screenHeight/2 - blockSize*18/16, blockSize*24/16, blockSize*30/16, marioTexture[0]);
  drawText(screenWidth/2, screenHeight/2 ,"emulogic", screenWidth/50 , "left", "white", "x " + lives.toString());

  gameTime = 400;
  counter = 0;
  setTimeout(function(){
    currentScene = "levelThree";
    initialiseScene();
  } , 3000);

}

//Level One scene
function levelScene(){
  // background/clear
  drawRect(0,0, screenWidth, screenHeight, backgroundColour);
  initialiseLevelText(textColour);

  // objects and mario
  for(var i = 0; i < levelCoins.length; i++){
    if(!levelCoins[i].collected){
      levelCoins[i].draw();
    }
  }

  drawArray(levelGround);
  drawArray(levelBackgroundObjects);
  drawRemovableArray(levelBlocks);
  drawImageOnCanvas(screenWidth*3/10 - blockSize, screenHeight*2/18 - blockSize*5/6, blockSize*2/3, blockSize, coin[0]);

  for(var i = 0; i < levelSprites.length; i++){
    if(inScreen(levelSprites[i])){
      if (!levelSprites[i].removed && !levelSprites[i].spawning) {
        levelSprites[i].draw();
        levelSprites[i].collisions();
        if (!levelSprites[i].squashed && !gameplayFreeze){
          levelSprites[i].detectCollisionWithMario();
        }
      }
    }
  }
  mario.draw();

  //update
  if (!gameplayFreeze){
    //mario update
    if(!ending){
      mario.jumpAction();
      mario.moveAction();
      updateTime();
    }
    //sprite update
    for(var i = 0; i < levelSprites.length; i++){
      levelSprites[i].moveWithMario();
      if(levelSprites[i].spawning){
        levelSprites[i].spawning = false;
      }
    }
    //blocks update
    groundNotCollidedWith = [];
    collisionWithArrayOfBlocks(groundNotCollidedWith, allLevelBlocks);

    for(var i = 0; i < levelBlocks.length; i++){
  		  levelBlocks[i].moveWithMario();
  		  levelBlocks[i].detectCollisionWithMario();
  	}

    if(groundNotCollidedWith.length == allLevelBlocks.length){
      floorCollision = false;
    }

    for(var i = 0; i < levelCoins.length; i++){
      if(!levelCoins[i].collected){
        levelCoins[i].detectCollisionWithMario();
        levelCoins[i].moveWithMario();
      }
    }

    for(var i = 0; i < levelBackgroundObjects.length; i++){
      levelBackgroundObjects[i].moveWithMario();
    }

    if(!floorCollision && !mario.jump){
      mario.fallAction();
    }

    if(mario.y + mario.height > screenHeight || gameTime === 0){
      mario.gameOver();
    }
  }
  //pause scene causing menu to appear
  pauseScene();
  drawArray(levelText);

}
