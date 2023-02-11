import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(() => onInput(), DEBOUNCE_DELAY)
);

function onInput() {
  const name = input.value.trim();
  if (name === "") return;

  fetchCountries(name)
    .then(countries => {
      const numberOfCountries = countries.length;

      if (numberOfCountries > 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (numberOfCountries >= 2 && numberOfCountries <= 10) {
        const countryListMarkup = countries.map(country => {
          return `<li class="country-item">
          <div class="img-wrap">
          <img src="${country.flags.svg}" alt="" width="30"/></div>
          <p class="country-name">${country.name.official}</p>
          </li>`;
        });
        countryInfo.innerHTML = '';
        countryList.innerHTML = countryListMarkup.join('');
      } else {
        const countryListMarkup = `<li class="country-item">
          <div class="img-wrap">
          <img src="${countries[0].flags.svg}" alt="" width="30"/></div>
          <p class="country-name finded">${countries[0].name.official}</p>
          </li>`;
        const countryInfoMarkup = `<p class="info-value"><span class="country-info">Capital:</span>  ${
          countries[0].capital
        }</p>
          <p class="info-value"><span class="country-info">Population:</span>  ${
            countries[0].population
          }</p>
          <p class="info-value"><span class="country-info">Languages:</span>  ${Object.values(
            countries[0].languages
          ).join(', ')}</p>`;
        countryInfo.innerHTML = countryInfoMarkup;
        countryList.innerHTML = countryListMarkup;
      }
    })
    .catch(() => {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}