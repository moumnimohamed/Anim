
 
import {View,SafeAreaView,FlatList,StyleSheet} from 'react-native';
import React from "react"
import {connect} from 'react-redux';
import CategoryCard from '../components/CategoryCard';
import {FilmCard} from '../components/FilmCard';

const FlatListHeader = (props) => {
  return (
    <View
    >
    <FlatList
              style={{ marginLeft:5,marginTop:10,marginBottom:10 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={props.categories}
              renderItem={({ item }) => item.title && <CategoryCard item={ item}  navigate={()=> {  props.navigation.navigate('ByCategory',{title:item.title,type:"film"})}}/>}
        keyExtractor={item => (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(8)}
        />
       </View>
  );
}



  function FilmAllList  (props) {

      
 
    return(
        <SafeAreaView style={styles.container}>
        
        <FlatList
          ListHeaderComponent = {  FlatListHeader(props) }   
        data={props.films }
        style={styles.FlatList}
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <FilmCard showTitle={true}  item={item}  navigate={()=>{props.navigation.push('FilmDetail', {  item:item })} } />}
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
      categories :state.films && state.films.categories ? state.films.categories : [],
   
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
  
 