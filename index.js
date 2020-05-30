var userSelectedPattern = [];
var systemPattern = [];
var colors = ["green", "blue", "red", "yellow"];

var level = 0;
var started = false;

$(document).keypress(function (e) {
    if (started == false) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var clickedColor = $(this).attr("id");
    userSelectedPattern.push(clickedColor);
    keyAnimation(clickedColor);
    makeSound(clickedColor);
    checkAnswer(userSelectedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userSelectedPattern[currentLevel] === systemPattern[currentLevel]) {
        if (userSelectedPattern.length === systemPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game-Over, Press Any Key to Start");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userSelectedPattern = [];
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(4 * Math.random());
    var randomColor = colors[randomNumber];
    systemPattern.push(randomColor);
    $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomColor);
}

function startOver() {
    started = false;
    level = 0;
    systemPattern = [];
}

function makeSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function keyAnimation(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);
}