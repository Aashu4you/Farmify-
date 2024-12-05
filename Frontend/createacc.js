const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('password-strength');

// Password strength calculation and update
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const strength = calculateStrength(password);
  updateStrengthBar(strength);
});

function calculateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

function updateStrengthBar(strength) {
  const strengthColors = ['#e0e0e0', '#ff4d4d', '#ffa500', '#ffc107', '#28a745'];
  strengthBar.style.setProperty('--strength-color', strengthColors[strength]);
  strengthBar.style.width = `${(strength / 4) * 100}%`;
}

// Form submission handling
document.getElementById('create-account-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Gather form data
  const formData = new FormData(this);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Send POST request to the server
  try {
    const response = await fetch('/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    });

    if (response.ok) {
      alert('Account created successfully! Redirecting to login page...');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      const errorText = await response.text();
      alert(`Error: ${errorText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
