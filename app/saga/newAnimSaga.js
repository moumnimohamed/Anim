import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/newAnimRedux';

/** function that returns an axios call */
function getRoomsApi() {
  return axios({
    method: 'get',
    url: `https://anime2001.com/anime_list`,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export function* getNewAnimes(action) {
  const response = yield getRoomsApi(); // fetch page

  const htmlString = yield response.data; // get response text
  const $ = cheerio.load(htmlString); // parse HTML string

  const liList = $('.col-list-padding > .hovereffect') // select result <li>s
    .map((_, hover) => ({
      // map to an list of objects
      title: $('h2', hover).text(),
      img: $('.img-responsive', hover).attr('src'),
      link: $('a', hover).attr('href'),
    }));
  // console.log(' before send typeof : ', Object.keys(liList) );
  var myData = Object.keys(liList).map(key => {
    return liList[key];
  });
  // console.log(' mydata : ', myData);

  yield put(actionsAndType.getNewSuccess(myData));
}
