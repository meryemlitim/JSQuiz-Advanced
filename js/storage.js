import { usernameName, choosentheme } from "./main.js"

// store the user's answers & score & username in local storage :
export function stockUserAnswers(userAnswers, score){

  // alert(usernameName);
  let UserQuizReview = JSON.parse(localStorage.getItem("UserQuizReview")) || [];
    let now = new Date();
    let dateTime = now.toLocaleString();
  UserQuizReview.push({
    usernameName: usernameName,
    answers : userAnswers,
    score : score,
    theme : choosentheme,
    date : dateTime,
  });

  localStorage.setItem("UserQuizReview", JSON.stringify(UserQuizReview));

}


