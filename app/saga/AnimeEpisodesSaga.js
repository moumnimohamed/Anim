import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/AnimeEpisodes';

/** function that returns an axios call */
function getAnimeEpisodesApi() {
  return axios({
    method: 'get',
    url: 'https://anime2001.com/episode/',
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export function* getAnimeEpisodes(action) {
  try {
    const response = yield getAnimeEpisodesApi(); // fetch page
    

    if (response.status === 200) {
      const htmlString = yield response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string
       
      const liList = $('.col-list-padding > .hovereffect').map((_, hover) => ({
          // map to an list of objects
          title: $('h2', hover).text(),
          img: $('.img-responsive', hover).attr('src'),
          link: $('a', hover).attr('href'),
        })); 
      
      var myData = Object.keys(liList).map(key => {
        return liList[key];
      });
       

      yield put(actionsAndType.aniEpisodeSuccess(myData)); 
    } else {
      yield put(actionsAndType.aniEpisodeFailure(null));
   
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
