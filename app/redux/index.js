import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {getNewAnimes} from '../redux/newAnimRedux';
import {animeList} from '../redux/AnimeListRedux';
import {aniEpisodes} from '../redux/AnimeEpisodes';
import {animeDetail} from '../redux/filmDetailRedux';
import {ToggleFavAnim} from '../redux/FavoritesAnim';
import {films} from '../redux/FilmRedux';
import {DetailRedux} from '../redux/AnimeDetailRedux';
import {watchAll} from '../saga/indexSaga';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

import {isTSImportType} from '@babel/types';
import('../config/ReactotronConfig').then(() =>
  console.log('Reactotron Configured'),
);



const saveState = async (state) => {
  console.log("hahow state",state)
  try {
      const serializedState =  JSON.stringify(state.favoritesAnim);
      await  AsyncStorage.setItem('favoritesAnim', serializedState);
  } catch {
    alert("error save state") 
  }
};

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  newAnime: getNewAnimes,
  animeList,
  animeEpisodes: aniEpisodes,
  films,
  filmDetail: animeDetail,
  animeDetail: DetailRedux,
  favoritesAnim: ToggleFavAnim,
});

 
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

store.subscribe(() => {
  saveState(
     store.getState()
  );
});

sagaMiddleware.run(watchAll);
