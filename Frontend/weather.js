const apiKey = "3629f4d4650b31bd9262c44ec49f5b8b"; // Replace with your OpenWeatherMap API key
const defaultCity = "London";

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather(defaultCity);
  fetchForecast(defaultCity);
  updateDate();

  // Event Listener for the Search Form
  document.getElementById("city-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
    }
  });
});

// Fetch Current Weather
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data unavailable");

    const data = await response.json();
    document.getElementById("location-name").textContent = data.name;
    displayWeather(data);
  } catch (error) {
    console.error(error);
    document.getElementById("weather-data").innerHTML = "<p>Error fetching weather data. Please check the city name.</p>";
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  document.getElementById("weather-data").innerHTML = `
    <p>🌍 Location: ${name}</p>
    <p>🌡️ Temperature: ${main.temp}°C</p>
    <p>☁️ Condition: ${weather[0].description}</p>
    <p>💧 Humidity: ${main.humidity}%</p>
  `;
}

// Fetch Hourly and Weekly Forecast
async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Forecast data unavailable");

    const data = await response.json();
    displayHourlyForecast(data);
    displayWeeklyForecast(data);
  } catch (error) {
    console.error(error);
    document.getElementById("hourly-forecast").innerHTML = "<p>Error fetching hourly forecast.</p>";
    document.getElementById("weekly-forecast").innerHTML = "<p>Error fetching weekly forecast.</p>";
  }
}

function displayHourlyForecast(data) {
  const forecastContainer = document.getElementById("hourly-forecast");
  forecastContainer.innerHTML = ""; // Clear previous content

  // Display next 6 hours
  data.list.slice(0, 6).forEach(item => {
    const date = new Date(item.dt_txt);
    const forecastCard = `
      <div class="forecast-card">
        <p>${date.getHours()}:00</p>
        <p>🌡️ ${item.main.temp}°C</p>
        <p>☁️ ${item.weather[0].description}</p>
      </div>
    `;
    forecastContainer.innerHTML += forecastCard;
  });
}

function displayWeeklyForecast(data) {
  const weeklyContainer = document.getElementById("weekly-forecast");
  weeklyContainer.innerHTML = ""; // Clear previous content

  // Group forecasts by day
  const dailyData = {};
  data.list.forEach(item => {
    const day = new Date(item.dt_txt).toDateString();
    if (!dailyData[day]) dailyData[day] = [];
    dailyData[day].push(item);
  });

  // Display daily average
  for (const day in dailyData) {
    const temps = dailyData[day].map(entry => entry.main.temp);
    const avgTemp = (temps.reduce((sum, t) => sum + t, 0) / temps.length).toFixed(1);

    const forecastDayCard = `
      <div class="forecast-card">
        <p>${day}</p>
        <p>🌡️ Avg Temp: ${avgTemp}°C</p>
      </div>
    `;
    weeklyContainer.innerHTML += forecastDayCard;
  }
}

function updateDate() {
  const today = new Date();
  document.getElementById("current-date").textContent = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
