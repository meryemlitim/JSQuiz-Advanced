import { loadQuestion } from "./quiz.js";

const choosenTheme = document.querySelectorAll(".choose-topic");
// const quizContainer = document.getElementById("quiz-container");
const quizContentPage = document.querySelector(".quizContent-page");
const chooseThemePage = document.querySelector(".chooseTopic-page");
quizContentPage.style.display = "none";


// choose The Theme:

choosenTheme.forEach((btn) => {
  btn.addEventListener("click", () => {
    chooseThemePage.style.display = "none";
    quizContentPage.style.display = "flex";
    const theme = btn.dataset.theme;
    loadQuestion(theme);
  });
});

