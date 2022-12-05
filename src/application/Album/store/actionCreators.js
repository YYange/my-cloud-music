import { fromJS } from "immutable";
import { getAlbumDetailRequest } from "../../../api/request";
import * as actionTypes from "./constant";

export const changeCurrentAlbum = (data) => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
});

export const getAlbumDetail = (id) => {
  return (dispatch) => {
    getAlbumDetailRequest(id).then((res) => {
      const data = res.playlist;
      dispatch(changeCurrentAlbum(data));
      dispatch(changeEnterLoading(false));
    }).catch(()=>{
      console.log('获取数据错误');
    });
  };
};
