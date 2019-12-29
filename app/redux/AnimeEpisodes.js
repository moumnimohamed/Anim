export const ANI_EPISODE_REQUEST = 'ANI_EPISODE_REQUEST';
export const ANI_EPISODE_SUCCESS = 'ANI_EPISODE_SUCCESS';
export const ANI_EPISODE_FAILURE = 'ANI_EPISODE_FAILURE';

export const initialState = {
  data: null,
  fetching: false,
  payload: null,
  error: false,
  success: false,
};

// Actions
export const aniEpisodeRequest = data => ({
  type: ANI_EPISODE_REQUEST,
  data,
});

export const aniEpisodeSuccess = payload => ({
  type: ANI_EPISODE_SUCCESS,
  payload,
});

export const aniEpisodeFailure = payload => ({
  type: ANI_EPISODE_FAILURE,
  payload,
});

export const aniEpisodes = (state = initialState, action) => {
  switch (action.type) {
    case ANI_EPISODE_REQUEST:
      return {
        ...state,
        data: action.data,
        fetching: true,
        error: false,
        success: false,
      };
    case ANI_EPISODE_SUCCESS:
        
      return {
        ...state,
        fetching: false,
        payload: action.payload,
        error: false,
        success: true,
      };
    case ANI_EPISODE_FAILURE:
      
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
