var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;
$(document).keydown(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});
 $(".btn").click(function(){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
        playsound(userChosenColour);
        animatePress(userChosenColour);
    });
    
function nextSequence(){
    level++;
    $("#level-title").text("Level"+" "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(500).fadeIn(500);
   playsound(randomChosenColour);
   
}
function playsound(name){
const audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
     $("#"+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        playsound("wrong");
         $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
level=0;
gamePattern=[];
userClickedPattern = [];
started=false;
}