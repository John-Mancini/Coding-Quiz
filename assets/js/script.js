//Gathering Element ids from html
var actualQuiz = document.getElementById("quiz");
var scoreEl = document.getElementById("grade");
var finalScoreEl = document.getElementById("finalScore");
var gameoverSec = document.getElementById("gameover");
var questonsEl=document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizSec= document.getElementById("start-page");
var highscoreBox=document.getElementById("highscoreBox")
var highscoreSec=document.getElementById("highscore-Page");
var highscoreUserName=document.getElementById("initials");
var highscoreName=document.getElementById("highscore-initials");
var endGameBtns=document.getElementById("endGameBtns");
var submitGradeBtn=document.getElementById("sumbitScore");
var DisplayScore=document.getElementById("highscore-score");
var buttonA=document.getElementById("a");
var buttonB=document.getElementById("b");
var buttonC=document.getElementById("c");
var buttonD=document.getElementById("d");

//Quiz Questions

var quizQuestions = [{
    question:"1. An array can hold up to __________ elements?",
    choiceA:"3428372837",
    choiceB:"4294967296",
    choiceC:"5124312347",
    choiceD:"4814124156",
    correctAnswer:"b"},

{
    question:"2.What does DOM stand for?",
    choiceA:"Domination",
    choiceB:"Dominican Republic",
    choiceC:"Days on Market",
    choiceD:"Document Object Model",
    correctAnswer:"d"},

{
    question:"3. What does CSS stand for in programming?",
    choiceA:"Cascading Style Sheet",
    choiceB:"Counter-Strike:Source",
    choiceC:"Customer Self Service",
    choiceD:"Class software Solutions",
    correctAnswer:"a"},

{
    question:"4. What HTML attribute references an external Javascript file?",
    choiceA:"class",
    choiceB:"src",
    choiceC:"href",
    choiceD:"index",
    correctAnswer:"b"},

{
    question:"5. Who created Javascript",
    choiceA:"Bill Gates",
    choiceB:"Guido van Rossum",
    choiceC:"Brendan Eich",
    choiceD:"Steve Jobs",
    correctAnswer:"c"},
];

//Other Variables
var finalQuestionIndex= quizQuestions.length;
var currentQuestionIndex=0;
var timeLeft=100;
var timeinterval;
var score=0;
var correct;

//this function cycles thru the quiz questions 
function generateQuizQuestion(){
    gameoverSec.style.display = "none";
    if (currentQuestionIndex ===finalQuestionIndex){
        return showScore();
    }
    var currentQuestion=quizQuestions[currentQuestionIndex];
    questonsEl.innerHTML="<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML= currentQuestion.choiceA;
    buttonB.innerHTML= currentQuestion.choiceB;
    buttonC.innerHTML= currentQuestion.choiceC;
    buttonD.innerHTML= currentQuestion.choiceD;
};

//Start quiz function that starts timer, hides start page, and displays questions.
function startQuiz(){
    gameoverSec.style.display = "none";
    startQuizSec.style.display = "none";
    generateQuizQuestion();
    //timer
    timeinterval = setInterval(function(){
        timeLeft--;
        quizTimer.textContent="Time left:" + timeLeft;

        if(timeLeft===0){
            clearInterval(timeinterval);
            showScore();
        }       
    },1000);
    actualQuiz.style.display = "block";
}
//Function that displays score
function showScore(){
    actualQuiz.style.display = "none"
    gameoverSec.style.display = "flex";
    clearInterval(timerInterval);
    highscoreUserName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreUserName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreUserName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverSec.style.display = "none";
        highscoreBox.style.display = "flex";
        highscoreSec.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }   
});

//This fucntion clears the highscores
function generateHighscores(){
    highscoreName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreName.appendChild(newNameSpan);
        DisplayScore.appendChild(newScoreSpan);
    }
}

//
function showHighscore(){
    startQuizSec.style.display = "none"
    gameoverSec.style.display = "none";
    highscoreBox.style.display = "flex";
    highscoreSec.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

//
function clearScore(){
    window.localStorage.clear();
    highscoreName.textContent = "";
    DisplayScore.textContent = "";
}

//
function replayQuiz(){
    highscoreBox.style.display = "none";
    gameoverSec.style.display = "none";
    startQuizSec.style.display = "flex";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
}

//

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

//
startQuizButton.addEventListener("click",startQuiz);

