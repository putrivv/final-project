import {
  SET_NOWPLAYINGDATA,
  SET_POPULARDATA,
  SET_TOPRATEDDATA,
  SET_UPCOMINGDATA,
} from "../action/homepageAction";

const defaults = {
  nowPlayingData: [],
  popularData: [],
  topRatedData: [],
  upcomingData: [],
};

export const homepageReducer = (state = defaults, action) => {
  switch (action.type) {
    case SET_NOWPLAYINGDATA:
      return {
        ...state,
        nowPlayingData: action.payload,
      };
    case SET_POPULARDATA:
      return {
        ...state,
        popularData: action.payload,
      };
    case SET_TOPRATEDDATA:
      return {
        ...state,
        topRatedData: action.payload,
      };
    case SET_UPCOMINGDATA:
      return {
        ...state,
        upcomingData: action.payload,
      };
    default:
      return state;
  }
};
