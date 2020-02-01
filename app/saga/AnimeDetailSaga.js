import {call, put} from 'redux-saga/effects';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import * as actionsAndType from '../redux/AnimeDetailRedux';
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

export function* getAnime_PeaceDetail (action) {
    
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
           
          story.push( $(".details-section .details-content-info ul li:nth-child(6) label").text() )

             $(".details-section .details-content-info ul li:nth-child(6) p").map((_, elm) => 
            {
              story.push( {text:$(elm).text()}) 
               
              }
          );  

          //STREAMING LINKS
          href =[];
          $(".main-widget .eps-content-list li").map((_, elm) => 
          {
             href.push( {text: $('a', elm).text(),link: $('a', elm).attr('href') }) 
           /* console.log("lala",$('a', elm).attr('href')) */
            }
        );  
 
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
          season :[
            $(".details-section .details-content-info ul li:nth-child(2) label").text(),
            $(".details-section .details-content-info ul li:nth-child(2) span").text()
           ],
          category: cat,

          episodesNbr :[
            $(".details-section .details-content-info ul li:nth-child(4) label").text(),
            $(".details-section .details-content-info ul li:nth-child(4) span").text()
           ],
           status :[
            $(".details-section .details-content-info ul li:nth-child(5) label").text(),
            $(".details-section .details-content-info ul li:nth-child(5) span").text()
           ],
          story:story,
         streamLinks :href,
         relatedF :relatedF
         
        }
          ]
       
      
      var createOBJ = Object.keys(objectAnim).map(key => {
        return objectAnim[key];
      });
       
      Reactotron.log("createOBJ",createOBJ)
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
