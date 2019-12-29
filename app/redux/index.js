import {combineReducers, createStore,applyMiddleware,compose } from 'redux';
import {getNewAnimes } from '../redux/newAnimRedux'
import {animeList } from '../redux/AnimeListRedux'
import {watchAll } from '../saga/indexSaga'
import createSagaMiddleware from 'redux-saga'
import {isTSImportType} from '@babel/types';


const sagaMiddleware =createSagaMiddleware();

    const reducers = combineReducers({
   newAnime : getNewAnimes,
   animeList,
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store  = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(watchAll);
