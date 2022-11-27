import { combineReducers } from "redux-immutable";
import { reducers as recommendReducer } from "../application/Recommend/store/index";
import { reducers as singerReducer } from "../application/Singers/store/index";
import { reducers as rankReducer } from "../application/Rank/store/index";

export default combineReducers({
  recommend: recommendReducer,
  singers: singerReducer,
  rank: rankReducer,
});
