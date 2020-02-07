import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/newAnimRedux';

/** function that returns an axios call */
function getRoomsApi() {
  return axios({
    method: 'get',
    url: 'https://anime2001.com/',
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
    const response = yield getRoomsApi(); // fetch page
    
    console.log("response ");
    if (response.status === 200) {
      const htmlString = yield response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string
       
       const liList = $('.home-slider  .hovereffect').map((_, hover) => ({
          // map to an list of objects
          title: $('h2', hover).text(),
          img: $('.img-responsive', hover).attr('src'),
          link: $('a', hover).attr('href'),
        })); 
      // console.log(' before send typeof : ', Object.keys(liList) );
      var myData = Object.keys(liList).map(key => {
        return   key !== ("options" || "_root" || "length" || "prevObject") && liList[key] ;
      });
       console.log(' table : ', myData );

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
