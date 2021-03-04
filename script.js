// Gathering HTML elements for manipulation
var quiz = document.getElementById("quiz");
var gradesEl = document.getElementById("grade");
var finalScoreEl = document.getElementById("finalScore");
var gameoverSec = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizSec = document.getElementById("start-page");
var highscoreBox = document.getElementById("highscoreBox");
var highscoreSec = document.getElementById("highscore-Page");
var highscoreName = document.getElementById("initials");
var highscoreUsername = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
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
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverSec.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverSec.style.display = "none";
    startQuizSec.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quiz.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quiz.style.display = "none"
    gameoverSec.style.display = "flex";
    clearInterval(timerInterval);
    highscoreName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// submit button that saves the arrays of the highscore already saved in local storage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreName.value.trim();
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

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreUsername.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreUsername.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page and hides all the other pages
function showHighscore(){
    startQuizSec.style.display = "none"
    gameoverSec.style.display = "none";
    highscoreBox.style.display = "flex";
    highscoreSec.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears out the local storage of initials and scores.
function clearScore(){
    window.localStorage.clear();
    highscoreUsername.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function resets everything so that you can play the game again.
function replayQuiz(){
    highscoreBox.style.display = "none";
    gameoverSec.style.display = "none";
    startQuizSec.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This functions chesks if the answer chosen is right or wrong
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the grades div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the grades div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz
startQuizButton.addEventListener("click",startQuiz);