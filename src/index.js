import debounce from 'lodash.debounce';
import API from './fetchCountries';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.searchInput.addEventListener('input',debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const countryName = evt.target.value.trim();
    if (countryName === '') {
        clearContent();
        return;
    }

    API.fetchCountries(countryName).
        then(parseRequest).
        catch(onError);
}

function parseRequest(parseData) {    
    clearContent();
    if (parseData.length > 10) {
       Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
       return;
    }
    if(parseData.length > 1) {
        renderListCountries(parseData);
    } else {
        renderCountryCard(parseData);
    }    
}

function onError(err) {    
    if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearContent();
    }   
}

function clearContent() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function renderListCountries(parseData) {    
    for (const data of parseData) {
        const markup = 
        `<li><img src="${data.flags.svg}" width="30" alt="${data.name.common}">            
            ${data.name.official}
        </li>`
        refs.countryList.insertAdjacentHTML("beforeend", markup);
    }
}

function renderCountryCard(parseData) {
    for (const data of parseData) {
        const lang = Object.values(data.languages);
        const markup = 
        `<h2><img src="${data.flags.svg}" width="30" alt="${data.name.common}">
            ${data.name.official}
        </h2>
        <p><strong>Capital: </strong>${data.capital[0]}</p>
        <p><strong>Population: </strong>${data.population}</p>
        <p><strong>Languages: </strong>${[...lang]}</p>`
        refs.countryInfo.insertAdjacentHTML("beforeend", markup);
    }
    
}


