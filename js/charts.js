
export function renderThemeDistribution(ctx, themeStats) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: themeStats.map(stat => stat.theme),
      datasets: [{
        label: "Total Quiz per theme",
        data: themeStats.map(stat => stat.gameNum),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"]
      }]
    }
  });
}

// Score Progress

export function renderScoreProgress(ctx, data){

    new Chart(ctx, {
    type: "line",
    data: {
        labels: data.map(d => d.date),
        datasets: [{
        label: "Score Progress",
        data: data.map(d => d.score),
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.3,
        pointBackgroundColor: "#FF6384"
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true,
            max: 100
        }
        }
    }
    });
}




