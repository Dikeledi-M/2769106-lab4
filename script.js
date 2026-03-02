const countryInput = document.getElementById('country-input');
const searchBtn = document.getElementById('search-btn');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');
const errorMessage = document.getElementById('error-message');
const loadingSpinner = document.getElementById('loading-spinner');

async function searchCountry(countryName) {
    try {
        loadingSpinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        borderingCountries.innerHTML = '';
        countryInfo.innerHTML = '';

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);

        if (!response.ok) {
            throw new Error('Country not found');
        }

        const data = await response.json();
        const country = data[0];

        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" width="300">
        `;

        if (country.borders) {
            for (let c_code of country.borders) {
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${c_code}`);
                const borderData = await res.json();
                const borderCountry = borderData[0];

                const article = document.createElement('article');
                article.innerHTML = `
                    <p>${borderCountry.name.common}</p>
                    <img src="${borderCountry.flags.svg}" width="100">
                `;
                borderingCountries.appendChild(article);
            }
        } else {
            borderingCountries.innerHTML = '<p>No bordering countries</p>';
        }

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}
searchBtn.addEventListener('click', () => searchCountry(countryInput.value));

countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCountry(countryInput.value);
});