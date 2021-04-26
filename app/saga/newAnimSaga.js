import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/newAnimRedux';

/** function that returns an axios call */

function getRoomsApi() {
  return axios({
    method: 'get',
    url: 'https://apk.addanime.online/',
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export function* getNewAnimes(action) {
  try {
    // const response = yield getRoomsApi(); // fetch page
    const response = yield getRoomsApi(); // fetch page
    console.log('bitch', response);
    if (response.status === 200) {
      const htmlString = yield response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string

      const liList = $('.anime-card-container  .hover.ehover6').map(
        (_, hover) => ({
          // map to an list of objects
          title: $('img', hover).attr('alt'),
          img: $('img', hover).attr('src'),
          link: $('a', hover).attr('href'),
        }),
      );

      console.log('story22', liList);

      var myData = Object.keys(liList).map(key => {
        return (
          key !== ('options' || '_root' || 'length' || 'prevObject') &&
          liList[key]
        );
      });
      console.log(' table : ', myData);

      yield put(actionsAndType.getNewSuccess(myData));
    } else {
      yield put(actionsAndType.getAnimFailure(null));
      console.log('non connection');
    }
  } catch (error) {
    // Error 😨
    if (error.response) {
      console.log(error.response);
      console.log('error.response.data', error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }
}
