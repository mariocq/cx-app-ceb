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
        App: { screen: Tabs },
        ...Pages,
      },
      {
        initialRouteName: 'Splash',
        mode: 'card',
        headerMode: 'none',
      },
    );
    return Stacks;
    // return StackNavigator(
    //   {
    //     App: { screen: Tabs },
    //     ...Pages,
    //   },
    //   {
    //     initialRouteName: 'Splash',
    //     mode: 'card',
    //     headerMode: 'none',
    //     navigationOptions: {
    //       gesturesEnabled: true,
    //       headerStyle: {
    //         // elevation: 0,
    //         height: scaleSize(98),
    //       },
    //       headerTitleStyle: {
    //         fontSize: scaleSize(36),
    //       },
    //     },
    //   },
    // );
  }

  componentDidMount() {
    // APP启动的时候获取地理位置
    this._getPosition();
  }

  _getPosition() {
    /** 获取地理位置 */
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.warn('成功：' + JSON.stringify(position));
        const positionData = position.coords;
        // 经度：positionData.longitude
        // 纬度：positionData.latitude
        console.log(positionData);

      },
      (error) => {
        console.warn('失败：' + JSON.stringify(error.message))
      }, {
        // 提高精确度，但是获取的速度会慢一点
        enableHighAccuracy: true,
        // 设置获取超时的时间20秒
        timeout: 20000,
        // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
        maximumAge: 1000
      }
    )
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

