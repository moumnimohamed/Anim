 
export const ANIME_DETAIL_REQUEST = 'ANIME_DETAIL_REQUEST';
export const ANIME_DETAIL_SUCCESS = 'ANIME_DETAIL_SUCCESS';
export const ANIME_DETAIL_FAILURE = 'ANIME_DETAIL_FAILURE';
 


export const initial = {
  data: null,
  fetching: false,
  payload: [],
  error: false,
  success: false,
   
};

// Actions
export const animeDetailRequest = data => ({
  type: ANIME_DETAIL_REQUEST,
  data,
});

export const animeDetailSuccess = payload => ({
  type: ANIME_DETAIL_SUCCESS,
  payload,
});
 

export const animeDetailFailure = payload => ({
    type: ANIME_DETAIL_FAILURE,
    payload,
  });

 

export const DetailRedux= (state = initial, action) => {
  switch (action.type) {

    case ANIME_DETAIL_REQUEST:
      return {
        ...state,
        data: action.data,
        fetching: true,
        error: false,
        success: false,
      
      };

    case ANIME_DETAIL_SUCCESS:
         console.log("payload",action.payload)
      return {
        ...state,
        fetching: false,
        payload: action.payload,
        error: false,
        success: true,
      };
      
    case ANIME_DETAIL_FAILURE:
       
      return {
        ...state,
        fetching: false,
        payload: action.payload,
        error: true,
        success: false,
      };
    default:
      return state;
  }
};
