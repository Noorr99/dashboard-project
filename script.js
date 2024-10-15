// Fetch data from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Check if data is fetched correctly

    // PwC Success Bar Chart
    const ctx1 = document.getElementById('pwcSuccessChart').getContext('2d');
    const pwcSuccessChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: data.clients.map(client => client.name),
        datasets: [
          {
            label: 'Won',
            data: data.clients.map(client => client.won),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          },
          {
            label: 'Lost',
            data: data.clients.map(client => client.lost),
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // AI Decision Pie Chart
    const ctx2 = document.getElementById('aiDecisionChart').getContext('2d');
    const aiDecisionChart = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Go', 'No-Go'],
        datasets: [
          {
            data: [data.ai_decisions.Go, data.ai_decisions['No-Go']],
            backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)']
          }
        ]
      }
    });
  })
  .catch(error => console.error('Error fetching the data:', error));
