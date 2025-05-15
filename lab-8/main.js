const apiKey = '2754fe67782c64584b1ab5e38a9ebe7a';

const input = document.getElementById('city-input');
const addCityButton = document.getElementById('addCityButton');

addCityButton.addEventListener('click', () => addCity());

let savedCities = JSON.parse(localStorage.getItem('cities')) || [];

function saveCities() {
    localStorage.setItem('cities', JSON.stringify(savedCities));
}

function addCity() {
    const city = input.value.trim();

    if (!city) return;
    if (savedCities.includes(city.toLowerCase())) {
        alert('Miasto już dodane!');
        return;
    }

    savedCities.push(city.toLowerCase());
    saveCities();
    input.value = '';
    renderCities();
}

function removeCity(city) {
    savedCities = savedCities.filter(c => c !== city.toLowerCase());
    saveCities();
    renderCities();
}

async function fetchWeather(city) {
    try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`);
        if (!res.ok) throw new Error('Nie znaleziono miasta');
        const data = await res.json();

        return {
            name: data.name,
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            description: data.weather[0].description
        };
    } catch (err) {
        console.log(err)
        return null;
    }
}

async function renderCities() {
    const container = document.getElementById('cities');
    container.innerHTML = '';

    for (const city of savedCities) {
        const weather = await fetchWeather(city);
        if (!weather) continue;

        const card = document.createElement('div');
        card.className = 'city-card';

        card.innerHTML = `
          <button class="remove-btn" onclick="removeCity('${city}')">×</button>
          <h2>${weather.name}</h2>
          <img src="${weather.icon}" alt="${weather.description}">
          <p><strong>${weather.temp}°C</strong></p>
          <p>Wilgotność: ${weather.humidity}%</p>
          <p>${weather.description}</p>
        `;

        container.appendChild(card);
    }
}

renderCities();