import { getDataServer } from './js/fetchData';
import { debounce } from 'debounce';
import { showData } from './js/showData';
import { showPagination } from './js/pagination';
import { showPreloader } from './js/preload';

import countries from './countries.json';

function printOptions(data) {
  const optionList = document.querySelector('#choose-country');
  const markUp = data
    .map(item => {
      const { countryCode, countryName } = item;
      return `<option value='${countryName}'>${countryCode}</option>`;
    })
    .join('');
  optionList.insertAdjacentHTML('beforeend', markUp);
}

printOptions(countries);

document.querySelector('#search-form').addEventListener('input', debounce(getCards, 1000));

function getCards() {
  const searchInput = document.querySelector('#search-input');
  const searchCountry = document.querySelector(`#search-country`);
  const searchCountryOption = document.querySelector(
    `#choose-country option[value="${searchCountry.value}"]`,
  );
  // console.log(searchCountryOption.textContent)

  // getDataServer(searchInput.value);

  // const countryCodeCheck = countries.some(
  //   item => item.countryCode === searchCountryOption?.textContent,

  // );
  // console.log(searchCountryOption.textContent)

  // if (countryCodeCheck || !searchCountryOption.textContent) {
  //   console.log(countryCodeCheck)
  //   getDataServer(searchInput.value, searchCountryOption.textContent);
  // }
  const keywordValidator = !searchInput.value ? '' : searchInput.value;
  const countryValidator = !searchCountryOption?.textContent
    ? ''
    : searchCountryOption?.textContent;

  localStorage.setItem('localCountryName', searchCountry.value);
  localStorage.setItem('localCountryCode', searchCountryOption.textContent);

  const promisePreload = showPreloader();

  getDataServer(keywordValidator, countryValidator)
    .then(data => {
      /*       if (data._embedded) {
        document.querySelector('.events__list').innerHTML = '';
        showData(data._embedded.events);
        showPagination(
          1,
          +data.page.number + 1,
          +data.page.totalPages >= 50 ? 49 : +data.page.totalPages,
        );
        console.log('11111');
      }
 */ return promisePreload;
    })
    .then(preloadNode => preloadNode.remove());
}
