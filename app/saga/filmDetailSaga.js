import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/filmDetailRedux';
import { act } from 'react-test-renderer';
import Reactotron from 'reactotron-react-native'
 

/** function that returns an axios call */
function getAnimeDetailApi( link) {
  console.log("api para",link);
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

export function* getAnimeDetail (action) {
    console.log("actiona",action)
  try {
    const response = yield call(getAnimeDetailApi,action.data); // fetch page
    

    if (response.status === 200) {
      const htmlString = yield response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string
              
       
          const cat=[];
           
          cat.push( $(".details-section .details-content-info ul li:nth-child(3) label").text() )

             $(".details-section .details-content-info ul li:nth-child(3) a").map((_, elm) => 
            {
              cat.push( {title:$(elm).text(),link:$(elm).attr('href')}) 
               
              }
          );  



          const story=[];
           
          story.push( $(".details-section .details-content-info ul li:nth-child(4) label").text() )

             $(".details-section .details-content-info ul li:nth-child(4) p").map((_, elm) => 
            {
              story.push( {text:$(elm).text()}) 
               
              }
          );  
 
        const objectAnim =  [
        { 
           
          Published :[
                      $(".details-section .details-content-info ul li:nth-child(1) label").text(),
                      $(".details-section .details-content-info ul li:nth-child(1) span").text()
                     ],
          Duration :[
            $(".details-section .details-content-info ul li:nth-child(2) label").text(),
            $(".details-section .details-content-info ul li:nth-child(2) span").text()
           ],
          Category: cat,
             
          story:story,
         
        }
          ]
       
      
      var createOBJ = Object.keys(objectAnim).map(key => {
        return objectAnim[key];
      });
       
      Reactotron.log("createOBJ",createOBJ)
      yield put(actionsAndType.detailSuccess(createOBJ));

       
     

      

    } else {
      yield put(actionsAndType.detailFailure(null));
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
