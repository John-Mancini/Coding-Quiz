// Gathering HTML elements for Dom manipulation I get all my html elements by useing document.getElementById to call on all my html classes.
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

// This is where i create my quizQuestions variable making nall my questions objects with strings that state the question and possible answer choices and the correct answer.
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
// Other variables that i created so that i can get create a timer fucntion and a function that checks my questions and answers.
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft=100;
var timerInterval;
var score = 0;
var correctAnswer;


// This button starts the quiz
startQuizButton.addEventListener("click",startQuiz); // i declare startQuizButton and add an eventlistener to listen for a left click on the mouse which triggers my startQuiz function on line 90

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){ //declare function generateQuizQuestion
    gameoverSec.style.display = "none"; // use style.display = "none" to hide the gameoverSection linked to line 35 in the html.
    if (currentQuestionIndex === finalQuestionIndex){ // if currentQuestionIndex is equal to the final question in my objects then js will return showscore which is the final score linked to lines 108.
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex]; // create a variable currentQuestion and set it to my quizquestions which links this part to lines 27-31 of my html
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>"; //links to line 27
    buttonA.innerHTML = currentQuestion.choiceA; //links to line 28
    buttonB.innerHTML = currentQuestion.choiceB;//links to line 29
    buttonC.innerHTML = currentQuestion.choiceC;//links to line 30
    buttonD.innerHTML = currentQuestion.choiceD;//links to line 31
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){ //create startQuiz function
    gameoverSec.style.display = "none"; //hides game over box
    startQuizSec.style.display = "none"; //hides start button
    generateQuizQuestion(); //calls on generateQuizQuestions function

    //Timer
    timerInterval = setInterval(function() { //timerInterval uses js internal setInterval to start a timer countdown using a function.
        timeLeft--; //this line calls my variable timeLeft and subtracts it by 1 using -- 
        quizTimer.textContent = "Time left: " + timeLeft; //use the js intertnal script textContent to add a string that will say time left: + the amount of seconds left as the timer counts down linked to line 26 in html
    
        if(timeLeft === 0) {    // if statement that means if timeLeft is STRICTLY EQUAL to 0 then js will clear the interval of (timerInterval) and return the show score function
          clearInterval(timerInterval); // meaning is the timer hits 0 before the quiz is actually finished then the showscore function will appear
          showScore();
        }
      }, 1000); // this 1000 is miliseconds of countdown ensuring that the countdown is going down by 1 second everysecond when the quiz has started.
    quiz.style.display = "block";  //uses style.display ="block" so that my quiz element is displayed as a block-level element
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){ //declare showScore function
    quiz.style.display = "none" //hides the quiz block 
    gameoverSec.style.display = "flex"; // this makes may gameoverSec variable display as a block-level flex box
    clearInterval(timerInterval); // clears the timer off the screen 
    highscoreName.value = ""; // sets the highscore value to nothing so that the user can enter in initials / name
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!"; // links to line 36 in html and displays "you got (your score) out of (how many questions are in the quizQuestion by using .length) correct". .length is 5 because i have 5 questions. 
}

// submit button that saves the arrays of the highscore already saved in local storage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){  //add an event lisnter to submitScorebtn variable from line 15 to listen for mouse left click and then go to highscore page by making the function
    
    
    if(highscoreName.value === "") {         // if the highscore value is STRICTLY EQUAL  to nothing then the browser will alert the user that the initials block cannot be left blank.
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];  //use json.parse to turn my into data which is stored in the local storage by getting the scores from savedHighscores
        var currentUser = highscoreName.value.trim();    // these 4 lines make it so that when the highscore page is up it will display name and the username the person enter 
        var currentHighscore = {   
            name : currentUser,
            score : score
        };
    
        gameoverSec.style.display = "none";
        highscoreBox.style.display = "flex";
        highscoreSec.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));  // takes the localStorage and uses JSON.stringify to make the data back into a string 
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreUsername.innerHTML = ""; //links to line
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){ //for loop that continues to add every highscore until the highscore page is cleared
        var newNameSpan = document.createElement("li"); //creates li for score and name
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreUsername.appendChild(newNameSpan);  //appends the lis
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
    timeLeft = 101;
    score = 0;
    currentQuestionIndex = 0;
}

// This functions chesks if the answer chosen is right or wrong
function checkAnswer(answer){
    var currentQuestion=quizQuestions[currentQuestionIndex]
    var correctAnswer=currentQuestion.correctAnswer
    // correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correctAnswer && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the grades div that the answer is correct.
    }else if (answer !== correctAnswer && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        timeLeft -=15; //takes away 15 secs per wrong answer
        generateQuizQuestion();
        //display in the grades div that the answer is wrong.
    }else{
        showScore();
    }
}
