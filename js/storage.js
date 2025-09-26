import { usernameName } from "./main.js"

// store the user's answers & score & username in local storage :
export function stockUserAnswers(userAnswers, score){

  // alert(usernameName);
  let UserQuizReview = JSON.parse(localStorage.getItem("UserQuizReview")) || [];

  UserQuizReview.push({
    usernameName: usernameName,
    answers : userAnswers,
    score : score,
  });

  localStorage.setItem("UserQuizReview", JSON.stringify(UserQuizReview));

}