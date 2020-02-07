import React from 'react';
 
import {Chip, Button} from 'react-native-paper';
import {
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  View,
  Modal,
  ScrollView,
  Image,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import {FilmCard} from '../components/FilmCard';

export default class AnimeDetail extends React.Component {


    state={
        anime:[]
    }

    getAnimeByCat = async (link) => {
        
  axios({
  method: 'get',
  url: link,
}).then(response => {
    if (response.status === 200) {
      const htmlString =   response.data; // get response text
      const $ = cheerio.load(htmlString); // parse HTML string
             
          const liList = $('.col-list-padding > .hovereffect').map((_, hover) => ({
          title: $('h2', hover).text(),
          img: $('.img-responsive', hover).attr('src'),
          link: $('a', hover).attr('href'),
        })); 
      
      var myData = Object.keys(liList).map(key => {
        return liList[key];
      });
    }

    this.setState({
        anime:myData
    })
  })
  .catch(error => {
       error;
  });
}


    componentDidMount(){
      const type  =this.props.navigation.state.params.type
        const catName =this.props.navigation.state.params.title.replace(" ","-")
       const  link=type ==="anime" ? `https://anime2001.com/anime_genre/${catName}`
      : `https://anime2001.com/movie_genre/${catName}`
        this.getAnimeByCat (link)
    }
    
    render () {
         
        return(
            <SafeAreaView style={styles.container}>
        <FlatList
        data={this.state.anime }
         
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <FilmCard showTitle={true}  item={item}  navigate={()=>{
                    item.title.includes("فيلم") ?
                      this.props.navigation.push('FilmDetail', {  item:item })
                    :  this.props.navigation.push('AnimeDetail', {  item:item })
                    } }

                    />}
        numColumns={2}
        keyExtractor={(item,index) => index.toString()}
      />
         </SafeAreaView>
        )
    }


}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f8f5fa',
      flex: 1,
    },
})