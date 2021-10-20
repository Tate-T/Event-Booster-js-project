import axios from 'axios';
import Notiflix from 'notiflix';
import config from './config.json';

export const sendParam = {
  apikey: config.key,
};

//console.log(getDataServer('NBA', 'US'));


export async function getDataServer(keyword, countryCode, page) {
  keyword === '' ? (delete sendParam.keyword) : (sendParam.keyword = keyword);
  countryCode === '' ? (delete sendParam.countryCode) : (sendParam.countryCode = countryCode);
  page === '' ? delete sendParam.page : (page >= 50 ? (sendParam.page = 49) : (sendParam.page = page));

  // console.log('SendParam: ', sendParam);

  const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
    params: sendParam,
  });
  // console.log(response)

  if (response.data.page.totalElements === 0) {

    Notiflix.Notify.failure(
      'К сожалению, по Вашему запросу событий не найдено. Попробуйте изменить запрос.')
  };

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  throw new Error(
    Notiflix.Notify.failure(
      'Ваш запрос украли мыши'),
  );

}
