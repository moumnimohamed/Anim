import * as React from 'react';
import {Dimensions,StyleSheet, View,Text,TouchableOpacity,Image} from "react-native"
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import {connect} from 'react-redux';
 
   class CategoryCard extends React.Component {

    

    render() {

        

        const imagesLinks = [{link:"ss"},
                              {link:"ss"},
                              {link:"ss"},
                              {link:"ss"},
]

        const min=0; 
        const max=this.props.newAnime.length -1 ;  

        const Colorleft = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        const Colorright = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
 
        return (
            
            <TouchableOpacity style={styles.view} onPress={()=>this.props.navigate()}>
           <LinearGradient
           
          colors={[Colorleft, Colorright]}
          style={styles.linearGradient}>
                
              
             <Image
             style={{width:null,height:null,flex:1,opacity:.5}}
              source={{uri:this.props.newAnime && this.props.newAnime[Math.floor(Math.random() * (+max - +min))  +min  ].img  || this.props.newAnime[0].img }} />


              <View  style={{position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'}}>  
              <Title style={{ color:"white",textShadowColor: '#000', 
              textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>{this.props.title}</Title>

              </View>

               
 
            
            
           </LinearGradient>
          </TouchableOpacity>
         
    
           
        );
    }
}
const     screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
 
    view:{
    
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,
        alignSelf: 'center',
        margin:10,
         
        width:screenWidth/3,
        height: screenWidth/5,
        borderRadius: 10,
        overflow:"hidden",
        
    },
     
    playBtn:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'

    },
    linearGradient: {flex:1},
});


const mapStateToProps = state => {
    return {
      newAnime:state.newAnime && state.newAnime.payload ? state.newAnime.payload : [],
      
    };
  };

  
const mapDispatchToProps = dispatch => {
    return {
      
     
    };
  };
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps,
  )(CategoryCard);