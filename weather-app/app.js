const KEY = "3265874a2c77ae4a04bb96236a642d2f";

const wrapperEl = document.getElementById("wrapper");
const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <span>${data.weather[0].main}</span>
    `;

    // cleanup
    wrapperEl.innerHTML = "";

    wrapperEl.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const city = searchEl.value;

    if (city) {
        getWeatherByLocation(city);
    }
});