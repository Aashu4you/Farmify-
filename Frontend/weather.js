// Placeholder for weather API integration
document.addEventListener("DOMContentLoaded", () => {
  console.log("Weather Dashboard Loaded");
  fetchWeather();
});

// Function to fetch weather data
async function fetchWeather() {
  const apiKey = "your_api_key"; // Replace with your actual API key
  const city = "London"; // Replace with the desired city
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("weather-data").textContent =
      "Unable to fetch weather data.";
  }
}

// Function to display weather data
function displayWeather(data) {
  const weatherElement = document.getElementById("weather-data");
  const { name, main, weather } = data;
  weatherElement.textContent = `🌍 Location: ${name}, 🌡️ Temp: ${main.temp}°C, 🌥️ Condition: ${weather[0].description}`;
}

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
