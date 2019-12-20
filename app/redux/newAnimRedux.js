export const GET_ANIM_REQUEST = 'GET_ANIM_REQUEST';
export const GET_ANIM_SUCCESS = 'GET_ANIM_SUCCESS';
export const GET_ANIM_FAILURE = 'GET_ANIM_FAILURE';

export const initialState = {
  data: null,
  fetching: false,
  payload: [],
  error: false,
  success: false,
};

// Actions
export const getNewRequest = data => ({
  type: GET_ANIM_REQUEST,
  data,
});

export const getNewSuccess = payload => ({
  type: GET_ANIM_SUCCESS,
  payload,
});

export const getAnimFailure = payload => ({
  type: GET_ANIM_FAILURE,
  payload,
});

export const getNewAnimes = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANIM_REQUEST:
      return {
        ...state,
        data: action.data,
        fetching: true,
        error: false,
        success: false,
      };
    case GET_ANIM_SUCCESS:
      return {
        ...state,
        fetching: false,
        payload: action.payload,
        error: false,
        success: true,
      };
    case GET_ANIM_FAILURE:
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
