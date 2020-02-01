
 
import {SafeAreaView,FlatList,StyleSheet} from 'react-native';
import React , {useState} from "react"
import {connect} from 'react-redux';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {FilmCard} from '../components/FilmCard';
import CategoryCard from '../components/CategoryCard';

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
              style={{ marginLeft:5,marginTop:10,marginBottom:10 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={props.categories}
              renderItem={({ item }) => item.title && <CategoryCard title={ item.title}  navigate={()=> {  props.navigation.navigate('ByCategory',{title:item.title,type:"anime"})}}/>}
        keyExtractor={item => (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(8)}
        />

        <FlatList
        data={props.animeList}
        style={styles.FlatList}
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <FilmCard showTitle={true}  item={item}  navigate={()=>{props.navigation.navigate('AnimeDetail', {  item:item })} } />}
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
        categories :state.animeList && state.animeList.categories ? state.animeList.categories : [],
   
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
  
 