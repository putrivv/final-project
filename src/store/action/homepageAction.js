export const SET_NOWPLAYINGDATA = "SET_NOWPLAYINGDATA";
export const SET_POPULARDATA = "SET_POPULARDATA";
export const SET_TOPRATEDDATA = "SET_TOPRATEDDATA";
export const SET_UPCOMINGDATA = "SET_UPCOMINGDATA";

export const setNowPlayingData = (nowPlayingData) => {
  return { type: SET_NOWPLAYINGDATA, payload: nowPlayingData };
};

export const setPopularData = (popularData) => {
  return { type: SET_POPULARDATA, payload: popularData };
};

export const setTopRatedData = (topRatedData) => {
  return { type: SET_TOPRATEDDATA, payload: topRatedData };
};

export const setUpcomingData = (upcomingData) => {
  return { type: SET_UPCOMINGDATA, payload: upcomingData };
};
