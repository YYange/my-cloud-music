import React, { useState } from "react";
import Horizon from "../../baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import styled from "styled-components";
import {List, ListContainer, ListItem} from './style';
import Scroll from '../../baseUI/scroll';

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
  return {
    picUrl:
      "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  };
});
const renderSingerList = () => {
  return (
    <List>
      {singerList.map((item, index) => {
        return (
          <ListItem key={item.accountId + "" + index}>
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
  );
};

const Singer = () => {
  const [oldSinger, setOldSinger] = useState("");
  const [oldAlpha, setOldAlpha] = useState("");

  return (
    <div>
      {" "}
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title="分类 (默认热门):"
          handleClick={setOldSinger}
          oldVal={oldSinger}
        ></Horizon>
        <Horizon
          list={alphaTypes}
          title={"首字母:"}
          handleClick={setOldAlpha}
          oldVal={oldAlpha}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll>{renderSingerList()}</Scroll>
      </ListContainer>
    </div>
  );
};

export default React.memo(Singer);
