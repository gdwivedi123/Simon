
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
