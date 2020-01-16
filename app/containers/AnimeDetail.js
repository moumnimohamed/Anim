import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import   {detailRequest} from '../redux/filmDetailRedux';

import { Chip,ActivityIndicator } from 'react-native-paper';
import {Dimensions,ImageBackground,View,ScrollView,Image,Text,FlatList,StyleSheet,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


class AnimeDetail extends React.Component {


  componentDidMount = () => {

  

    const animeName=this.props.navigation.state.params.title;

    const anime=  this.props.newAnime[this.props.navigation.state.params.index]
       console.log("anime.link",anime.link)

       if(animeName.includes("فيلم")){
        this.props.filmDetailRequest(anime.link)
       }else{
         console.log("is anime episode")
       }

    

  }
   

render(){
  console.log("ha awis",this.props.filmDetail)
      const animeIndex=  this.props.navigation.state.params.index
      const anime=  this.props.newAnime[animeIndex]

      const cat = this.props.filmDetail  && this.props.filmDetail.length > 0 ? this.props.filmDetail[0]["Category"] :""

    return(
        <SafeAreaView style={{ backgroundColor:"#f8f5fa",flex:1}}>
      
           <ImageBackground source={{uri:anime.img}} style={{width: '100%',flex:1}}>
<Text>{cat[0]}</Text>
<Text>bgrbtbty</Text>
<Text>bgrbtbty</Text>
<Text>bgrbtbty</Text>
<Text>bgrbtbty</Text>
<Text>bgrbtbty</Text>
          </ImageBackground> 
          </SafeAreaView>
    )
}

}




const mapStateToProps = state => {
    return {
         filmDetail :state.filmDetail.payload ? state.filmDetail.payload : [],
        newAnime:state.newAnime && state.newAnime.payload ? state.newAnime.payload : [],
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      filmDetailRequest :data =>   dispatch (detailRequest(data)),
       
     
    };
  };
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps,
  )(AnimeDetail);
  