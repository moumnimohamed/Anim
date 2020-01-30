import { takeLatest} from 'redux-saga/effects';
import * as actionsAndType   from '../redux/newAnimRedux'
import  {getNewAnimes} from "../saga/newAnimSaga";

import * as AnimeListRedux   from '../redux/AnimeListRedux'
import  {getAnimList} from "../saga/animeListSaga";


import * as AnimeEpisodes   from '../redux/AnimeEpisodes'
import  {getAnimeEpisodes} from "../saga/AnimeEpisodesSaga";

import * as FilmRedux   from '../redux/FilmRedux'
import  {getFilm} from "../saga/FilmsSaga";


import * as DetailFilmRedux   from '../redux/filmDetailRedux'
import  {getAnimeDetail} from "./filmDetailSaga";

import * as DetailAnimeRedux   from '../redux/AnimeDetailRedux'
import  {getAnime_PeaceDetail} from "./AnimeDetailSaga";

export function* watchAll () {
    yield takeLatest(actionsAndType.GET_ANIM_REQUEST,getNewAnimes);
    yield takeLatest(AnimeListRedux.ANIM_LIST_REQUEST,getAnimList);
    yield takeLatest(AnimeEpisodes.ANI_EPISODE_REQUEST,getAnimeEpisodes);
    yield takeLatest(FilmRedux.FILM_REQUEST,getFilm);
    yield takeLatest(DetailFilmRedux.DETAIL_REQUEST,getAnimeDetail);
    yield takeLatest(DetailAnimeRedux.ANIME_DETAIL_REQUEST,getAnime_PeaceDetail);
}
