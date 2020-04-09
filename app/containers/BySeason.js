
 
import {SafeAreaView,FlatList,StyleSheet} from 'react-native';
import React , {useState, useEffect} from "react"
import {connect} from 'react-redux';
 
import {FilmCard} from '../components/FilmCard';
import CategoryCard from '../components/CategoryCard';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';

import Loader from '../components/Loader';


  function BySeason  (props) {
     
        const [anime,setAnime] =useState([])


       
   

    useEffect (()=>{
      console.log("hahi", props.navigation.state.params.link)
      if(!anime.length>0){
      getAnimeBySeason( props.navigation.state.params.link)}
    })

   const getAnimeBySeason = async (link) => {
        axios({
        method: 'get',
        url: link,
      }).then(response => {
          if (response.status === 200) {
            const htmlString =   response.data; // get response text
            const $ = cheerio.load(htmlString); // parse HTML string
                   
                const liList = $('.col-list-padding > .hovereffect').map((_, hover) => ({
                title: $('h2', hover).text(),
                img: $('.img-responsive', hover).attr('src'),
                link: $('a', hover).attr('href'),
              })); 
            
            var myData = Object.keys(liList).map(key => {
              return liList[key];
            });
          }
      
          
          setAnime(myData)
          
        })
        .catch(error => {
             error;
        });
      }
      
    return(
         
        <SafeAreaView  >
      {/* <FlatList
              style={{ marginLeft:5,marginTop:10,marginBottom:10 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={props.categories}
              renderItem={({ item }) => item.title && <CategoryCard title={ item.title}  navigate={()=> {  props.navigation.push('ByCategory',{title:item.title,type:"anime"})}}/>}
        keyExtractor={item => (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(8)}
        /> */}

        <FlatList
        data={ anime}
         
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item && item.img && <FilmCard showTitle={true}  item={item}  navigate={()=>{props.navigation.push('AnimeDetail', {  item:item })} } />}
        numColumns={2}
        ListFooterComponent={   () => {
   
    if (!props.fetching) return null;
    return (
      <Loader/>
    );
  }}
        keyExtractor={(item,index) => index.toString()}
        
      />
            {/*   {props.fetching && <Loader/>} */}
         </SafeAreaView>

    )
}

BySeason.navigationOptions = screenProps => ({
  title: screenProps.navigation.state.params.title
});




const mapStateToProps = state => {
    return {
         
        categories :state.animeList && state.animeList.categories ? state.animeList.categories : [],
   
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
         
    };
  };
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps,
  )(BySeason);
  
 