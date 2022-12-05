import React, { useRef } from "react";
import { getName } from "../../../api/utlis";
import { CSSTransition } from "react-transition-group";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
} from "./style";
import ProgressBar from "../../../baseUI/ProcessBar";
const NormalPlayer = (props) => {
  const { song, fullScreen } = props;
  const { toggleFullScreen } = props;
  const normalRef = useRef();
  return (
    <CSSTransition
      timeout={400}
      in={fullScreen}
      classNames="normal"
      onEnter={() => {
        normalRef.current.style.display = "block";
      }}
      onExit={() => {
        normalRef.current.style.display = "none";
      }}
      mountOnEnter
    >
      <NormalPlayerContainer ref={normalRef}>
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle>
          <CDWrapper>
            <div className="cd">
              <img
                className="image play"
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">0:00</span>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={0.2}></ProgressBar>
            </div>
            <div className="time time-r">4:17</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
};

export default NormalPlayer;
