import { takeLatest} from 'redux-saga/effects';
import * as actionsAndType   from '../redux/newAnimRedux'
import  {getNewAnimes} from "../saga/newAnimSaga";

import * as AnimeListRedux   from '../redux/AnimeListRedux'
import  {getAnimList} from "../saga/animeListSaga";


import * as AnimeEpisodes   from '../redux/AnimeEpisodes'
import  {getAnimeEpisodes} from "../saga/AnimeEpisodesSaga";

import * as FilmRedux   from '../redux/FilmRedux'
import  {getFilm} from "../saga/FilmsSaga";


import * as DetailRedux   from '../redux/filmDetailRedux'
import  {getAnimeDetail} from "./filmDetailSaga";

export function* watchAll () {
    yield takeLatest(actionsAndType.GET_ANIM_REQUEST,getNewAnimes);
    yield takeLatest(AnimeListRedux.ANIM_LIST_REQUEST,getAnimList);
    yield takeLatest(AnimeEpisodes.ANI_EPISODE_REQUEST,getAnimeEpisodes);
    yield takeLatest(FilmRedux.FILM_REQUEST,getFilm);
    yield takeLatest(DetailRedux.DETAIL_REQUEST,getAnimeDetail);
}
