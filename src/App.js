import React from 'react';
import dva from './utils/dva';
import Router from './routes';
import { Provider } from '@ant-design/react-native';
import Home from './models/Home';
import Mine from './models/Mine';
import global from './models/global';
import supervision from './models/supervision';

const app = dva({
  models: [global, supervision],
  onError(e) {
    console.log('onError', e);
  },
});

// 使用antd-mobile-rn的Provider包装
const App = app.start(<Provider><Router /></Provider>);
export default App;
