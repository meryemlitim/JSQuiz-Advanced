import { loadQuestion , resetCurrentQuestion } from "./quiz.js";
// import {chooseUsername } from "./ui.js"
const choosenTheme = document.querySelectorAll(".choose-topic");
// const quizContainer = document.getElementById("quiz-container");
const quizContentPage = document.querySelector(".quizContent-page");
const chooseThemePage = document.querySelector(".chooseTopic-page");
const quizResult = document.querySelector(".quiz-result");
quizContentPage.style.display = "none";
const chooseUsernamePage = document.querySelector(".chooseUsername-page");

export let usernameName;

// Enter username :
chooseUsername(); 
// username :
function chooseUsername() {
  chooseUsernamePage.style.display = "flex";
 
  chooseUsernamePage.innerHTML = `
      <h2>Enter Your Username</h2>
      <input class="Username" type="text">
      <button class="quiz-start-btn hidden">START</button> 
  `;
  const quizstarbtn = document.querySelector(".quiz-start-btn");
  const UsernameInput = document.querySelector(".Username");

 UsernameInput.addEventListener("input", () => {
  quizstarbtn.style.display = UsernameInput.value.trim() === "" ? "none" : "block";
});

quizstarbtn.addEventListener("click", () => {
  chooseUsernamePage.style.display = "none";
  usernameName = UsernameInput.value;
  console.log(usernameName);
  chooseTheme(); 
});

}
// choose The Theme:
export function chooseTheme(){
  chooseUsernamePage.style.display = "none";
  chooseThemePage.style.display = "flex";

  choosenTheme.forEach((btn) => {
  btn.addEventListener("click", () => {
  chooseThemePage.style.display = "none";
  quizContentPage.style.display = "flex";
  const theme = btn.dataset.theme;
  loadQuestion(theme);
  });
  });
}

// Retake The Quiz :
document.querySelector('.retake-quiz').addEventListener('click', () => {
  
  resetCurrentQuestion(); 
  document.querySelector('.result-page').style.display = 'none';
  document.querySelector('.chooseTopic-page').style.display = 'flex';
});

// Go Back To Dashboard :
document.querySelector('.back-to-dashboard').addEventListener('click', () => {
  resetCurrentQuestion();   
  document.querySelector('.dashbord').style.display = 'block';
  document.querySelector('.result-page').style.display = 'none';  
});