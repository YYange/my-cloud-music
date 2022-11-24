import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Scroll from "../baseUI/scroll";
import styled from "styled-components";
import style from "../assets/global-style";

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type{
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected{
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

const Horizon = (props) => {
  const { list, oldVal, title } = props;
  const { handleClick } = props;
  const Category = useRef(null);
  

  useEffect(() => {
    const dom = Category.current;
    const spans = dom.querySelectorAll("span");
    let width = Array.from(spans).reduce((pre, cur) => {
      return pre + cur.offsetWidth;
    }, 0);
    dom.style.width = `${width}px`;
  }, []);
  
  return (
    <Scroll direction="horizental">
      <div ref={Category} className="wrapper">
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={item.key === oldVal ? "selected" : ""}
                onClick={()=>handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
};

Horizon.defaultProps = {
  list: [],
  handleClick: null,
  oldVal: "",
  title: "",
};

Horizon.propTypes = {
  list: PropTypes.array,
  handleClick: PropTypes.func,
  oldVal: PropTypes.string,
  title: PropTypes.string,
};

export default React.memo(Horizon);
