import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { connect } from '../utils/dva';
import React, { Component } from 'react';
import { scaleSize } from '../utils/screenUtil';

import UserVerify from '../pages/userVerify';
import CarType from '../pages/carType';
import CarVin from '../pages/carVin';
import UserHome from '../pages/userHome';

import Pages from './routerConfig';

class Router extends Component {

  renderTabs() {
    return TabNavigator(
      {
        身份认证: {
          screen: UserVerify,
        },
        车型识别: {
          screen: CarType,
        },
        车架号识别: {
          screen: CarVin,
        },
        我的: {
          screen: UserHome,
        },
      },
      {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        initialRouteName: '身份认证',
        backBehavior: 'none',
        lazy: false, // 懒加载
        tabBarOptions: {
          activeTintColor: '#4396ec',
          inactiveTintColor: '#b2b2b2',
          showIcon: true,
          showLabel: true,
          pressColor: '#999',
          indicatorStyle: {
            height: 0,
          },
          style: {
            height: scaleSize(115),
            backgroundColor: '#fff',
          },
          labelStyle: {
            marginTop: scaleSize(0),
            fontSize: scaleSize(25),
          },
        },
      });
  }

  renderApp() {
    const Tabs = this.renderTabs();
    const Stacks = StackNavigator(
      {
        // 主界面配置
        App: { screen: Tabs },
        // 其他通用界面配置
        ...Pages,
      },
      {
        initialRouteName: 'Splash',
        mode: 'card',
        headerMode: 'none',
      },
    );
    return Stacks;
  }

  render() {
    const AppNavigator = this.renderApp();
    return <AppNavigator />;
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Router);

