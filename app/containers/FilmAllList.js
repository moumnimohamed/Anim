
 
import {SafeAreaView,FlatList,StyleSheet} from 'react-native';
import React from "react"
import {connect} from 'react-redux';
 
import {FilmCard} from '../components/FilmCard';


  function FilmAllList  (props) {
 
    return(
        <SafeAreaView style={styles.container}>
        <FlatList
        data={props.films }
        style={styles.FlatList}
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <FilmCard item={item}  navigate={()=>{props.navigation.navigate('FilmDetail', {  title:item.title })} } />}
        numColumns={2}
        keyExtractor={(item,index) => index.toString()}
      />
         </SafeAreaView>

    )
}

   


const styles = StyleSheet.create({
    FlatList:{
    
    }
})




const mapStateToProps = state => {
    return {
      
      films: state.films && state.films.payload ? state.films.payload: [],
      
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps,
  )(FilmAllList);
  
 