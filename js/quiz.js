import { renderQuestion, showResult } from "./ui.js";
// import { usernameName } from "./main.js";
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


// export json :
  let UserQuizReview = JSON.parse(localStorage.getItem("UserQuizReview")) || [];
  // let usernameName = "unko";
  
  export function exportToJSON(usernameName) {
  let  CurrentUserQuiz = UserQuizReview.filter(item => item.usernameName === usernameName); 
  if(CurrentUserQuiz.length === 0){
    alert(`There is no game recorded for ${usernameName}`);
    return;
  }
  // 1. Convert data to JSON text
  const jsonData = JSON.stringify(CurrentUserQuiz, null, 2);

  // 2. Create a Blob (a file in memory)
  const blob = new Blob([jsonData], { type: "application/json" });

  // 3. Create a link to download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz_historique.json"; 
  a.click();

  // 4. Clean up
  URL.revokeObjectURL(url);
}

// export CVS :
export function exportToCSV(usernameName) {
  const UserQuizReview = JSON.parse(localStorage.getItem("UserQuizReview")) || [];
  
  const CurrentUserQuiz = UserQuizReview.filter(item => item.usernameName === usernameName);
  if(CurrentUserQuiz.length === 0){
    alert(`There is no game recorded for ${usernameName}`);
    return;
  }

  if (!CurrentUserQuiz.length) {
    alert("No quiz data found for this user.");
    return;
  }

  const headers = Object.keys(CurrentUserQuiz[0]).join(",");

  const rows = CurrentUserQuiz.map(obj => {
    return Object.values(obj)
      .map(val => {
        if (Array.isArray(val)) {
          // If array contains objects, convert each object to JSON string
          return `"${val.map(v => (typeof v === "object" ? JSON.stringify(v) : v)).join(";")}"`;
        }
        if (val === null || val === undefined) return "";
        return val;
      })
      .join(",");
  });

  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quiz_historique.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
