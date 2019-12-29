import {combineReducers, createStore,applyMiddleware,compose } from 'redux';
import {getNewAnimes } from '../redux/newAnimRedux'
import {animeList } from '../redux/AnimeListRedux'
import {aniEpisodes } from '../redux/AnimeEpisodes'
import {films } from '../redux/FilmRedux'
import {watchAll } from '../saga/indexSaga'
import createSagaMiddleware from 'redux-saga'
import {isTSImportType} from '@babel/types';


const sagaMiddleware =createSagaMiddleware();

    const reducers = combineReducers({
   newAnime : getNewAnimes,
   animeList,
   animeEpisodes:aniEpisodes,
   films
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store  = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(watchAll);
