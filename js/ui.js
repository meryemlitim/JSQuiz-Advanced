import { currentQuestion, questions } from "./quiz.js";
import { nextQuestion } from "./quiz.js";
import { handleAnswer } from "./quiz.js";
import { QuestionTimer } from "./quiz.js";

// render questions :
export function renderQuestion() {
  let timeLeft = questions[currentQuestion].time;
  // if(questionTimeId){
  //     clearInterval(questionTimeId);
  // }
  const quizContent = document.querySelector(".quiz-content");

  const inputType =
    questions[currentQuestion].correct.length > 1 ? "checkbox" : "radio";
  quizContent.innerHTML = `
    <div class="quizContent-header">
    <h3>${currentQuestion + 1}/${questions.length}</h3>
    <h3 id="timer">Timer : ${questions[currentQuestion].time}s</h3>
  </div>

  <div class="quizContent-content">
    <h1 class="quiz-question">${questions[currentQuestion].question}</h1>
    <div class="quiz-options">
      ${questions[currentQuestion].options
        .map((op, index) => {
          return `
        <label>
        <input type="${inputType}" class="anwser-input" name="q${
            currentQuestion + 1
          }" value="${op}"  />
      ${op}
      </label> 
        `;
        })
        .join("")}
    </div>
    <div class="quizContent-footer">
        <button class="next-btn">NEXT</button>
        
    </div>
  </div>
            `;

  const nextBtn = quizContent.querySelector(".next-btn");
  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);

  QuestionTimer(timeLeft);

  document.querySelectorAll(".anwser-input").forEach((input) => {
    input.addEventListener("change", (e) => handleAnswer());
  });
}
