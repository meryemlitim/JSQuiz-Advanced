import { currentQuestion, questions } from "./quiz.js";
import { nextQuestion } from "./quiz.js";
import { handleAnswer } from "./quiz.js";
import { QuestionTimer } from "./quiz.js";
import { stockUserAnswers } from "./storage.js"

const quizContentPage = document.querySelector(".quizContent-page");
const quizResult = document.querySelector(".result-page");

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

  // const nextBtn = quizContent.querySelector(".next-btn");
  // if (nextBtn) nextBtn.addEventListener("click", nextQuestion);

 const nextBtn = quizContent.querySelector(".next-btn");
if (nextBtn) nextBtn.onclick = nextQuestion;

  QuestionTimer(timeLeft);

  document.querySelectorAll(".anwser-input").forEach((input) => {
    input.addEventListener("change", (e) => handleAnswer());
  });
}

// show quiz result :
export function showResult(userAnswers, score){
quizContentPage.style.display = "none";
quizResult.style.display = "flex";
const correction = document.querySelector('.corrections') ;
 correction.innerHTML = "";
  let isCorrect; 
  
  questions.forEach((q, index) => {
    const choosenAnswer = userAnswers[index]?.answers || [];
    const correctAnswer = q.correct; 
    isCorrect =
            correctAnswer.length === choosenAnswer.length &&
            correctAnswer.every((ans) => choosenAnswer.includes(ans));
            if (isCorrect) {
              score++;
                    correction.innerHTML += `
              <h3>${index + 1} - ${q.question}:</h3>
              <h3 style="color:green" class="correc">
                You answered: ${
                  Array.isArray(choosenAnswer)
                    ? choosenAnswer.length > 0
                      ? choosenAnswer.join(", ")
                      : "No answer"
                    : choosenAnswer
                    ? choosenAnswer
                    : "No answer"
                } (Correct)
              </h3>
            `;
                  } else {
                    correction.innerHTML += `
              <h3>${index + 1} - ${q.question}:</h3>
              <h3 style="color:red" class="correc">
                You answered: ${
                  Array.isArray(choosenAnswer)
                    ? choosenAnswer.length > 0
                      ? choosenAnswer.join(", ") 
                      : "No answer"
                    : choosenAnswer 
                    ? choosenAnswer
                    : "No answer"
                }
              </h3>
              <h3 class="correc">
                Correct answer: ${
                  Array.isArray(correctAnswer)
                    ? correctAnswer.length > 0
                      ? correctAnswer.join(", ")
                      : "No answer"
                    : correctAnswer
                    ? correctAnswer
                    : "No answer"
                }
              </h3>
            `;
                  }
  });
document.querySelector('.score').textContent = `Score : ${score}`;
feedback(userAnswers, score);

}

// for the quiz feedback :
function feedback(userAnswers, score) {
  let message = "";

  if (score === 10) {
    message = `🏆 Feedback: Perfect score! You're amazing! 🌟`;
  } else if (score >= 8) {
    message = `🔥 Feedback: Great job! Almost perfect! 👏`;
  } else if (score >= 6) {
    message = `😊 Feedback: Good work! Keep it up! 💪`;
  } else if (score >= 4) {
    message = `📚 Feedback: Not bad! You need more practice! 🎯`;
  } else {
    message = `😅 Feedback: Don't give up! Practice makes perfect! 💡`;
  }

  document.querySelector(".feedback").textContent = message;
        stockUserAnswers(userAnswers, score); 

}



