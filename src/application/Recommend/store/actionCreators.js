import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import {
  getBannerRequest,
  getRecommendListRequest,
} from "../../../api/request";

export const changeLoading = (data) =>({
  type:actionTypes.CHANGE_LOADING,
  data:fromJS(data)
})

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
});

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest()
      .then((res) => {
        dispatch(changeBannerList(res.banners));
        dispatch(changeLoading(false))
      })
      .catch(() => {
        console.log("轮播错误");
      });
  };
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest()
      .then((res) => {
        dispatch(changeRecommendList(res.result));
      })
      .catch(() => {
        console.log("推荐歌单错误");
      });
  };
};
