import { renderQuestion, showResult } from "./ui.js";
// import { stockUserAnswers } from "./storage.js"
export let currentQuestion = 0;
export let questions = [];
let score = 0;
let userAnswers = [];

// varibles for timer :
let questionTimeId = null;
let quizEnd = false;

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
  if(quizEnd) return;
  if(currentQuestion >= questions.length-1 ){
    quizEnd= true;
    console.log("Saving to localStorage with score:", score);
        // console.log("Saving to localStorage with score:", score);

        // stockUserAnswers(userAnswers, score); 

    showResult(userAnswers, score); 
  }else{
     if (questionTimeId) {
    clearInterval(questionTimeId);
    questionTimeId = null;
  }
  currentQuestion++;
  renderQuestion();

  }
 
}

// handle the user answer :
export function handleAnswer(){
  const selectedAnswer = [];
    document.querySelectorAll('.anwser-input:checked').forEach((input) => {
        let checkedAnswer = input.value.trim();
        
        selectedAnswer.push(checkedAnswer);
        
        userAnswers[currentQuestion]= {
         questionNum : currentQuestion,
         answers :  selectedAnswer,
        }
    feedbackVisuel(checkedAnswer,input);
 
      });
     

}

// visuel feedback :
function feedbackVisuel(checkedAnswer,input){
  let iscorrect; 

   iscorrect = questions[currentQuestion].correct.includes(checkedAnswer) ? true : false;
      if (iscorrect) {
        input.parentElement.style.background = "green";
    } else {
        input.parentElement.style.background = "red";
    }
    console.log("answers", userAnswers);
}

// timer of each question : 
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

// check the user's answers :
export function checkAnswers(){

}

// reset questions :
export function resetCurrentQuestion() {
  currentQuestion = 0;
  userAnswers = []
  quizEnd = false;

  if (questionTimeId) {
    clearInterval(questionTimeId);
    questionTimeId = null;
  }
  const correctionBox = document.querySelector('.corrections');
  if (correctionBox) correctionBox.innerHTML = "";

  const scoreBox = document.querySelector('.score');
  if (scoreBox) scoreBox.textContent = "";


}


