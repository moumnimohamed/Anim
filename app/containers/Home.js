import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TextStyled from "../components/TextStyled"
import { Chip } from 'react-native-paper';
import {
  Dimensions,
  ImageBackground,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AnimatedCard} from '../components/AnimatedCard';
import {PlayCard} from '../components/PlayCard';
import {CategoryCard} from '../components/CategoryCard';
import {getNewRequest} from '../redux/newAnimRedux';
import {getAnimeListRequest} from '../redux/AnimeListRedux';
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
  }

  _renderItem({item, index}) {
    return <AnimatedCard item={item} />;
  }

  render() {
    const anim =
      this.props.newAnime && this.props.newAnime.length > 0
        ? this.props.newAnime[this.state.activeSlider]
        : {};
    return (
      <ScrollView >
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
              style={{paddingLeft: 80, flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.newAnime &&
                this.props.newAnime
                  .slice(0, 10)
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
              style={{paddingLeft: 80 , flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.categories &&
                this.props.categories.map((cat, index) => cat.title && <Chip key={index} style={{marginTop:10,marginRight:10}}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)}
            </ScrollView>
            <ScrollView
              style={{paddingLeft: 80, flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.animeList &&
                this.props.animeList
                  .slice(0, 10)
                  .map((anim, index) => <PlayCard item={anim} key={index} />)}
            </ScrollView>
          </View>
        {/*أفضل مسلسلات أنمي*/}
        <TextStyled title={"التصنيف"}/>
        <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/naruto.png')}
              />
            </View>

            <ScrollView
              style={{paddingLeft: 80,marginTop:50,marginBottom:50, flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.categories &&
                this.props.categories.map((cat, index) => cat.title && <Chip key={index}  onPress={() => console.log('Pressed')}>{cat.title}</Chip>)}
            </ScrollView>
          </View>
        
        
          {/*آخر أفلام الأنميات المضافة  */}
          <TextStyled title={"آخر أفلام الأنميات المضافة"}/>

          <View style={{position: 'relative'}}>
            <View style={styles.view}>
              <Image
                style={styles.animImage}
                source={require('../images/red.png')}
              />
            </View>

            <ScrollView
              style={{paddingLeft: 80, flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.props.newAnime &&
                this.props.newAnime
                  .slice(0, 10)
                  .map((anim, index) => <PlayCard item={anim} key={index} />)}
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
    marginBottom: 20,
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    height: 450,
  },

  view: {
    flex: 1,
    
    marginRight: -60,
    marginLeft: -40,
    width: screenWidth / 2,
    height: screenWidth - 100,
    position: 'absolute',
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimRequest: data => dispatch(getNewRequest(data)),
    getAnimeList: data => dispatch(getAnimeListRequest(data)),
   
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
