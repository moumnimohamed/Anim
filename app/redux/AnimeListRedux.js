export const ANIM_LIST_REQUEST = 'ANIM_LIST_REQUEST';
export const ANIM_LIST_SUCCESS = 'ANIM_LIST_SUCCESS';
export const ANIM_LIST_FAILURE = 'ANIM_LIST_FAILURE';
export const CATEGORIES = 'CATEGORIES';


export const initialState = {
  data: null,
  fetching: false,
  payload: [],
  error: false,
  success: false,
  categories:null,
};

// Actions
export const getAnimeListRequest = data => ({
  type: ANIM_LIST_REQUEST,
  data,
});

export const getAnimeListSuccess = payload => ({
  type: ANIM_LIST_SUCCESS,
  payload,
});
 

export const getCategorySuccess = categories => ({
    type: CATEGORIES,
    categories,
  });

export const getAnimeListFailure = payload => ({
  type: ANIM_LIST_FAILURE,
  payload,
});

export const animeList= (state = initialState, action) => {
  switch (action.type) {
    case ANIM_LIST_REQUEST:
      return {
        ...state,
        data: action.data,
        fetching: true,
        error: false,
        success: false,
      
      };

    case ANIM_LIST_SUCCESS:
        console.log("hahow",action.payload);
      return {
        ...state,
        fetching: false,
        payload: [...state.payload , ...action.payload],
        error: false,
        success: true,
      };
      case CATEGORIES:
        console.log("categories 22", action.categories)
      return {
        ...state,
        categories: action.categories,
      };
    case ANIM_LIST_FAILURE:
       
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
