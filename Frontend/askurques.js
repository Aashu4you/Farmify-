// Handle collapsible FAQ answers
document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  // Handle 'Ask' button click
  const askBtn = document.getElementById('ask-btn');
  const questionInput = document.getElementById('question-input');
  
  askBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();
    if (question) {
      alert(`Your question: "${question}" has been submitted!`);
      questionInput.value = '';
    } else {
      alert('Please enter a question!');
    }
  });
  