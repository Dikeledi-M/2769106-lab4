const countryInput = document.getElementById('country-input');
const searchBtn = document.getElementById('search-btn');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');
const errorMessage = document.getElementById('error-message');
const loadingSpinner = document.getElementById('loading-spinner');

async function searchCountry(countryName) {
    try{
        //show loading spinner
        loadingSpinner.classList.remove('hidden');
         // Fetch country data
        const response = await fetch('https://restcountries.com/v3.1/name/${countryName}');
        const data = await response.json();
        
    }
    
}