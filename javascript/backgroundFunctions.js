function initialiseBackgroundLevelOne(){
  levelBackgroundObjects = [];

  levelBackgroundObjects[0] = (new BackgroundObject(0, groundLevelY - hillLargeHeight, hillLargeWidth, hillLargeHeight, hillLargeTexture));
  levelBackgroundObjects[1] = (new BackgroundObject(screenWidth - blockSize*9, groundLevelY - hillSmallHeight, hillSmallWidth, hillSmallHeight, hillSmallTexture));
}
