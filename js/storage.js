export function stockUserAnswers(userAnswers, score){
  let UserQuizReview = JSON.parse(localStorage.getItem("UserQuizReview")) || [];

  UserQuizReview.push({
    answers : userAnswers,
    score : score,
  });
  localStorage.setItem("UserQuizReview", JSON.stringify(UserQuizReview));

}