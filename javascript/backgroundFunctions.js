function initialiseBackgroundLevelOne(){
  levelBackgroundObjects = [];

  levelBackgroundObjects[0] = (new BasicObject(0, groundLevelY - hillLargeHeight, hillLargeWidth, hillLargeHeight, hillLargeTexture));
  levelBackgroundObjects[1] = (new BasicObject(screenWidth - blockSize*9, groundLevelY - hillSmallHeight, hillSmallWidth, hillSmallHeight, hillSmallTexture));
}
