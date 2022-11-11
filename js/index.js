"use strict";

let playing = false;
let score;
let timeRemaining;
let action;
let correctAnswer;

document.getElementById("start").addEventListener("click", () => {
    if (playing == true) {
        location.reload();
    }

    else {
        playing = true;
        score = 1;
        document.getElementById("scoreNumber").innerHTML = score;        
        document.getElementById("instruction").innerHTML = "Click on the right answer";    
        show("time");
        
        timeRemaining = 200;
        document.getElementById("remainingTime").innerHTML = timeRemaining;

        hide("gameover");

        document.getElementById("start").innerHTML = "Reset Game";

        startCountdown();

        generateQA();
    }
});

document.querySelectorAll(".answer").forEach(item => {
    item.addEventListener("click", scoreChange);
});

function scoreChange() {
    if (playing == true) {
        if (this.innerHTML == correctAnswer) {
            score++;
            document.getElementById("scoreNumber").innerHTML = score;

            show("right");

            setTimeout(function () {
                hide("right");
            }, 1000);
            hide("wrong");
           
            generateQA();

        }
        else {  
            score--;
            document.getElementById("scoreNumber").innerHTML = score;

            show("wrong");

            setTimeout(function () {
                hide("wrong");
            }, 1000);
            hide("right");
        }
    }
}

function startCountdown() {
    action = setInterval(function () {
        timeRemaining -= 1;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        if (timeRemaining === 0 || score === 50 || score < 0) {
            stopCountdown();
            show("gameover");
            if (score < 0) {
                document.getElementById("gameover").innerHTML = "<p>GAME OVER!</p><p>YOU LOSE!</p>";
                hide("score");
            } else {
                document.getElementById("gameover").innerHTML = "<p>YOU WIN</p><p>YOUR SCORE: " + score + "</p>";
                hide("score");
            }

            hide("time");
            hide("right");
            hide("wrong");
            playing = false;
            document.getElementById("start").innerHTML = "Start Game";
        }
    }, 1000);
}


function generateQA() {
    let randomNumber1;
    let randomNumber2;
    if (score >= 0 && score < 30) {
        randomNumber1 = Math.round(Math.random() * 10);
        randomNumber2 = Math.round(Math.random() * 10);
    } else if (score >= 30 && score < 45) {
        randomNumber1 = Math.round(Math.random() * 10);
        randomNumber2 = Math.floor(Math.random() * (99 - 10 + 1) + 10);
    } else if (score >= 45) {
        randomNumber1 = Math.floor(Math.random() * (99 - 10 + 1) + 10);
        randomNumber2 = Math.floor(Math.random() * (99 - 10 + 1) + 10);
    }

    document.getElementById("problem").innerHTML = randomNumber1 + " x " + randomNumber2;
    correctAnswer = randomNumber1 * randomNumber2;
    let answerBox = (Math.round(Math.random() * 3)) + 1;

    document.getElementById("answer" + answerBox).innerHTML = correctAnswer;

    let answers = [correctAnswer];

    for (let i = 1; i < 5; i++) {
        if (i !== answerBox) {
            let wrongAnswer;
            do {
                if (score >= 0 && score < 30) {
                    wrongAnswer = (Math.round(Math.random() * 10)) * (Math.round(Math.random() * 10));
                } else if (score >= 30 && score < 45) {
                    wrongAnswer = (Math.round(Math.random() * 10)) * (Math.floor(Math.random() * (99 - 10 + 1) + 10));
                    document.querySelector("#LevelNumber").innerHTML = "2";
                } else if (score >= 45) {
                    document.querySelectorAll(".answer").forEach(item => {
                        document.querySelector("#LevelNumber").innerHTML = "3";
                        item.style.width = "90px";
                    });
                    wrongAnswer = (Math.floor(Math.random() * (99 - 10 + 1) + 10)) * (Math.floor(Math.random() * (99 - 10 + 1) + 10));
                }
            }
            while (answers.indexOf(wrongAnswer) > -1); 

            document.getElementById("answer" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

function stopCountdown() {
    clearInterval(action);
}
function hide(id) {
    document.getElementById(id).style.display = "none";
}
function show(id) {
    document.getElementById(id).style.display = "block";
}

