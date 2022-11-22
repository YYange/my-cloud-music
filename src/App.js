import React from "react";
import routes from "./routes";
import { renderRoutes } from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
