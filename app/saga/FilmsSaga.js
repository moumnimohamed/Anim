import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/FilmRedux';

/** function that returns an axios call */
function getFilmApi() {
  return axios({
    method: 'get',
    url: 'https://apk.addanime.online/anime-type/movie',
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

function getCharacters() {
  return axios({
    method: 'get',
    url: 'https://api.jikan.moe/v3/anime/1/characters_staff',
  })
    .then(res => {

      return res;
    })
    .catch(error => {

      return error;
    });
}

export function* getFilm(action) {
  try {
    const response = yield getFilmApi(); // fetch page
    const characters = yield getCharacters(); // fetch page
    /*    let imgProfile
    if (characters.status === 200) {
      console.log("vovo",characters.data.characters image_url)

      characters.data.characters image_url
    } */
      console.log("characters", characters)
    if (response.status === 200) {

      const htmlString = yield response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string

      const liList = $('.anime-card-container  .hover.ehover6').map((_, hover) => ({
        // map to an list of objects
        title: $('img', hover).attr('alt'),
        img: $('img', hover).attr('src'),
        link: $('a', hover).attr('href'),
      }));

      var myData = Object.keys(liList).map(key => {
        return liList[key];
      });
      console.log('ha aflam  ', myData);
      yield put(actionsAndType.filmSuccess(myData));

      // make category list
      /* let i=0
      const categoryList = $('.catelist > li').map((_, li) => (
        i++,
        {
        img :characters.data.characters[i].image_url,
        title: $('a', li).text(),

      })); */

    /*   var catData = Object.keys(categoryList).map(key => {
        return categoryList[key];
      });

      console.log("catData",catData) */

      /* yield put(actionsAndType.filmCategoriesSuccess(catData)); */
    } else {
      yield put(actionsAndType.filmFailure(null));
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
