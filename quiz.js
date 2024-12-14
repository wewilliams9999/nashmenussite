document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  let quizData = {};

  // Move to the next step
  function goToNextStep() {
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    currentStep++;
    document.getElementById(`step-${currentStep}`).style.display = 'block';
  }

  // Capture data and move forward for each step
  document.querySelectorAll('.neighborhood-button').forEach(button => {
    button.addEventListener('click', () => {
      quizData.neighborhood = button.getAttribute('data-value');
      console.log(`Neighborhood selected: ${quizData.neighborhood}`);
      goToNextStep();
    });
  });

  document.querySelectorAll('.distance-button').forEach(button => {
    button.addEventListener('click', () => {
      quizData.distance = button.getAttribute('data-value');
      console.log(`Distance selected: ${quizData.distance}`);
      goToNextStep();
    });
  });

  document.querySelectorAll('.budget-button').forEach(button => {
    button.addEventListener('click', () => {
      quizData.budget = button.getAttribute('data-value');
      console.log(`Budget selected: ${quizData.budget}`);
      goToNextStep();
    });
  });

  document.getElementById('submit-cuisine').addEventListener('click', () => {
    const cuisine = document.getElementById('cuisine').value.trim();
    if (cuisine) {
      quizData.cuisine = cuisine;
      console.log(`Cuisine entered: ${quizData.cuisine}`);
      getRecommendation();
    } else {
      alert('Please enter a cuisine!');
    }
  });

  async function getRecommendation() {
    try {
      const response = await fetch('/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      const result = await response.json();

      document.getElementById('result').innerHTML = `
        <p><strong>${result.name}</strong></p>
        <p>${result.address}</p>
        <p>Rating: ${result.rating} stars</p>
        <p><a href="${result.url}" target="_blank">View on Yelp</a></p>
      `;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('result').textContent =
        'Sorry, something went wrong. Please try again.';
    }
  }
});