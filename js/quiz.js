const choosenTheme = document.querySelectorAll(".choose-topic");
// const quizContainer = document.getElementById("quiz-container");
const quizContentPage = document.querySelector('.quizContent-page');
const chooseThemePage = document.querySelector('.chooseTopic-page');
const quizContent = document.querySelector('.quiz-content');
quizContentPage.style.display="none";   


let currentQuestion = 0;
let questions = [];

// varibles for timer
let questionTime;
let questionTimeId;
let globleTime=0;
let globleTimeId;
// load Questions:

async function loadQuestion(theme){

    try{
        const response = await fetch(`../data/${theme}.json`);
         questions = await response.json();
        console.log("questins : ",questions);
        
        renderQuestion();
      
        
    }catch (error){
        console.error("Error de chargement JSON:", error);
        
    }
    
}

// render questions

function renderQuestion(){
    let timeLeft = questions[currentQuestion].time;
    // if(questionTimeId){
    //     clearInterval(questionTimeId);
    // }
   
    const inputType = questions[currentQuestion].correct.length > 1 ? "checkbox" : "radio" ;
     quizContent.innerHTML =
             `
              <div class="quizContent-header">
    <h3>${currentQuestion+1}/${questions.length}</h3>
    <h3 id="timer">Timer : ${questions[currentQuestion].time}s</h3>
  </div>

  <div class="quizContent-content">
  
    <h1 class="quiz-question">${questions[currentQuestion].question}</h1>
    <div class="quiz-options">
      ${questions[currentQuestion].options.map((op,index)=>{
        return `
        <label>
        <input type="${inputType}" class="anwser-input" name="q${currentQuestion+1}" value="${op}"  />
      ${op}
      </label> 
        `;
      }).join("")
      }
    </div>
    <div class="quizContent-footer">
        <button class="next-btn">NEXT</button>
        
    </div>
  </div>
            `;

  const nextBtn = quizContent.querySelector(".next-btn");
  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);

  questionTimeId = setInterval(()=>{
      document.getElementById('timer').textContent = `Timer : ${timeLeft}s`;
      timeLeft--;   
  if(timeLeft < 0){
    clearInterval(questionTimeId);
    nextQuestion();    
   
  }

  },1000);
}

// choose The Theme:

choosenTheme.forEach(btn => {
    btn.addEventListener("click", () => {
        chooseThemePage.style.display="none";
        quizContentPage.style.display="flex";
        const theme =  btn.dataset.theme;
    loadQuestion(theme)
})
})


// move to next Question: 

function nextQuestion(){
    //  if(questionTimeId){
    //     clearInterval(questionTimeId);
    //     questionTimeId=null;
    //   }
    currentQuestion++;
    renderQuestion();
}
