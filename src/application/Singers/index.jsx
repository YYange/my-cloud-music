import React from "react";
import Horizen from "../../baseUI/horizon-item";
import { categoryTypes } from "../../api/config";

const Singer = () => {
  return <Horizen list={categoryTypes} title="分类 (默认热门):"></Horizen>;
};

export default React.memo(Singer);
