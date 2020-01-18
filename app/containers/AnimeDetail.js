import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import   {detailRequest} from '../redux/filmDetailRedux';

import { Chip } from 'react-native-paper';
import {Dimensions,ImageBackground,View,ScrollView,Image,Text,FlatList,StyleSheet,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {Playeroo} from "../components/Playeroo"
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
  reactotron.log("ha awis",this.props.filmDetail)
      const animeIndex=  this.props.navigation.state.params.index
      const anime=  this.props.newAnime[animeIndex]

      const cat = this.props.filmDetail  && this.props.filmDetail.length > 0 ? this.props.filmDetail[0]["category"] :""
      const story = this.props.filmDetail  && this.props.filmDetail.length > 0 ? this.props.filmDetail[0]["story"] :[]
      const published = this.props.filmDetail  && this.props.filmDetail.length > 0 ? this.props.filmDetail[0]["published"] :[]
      const duration = this.props.filmDetail  && this.props.filmDetail.length > 0 ? this.props.filmDetail[0]["duration"] :[]
      const streamLinks  =  this.props.filmDetail  && this.props.filmDetail.length > 0 ? this.props.filmDetail[0]["streamLinks"] :[]
       
      reactotron.log("ha streamLinks",streamLinks)
    return(
        <SafeAreaView style={styles.container}>
      <ScrollView  style={ styles.scroll}>

           <ImageBackground  blurRadius={1}  source={{uri:anime.img}} style={styles.bkg}>
         
        <View style={styles.viewDATA}>
       
        <View style={styles.imageContainer}>
        <Image
         ImageResizeMode ={"contain"}
          style={styles.image}
          source={{uri: anime.img}}
        />
        </View>
        
        { 
          streamLinks.map( (video,i )=> 
                {    return  (video && video.text ?     <Playeroo key={i} video={video}/> : null) }
              )}
       
      
         

        <FlatList
            
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={cat }
              renderItem={({ item,index }) => <Chip key={index} style={{marginTop:10,marginRight:10,backgroundColor:"#F5F5F5"}}  onPress={() => console.log('Pressed')}><Text style={{color:"#9A999A"}}>{item.title}</Text></Chip> }
        keyExtractor={item => item.title}
              
              />
            { published[0]  && <Text>{published[0]}</Text>}
            { published[1]  && <Text>{published[1]}</Text>}
            { duration[0]  && <Text>{duration[0]}</Text>}
            { duration[1]  && <Text>{duration[1]}</Text>}
            
              { 
                story.map( (p,i )=> 
                {    return  ( p && p.text ?   <Text key={i} style={{padding:20,color:"#9A999A"}}>{p.text}</Text> : null) }
              )}
             
              <Playeroo t={"dd"}/>
        

        </View>
         
        </ImageBackground> 
          </ScrollView>
          </SafeAreaView>
    )
}

}


const styles = StyleSheet.create({

  container:{
    backgroundColor:"#f8f5fa",
    flex:1,
   
  },
  bkg:{
    width: '100%',
    height:screenHeight, 
     
  },
  scroll:{  
    
     
  },
  
viewDATA : {
  marginTop:200,
  paddingTop:90,
  backgroundColor:"#FFF",

width:screenWidth ,
borderTopLeftRadius:screenWidth/2,
borderTopRightRadius:screenWidth/2,
alignItems:"center"
},


  imageContainer:{
    top:-140,
    position:"absolute",
    width:"50%", 
    height:220,
    borderRadius: 90,
    overflow:"hidden",

    backgroundColor:"white",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.39,
shadowRadius: 8.30,

elevation: 13,
  },
  image: {
     
    width:"100%", 
    height:"100%",
},
})


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
  