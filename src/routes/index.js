import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { connect } from '../utils/dva';
import React, { Component } from 'react';
import { scaleSize } from '../utils/ScreenUtil';

import UserVerify from '../pages/userVerify';
import CarType from '../pages/carType';
import CarVin from '../pages/carVin';
import UserHome from '../pages/userHome';

import Pages from '../config/routerConfig';

class Router extends Component {

  renderTabs() {
    return TabNavigator({
      身份认证: {
        screen: UserVerify,
        navigationOptions: {
          header: null,
        },
      },
      车型识别: {
        screen: CarType,
        navigationOptions: {
          header: null,
        },
      },
      车架号识别: {
        screen: CarVin,
        navigationOptions: {
          header: null,
        },
      },
      我的: {
        screen: UserHome,
        navigationOptions: {
          header: null,
        },
      },
    }, {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
      initialRouteName: '我的',
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
    return StackNavigator(
      {
        App: { screen: Tabs },
        ...Pages,
      },
      {
        navigationOptions: {
          gesturesEnabled: true,
          headerStyle: {
            // elevation: 0,
            height: scaleSize(98),
          },
          headerTitleStyle: {
            fontSize: scaleSize(36),
          },
        },
      },
    );
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

