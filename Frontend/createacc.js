const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('password-strength');

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
