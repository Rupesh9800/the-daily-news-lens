import config from "../config.js";

const weatherApiKey = config.WEATHER_API_KEY;
const weatherApiUrl = config.WEATHER_API_URL;
const newsApiKey = config.NEWS_API_KEY;
const newsApiUrl = `${config.NEWS_API_URL_WORLD}&apiKey=${newsApiKey}`;

async function getWeather(city) {
  try {
    const response = await fetch(
      `${weatherApiUrl}?key=${weatherApiKey}&q=${city}`
    );
    const data = await response.json();

    if (document.getElementById("weather-info")) {
      document.getElementById(
        "weather-info"
      ).textContent = `Weather in ${data.location.name}: ${data.current.temp_c}°C`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

window.onload = () => {
  getWeather("New Delhi");
};

async function articlesAccess() {
  try {
    let res = await fetch(newsApiUrl);
    let data = await res.json();
    return data.articles;
  } catch (e) {
    console.error("Error fetching news:", e);
    return [];
  }
}

async function world_middleBodyUpdate() {
  try {
    let middleBodyData = await articlesAccess();

    let middleBodyLinks = [];
    let middleBodyImgs = [];
    let middleBodyDates = [];
    let middleBodySources = [];
    let middleBodyDescriptions = [];

    middleBodyData.slice(6, 15).forEach((article) => {
      middleBodyLinks.push(article.url);
      middleBodyImgs.push(article.urlToImage);
      middleBodyDates.push(new Date(article.publishedAt).toDateString());
      middleBodySources.push(article.source.name);

      let words = (article.description || "No description available").split(
        " "
      );
      middleBodyDescriptions.push(
        words.length > 15
          ? words.slice(0, 25).join(" ") + "..."
          : article.description
      );
    });

    let middleLinks = document.querySelectorAll(".middle-body-link");
    let middleImgs = document.querySelectorAll(".middle-body-img");
    let middleTitles = document.querySelectorAll(".middle-body-desc");
    let middleDates = document.querySelectorAll(".middle-body-date");
    let middleSources = document.querySelectorAll(".middle-body-name");

    middleLinks.forEach((link, index) => {
      if (middleBodyLinks[index]) {
        link.href = middleBodyLinks[index];
        link.addEventListener("click", () => {
          window.location.href = middleBodyLinks[index];
        });
      }
    });

    middleImgs.forEach((img, index) => {
      if (middleBodyImgs[index]) {
        img.src = middleBodyImgs[index];
      }
    });

    middleTitles.forEach((title, index) => {
      if (middleBodyDescriptions[index]) {
        title.textContent = middleBodyDescriptions[index];
      }
    });

    middleDates.forEach((date, index) => {
      if (middleBodyDates[index]) {
        date.textContent = middleBodyDates[index];
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

world_middleBodyUpdate();
