import * as actionTypes from "./constant";
import { getSingerInfoRequest } from "../../../api/request";
import { fromJS } from "immutable";

export const changeArtist = (data) => ({
  type: actionTypes.CHANGE_ARTIST,
  data: fromJS(data),
});

export const changeSongsOfArtist = (data) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data),
});

export const changeLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
});

export const getSingerInfo = (id) => {
  return (dispatch) => {
    getSingerInfoRequest(id)
      .then((res) => {
        console.log(res);
        dispatch(changeArtist(res.artist));
        dispatch(changeSongsOfArtist(res.hotSongs));
        dispatch(changeLoading(false));
      })
      .catch(() => {
        console.log("请求歌手信息错误");
      });
  };
};
