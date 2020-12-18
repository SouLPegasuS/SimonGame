
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var clickedPattern = [];

var level = 0;
var checkStart = false;



$(".btn").click(function(){
      var userChosenColour = $(this).attr("id");

      clickedPattern.push(userChosenColour);

      playSound(userChosenColour);

      animatePress(userChosenColour);

      checkAnswer(clickedPattern.length-1);
  }
)

$(document).keydown(function(){
      if(!checkStart){
        nextSequence();
        checkStart = true;
        $("h1").text("level 1");

      }
  }
)

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour){
        // temporary class for 100msec
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentIndex){
// check if recent clicked is write or not
  if(gamePattern[currentIndex]===clickedPattern[currentIndex]){
    // console.log("success");

    // when use got all write in current step
    if (clickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    // console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 250);
    $("h1").text( "Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){

  level++;
    $("h1").text("level "+level);
  clickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour;
  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);

  playSound(randomChosenColour);


}


function startOver(){
   level=0;
   gamePattern = [];
   checkStart = false;

}
