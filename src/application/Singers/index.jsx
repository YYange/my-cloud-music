import React, { useEffect, useState } from "react";
import Horizon from "../../baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import styled from "styled-components";
import { List, ListContainer, ListItem } from "./style";
import Scroll from "../../baseUI/scroll";
import { connect } from "react-redux";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actionCreators";
import { renderRoutes } from "react-router-config";

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

const Singer = (props) => {
  const [category, setCategory] = useState("");
  const [oldAlpha, setOldAlpha] = useState("");
  const { pullUpLoading, pullDownLoading, pageCount, singerList } = props;
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props;

  const handleUpdateCategory = (val) => {
    setCategory(val);
    updateDispatch(val, oldAlpha);
  };

  const handleAlphaUpdate = (val) => {
    setOldAlpha(val);
    updateDispatch(category, val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, oldAlpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, oldAlpha);
  };

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`);
  };

  const renderSingerList = (singerList) => {
    const singerListJS = singerList ? singerList.toJS() : [];
    return (
      <>
        {" "}
        <List>
          {singerListJS.map((item, index) => {
            return (
              <ListItem
                key={item.accountId + "" + index}
                onClick={() => enterDetail(item.id)}
              >
                <div className="img_wrapper">
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            );
          })}
        </List>
        {renderRoutes(props.route.routes)}
      </>
    );
  };
  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title="分类 (默认热门):"
          handleClick={handleUpdateCategory}
          oldVal={category}
        ></Horizon>
        <Horizon
          list={alphaTypes}
          title={"首字母:"}
          handleClick={handleAlphaUpdate}
          oldVal={oldAlpha}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList(singerList)}
        </Scroll>
      </ListContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
