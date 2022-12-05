import { combineReducers } from "redux-immutable";
import { reducers as recommendReducer } from "../application/Recommend/store/index";
import { reducers as singerReducer } from "../application/Singers/store/index";
import { reducers as rankReducer } from "../application/Rank/store/index";
import { reducers as albumReducer } from "../application/Album/store/index";
import { reducer as singerInfoReducer } from "../application/Singer/store/index";
import { reducer as playerReducer } from "../application/Player/store/index";

export default combineReducers({
  recommend: recommendReducer,
  singers: singerReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer,
});
