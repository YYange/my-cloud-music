import * as actionTypes from "./constant";
import { fromJS } from "immutable";

const defaultState = fromJS({
  current_album: {},
  enter_loading: false,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set("current_album", action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set("enter_loading", action.data);
    default:
      return state;
  }
};
