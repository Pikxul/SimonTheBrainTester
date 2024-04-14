
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.querySelector(".btnn").addEventListener( "click", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".btnn").fadeIn(80).fadeOut(80).fadeIn(80);
    }
});

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Game Button to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var n = Math.random();
    n = n * 4;
    var roundup_n = Math.floor(n);
    var randomNumber = roundup_n;
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $ ("#" + currentColour ).removeClass("pressed")
    }, 100);
}

function playSound(name) {
    var audio1 = new Audio(name + ".mp3");
    audio1.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}