import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../containers/Home';
import Home2 from '../containers/Home2';
import StreamPage from '../containers/StreamPage';
import FavoritesList from '../containers/FavoritesList';
import FilmDetail from '../containers/FilmDetail';
import FilmAllList from '../containers/FilmAllList';
import AnimeAllList from '../containers/AnimeAllList';
import AnimeDetail from '../containers/AnimeDetail';
import ByCategory from '../containers/ByCategory';
import BySeason from '../containers/BySeason';
import SearchPage from '../containers/SearchPage';
import Account from '../containers/Account';
import EpisodesAllList from '../containers/EpisodesAllList';
import Icon from 'react-native-vector-icons/AntDesign';

const favStackNavigator = createStackNavigator({
  fav: {
    screen: FavoritesList,
    navigationOptions: {
      headerTransparent: true,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
      },
      title: '',
      headerTintColor: '#89C13D',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },
  AnimeDetail: {
    screen: AnimeDetail,
    navigationOptions: {
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },
});

const SearchStackNavigator = createStackNavigator({
  Home: {
    screen: Home2,
    navigationOptions: {
      /*  headerRight: navigation => (
        <Header/>
      ), */
      /*  headerTitle: (
        <Image
          style={{width: 50, height: 50}}
          source={require('../images/logo.png')}
        />
      ), */
      headerTransparent: true,
      headerStyle: {},

      headerTintColor: '#fff',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },

  AnimeDetail: {
    screen: AnimeDetail,
    navigationOptions: {
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },

  streamPage: {
    screen: StreamPage,
    navigationOptions: {
      title: 'stream',
      headerTintColor: '#fff',
      headerTransparent: true,
    },
  },

  FilmAllList: {
    screen: FilmAllList,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
      },
      title: 'أفلام',
      headerTintColor: '#89C13D',
    },
  },
  AnimeAllList: {
    screen: AnimeAllList,

    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
      },
      headerTitleStyle: {
        fontFamily: 'JF Flat regular',
      },
      title: 'الأنميات',
      headerTintColor: '#89C13D',
      /* headerTransparent: true, */
    },
  },
  EpisodesAllList: {
    screen: EpisodesAllList,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
      },
      title: 'الحلقات',
      headerTintColor: '#89C13D',
    },
  },
  ByCategory: {
    screen: ByCategory,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
      },

      headerTintColor: '#89C13D',
    },
  },
  BySeason: {
    screen: BySeason,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#f2f2f2',
      },

      headerTintColor: '#89C13D',
    },
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      title: 'search',
      /* headerTintColor: '#fff',
      headerTransparent: true, */
    },
  },
});

SearchStackNavigator.navigationOptions = ({navigation}) => {
  console.log('@@', navigation);

  if (navigation.state.routes.length) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'streamPage') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarLabel: 'الرئيسية',
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={17} color={tintColor} />
        ),
      },
    },
    search: {
      screen: SearchPage,
      navigationOptions: {
        tabBarLabel: 'بحث',
        tabBarIcon: ({tintColor}) => (
          <Icon name="search1" size={17} color={tintColor} />
        ),
      },
    },

    fav: {
      screen: favStackNavigator,
      navigationOptions: {
        tabBarLabel: 'قائمتي',
        tabBarIcon: ({tintColor}) => (
          <Icon name="hearto" size={17} color={tintColor} />
        ),
      },
    },
    setting: {
      screen: Account,

      navigationOptions: {
        tabBarLabel: 'ضبط',
        tabBarIcon: ({tintColor}) => (
          <Icon name="smileo" size={17} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'JF Flat regular',
      },
      style: {
        borderTopWidth: 0,
        backgroundColor: '#f8f5fa',
      },

      activeTintColor: '#89C13D',
      inactiveTintColor: '#535353',
    },
  },
);

export default createAppContainer(TabNavigator);
