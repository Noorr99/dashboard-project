fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const client = data.clients[0];  // Select the first client for now

    // Display client details
    document.getElementById('clientName').innerText = `Client: ${client.name}`;
    document.getElementById('clientContact').innerText = `Contact: ${client.contact.phone}, ${client.contact.email}`;
    document.getElementById('clientGRP').innerText = `Global Relationship Partner: ${client.global_relationship_partner.name}, ${client.global_relationship_partner.phone}, ${client.global_relationship_partner.email}`;

    // Win/Loss Bar Chart
    const ctx1 = document.getElementById('pwcSuccessChart').getContext('2d');
    const pwcSuccessChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Won', 'Lost'],
        datasets: [{
          label: 'Projects',
          data: [client.won, client.lost],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
        }]
      }
    });

    // Timeline Line Chart for Projects by Year
    const ctx2 = document.getElementById('aiDecisionChart').getContext('2d');
    const aiDecisionChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: client.projects.map(proj => proj.year),
        datasets: [{
          label: 'Projects per Year',
          data: client.projects.map(proj => proj.projectCount),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false
        }]
      }
    });
  })
  .catch(error => console.error('Error fetching the data:', error));
