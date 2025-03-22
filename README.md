# The Daily News Lens

The **Daily News Lens** is a dynamic web application that delivers the latest news headlines and real-time weather updates using **JavaScript, external APIs, and Bootstrap**. This project demonstrates expertise in JavaScript functions, API calls, asynchronous programming, and DOM manipulation. Users can access top news articles, view images, and navigate to full articles in an intuitive, user-friendly interface.

## 🌟 Features

- 📢 Fetches **real-time news updates** from an external API.
- 📰 Displays **top headlines** with images and direct links.
- ⛅ Provides **real-time weather updates** based on the user’s location.
- 🎨 **Responsive design** using Bootstrap for seamless experience across devices.
- 🔍 **Categorized news sections** (Business, Entertainment, Sports, World) for easy navigation.
- 📌 **Common Header Implementation**: Uses a shared `header.html` and `header.js` for consistency across pages.

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, Bootstrap
- **JavaScript**: API calls, DOM manipulation, event handling
- **APIs**: News API for headlines, Weather API for real-time updates

## 💡 Skills Gained

- **Frontend Development** (HTML, CSS, Bootstrap)
- **JavaScript** (API calls, Event Handling, Error Handling)
- **Asynchronous Programming** (Fetching external data, handling promises)
- **DOM Manipulation** (Updating UI dynamically based on API responses)
- **Version Control** (Git & GitHub for managing and tracking project changes)

## 📂 Project Structure

```
├── Screenshots/ot                # UI Screenshots
│   ├── main-news screen.png    # Homepage Screenshot
│   ├── business-news screen.png  # Business News Screenshot
│   ├── entertainment-news screen.png  # Entertainment News Screenshot
│   ├── sport-news screen.png   # Sports News Screensh
│   ├── world-news screen.png   # World News Screenshot
├── news-types/                 # Categorized news files
│   ├── business-news-types.js  # Business News JS
│   ├── business.html           # Business News Page
│   ├── entertainment-news-types.js  # Entertainment News JS
│   ├── entertainment.html       # Entertainment News Page
│   ├── sports-news-types.js    # Sports News JS
│   ├── sports.html             # Sports News Page
│   ├── world-news-types.js     # World News JS
│   ├── world.html              # World News Page
├── comman-section/             # Common reusable components
│   ├── header.html             # Common Header File
│   ├── header.js               # JavaScript for loading the common header
├── index.html                  # Main homepage
├── app.js                      # JavaScript file for fetching and displaying news
├── style.css                   # Stylesheet for UI styling
├── package.json                # Project dependencies
├── package-lock.json           # Lock file for package dependencies
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```

## 📸 Screenshots

### 🏠 Home Page



### 🏀 Sports News Page



### 💼 Business News Page



### 🎭 Entertainment News Page



### 🌍 World News Page



## 🚀 How to Run the Project

1. Clone this repository:
   ```sh
   git clone https://github.com/Rupesh9800/the-daily-news-lens.git
   ```
2. Navigate to the project folder:
   ```sh
   cd the-daily-news-lens
   ```
3. Open `index.html` in your browser.
4. Click on different news categories to explore various sections.

## 🔑 Setting Up `config.js`

To enable real-time news and weather updates, you need to configure your **API keys** by creating a `config.js` file.

### 📀 Steps to Create `config.js`:

1. In the root directory of your project, create a new file named **`config.js`**.
2. Open `config.js` and add the following content:

   ```javascript
   const config = {
       NEWS_API_KEY: "your_news_api_key_here",
       WEATHER_API_KEY: "your_weather_api_key_here",
       WEATHER_API_URL: "https://api.weatherapi.com/v1/current.json",
       NEWS_API_URL: "https://newsapi.org/v2/top-headlines?country=us",
       NEWS_API_URL_BUSINESS: "https://newsapi.org/v2/everything?q=business",
       NEWS_API_URL_ENTERTAINMENT: "https://newsapi.org/v2/everything?q=entertainment",
       NEWS_API_URL_SPORT: "https://newsapi.org/v2/everything?q=sport",
       NEWS_API_URL_WORLD: "https://newsapi.org/v2/everything?q=world",
   };
   export default config;
   ```

3. Replace `"your_news_api_key_here"` and `"your_weather_api_key_here"` with your actual API keys.
4. **Important:** To prevent exposing sensitive API keys, add `config.js` to your `.gitignore` file before pushing your project to GitHub.

   ```sh
   echo "config.js" >> .gitignore
   ```

By following these steps, you ensure that API keys remain secure while allowing your application to function properly. 🚀

## 🤝 Contributing

If you’d like to contribute, feel free to fork the repository and submit a pull request with your improvements.

## 🐜 License

This project is licensed under the **MIT License**.

---

Developed by **Rupesh Varma** 

