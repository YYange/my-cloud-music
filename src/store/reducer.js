import { combineReducers } from "redux-immutable";
import { reducers as recommendReducer } from "../application/Recommend/store/index";
import { reducers as singerReducer } from "../application/Singers/store/index";
export default combineReducers({
  recommend: recommendReducer,
  singers: singerReducer,
});
