var time = questions.length * 15;
var timerID;
var currentQIndex = 0;

var questionsEL = document.getElementById("questions");
var startBtn = document.getElementById("start");
var subBtn = document.getElementById("submit");
var nameEL = document.getElementById("name");
var timerEL = document.getElementById("time");
var optionsEL = document.getElementById("options")
var feedbackEL = document.getElementById("feedback")


function startQuiz(){
    var startScreenEL = document.getElementById("start-screen")
    startScreenEL.setAttribute("class", "hide");

    timerID = setInterval(clockTick, 1000)
    timerEL.textContent = time;

    getQuestion();
}

function getQuestion(){
    var currentQ = questions[currentQIndex]

    var titleEL = document.getElementById("q-title");
    titleEL.textContent = currentQ.title;

    optionsEL.innerHTML = "";

    currentQ.options.forEach(function(option, i){
        var optionNode = document.createElement("button");
        optionNode.setAttribute("class", "option");
        optionNode.setAttribute("value", option)
        optionNode.textContent = i + 1 + "." + option;

        optionNode.onclick = questionClick; 

        optionsEL.appendChild(optionNode);
    }); 
}

function questionClick(){
    if(this.value !== questions[currentQIndex].answer){
        time -= 15;
        if (time < 0){
            time = 0
        }
        timerEL.textContent = time;

        feedbackEL.textContent = "Incorrect!"
    }else{
        feedbackEL.textContent = "Correct"
    }

    feedbackEL.setAttribute("class", "feedback");
    setTimeout(function(){
        feedbackEL.setAttribute("class", "feedback-hide");
    }, 1000);

    currentQIndex++;

    if(currentQIndex === questions.length){
        quizOver();
    }else{
        getQuestion()
    }
}

function quizOver() {
    clearInterval(timerID);

    var endScreenEL = document.getElementById("end-screen");
    scoreEl.textContent = time;

    questionsEL.setAttribute("class", "hide");
}

function clockTick(){
    time--;
    timerEL.textContent = time;

    if(time <= 0){
        quizOver();
    }
}

function saveHS(){
    var name = nameEL.value.trim();

    if(name !==""){
        var HS = JSON.parse(window.localStorage.getItem("high-scores")) || [];

        var newScore = {
            score: time,
            name: name
        };
        HS.push(newScore);
        window.localStorage.setItem("high-scores", JSON.stringify(HS));

        window.location.href = "hs.html";
    }
}

function checkEnt(event) {
    if (event.key === "Enter"){
        saveHS();
    }
}

subBtn.onclick = saveHS;

startBtn.onclick = startQuiz;

nameEL.onkeyup = checkEnt;