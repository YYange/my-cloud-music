import { CHANGE_RANK_LIST, CHANGE_LOADING } from "./constant";
import { fromJS } from "immutable";
const defaultState = fromJS({
  rankList: [],
  loading: false,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set("rankList", action.data);
    case CHANGE_LOADING:
      return state.set("loading", action.data);
    default:
      return state;
  }
};
