import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
import {getNewRequest} from '../redux/newAnimRedux';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Play from 'react-native-vector-icons/AntDesign';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlider: 0,
            title: 0,
        };
    }

    screenWidth = Math.round(Dimensions.get('window').width);

    componentDidMount() {
        this.props.getAnimRequest();
    }

    _renderItem({item, index}) {
        return <Image
            key={index}
            style={styles.image}
            source={{uri: item.img}}
        />;
    }

    render() {

        const anim = this.props.newAnime && this.props.newAnime.length > 0 ? this.props.newAnime[this.state.activeSlider] : {};
        return (

            <ScrollView>

                {/*<ImageBackground source={{uri: anim.img}}*/}
                {/*                 style={{width: '100%', height: '100%'}}>*/}


                        <View style={{marginTop: 80, marginBottom: 40}}>

                            <Carousel
                                layout={'default'}
                                data={this.props.newAnime}
                                renderItem={this._renderItem}
                                sliderWidth={this.screenWidth}
                                itemWidth={this.screenWidth - 140}
                                onSnapToItem={(index) => this.setState({activeSlider: index})}
                            />
                            <Card style={{
                                marginLeft: 30,
                                marginRight: 30,
                                marginTop: 0,
                                zIndex: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:"fff000",
                                boxShadow:0,
                                border:0
                            }}>
                                <Card.Content>

                                    <Text style={styles.title}>{anim.title}</Text>
                                    <View style={{flexDirection: 'row', marginTop: 10}}>
                                        <Icon style={styles.icon} name="star" size={15} color="#900"/>
                                        <Icon name="star" style={styles.icon} size={15} color="#900"/>
                                        <Icon name="star" style={styles.icon} size={15} color="#900"/>
                                        <Icon name="star" style={styles.icon} size={15} color="#900"/>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 10,

                                        }}>
                                        <TouchableOpacity>
                                            <Icon name="arrow-left" size={10} color="black"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.playBtn}>
                                            <Play name="playcircleo" size={40} color="black"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Icon name="arrow-right" size={10} color="black"/>
                                        </TouchableOpacity>
                                    </View>
                                    <Button
                                        style={styles.button}
                                        mode="contained"
                                        onPress={() => console.log('Pressed')}>
                                        معلومات
                                    </Button>
                                </Card.Content>

                            </Card>
                        </View>


                {/*</ImageBackground>*/}
                <ScrollView
                    horizontal={true}
                     showsHorizontalScrollIndicator={false}
                >
                    {this.props.newAnime.slice(0, 10).map((anim,index) =>
                        <PlayCard item={anim} key={index} />
                    )}
                </ScrollView>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        newAnime:
            state.newAnime && state.newAnime.payload
                ? state.newAnime.payload
                : [],
    };
};
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
    image: {
        borderRadius: 10,
        width: '100%',
        height: 300,
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
    },
    icon: {marginRight: 8, marginLeft: 8, color: 'black'},
    playBtn: {
        alignItems: 'center',

        borderRadius: 40,
        marginLeft: 40,
        marginRight: 40,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 20,
    },
    linearGradient: {},
});


const mapDispatchToProps = dispatch => {
    return {
        getAnimRequest: data => dispatch(getNewRequest(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
