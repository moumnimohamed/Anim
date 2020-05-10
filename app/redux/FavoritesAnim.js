 
export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';
export const INITIAL_FAVORITES = 'INITIAL_FAVORITES';

export const initialState = {
  data: [],
};

// Actions
export const toggleFavorites = data => ({
  type: TOGGLE_FAVORITES,
  data,
});

export const initialFavorites = data => ({
  type: INITIAL_FAVORITES,
  data,
});

export const ToggleFavAnim = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITES:
      const index = state.data.findIndex(
        anim => anim.link === action.data.link,
      );
      console.log('index', index);
      if (index == -1) {
        return {
          ...state,
          data: [...state.data, action.data],
        };
      } else {
        return {
          ...state,
          data: state.data.filter(anim => anim.link !== action.data.link),
        };
      }
      case INITIAL_FAVORITES :
        return {
          ...state,
          data:action.data ,
        };

     
    default:
      return state;
  }
};
