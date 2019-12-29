import {takeEvery} from 'redux-saga/effects';
import * as actionsAndType   from '../redux/newAnimRedux'
import  {getNewAnimes} from "../saga/newAnimSaga";

import * as AnimeListRedux   from '../redux/AnimeListRedux'
import  {getAnimList} from "../saga/animeListSaga";



export function* watchAll () {
    yield takeEvery(actionsAndType.GET_ANIM_REQUEST,getNewAnimes);
    yield takeEvery(AnimeListRedux.ANIM_LIST_REQUEST,getAnimList);
}
