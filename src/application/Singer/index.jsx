import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Container,
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer,
} from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/Header";
import SongsList from "../SongList";
import Scroll from "../../baseUI/scroll";
import { connect } from "react-redux";
import { getSingerInfo, changeLoading } from "./store/actionCreators";
import Loading from "../../baseUI/loading";

// const artist = {
//   picUrl:
//     "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
//   name: "薛之谦",
//   hotSongs: Array(20).fill({
//     name: "我好像在哪见过你",
//     ar: [{ name: "薛之谦" }],
//     al: {
//       name: "薛之谦专辑",
//     },
//   }),
// };

const Singer = (props) => {
  const [showStatus, setShowStatus] = useState(true);
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);

  const { artist: immutableArtist, songs: immutableSongs, loading } = props;

  const { getSingerDataDispatch } = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
  }, [getSingerDataDispatch, props.match.params.id]);

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    console.log(`${h - OFFSET}px`);
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    //eslint-disable-next-line
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <CSSTransition
        in={showStatus}
        timeout={300}
        classNames="fly"
        appear={true}
        unmountOnExit
        onExited={() => props.history.goBack()}
      >
        <Container>
          <Header
            handleClick={setShowStatusFalse}
            title={artist.name}
            ref={header}
          ></Header>
          <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
            <div className="filter"></div>
          </ImgWrapper>
          <CollectButton ref={collectButton}>
            <i className="iconfont">&#xe62d;</i>
            <span className="text"> 收藏 </span>
          </CollectButton>
          <BgLayer ref={layer} className="layer"></BgLayer>
          <SongListWrapper ref={songScrollWrapper} className="songListWrapper">
            <Scroll ref={songScroll} className="11111111">
              <SongsList
                className="songList"
                songs={songs}
                showCollect={false}
              ></SongsList>
            </Scroll>
          </SongListWrapper>
        </Container>
      </CSSTransition>
    </>
  );
};

const mapStateToProps = (state) => ({
  artist: state.getIn(["singerInfo", "artist"]),
  loading: state.getIn(["singerInfo", "loading"]),
  songs: state.getIn(["singerInfo", "songsOfArtist"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeLoading(true));
      dispatch(getSingerInfo(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
