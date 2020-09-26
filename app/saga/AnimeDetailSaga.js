import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/AnimeDetailRedux';
import Reactotron from 'reactotron-react-native';

/** function that returns an axios call */
function getAnimeDetailApi(link) {
  console.log('api para', link);
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

export function* getAnime_PeaceDetail(action) {
  try {
    const response = yield call(getAnimeDetailApi, action.data); // fetch page

    if (response.status === 200) {
      const htmlString = yield response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string

      const cat = [];

      // cat.push( $(".details-section .details-content-info ul li:nth-child(3) label").text() )

      $('.anime-genres li').map((_, elm) => {
        cat.push({
          title: $('a', elm).text(),
          link: $('a', elm).attr('href'),
        });
      });

      console.log('catt', cat);
      const story = [];

      story.push($('.anime-story').text());
      console.log('story', story);

      //STREAMING LINKS
      href = [];
      $('.episodes-card-container  .hover.ehover6').map((_, hover) =>
        href.push({
          // map to an list of objects
          text: $('img', hover).attr('alt'),

          link: $('a', hover).attr('href'),
        }),
      );

      console.log('loma', href);

      // related film

      const relatedF = [];
      /* $('.col-list-padding > .hovereffect').map((_, hover) => {
        relatedF.push({
          // map to an list of objects
          title: $('h2', hover).text(),
          img: $('.img-responsive', hover).attr('src'),
          link: $('a', hover).attr('href'),
        });
      }); */

      const detailsInfo = $('.anime-info').map((i, hover) => ({
        // map to an list of objects
        title: $('span', hover).text(),
        title2: $('a', hover).text(),
        a: $('a', hover).attr("href"),
      }));

      var DataInfo = Object.keys(detailsInfo).map(key => {
        return (
          key !== ('options' || '_root' || 'length' || 'prevObject') &&
          detailsInfo[key]
        );
      });
      console.log(' DataInfo : ', DataInfo);

      const objectAnim = [
        {
          image: $('.anime-thumbnail img').attr('src'),
          published: [DataInfo[0].title, DataInfo[0].title2],
          season: [DataInfo[5].title, DataInfo[5].title2,DataInfo[5].a],
          category: cat,

          episodesNbr: [
            $(
              '.details-section .details-content-info ul li:nth-child(4) label',
            ).text(),
            $(
              '.details-section .details-content-info ul li:nth-child(4) span',
            ).text(),
          ],
          status: [DataInfo[2].title, DataInfo[2].title2],
          story: story,
          streamLinks: href,
          relatedF: relatedF,
        },
      ];

      var createOBJ = Object.keys(objectAnim).map(key => {
        return objectAnim[key];
      });

      Reactotron.log('createOBJ', createOBJ);
      yield put(actionsAndType.animeDetailSuccess(createOBJ));
    } else {
      yield put(actionsAndType.animeDetailFailure(null));
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
