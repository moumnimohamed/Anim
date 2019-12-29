export const FILM_REQUEST = 'FILM_REQUEST';
export const FILM_SUCCESS = 'FILM_SUCCESS';
export const FILM_FAILURE = 'FILM_FAILURE';
export const FILM_CAT = 'FILM_CAT';


export const initialState = {
  data: null,
  fetching: false,
  payload: null,
  error: false,
  success: false,
  categories:null,
};

// Actions
export const filmRequest = data => ({
  type: FILM_REQUEST,
  data,
});

export const filmSuccess = payload => ({
  type: FILM_SUCCESS,
  payload,
});

export const filmFailure = payload => ({
  type: FILM_FAILURE,
  payload,
});

export const filmCategoriesSuccess = categories => ({
    type: FILM_CAT,
    categories,
  });

 

export const films = (state = initialState, action) => {
  switch (action.type) {
    case FILM_REQUEST:
      return {
        ...state,
        data: action.data,
        fetching: true,
        error: false,
        success: false,
      };
    case FILM_SUCCESS:
        
      return {
        ...state,
        fetching: false,
        payload: action.payload,
        error: false,
        success: true,
      };
    case FILM_FAILURE:
      
      return {
        ...state,
        fetching: false,
        payload: action.payload,
        error: true,
        success: false,
      };
      case FILM_CAT:
        console.log("ha aflam categories",action.categories)
      return {
        ...state,
        categories: action.categories,
         
      };
    default:
      return state;
  }
};
