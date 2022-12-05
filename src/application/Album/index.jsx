import { Container, Menu, TopDesc, SongList, SongItem } from "./style";
import { CSSTransition } from "react-transition-group";
import React, { useEffect, useState } from "react";
import Header from "../../baseUI/Header";
import Scroll from "../../baseUI/scroll";
import { getName, getCount, isEmptyObject } from "../../api/utlis";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionCreators";
import Loading from "../../baseUI/loading";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const id = props.match.params.id;

  const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
  const { getAlbumDataDispatch } = props;
  let currentAlbum = !isEmptyObject(currentAlbumImmutable)
    ? currentAlbumImmutable.toJS()
    : [];
  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  const handleBack = () => {
    setShowStatus(false);
  };
  const renderDes = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万{" "}
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };
  const renderMenu = () => (
    <Menu>
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
      </div>
    </Menu>
  );
  const renderSongList = () => (
    <SongList>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部{" "}
            <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
          </span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {currentAlbum.tracks.map((item, index) => {
          return (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.ar)} - {item.al.name}
                </span>
              </div>
            </li>
          );
        })}
      </SongItem>
    </SongList>
  );

  return (
    // eslint-disable-next-line no-unreachable
    <CSSTransition
      classNames="fly"
      timeout={3000}
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
      in={showStatus}
    >
      <Container>
        {enterLoading ? <Loading></Loading> : null}
        <Header title={"返回"} handleClick={handleBack}></Header>
        <Scroll bounceTop={false}>
          <div>
            {!isEmptyObject(currentAlbum) ? (
              <>
                {renderDes()}
                {renderMenu()}
                {renderSongList()}
              </>
            ) : null}
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(["album", "current_album"]),
  enterLoading: state.getIn(["album", "enter_loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(actionTypes.changeEnterLoading(true));
      dispatch(actionTypes.getAlbumDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
