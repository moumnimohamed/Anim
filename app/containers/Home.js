import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TextStyled from "../components/TextStyled"
import { Chip,ActivityIndicator } from 'react-native-paper';
import {Dimensions,ImageBackground,View,ScrollView,Image,Text,FlatList,StyleSheet,SafeAreaView, Alert,TouchableOpacity} from 'react-native';
import {AnimatedCard} from '../components/AnimatedCard';
import {PlayCard} from '../components/PlayCard';
import {FilmCard} from '../components/FilmCard';
import AnimeServers from '../components/AnimeServers';

import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';
import {getNewRequest} from '../redux/newAnimRedux';
import {aniEpisodeRequest} from '../redux/AnimeEpisodes';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {filmRequest} from '../redux/FilmRedux';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Ant from 'react-native-vector-icons/AntDesign';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';


import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const horizontalMargin = 30;
const slideWidth = 200;
 
const itemWidth = slideWidth + horizontalMargin * 2;

class Home extends React.Component {
   

  constructor(props) {
    super(props);
    this.state = {
      activeImage:"",
      activeSlider: 0,
      title: 0,
      show: false,
      showModal:false,
      epsHref:[]
    };
  }

  handleOpen = () => {
    this.setState({show: true});
  };

  handleClose = () => {
    this.setState({show: false});
  };

  getEpsServers = async (link) => {
    this.setState({showModal:true})
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
   console.log(href)
   this.setState({epsHref:href})
  
  }
  })
  .catch(error => {
   error;
  });
  }
  

  componentDidUpdate() {

    /* this.allImages=[];
    if (this.props.newAnimeFailure) {
      this.setState({show: true});
    } */
  }

  

  componentDidMount () {

    
    this.props.getAnimRequest();
    this.props.getAnimeList(0);
    this.props.aniEpisodeRequest();
    this.props.filmRequest();
  }

   
 

  render() {
     
    const anim =
      this.props.newAnime && this.props.newAnime.length > 0
        ? this.props.newAnime[this.state.activeSlider]
        : {}; 
    return (
      <SafeAreaView style={{ backgroundColor:"#f8f5fa"}}>
      <TouchableOpacity  onPress={()=>this.props.navigation.navigate('SearchPage')} >
          <Ant name="search1" size={20} color="white"   />
               </TouchableOpacity>
      <ScrollView  >
     { this.props.fetching ? <Loader/>
     
     :
     <React.Fragment>
{/*  {this.props.fetching ?
            <View style={styles.container}>
      <ActivityIndicator animating={true} color={'#89C13D'} />
      </View>} */}
      
          <ImageBackground blurRadius={1} source={{uri: anim.img}} style={{width: '100%'}}>
          <LinearGradient
        
          colors={['#ffffff00','#f8f5fa']}
           > 
             
              <View >
                <Carousel
                  inactiveSlideOpacity={1}
                  layout={'default'}
                  data={this.props.newAnime}
                  renderItem={({item,index})=> {return item.img ? <AnimatedCard item={item}  navigate={()=>{
                    item.title.includes("فيلم") ?
                      this.props.navigation.navigate('FilmDetail', { index: index,item:item  })
                    :this.props.navigation.navigate('AnimeDetail', { index: index, item:item })
                    } } /> : null ;
 } }
                  slideStyle={styles.slide}
                  containerCustomStyle={{ flex: 1 }}
          slideStyle={{ marginTop :screenHeight/6 ,marginBottom:20}}
                  sliderWidth={screenWidth}
                  itemWidth={itemWidth}

                 onSnapToItem={index => this.setState({activeSlider: index})}
                />
              </View>
              </LinearGradient>
              </ImageBackground> 
             
         
         {/*  آخر الحلقات المضافة */}
         <TextStyled title={" آخر الحلقات المضافة"} onClick={()=> { this.props.navigation.navigate('EpisodesAllList')}}/>
          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/onepiese.png')}
              />
            </View>

            <FlatList
              style={styles.ScrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={ this.props.animeEpisodes.slice(0, 20)}
              renderItem={({ item }) => <PlayCard item={item}   navigate={()=>this.getEpsServers(item.link) }/>}
        keyExtractor={item => item.title}
              />
               <AnimeServers  hide={()=>this.setState({showModal:false})}  epsHref={this.state.epsHref} showModal={this.state.showModal}  navigation={this.props.navigation}/>
     
             
          </View>

         {/* آخر الأنميات المضافة */}
         <TextStyled title={"آخر الأنميات المضافة"} onClick={()=> { this.props.navigation.navigate('AnimeAllList')}}/>

          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/hero.png')}
              />
            </View>
           {/* <ScrollView
              style={{paddingLeft: 10 , flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
               this.props.categories &&
                this.props.categories.map((cat, index) => cat.title && <Chip key={index} style={{marginTop:10,marginRight:10}}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)*/}
            {/*  </ScrollView> */}
            <FlatList
              style={styles.ScrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.props.animeList.slice(0, 20)}
              renderItem={({ item }) => <FilmCard item={item}  showTitle={false} navigate={()=>{this.props.navigation.navigate('AnimeDetail', {  item:item })} }/>}
        keyExtractor={item => item.title}
              
              />
               
          </View>
        {/*التصنيف*/}
        {/* <TextStyled title={"التصنيف"}/> */}
       
          
              
          
        
        
          {/*آخر أفلام الأنميات المضافة  */}
          <TextStyled title={"آخر أفلام"}   onClick={()=> { this.props.navigation.navigate('FilmAllList')}}/>

          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/red.png')}
              />
            </View>
           {/* <ScrollView
              style={{paddingLeft: 10 , flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
            this.props.filmCategories &&
                this.props.filmCategories.map((cat, index) => cat.title && <Chip key={index} style={{marginTop:10,marginRight:10}}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)
                
                </ScrollView>
           */}
          
            <FlatList
        data={this.props.films.slice(0, 20)}
        style={styles.ScrollView}
              horizontal 
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <FilmCard item={item}  showTitle={false} navigate={()=>{this.props.navigation.navigate('FilmDetail', {  item:item })} } />}
        keyExtractor={(item,index) => index.toString()}
      />


          </View>
        
      
     </React.Fragment>
     }
     </ScrollView>
     </SafeAreaView>
         
    );
  }
}

const styles = StyleSheet.create({
  container: {
     
    flex: 1,
        flexDirection: 'column',
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: 'red',
     
  },
  ScrollView:{
    
    paddingLeft: 80,  
     overflow:"visible"
  },

  view: {
    flex: 1,
    marginLeft: -80,
    width: screenWidth / 1.5,
    height: screenWidth /1.5,
    position: 'absolute',
     
    bottom:0,
  },
  animImage: {
    width: null,
    height: null,
    flex: 1,
  },
  slide:{
overflow:"visible"
  },

  ActivityIndicator:{
     height:screenHeight,
    backgroundColor:"white",
    zIndex:12,
justifyContent:"center",
 flex:1
  }
});

const mapStateToProps = state => {
  return {
    fetching:state.newAnime.fetching ,
    //|| state.animeList.fetching || state.animeEpisodes.fetching, 
    newAnime:state.newAnime && state.newAnime.payload ? state.newAnime.payload : [],
    animeList:state.animeList && state.animeList.payload ? state.animeList.payload : [],
     newAnimeFailure: state.newAnime.error,
    animeEpisodes:state.animeEpisodes && state.animeEpisodes.payload ? state.animeEpisodes.payload: [],
    films: state.films && state.films.payload ? state.films.payload: [],
    filmCategories: state.films && state.films.categories ? state.films.categories : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimRequest: data => dispatch(getNewRequest(data)),
    getAnimeList: data => dispatch(getAnimeListRequest(data)),
    aniEpisodeRequest: data => dispatch(aniEpisodeRequest(data)),
    filmRequest: data => dispatch(filmRequest(data)),
   
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
