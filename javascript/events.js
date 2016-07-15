window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

//when key is pressed or is "down"
function onKeyDown() {
  if (event.keyCode == 37) {
    moveLeft = true;
  } // left arrow pressed
  if (event.keyCode == 38) {
    moveUp = true;
  } // up arrow pressed
  if (event.keyCode == 39) {
    moveRight = true;
  } // right arrow pressed
  if (event.keyCode == 40) {
    moveDown = true;
  } // down arrow pressed
  if (event.keyCode == 27) {
    paused = true;
  } // escape key pressed
}

//when key is not pressed or is "up"
function onKeyUp() {
  if (event.keyCode == 37) {
    moveLeft = false;
  } // left arrow released
  if (event.keyCode == 38) {
    moveUp = false;
  } // up arrow released
  if (event.keyCode == 39) {
    moveRight = false;
  } // right arrow released
  if (event.keyCode == 40) {
    moveDown = false;
  } // down arrow released
  if (event.keyCode == 27) {
    paused = false;
  } // escape key released
}

window.addEventListener("mousedown", getPositionClick, false);

//mouse postition
function getPositionClick(event) {
  var x = event.x;
  var y = event.y;

  var canvas = document.getElementById("canvas");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  switch (currentScene) {
    case "main":
      if ((x > screenWidth*5/16 && x < screenWidth*11/16)&&(y > screenHeight*9/16 && y < screenHeight*10/16 )){
        clearInterval(startScreenInterval);
        currentScene = "levelSelect";
        initialiseScene();
      }
    break;
    case "levelSelect":
      if((x > screenWidth*5/23 && x < screenWidth*8/23) && (y > screenHeight*2/7 && y < screenHeight*2/7 + screenWidth*3/23)) {
        currentScene = "levelOne";
        initialiseScene();
      }
    break;
    case "levelOne":
      if((x > screenWidth*3/8 && x < screenWidth*5/8) && (y > screenHeight*5/16 && y < screenHeight*29/80)) {
        gameplayFreeze = false;
      }
      if((x > screenWidth*3/8 && x < screenWidth*5/8) && (y > screenHeight*3/8 && y < screenHeight*17/40)) {
        refreshLevelAndGoToScene("levelSelect");
      }
    break;
    default:
      console.log("nothing Triggered");
    break;
  }
}

window.addEventListener("mouseover", getPositionHover, false);

function getPositionHover(event) {
  var x = event.x;
  var y = event.y;

  var canvas = document.getElementById("canvas");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  if((x > screenWidth*5/16 && x < screenWidth*11/16)&&(y > screenHeight*9/16 && y < screenHeight*10/16 )){
  }
}
