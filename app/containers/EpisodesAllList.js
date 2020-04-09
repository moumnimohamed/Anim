
 
import {SafeAreaView,FlatList,StyleSheet} from 'react-native';
import React , {useState} from "react"
import {connect} from 'react-redux';
import {aniEpisodeRequest} from '../redux/AnimeEpisodes';
 
import {FilmCard} from '../components/FilmCard';

import AnimeServers from '../components/AnimeServers';

import Loader from '../components/Loader';

   

   
  function EpisodesAllList  (props) {

    const [epsHref, setEpsHref] = useState([]);
    const [showModal, setShowModal] = useState(false);
      const getEpsServers = async (link) => {
         setShowModal(true)
      axios({
      method: 'get',
      url: link,
      }).then(response => {
      if (response.status === 200) {
      const htmlString =   response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string
      href =[];
      $(".embed-player-tabs .nav.nav-tabs  li").map((_, elm) => 
      {
         href.push( {text: $(elm).text(),link: $(elm).attr('hrefa') }) 
       /* console.log("lala",$('a', elm).attr('href')) */
        }
      ); 
        
       setEpsHref(href)
      
      }
      })
      .catch(error => {
       error;
      });
      }

      
    return(

        <SafeAreaView style={styles.container}>
      {/* <FlatList
              style={{ marginLeft:5,marginTop:10,marginBottom:10 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={props.categories}
              renderItem={({ item }) => item.title && <CategoryCard title={ item.title}  navigate={()=> {  props.navigation.push('ByCategory',{title:item.title,type:"anime"})}}/>}
        keyExtractor={item => (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(8)}
        /> */}

        <FlatList
        data={props.animeEpisodes}
        style={styles.FlatList}
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <FilmCard showTitle={true}  item={item}    navigate={()=>getEpsServers(item.link) } />}
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

            <AnimeServers  hide={()=> setShowModal (false)}  epsHref={ epsHref} showModal={ showModal}  navigation={ props.navigation}/>
     
         </SafeAreaView>

    )
}

   


const styles = StyleSheet.create({
    FlatList:{
    
    }
})




const mapStateToProps = state => {
    return {
        animeEpisodes:state.animeEpisodes && state.animeEpisodes.payload ? state.animeEpisodes.payload: [],
        fetching:state.animeEpisodes.fetching ,
         
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        aniEpisodeRequest: data => dispatch(aniEpisodeRequest(data)),
    };
  };
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps,
  )(EpisodesAllList);
  
 