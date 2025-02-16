import config from "./config.js";

const apiKey11 = config.API_KEY;
console.log("API Key:", apiKey11);

let url_1 = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey11}`;
let url_2 = `https://api.weatherapi.com/v1/current.json?key=a86fc00dea2b4a28b90144912250102&q=India`;

let weath = document.querySelectorAll(".hel");

async function updateWeather() {
  try {
    let res = await axios.get(url_2);
    let cityName = res.data.location.name;
    let temperature = res.data.current.temp_f;
    let icon = "https:" + res.data.current.condition.icon;

    let weathElement = document.querySelector(".hel");
    let iconElement = document.querySelector(".weath-icon");

    if (weathElement) {
      weathElement.firstChild.nodeValue = `Weather at ${cityName} is ${temperature}°F `;
    }

    if (iconElement) {
      iconElement.src = icon;
      iconElement.alt = `Weather condition: ${res.data.current.condition.text}`;
    }
  } catch (e) {
    console.error("Error fetching weather:", e);
  }
}

async function articlesAccess() {
  try {
    let res = await axios.get(url_1);
    return res.data.articles;
  } catch (e) {
    console.error("Error fetching news:", e);
    return [];
  }
}

async function updateHeadlines() {
  try {
    let newsArticles = await articlesAccess();
    let nameUpdate = newsArticles
      .map((article) => article.source.name)
      .slice(0, 6);
    let headlines = document.querySelectorAll(".p1-hs1");

    nameUpdate.forEach((headline, index) => {
      if (headlines[index]) {
        headlines[index].textContent = headline;
      }
    });
  } catch (e) {
    console.error("Error updating headlines:", e);
  }
}

async function updateTopHeadNews() {
  try {
    let newsArticles = await articlesAccess();
    let topHeadlines = newsArticles.map((article) => article.title).slice(0, 6);
    let newsTops = document.querySelectorAll(".p1-hs2");

    topHeadlines.forEach((headline, index) => {
      if (newsTops[index]) {
        newsTops[index].textContent = headline;
      }
    });
  } catch (e) {
    console.error("Error updating top news headlines:", e);
  }
}

async function updateTopHeadNewsImg() {
  try {
    let articles = await articlesAccess();
    let imageLinks = articles.slice(0, 6).map((article) => article.urlToImage);
    let imgElements = document.querySelectorAll(".p1-img1");

    imageLinks.forEach((imgLink, index) => {
      if (imgElements[index]) {
        imgElements[index].src = imgLink || "default-image.jpg";
      }
    });
  } catch (e) {
    console.error("Error updating top news images:", e);
  }
}

async function updateMainTopHeadNews() {
  try {
    let newsArticles = await articlesAccess();
    let mainHeadlines = newsArticles
      .map((article) => {
        let description =
          article.description || "Click here to read full artical";
        let words = description.split(" ");
        return words.slice(0, 28).join(" ");
      })
      .slice(8, 16);

    let newsTops = document.querySelectorAll(".mb1-p1 a p");

    mainHeadlines.forEach((headline, index) => {
      if (newsTops[index]) {
        newsTops[index].textContent = headline;
      }
    });
  } catch (e) {
    console.log("Error updating main top news:", e);
  }
}

async function updateMainBNewsImg() {
  try {
    let articles = await articlesAccess();
    let imageLinks = articles.slice(7, 15).map((article) => article.urlToImage);
    let imgElements = document.querySelectorAll(".mb1-p1-img1");

    imageLinks.forEach((imgLink, index) => {
      if (imgElements[index]) {
        imgElements[index].src = imgLink || "default-image.jpg";
      }
    });
  } catch (e) {
    console.error("Error updating main bottom news images:", e);
  }
}

async function updateLinks() {
  try {
    let articles = await articlesAccess();
    let newsLinks = articles.slice(0, 7).map((article) => article.url);
    let linkElements = document.querySelectorAll(".p1 a");

    linkElements.forEach((a, index) => {
      if (newsLinks[index]) {
        a.href = newsLinks[index];
        a.addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = newsLinks[index];
        });
      }
    });
  } catch (e) {
    console.error("Error updating news links:", e);
  }
}

async function updateMainBNewsLinks() {
  try {
    let articles = await articlesAccess();
    let newsLinks = articles.slice(7, 15).map((article) => article.url);
    let linkElements = document.querySelectorAll(".mb1-p1 a");

    linkElements.forEach((a, index) => {
      if (newsLinks[index]) {
        a.href = newsLinks[index];
        a.addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = newsLinks[index];
        });
      }
    });
  } catch (e) {
    console.error("Error updating bottom news links:", e);
  }
}

async function fetchAndUpdate() {
  await Promise.all([
    updateWeather(),
    updateHeadlines(),
    updateTopHeadNews(),
    updateTopHeadNewsImg(),
    updateMainTopHeadNews(),
    updateMainBNewsImg(),
    updateLinks(),
    updateMainBNewsLinks(),
  ]);
}

fetchAndUpdate();
