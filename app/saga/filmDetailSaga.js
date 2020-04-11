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
           
         // cat.push( $(".details-section .details-content-info ul li:nth-child(3) label").text() )

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

          //STREAMING LINKS
          href =[];
          $(".embed-player-tabs .nav li").map((_, elm) => 
          {
            href.push( {text:$(elm).text(),link:$(elm).attr('hrefa')}) 
          
            }
        );  

        if ( href.length <= 0  ) {
          console.log("count2",href.length)
          $('.episode-videoplay ul li').map((_, elm) => {
            href.push({text: $(elm).text(), link: $(elm).attr('data-href')});
          });
        } 
 
// related film
         

        const relatedF = [];
        $('.col-list-padding > .hovereffect').map((_, hover) => {
          relatedF.push(
            {
          // map to an list of objects
          title: $('h2', hover).text(),
          img: $('.img-responsive', hover).attr('src'),
          link: $('a', hover).attr('href'),
        }
        )
      }
        );
      
       

         console.log("related FILM",relatedF)

        const objectAnim =  [
        { 
           
          published :[
                      $(".details-section .details-content-info ul li:nth-child(1) label").text(),
                      $(".details-section .details-content-info ul li:nth-child(1) span").text()
                     ],
          duration :[
            $(".details-section .details-content-info ul li:nth-child(2) label").text(),
            $(".details-section .details-content-info ul li:nth-child(2) span").text()
           ],
          category: cat,
          story:story,
         streamLinks :href,
         relatedF :relatedF
         
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
