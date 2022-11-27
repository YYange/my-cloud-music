import { CHANGE_RANK_LIST, CHANGE_LOADING } from "./constant";
import { getRankListRequest } from "../../../api/request";
import { fromJS } from "immutable";

export const changeLoading = (data) => {
  return {
    type: CHANGE_LOADING,
    data,
  };
};

export const changeRankList = (data) => {
  return {
    type: CHANGE_RANK_LIST,
    data: fromJS(data),
  };
};

export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then((res) => {
      const rankList = res && res.list;
      dispatch(changeRankList(rankList));
      dispatch(changeLoading(false));
    });
  };
};
