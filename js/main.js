import { loadQuestion, resetCurrentQuestion } from "./quiz.js";
import { topThreePlayers, gamePLayedNum, bestScore, AverageScore, themeStatics, ScoreProgress, histroryQuizs  } from "./stats.js";
// import {chooseUsername } from "./ui.js"
import { renderThemeDistribution, renderScoreProgress } from "./charts.js";
const choosenTheme = document.querySelectorAll(".choose-topic");
// const quizContainer = document.getElementById("quiz-container");
const quizContentPage = document.querySelector(".quizContent-page");
const chooseThemePage = document.querySelector(".chooseTopic-page");
const quizResult = document.querySelector(".quiz-result");
quizContentPage.style.display = "none";
const chooseUsernamePage = document.querySelector(".chooseUsername-page");
const playAgainBtn = document.querySelector('.play-btn');
const dashbord = document.querySelector('.dashbord');
export let usernameName;
export let choosentheme;

const allThemes = ["javascript", "japanese", "nodejs"];   
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
  resetCurrentQuestion();

  chooseUsernamePage.style.display = "none";
  dashbord.style.display = "none";
  chooseThemePage.style.display = "flex";

}

choosenTheme.forEach((btn) => {
btn.addEventListener("click", () => {
chooseThemePage.style.display = "none";
quizContentPage.style.display = "flex";
const theme = btn.dataset.theme;
 choosentheme = btn.dataset.theme;

loadQuestion(theme);
});
});

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

// play quiz again : 
playAgainBtn.addEventListener('click', () => {
chooseTheme();
})


// general statistics :
function GeneralStatistics(){

  // total games played  :  
document.getElementById('totalGames').textContent = gamePLayedNum();

// best score :
document.getElementById('bestScore').textContent = bestScore();

// best three players :
  const players = topThreePlayers();

            // 1st 
          document.getElementById("first-name").textContent = players[0].usernameName || "-";

            // 2nd
          document.getElementById("second-name").textContent = players[1].usernameName || "-";

            // 3rd 
          document.getElementById("third-name").textContent = players[2].usernameName || "-";

// Average Score : 
document.getElementById('avgScore').textContent = AverageScore();

}

GeneralStatistics();


// Statistics by Theme :
function StatisticsTheme(){

  document.querySelector('.theme-stats-grid').innerHTML = allThemes.map(theme => {
    let currentThemestatics = themeStatics(theme);  
    return `
     <div class="theme-stat-card ${theme}">
            <div class="theme-name">${theme}</div>
            <div class="theme-stats">
                <div class="theme-games">
                    <div class="value">${currentThemestatics[0]}</div>
                    <div class="label">Games</div>
                </div>
                <div class="theme-avg">
                    <div class="value">${currentThemestatics[1]}</div>
                    <div class="label">Avg Score</div>
                </div>
            </div>
        </div>
    `;
  }).join("")
}

StatisticsTheme();


// charts :

let themeStats = []; 
allThemes.forEach(theme => {
  const val = themeStatics(theme);
  let themeName =theme;
   themeStats.push({
    theme : theme,
    gameNum : val[0],
    avgScore: val[1]
   })
})

const ctx = document.getElementById("themeChart").getContext("2d");

renderThemeDistribution(ctx, themeStats);

// for Score Progress :

const ctx2 = document.getElementById("progressChart").getContext("2d");
const data = ScoreProgress();
renderScoreProgress(ctx2, data);

// Game History :

function GameHistory(){
let tableHeder = `
 <table class="history-table">
            <thead>
                <tr>
                    <th>Quiz</th>
                    <th>Theme</th>
                    <th>Date</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
`;
let quizHis = histroryQuizs("unko");
console.log("🔪🔪🔪🙂", quizHis);
quizHis.forEach((q,index) => {
  
  tableHeder += `
   <tr>
                    <td><span class="game-number">${index+1}</span></td>
                    <td><span class="theme-badge theme-${q.theme}">${q.theme}</span></td>
                    <td>${q.date}</td>
                    <td><span class="score-badge high">${q.score}</span></td>
                </tr>
  `;

});


tableHeder += `
  </tbody>
        </table>
`;

document.getElementById('historyContent').innerHTML = tableHeder;
}


GameHistory();
