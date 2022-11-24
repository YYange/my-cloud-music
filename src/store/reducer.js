import { combineReducers } from "redux-immutable";
import { reducers as recommendReducer } from "../application/Recommend/store/index";
export default combineReducers({
  recommend: recommendReducer,
});
