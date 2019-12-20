import {takeEvery} from 'redux-saga/effects';
import * as actionsAndType   from '../redux/newAnimRedux'
import  {getNewAnimes} from "../saga/newAnimSaga";



export function* watchAll () {
    yield takeEvery(actionsAndType.GET_ANIM_REQUEST,getNewAnimes);
}
