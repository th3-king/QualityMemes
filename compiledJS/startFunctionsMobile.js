'use strict';

//Setup
browserDeviceCheck();

function CreateCanvas() {
  var canvas = document.getElementById('canvas');
  setTextures();

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    if (initialRun == false) {
      createScreenChangeMultiplierArray(levelGround);
      createScreenChangeMultiplierArray(clouds);
      createScreenChangeMultiplierArray(levelSprites);
      createScreenChangeMultiplierArray(levelBlocks);
      createScreenChangeMultiplierArray(levelCoins);
      createScreenChangeMultiplierArray(levelBackgroundObjects);
      createScreenChangeMultiplierArray(levelText);
      createScreenChangeMultiplier(mario);
      xPositionInLevelMultiplier = xPositionInLevel / screenWidth;
    }

    if (window.innerWidth * 9 / 16 > window.innerHeight) {
      canvas.width = window.innerHeight * 16 / 9;
      canvas.height = window.innerHeight;
    }
    if (window.innerHeight * 16 / 9 > window.innerWidth) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth * 9 / 16;
    }
    screenWidth = canvas.width;
    screenHeight = canvas.height;

    mobileButtons();

    if (initialRun == true) {
      window.mario = new Mario(screenHeight / 15, screenHeight * 3 / 5, screenHeight * 1 / 10, screenHeight * 3 / 20, marioTexture);
      initialRun = false;
    } else {
      updateObjectToScreenChangeArray(levelGround);
      updateObjectToScreenChange(mario);
      updateObjectToScreenChangeArray(levelSprites);
      updateObjectToScreenChangeArray(levelBlocks);
      updateObjectToScreenChangeArray(levelCoins);
      updateObjectToScreenChangeArray(levelBackgroundObjects);
      updateObjectToScreenChangeArray(levelText);
      xPositionInLevel = xPositionInLevelMultiplier * screenWidth;
      initialiseScreenSizeRelatedElements();
    }
    initialiseScene();
  }
  resizeCanvas();
  initialiseScreenSizeRelatedElements();
}

function initialiseScene() {
  if (!levelLoaded) {
    xPositionInLevel = 0;
  }
  switch (currentScene) {
    case "main":
      //play();
      //checks if clouds have been created
      if (!createdClouds) {
        createClouds(randomNum(3, 1));
        createdClouds = true;
      } else {
        updateObjectToScreenChangeArray(clouds);
      }
      //runs main scene with interval (due to clouds)
      if (startScreenInterval == undefined || startScreenInterval == 0) {
        startScreenInterval = setInterval(mainScene, 15);
      }
      break;
    case "helpScene":
      helpScene();
      break;
    case "preLevel":
      preLevel();
      break;
    case "levelOne":
      level = 1;
      backgroundColour = "#4B7DFA";
      createLevelInterval(levelScene);
      if (!levelLoaded) {
        window.mario = new Mario(screenHeight / 15, screenHeight * 4 / 5, blockSize * 12 / 16, blockSize * 15 / 16, marioTexture[0]);
        declareLevelOneObjects();
        levelLoaded = true;
      }
      break;
    case "levelTwo":
      level = 2;
      backgroundColour = "black";
      createLevelInterval(levelScene);
      if (!levelLoaded) {
        window.mario = new Mario(blockSize * 1.625, blockSize * 3.0625, blockSize * 12 / 16, blockSize * 15 / 16, marioTexture[0]);
        declareLevelTwoObjects();
        levelLoaded = true;
      }
      break;
    case "levelThree":
      level = 3;
      createLevelInterval(levelScene);
      if (!levelLoaded) {
        window.mario = new Mario(blockSize * 2.5, groundLevelY - blockSize, blockSize * 12 / 16, blockSize * 15 / 16, marioTexture[0]);
        declareLevelThreeObjects();
        levelLoaded = true;
      }
      break;
    default:
      console.log("no current scene");
      break;
  }
}