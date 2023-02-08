import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');

input.addEventListener('input', debounce(() => onInput(), 1000));

function FetchCountries(name) {

fetch(
  `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`
)
    .then(response => response.json()).then(data => console.log(data[0].capital));
}

function onInput() {
    const name = input.value;
    FetchCountries(name);
}
