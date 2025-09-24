import { renderQuestion } from "./ui.js";

export let currentQuestion = 0;
export let questions = [];

// varibles for timer :
// let questionTime = null;
let questionTimeId = null;
export let globleTime = 0;       
// let globleTimeId = null;

// load Questions:
export async function loadQuestion(theme) {
  try {
    const response = await fetch(`../data/${theme}.json`);
    questions = await response.json();
    console.log("questins : ", questions);

    renderQuestion();
  } catch (error) {
    console.error("Error de chargement JSON:", error);
  }
}

// move to next Question :
export function nextQuestion() {
  if (questionTimeId) {
    clearInterval(questionTimeId);
    questionTimeId = null;
  }
  currentQuestion++;
  renderQuestion();
}

export function handleAnswer(){
    document.querySelectorAll('.anwser-input:checked').forEach((input) => {
        let checkedAnswer = input.value.trim();
        let iscorrect;
        iscorrect = questions[currentQuestion].correct.includes(checkedAnswer) ? true : false;
        if (iscorrect) {
    input.parentElement.style.background = "green";
} else {
    input.parentElement.style.background = "red";
}

    })
}


export function QuestionTimer(timeLeft){
 questionTimeId = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Timer : ${timeLeft}s`;
    if (timeLeft < 0) {
      clearInterval(questionTimeId);
      nextQuestion();
    }
  }, 1000);
}