
const UserQuizReview = JSON.parse(localStorage.getItem("UserQuizReview") ||  []);

// general statistics :

        // best three players : 
        export function topThreePlayers(){
            return UserQuizReview
                .sort((a,b) => b.score - a.score )
                .slice(0,3);
        }

        // total games played :
        export function gamePLayedNum(){
        const gameNum = UserQuizReview.length;
        return gameNum;
        }

        // best score :
        export function bestScore(){
        return UserQuizReview.sort((a,b) => b.score - a.score)[0].score;
        }

        // Average Score :
        export function AverageScore(){
        let scoreArray = UserQuizReview.map( user => user.score);
        const total = scoreArray.reduce((sum,val) => sum + val ,0);
        let avg = total/scoreArray.length;
        return avg.toFixed(2);
        }

        // Favorite Theme
        export function FavoriteTheme(){
        const allThemes = ["javascript", "japanese", "javascript"];

        }
        
        //  Score Progress
        export function ScoreProgress(usernameName){
            let progVal= UserQuizReview.filter(user => user.usernameName === usernameName).map(item => ({
                score : item.score,
                date : item.date

            }));


            // let progVal = UserQuizReview.map(item => ({
            //     score : item.score,
            //     date : item.date

            // }));
            return progVal;
        }



// statistic by theme :

        export function themeStatics(theme){
         let currentThemeArr = UserQuizReview.filter(arr => arr.theme === theme);
         let totalGame = currentThemeArr.length ;
         let avgScore = currentThemeArr.map(user => user.score).reduce((sum,val) => sum+val,0);
         return [totalGame, avgScore]
        }

// histrory Quizs :
export function histroryQuizs(currentUserName){
let quizHis = UserQuizReview.filter(item => item.usernameName === currentUserName);
return quizHis;
}
