const choosenTheme = document.querySelectorAll(".choose-topic");
// const quizContainer = document.getElementById("quiz-container");
const quizContentPage = document.querySelector('.quizContent-page');
const chooseThemePage = document.querySelector('.chooseTopic-page');
const quizContent = document.querySelector('.quiz-content');
quizContentPage.style.display="none";   


let currentQuestion = 0;

async function loadQuestion(theme){
    try{
        const response = await fetch(`../data/${theme}.json`);
        const questions = await response.json();
        console.log("questins : ",questions);
        
        
        quizContent.innerHTML =
             `
              <div class="quizContent-header">
    <h3>${currentQuestion+1}/${questions.length}</h3>
    <h3 id="timer">Timer:10s</h3>
  </div>

  <div class="quizContent-content">
  
    <h1 class="quiz-question">${questions[currentQuestion].question}</h1>
    <div class="quiz-options">
      ${questions[currentQuestion].options.map((op,index)=>{
        return `
        <label>
        <input type="checkbox" class="anwser-input" name="q${currentQuestion+1}" value="${op}"  />
      ${op}
      </label> 
        `;
      }).join("")
      }
    </div>
    <div class="quizContent-footer">
        <button class="next-btn" onclick="">NEXT</button>
        
    </div>
  </div>
            `;
      
        
    }catch (error){
        console.error("Error de chargement JSON:", error);
        
    }
}

choosenTheme.forEach(btn => {
    btn.addEventListener("click", () => {
        chooseThemePage.style.display="none";
        quizContentPage.style.display="flex";
        const theme =  btn.dataset.theme;
    loadQuestion(theme)
})
});

