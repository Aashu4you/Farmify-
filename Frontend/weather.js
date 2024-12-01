// Placeholder for weather API integration
document.addEventListener("DOMContentLoaded", () => {
    console.log("Weather Dashboard Loaded");
    // Fetch weather data here
  });
  // Basic script for interactivity and dynamic date updates

// Function to update the current date dynamically
function updateDate() {
  const dateElement = document.querySelector('.location span:nth-child(2)');
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = `🕒 Date: ${today.toLocaleDateString('en-US', options)}`;
}

// Smooth scroll to sections when clicked
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Call updateDate function on page load
window.onload = updateDate;
