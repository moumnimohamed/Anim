
 
import {SafeAreaView,FlatList,StyleSheet} from 'react-native';
import React , {useState} from "react"
import {connect} from 'react-redux';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {FilmCard} from '../components/FilmCard';
import Loader from '../components/Loader';


  function AnimeAllList  (props) {
     
     const [page,setPage] = useState(2);
     
    const _loadAnime = () =>{
        
         
        props.getAnimeList(page)
        setPage(page + 1)
    }
    return(

        <SafeAreaView style={styles.container}>
    
        <FlatList
        data={props.animeList}
        style={styles.FlatList}
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <FilmCard showTitle={true}  item={item}  navigate={()=>{props.navigation.navigate('AnimeDetail', {  title:item.title })} } />}
        numColumns={2}
        ListFooterComponent={   () => {
   
    if (!props.fetching) return null;
    return (
      <Loader/>
    );
  }}
        keyExtractor={(item,index) => index.toString()}
        onEndReachedThreshold={0.5}
  onEndReached={() => {
          _loadAnime()
      
  }}
      />
            {/*   {props.fetching && <Loader/>} */}
         </SafeAreaView>

    )
}

   


const styles = StyleSheet.create({
    FlatList:{
    
    }
})




const mapStateToProps = state => {
    return {
        animeList:state.animeList && state.animeList.payload ? state.animeList.payload : [],
        fetching:state.animeList.fetching ,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        getAnimeList: data => dispatch(getAnimeListRequest(data)),
        
    };
  };
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps,
  )(AnimeAllList);
  
 