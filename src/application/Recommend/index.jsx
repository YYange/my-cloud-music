import React, { useEffect } from "react";
import Slider from "../../components/Slider";
import RecommendList from "../../components/List";
import Scroll from "../../baseUI/scroll";
import { Content } from "./style";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionCreators";
import { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/loading";

const Recommend = (props) => {
  const { bannerList, recommendList, loading } = props;
  const {
    getBannerListDispatch,
    getRecommendListDispatch,
  } = props;
  useEffect(() => {
    console.log(loading);
    setTimeout(() => {
      getBannerListDispatch();
      getRecommendListDispatch();
    }, 1000);
  }, [getBannerListDispatch, getRecommendListDispatch, loading]);


  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return loading ? (
    <Loading></Loading>
  ) : (
    <Content>
      <Scroll onScroll={forceCheck}>
        {/* BScroll只支持第一个子元素 */}
        <div className="scroll">
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
};

const mapStateToProps = (state) => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  loading: state.getIn(["recommend", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerListDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
    changeLoadingDispatch() {
      dispatch(actionTypes.changeLoading(false));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
