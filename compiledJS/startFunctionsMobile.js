'use strict';

//Setup
function CreateCanvas() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    if (initialRun == false) {
      createScreenChangeMultiplierArray(levelGround);
      createScreenChangeMultiplierArray(clouds);
      createScreenChangeMultiplierArray(levelEnemies);
      createScreenChangeMultiplierArray(levelBlocks);
      createScreenChangeMultiplierArray(levelCoins);
      createScreenChangeMultiplierArray(levelBackgroundObjects);
      createScreenChangeMultiplier(mario);
      xPositionInLevelMultiplier = xPositionInLevel / screenWidth;
    }

    if (window.innerWidth * 9 / 16 > window.innerHeight) {
      canvas.width = window.innerHeight * 16 / 9 - window.innerHeight / 4 * 16 / 9;
      canvas.height = window.innerHeight - window.innerHeight / 4;
    }
    if (window.innerHeight * 16 / 9 > window.innerWidth) {
      canvas.width = window.innerWidth - window.innerHeight / 4;
      canvas.height = window.innerWidth * 9 / 16 - window.innerHeight / 4 * 9 / 16;
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
      updateObjectToScreenChangeArray(levelEnemies);
      updateObjectToScreenChangeArray(levelBlocks);
      updateObjectToScreenChangeArray(levelCoins);
      updateObjectToScreenChangeArray(levelBackgroundObjects);
      xPositionInLevel = xPositionInLevelMultiplier * screenWidth;
      initialiseScreenSizeRelatedElements();
    }
    initialiseScene();
  }
  resizeCanvas();
  initialiseScreenSizeRelatedElements();
}

function initialiseScene() {
  if (levelLoaded == false) {
    window.mario = new Mario(screenHeight / 15, screenHeight * 4 / 5, blockSize * 12 / 16, blockSize * 15 / 16, marioTexture[0]);
    xPositionInLevel = 0;
    score = 0;
  }

  switch (currentScene) {
    case "main":
      //play();
      window.mario = new Mario(screenHeight / 15, screenHeight * 3 / 5, screenHeight * 1 / 10, screenHeight * 3 / 20, marioTexture[0]);
      //checks if clouds have been created
      if (createdClouds == false) {
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
    case "levelSelect":
      levelSelect();
      break;
    case "levelOne":
      createLevelInterval(levelOneScene);
      console.log("run");
      declareLevelOneObjects();
      levelLoaded = true;
      break;
    case "levelTwo":
      createLevelInterval(levelTwoScene);
      break;
    case "levelThree":
      createLevelInterval(levelThreeScene);
      break;
    default:
      console.log("no current scene");
      break;
  }
}