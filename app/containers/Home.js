import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TextStyled from "../components/TextStyled"
import { Chip,ActivityIndicator } from 'react-native-paper';
import {Dimensions,ImageBackground,View,ScrollView,Image,Text,TouchableOpacity,StyleSheet,} from 'react-native';
import {AnimatedCard} from '../components/AnimatedCard';
import {PlayCard} from '../components/PlayCard';
import {FilmCard} from '../components/FilmCard';
import {CategoryCard} from '../components/CategoryCard';
import {getNewRequest} from '../redux/newAnimRedux';
import {aniEpisodeRequest} from '../redux/AnimeEpisodes';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
import {filmRequest} from '../redux/FilmRedux';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

const screenWidth = Math.round(Dimensions.get('window').width);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlider: 0,
      title: 0,
      show: false,
    };
  }

  handleOpen = () => {
    this.setState({show: true});
  };

  handleClose = () => {
    this.setState({show: false});
  };

  componentWillUpdate() {
    if (this.props.newAnimeFailure) {
      this.setState({show: true});
    }
  }

  componentDidMount() {
    this.props.getAnimRequest();
    this.props.getAnimeList();
    this.props.aniEpisodeRequest();
    this.props.filmRequest()
  }

  _renderItem({item, index}) {
    return <AnimatedCard item={item} />;
  }

  render() {
    console.log("@@fils",this.props.films)
    const anim =
      this.props.newAnime && this.props.newAnime.length > 0
        ? this.props.newAnime[this.state.activeSlider]
        : {};
    return (
      
      <ScrollView >
         {/*  {this.props.fetching ?
            <View style={styles.container}>
      <ActivityIndicator animating={true} color={'#89C13D'} />
      </View>} */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFFFFF', '#89C13D']}
          style={styles.linearGradient}>
          <ImageBackground source={{uri: anim.img}} style={{width: '100%'}}>
            <LinearGradient
              colors={['#ffffff00', '#fff','#fff']}
              style={styles.linearGradient}>
              <View style={{marginTop: 80, marginBottom: 40, }}>
                <Carousel
                  layout={'default'}
                  data={this.props.newAnime}
                  renderItem={this._renderItem}
                 
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth - 140}
                  onSnapToItem={index => this.setState({activeSlider: index})}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
         {/*  آخر الحلقات المضافة */}
         <TextStyled title={" آخر الحلقات المضافة"}/>
          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/onepiese.png')}
              />
            </View>

            <ScrollView
              style={styles.ScrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.animeEpisodes &&
                this.props.animeEpisodes
                  .slice(0, 20)
                  .map((anim, index) => <PlayCard item={anim} key={index} />)}
            </ScrollView>
          </View>

         {/* آخر الأنميات المضافة */}
         <TextStyled title={"آخر الأنميات المضافة"}/>

          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/hero.png')}
              />
            </View>
            <ScrollView
              style={{paddingLeft: 10 , flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.categories &&
                this.props.categories.map((cat, index) => cat.title && <Chip key={index} style={{marginTop:10,marginRight:10}}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)}
            </ScrollView>
            <ScrollView
              style={styles.ScrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.animeList &&
                this.props.animeList
                  .slice(0, 20)
                  .map((anim, index) => <PlayCard item={anim} key={index} />)}
            </ScrollView>
          </View>
        {/*التصنيف*/}
        <TextStyled title={"التصنيف"}/>
        <View style={{position: 'relative'}}>
            <View style={{...styles.view,marginTop:-30}}>
              <Image
                style={styles.animImage}
                source={require('../images/naruto.png')}
              />
            </View>

            <ScrollView
              style={{paddingLeft: 80,marginTop:20,marginBottom:40, flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.categories &&
                this.props.categories.map((cat, index) => cat.title && <CategoryCard title={ cat.title} key={index} />  )}
            </ScrollView>
          </View>
        
        
          {/*آخر أفلام الأنميات المضافة  */}
          <TextStyled title={"آخر أفلام"}/>

          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/red.png')}
              />
            </View>
            <ScrollView
              style={{paddingLeft: 10 , flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
            {this.props.filmCategories &&
                this.props.filmCategories.map((cat, index) => cat.title && <Chip key={index} style={{marginTop:10,marginRight:10}}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)
                }
                </ScrollView>
           
            <ScrollView
              style={styles.ScrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.films &&
                this.props.films.map((film, index) => <FilmCard item={film} key={index} />)}
            </ScrollView>
          </View>
        
        </LinearGradient>
          
        <SCLAlert
          theme="warning"
          show={this.state.show}
          title="Lorem"
          subtitle="Lorem ipsum dolor">
          <SCLAlertButton theme="warning" onPress={() => this.handleClose()}>
            Done
          </SCLAlertButton>
        </SCLAlert>
      </ScrollView>
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
    paddingLeft: 40, flex: 1
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
  linearGradient: {},
});

const mapStateToProps = state => {
  return {
    newAnime:state.newAnime && state.newAnime.payload ? state.newAnime.payload : [],
    animeList:state.animeList && state.animeList.payload ? state.animeList.payload : [],
    categories :state.animeList && state.animeList.categories ? state.animeList.categories : [],
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
