import config from "../config.js";

const weatherApiKey = config.WEATHER_API_KEY;
const weatherApiUrl = config.WEATHER_API_URL;
const newsApiKey = config.NEWS_API_KEY;
const newsApiUrl = `${config.NEWS_API_URL}&apiKey=${newsApiKey}`;

async function getWeather(city) {
  try {
    const response = await fetch(
      `${weatherApiUrl}?key=${weatherApiKey}&q=${city}`
    );
    const data = await response.json();

    // Ensure elements exist before updating
    if (document.getElementById("location")) {
      document.getElementById("location").textContent = data.location.name;
    }
    if (document.getElementById("temperature")) {
      document.getElementById(
        "temperature"
      ).textContent = `Temperature: ${data.current.temp_c}°C`;
    }
    if (document.getElementById("condition")) {
      document.getElementById(
        "condition"
      ).textContent = `Condition: ${data.current.condition.text}`;
    }
    if (document.getElementById("humidity")) {
      document.getElementById(
        "humidity"
      ).textContent = `Humidity: ${data.current.humidity}%`;
    }
    if (document.getElementById("wind-speed")) {
      document.getElementById(
        "wind-speed"
      ).textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    }

    // Update the additional weather info format
    if (document.getElementById("weather-info")) {
      document.getElementById(
        "weather-info"
      ).textContent = `Weather at ${data.location.name} is ${data.current.temp_c}°C`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Fetch weather for New Delhi on page load
document.addEventListener("DOMContentLoaded", () => {
  getWeather("New Delhi");
});

async function articlesAccess() {
  try {
    let res = await axios.get(newsApiUrl);
    return res.data.articles;
  } catch (e) {
    console.error("Error fetching news:", e);
    return [];
  }
}

async function sideBodyUpdate() {
  try {
    let sideBodyUpdate = await articlesAccess();

    // Extract required data
    let sideBodyLinks = sideBodyUpdate
      .slice(0, 5)
      .map((article) => article.url);
    let sideBodyImgs = sideBodyUpdate
      .slice(0, 5)
      .map((article) => article.urlToImage);
    let sideBodyDates = sideBodyUpdate
      .slice(0, 5)
      .map((article) => article.publishedAt);
    let sideBodyTitles = sideBodyUpdate
      .slice(0, 5)
      .map((article) => article.title);

    // Access HTML elements
    let sideLinks = document.querySelectorAll(".side-body-link");
    let sideImgs = document.querySelectorAll(".side-body-img");
    let sideTitles = document.querySelectorAll(".side-body-title");
    let sideDates = document.querySelectorAll(".side-body-date");

    // Update each article card
    sideLinks.forEach((sideLink, index) => {
      if (sideBodyLinks[index]) {
        sideLink.href = sideBodyLinks[index];
        sideLink.addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = sideBodyLinks[index]; // Redirect to article link
        });
      }
    });

    sideImgs.forEach((img, index) => {
      if (sideBodyImgs[index]) {
        img.src = sideBodyImgs[index];
      }
    });

    sideTitles.forEach((title, index) => {
      if (sideBodyTitles[index]) {
        title.textContent = sideBodyTitles[index];
      }
    });

    sideDates.forEach((date, index) => {
      if (sideBodyDates[index]) {
        date.textContent = new Date(sideBodyDates[index]).toDateString(); // Format date
      }
    });
  } catch (e) {
    console.error("Error updating top news images:", e);
  }
}

async function middleBodyUpdate() {
  try {
    let middleBodyData = await articlesAccess();

    let middleBodyLinks = middleBodyData
      .slice(6, 15)
      .map((article) => article.url);
    let middleBodyImgs = middleBodyData
      .slice(6, 15)
      .map((article) => article.urlToImage);
    let middleBodyDates = middleBodyData
      .slice(6, 15)
      .map((article) => article.publishedAt);
    let middleBodySources = middleBodyData
      .slice(6, 15)
      .map((article) => article.source.name);

    // Use description instead of title and limit to 15 words
    let middleBodyDescriptions = middleBodyData.slice(6, 15).map((article) => {
      let words = (article.description || "No description available").split(
        " "
      );
      return words.length > 15
        ? words.slice(0, 15).join(" ") + "..."
        : article.description;
    });

    let middleLinks = document.querySelectorAll(".middle-body-link");
    let middleImgs = document.querySelectorAll(".middle-body-img");
    let middleBodyTitles = document.querySelectorAll(".middle-body-desc"); // This is where the description goes
    let middleDates = document.querySelectorAll(".middle-body-date");
    let middleSources = document.querySelectorAll(".middle-body-name");

    middleLinks.forEach((link, index) => {
      if (middleBodyLinks[index]) {
        link.href = middleBodyLinks[index];
        link.addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = middleBodyLinks[index]; // Redirect to article link
        });
      }
    });

    middleImgs.forEach((img, index) => {
      if (middleBodyImgs[index]) {
        img.src = middleBodyImgs[index];
      }
    });

    // Fix: Use `middleBodyDescriptions` instead of `middleBodyTitles`
    middleBodyDescriptions.forEach((title, index) => {
      if (middleBodyDescriptions[index]) {
        title.textContent = middleBodyDescriptions[index];
      }
    });

    middleDates.forEach((date, index) => {
      if (middleBodyDates[index]) {
        date.textContent = new Date(middleBodyDates[index]).toDateString(); // Format date
      }
    });

    middleSources.forEach((source, index) => {
      if (middleBodySources[index]) {
        source.textContent = middleBodySources[index];
      }
    });
  } catch (e) {
    console.error("Error updating middle-body section:", e);
  }
}

// Call the function
middleBodyUpdate();
sideBodyUpdate();
