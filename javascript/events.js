window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

//when key is pressed or is "down"
function onKeyDown() {
  if (event.keyCode == 37) {
    moveLeft = true;
  } // left arrow pressed
  if (event.keyCode == 38 || event.keyCode == 90) {
    moveUp = true;
  } // up or z arrow pressed
  if (event.keyCode == 39) {
    moveRight = true;
  } // right arrow pressed
  if (event.keyCode == 40) {
    moveDown = true;
  } // down arrow pressed
  if (event.keyCode == 27 || event.keyCode == 80) {
    paused = true;
  } // escape key pressed
  if (event.keyCode == 88) {
    mario.movementSpeed = screenWidth/100;
  } // x key pressed
}

//when key is not pressed or is "up"
function onKeyUp() {
  if (event.keyCode == 37) {
    moveLeft = false;
  } // left arrow released
  if (event.keyCode == 38 || event.keyCode == 90) {
    moveUp = false;
  } // up or z arrow released
  if (event.keyCode == 39) {
    moveRight = false;
  } // right arrow released
  if (event.keyCode == 40) {
    moveDown = false;
  } // down arrow released
  if (event.keyCode == 27 || event.keyCode == 80) {
    paused = false;
  } // escape key released
  if (event.keyCode == 88) {
    mario.movementSpeed = screenWidth/300;
  } // x key pressed
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
      //when player clicks play new game text
      if ((x > screenWidth*5/16 && x < screenWidth*11/16)&&(y > screenHeight*9/16 && y < screenHeight*10/16 )){
        coinsCollected = 0;
        score = 0;
        level = 1;
        refreshMainScene();
        currentScene = "preLevel";
        initialiseScene();
      }
      if((x > screenWidth*3/40 && x < screenWidth*3/40 + screenHeight*1.56/7)&&(y > screenHeight*16/32 && y < screenHeight/7 + screenHeight*16/32 )){
        refreshMainScene();
        currentScene = "helpScene";
        initialiseScene();
      }
    break;
    case "levelOne":
    case "levelTwo":
    case "levelThree":
     if(gameplayFreeze){
        //when player clicks resume game text
        if((x > screenWidth*3/8 && x < screenWidth*5/8) && (y > screenHeight*5/16 && y < screenHeight*29/80)) {
          gameplayFreeze = false;
          pausedBox = false;
        }
        //when player clicks main menu text
        if((x > screenWidth*3/8 && x < screenWidth*5/8) && (y > screenHeight*6/16 && y < screenHeight*34/80)) {
          refreshLevelAndGoToScene("main");
        }
      }
    break;
    case "helpScene":
      if((x > screenWidth*3/40 && x < screenWidth*3/40 + screenHeight*1.56/7)&&(y > screenHeight*16/32 && y < screenHeight/7 + screenHeight*16/32 )){
        currentScene = "main";
        initialiseScene();
      }
    break;
    default:
      console.log("nothing Triggered");
    break;
  }
}
