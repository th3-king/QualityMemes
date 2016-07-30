if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
// Take the user to a different screen here.
window.location = "marioMobile.html"
}

//Setup
function CreateCanvas() {
  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');

// resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    if (initialRun == false){
      createScreenChangeMultiplierArray(clouds);
      createScreenChangeMultiplierArray(levelEnemies);
      createScreenChangeMultiplierArray(levelBlocks);
      createScreenChangeMultiplierArray(levelCoins);
      createScreenChangeMultiplierArray(levelBackgroundObjects);
      createScreenChangeMultiplier(mario);
      xPositionInLevelMultiplier = xPositionInLevel/screenWidth;
    }

  	if ((window.innerWidth*9/16) > window.innerHeight) {
      canvas.width = window.innerHeight*16/9;
  		canvas.height = window.innerHeight;
    }
    if (window.innerHeight*16/9 > window.innerWidth) {
    	canvas.width = window.innerWidth;
    	canvas.height = window.innerWidth*9/16;
    }
    screenWidth = canvas.width;
    screenHeight = canvas.height;

    if (initialRun == true){
      window.mario = new Mario(screenHeight/15, screenHeight*3/5, screenHeight*1/10, screenHeight*3/20, screenWidth/200, marioTexture);
      initialRun = false;
    } else {
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
  if (levelLoaded == false){
    window.mario = new Mario(screenHeight/15, screenHeight*3/5, screenHeight*1/10, screenHeight*3/20, screenWidth/500, marioTexture);
    xPositionInLevel = 0;
    score = 0;
  }

  switch (currentScene) {
    case "main":
      //play();
      
      //checks if clouds have been created
      if (createdClouds == false){
        createClouds(randomNum(3,1));
        createdClouds = true;
      } else {
        updateObjectToScreenChangeArray(clouds);
      }
      //runs main scene with interval (due to clouds)
      if (startScreenInterval == undefined || startScreenInterval == 0){
        startScreenInterval = setInterval(mainScene, 15);
      }
  	break;
    case "levelSelect":
      levelSelect();
    break;
  	case "levelOne":
      window.mario = new Mario(screenHeight/15, screenHeight*4/5, screenHeight*14/225, screenHeight*7/75, screenWidth/400, marioTexture);
  		createLevelInterval(levelOneScene);
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
