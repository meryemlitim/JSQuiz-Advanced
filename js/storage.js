import { usernameName } from "./main.js"
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