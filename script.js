let userClickedPattern = [];
let gameStarted = false;

$(".btn").click(function (event) {
  console.log("Button clicked");
  if (!gameStarted && !$(event.target).is("#startButton")) {
    console.log("Game not started yet");
    alert("Please click Start to begin the game!");
    return; // Don't proceed if the game has not started
  }
  let userChosenColor = $(event.target).attr("id");
  console.log("User chosen color:", userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log("User clicked pattern:", userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let audioFiles = {
  "red": new Audio("./sounds/red.mp3"),
  "blue": new Audio("./sounds/blue.mp3"),
  "green": new Audio("./sounds/green.mp3"),
  "yellow": new Audio("./sounds/yellow.mp3"),
  "wrong": new Audio("./sounds/wrong.mp3"),
};

let level = 0;

function nextSequence() {
  userClickedPattern = []; // Reset user's clicked pattern
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("Game pattern:", gamePattern);
  selectButton(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

function startGame() {
  console.log("Starting game");
  level = 0;
  gameStarted = true;
  $("#level-title").text("Level " + level);
  gamePattern = [];
  nextSequence();
}

function selectButton(color) {
  $("#" + color)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100, function () {
      playSound(color);
    });
}

function playSound(color) {
  console.log("Playing sound for color:", color);
  if (audioFiles[color]) {
    audioFiles[color].play();
  }
}

function checkAnswer(currentLevel) {
  console.log("Checking answer for level:", currentLevel);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("Pattern matched, moving to next level");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Pattern mismatch, game over");
    gameOver();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function gameOver() {
  console.log("Game over");
  if (gameStarted) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);
    playSound;
    $("#level-title").text("Game Over, Press Start to Restart");
    // alert("Game Over! Press Start to Restart.");
  }
  startOver();
}

function startOver() {
  console.log("Starting over");
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$("#startButton").click(function () {
  console.log("Start button clicked");
  if (!gameStarted) {
    startGame();
  }
});
