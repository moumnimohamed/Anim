import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/AnimeListRedux';

/** function that returns an axios call */
function getAnimeListeApi(page) {
  console.log("page",page)
  let link =""
  if (page > 0){
   link =`https://anime2001.com/anime_list/page/${page}`
}else{
  link =`https://anime2001.com/anime_list/`
}
  return axios({
    method: 'get',
    url: link,
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export function* getAnimList (action) {
  try {
    console.log("hihi",action)
    const response = yield getAnimeListeApi(action.data); // fetch page
    

    if (response.status === 200) {
      const htmlString = yield response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string
             
          const liList = $('.col-list-padding > .hovereffect').map((_, hover) => ({
          title: $('h2', hover).text(),
          img: $('.img-responsive', hover).attr('src'),
          link: $('a', hover).attr('href'),
        })); 
      
      var myData = Object.keys(liList).map(key => {
        return liList[key];
      });
      yield put(actionsAndType.getAnimeListSuccess(myData));

      // make category list
      const categoryList = $('.catelist > li').map((_, li) => ({
        title: $('a', li).text(),
        
      })); 
    
    var catData = Object.keys(categoryList).map(key => {
      return categoryList[key];
    });
      console.log("catData",catData)

      yield put(actionsAndType.getCategorySuccess(catData));

    } else {
      yield put(actionsAndType.getAnimeListFailure(null));
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
