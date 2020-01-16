import { act } from "react-test-renderer";

export const DETAIL_REQUEST = 'DETAIL_REQUEST';
export const DETAIL_SUCCESS = 'DETAIL_SUCCESS';
export const DETAIL_FAILURE = 'DETAIL_FAILURE';
 


export const initial = {
  data: null,
  fetching: false,
  payload: [],
  error: false,
  success: false,
   
};

// Actions
export const detailRequest = data => ({
  type: DETAIL_REQUEST,
  data,
});

export const detailSuccess = payload => ({
  type: DETAIL_SUCCESS,
  payload,
});
 

export const detailFailure = payload => ({
    type: DETAIL_FAILURE,
    payload,
  });

 

export const animeDetail= (state = initial, action) => {
  switch (action.type) {

    case DETAIL_REQUEST:
      return {
        ...state,
        data: action.data,
        fetching: true,
        error: false,
        success: false,
      
      };

    case DETAIL_SUCCESS:
         console.log("payload",action.payload)
      return {
        ...state,
        fetching: false,
        payload: action.payload,
        error: false,
        success: true,
      };
      
    case DETAIL_FAILURE:
       
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
