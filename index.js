//
// var buttonColours = ["red", "blue", "green", "yellow"];
// var gameStarted = false;
// var gamePattern = [];
// var userClickedPattern = [];
// var level = -1;
// $(document).keypress(function()
// {
//   if(gameStarted === false)
//   {
//     console.log("Game Started");
//     gameStarted = true;
//     nextSequence();
//   }
// });
//
//
// function nextSequence() {
//   level += 1;
//   console.log("Level : " + level);
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);
//   $("h1").html("Level " + level);
//   animatePress(randomChosenColour);
//   playSound(randomChosenColour);
//
//   var index = 0, length = gamePattern.length;
//   var flag = true;
//   while(index < length && flag === true)
//   {
//       $("button").click(function() {
//
//       var userChosenColour = $(this).attr("class");
//       //userClickedPattern.push(userChosenColour);
//       if(userChosenColour === gamePattern[index])
//       {
//         playSound(userChosenColour);
//         animatePress(userChosenColour);
//         index += 1;
//       }
//       else{
//         wrongAnswer();
//         playSound("wrong");
//         reset();
//       }
//     });
//     if(flag === false)
//     {
//       break;
//     }
//   }
//   if(flag == true)
//   {
//     setTimeout(function () {
//       nextSequence();
//   }, 1000);
// }
// }
//
// function playSound(name) {
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
// }
//
// //1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
// function animatePress(currentColor) {
//
//   //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
//   $("." + currentColor).addClass("pressed");
//   $("." + currentColor).fadeOut(100).fadeIn(100);
//   //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
//   setTimeout(function () {
//     $("." + currentColor).removeClass("pressed");
//   }, 100);
// }
//  function wrongAnswer()
//  {
//    $(body).addClass("wrong-answer");
//    $("h1").html("Game Over, press any key to Start.");
//    setTimeout(function () {
//      $(body).removeClass("wrong-answer");
//    }, 200);
//  }
//
// function reset()
// {
//   gamePattern = []
//   level = -1;
//   gameStarted = false;
// }


var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var gamePatternLength = 0;
var userPatternLength = 0;
var gameStarted = false;
var level = 0;

$(document).keypress(function(){
  if(!gameStarted)
  {
    gameStarted = true;
    console.log("Game Started");
    nextSequence();
  }
})

$("button").click(function ()
{
  userPatternLength++;
  var userChosenColor = $(this).attr("class");
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  validate();
})

function validate()
{
  if(userPattern[userPatternLength - 1] != gamePattern[userPatternLength - 1])
  {
    $("h1").html("Game Over. Press any key to start.");
    wrong();
    reset();
  }
  else if(userPatternLength == gamePatternLength)
  {
    setTimeout(function () {
      nextSequence();
      }, 1000);
  }
}

function nextSequence()
{
  userPattern = [];
  userPatternLength = 0;

  $("h1").html("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = colors[randomNumber];

  gamePattern.push(chosenColor);
  gamePatternLength++;

  playSound(chosenColor);
  animatePress(chosenColor);
}

function wrong()
{
  playSound("wrong");
  $('body').css("background-color", "red");
  setTimeout(function () {
    $('body').css("background-color", "#005086");
  }, 400);
}

function playSound(chosenColor)
{
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function animatePress(chosenColor)
{
  $("." + chosenColor).fadeOut(100).fadeIn(100);

  $("." + chosenColor).addClass("pressed");
  setTimeout(function () {
    $("." + chosenColor).removeClass("pressed")
  }, 100);
}
function reset()
{
  gamePatternLength = 0;
  userPatternLength = 0;
  gamePattern = [];
  userPattern = [];
  gameStarted = false;
  level = 0;
}
