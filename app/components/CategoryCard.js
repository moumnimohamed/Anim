import * as React from 'react';
import {Dimensions,StyleSheet, View,Text} from "react-native"
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";


export class CategoryCard extends React.Component {

    render() {
        var Colorleft = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        var Colorright = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
 
        return (
            
            <Card style={styles.view}>
           
             
             <View style={{...styles.viewInside,backgroundColor:Colorleft,}}> 
             <Card.Content >
           
                <Title style={{marginTop:screenWidth/9 ,textAlign:"center",color:"white"}}>{this.props.title}</Title>

 
            </Card.Content>
            </View>
          
          </Card>
    
           
        );
    }
}
const     screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
 
    view:{
        alignSelf: 'center',
        marginLeft:20,
         
        width:screenWidth/3,
        height: screenWidth/3,
        borderRadius: screenWidth/3,
        overflow:"hidden",
        
    },
    viewInside:{
        margin:2,flex:1, borderRadius: screenWidth/3,
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
