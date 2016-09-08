- Mario NES remake programmer manual -

Introduction:
This program is a remake of the original mario NES game. As you may see
the program Canvas based and uses only Js, however includes a babel npm
package which can be used for converting the Es6 Js in the javascript
folder to Es5 in the compiledJS folder. It is seperated into an array
of Js files which link together reduce the amount of programming typing
required.

Js files and uses:

StartFunctionMobile.Js -
  Browser check - Checks the browsing device using inbuilt browser property values, a directs
    the device to the correct html page. Differentiates between mobile, Es6 and Es5 browsers.
  Creates the canvas - This is the function runs when the page is loaded, it gathers the
    dimensions of the screen and returns a 16:9 ratio (easier for sizing than full screen), it
    creates a screen multiplier for all objects in the levels so if a user is playing the game
    and resizes the window all the objects remain in place.
  Initialise Scene - This is a simple function which checks if the level is loaded and then
    directs the program to the correct scene by checking the currentScene value.

Scenes.Js -
  This consists of all the functions which run the different scenes
  Main - this is the main screen that the user is initially presented and allows a simple
    start screen because most users
