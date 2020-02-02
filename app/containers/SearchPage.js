import React from 'react';
 
import { Searchbar} from 'react-native-paper';
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
 
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import {FilmCard} from '../components/FilmCard';

export default class SearchPage extends React.Component {

    state = {
        firstQuery: 'naruto',
        anime:[]
      };

    SearchKnow = async (searchQuery) => {
        
  axios({
  method: 'get',
  url: `https://anime2001.com/?s=${searchQuery}`,
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
       this.SearchKnow("naruto")
    }
    
    
    
      render() {

        const { firstQuery } = this.state;

        return(
            <SafeAreaView style={styles.container}>
             <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery}
      />
        <FlatList
        data={this.state.anime }
         
              showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => item.img && <PlayCard item={item} showTitle={true}      navigate={()=>{
                    
                      this.props.navigation.navigate('FilmDetail', {  item:item })
                   
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