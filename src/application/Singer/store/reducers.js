import * as actionTypes from "./constant";
import { fromJS } from "immutable";

const defaultState = fromJS({
  songsOfArtist: [],
  artist: {},
  loading: true,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      return state.set("artist", action.data);
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      return state.set("songsOfArtist", action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set("loading", action.data);
    default:
      return state;
  }
};
