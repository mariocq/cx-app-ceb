import { Modal } from '@ant-design/react-native';
import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import CarType from '../pages/carType';
import CarVin from '../pages/carVin';
import UserHome from '../pages/userHome';
import UserVerify from '../pages/userVerify';
import { connect } from '../utils/dva';
import navigationService from '../utils/navigationService';
import { scaleSize } from '../utils/screenUtil';
import { storage } from '../utils/storage';
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
    return (
      <AppNavigator
        ref={navigatorRef => {
          navigationService.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={(prevState, currentState) => {
          // 监听change事件
          const currentScreen = getCurrentRouteName(currentState);
          const prevScreen = getCurrentRouteName(prevState);

          // 判断目标页面，只检测非登录页面
          if (prevScreen !== currentScreen && currentScreen !== 'SignIn') {

            // 获取并判断本地存储token
            storage.load('accessToken', (accessToken) => {
              // 未登录跳转
              if (accessToken === '') {
                Modal.alert('提示', '请先登录！', [
                  { text: 'OK', onPress: () => navigationService.navigate('SignIn') },
                ]);
              }
            })
          }
        }}
      />);
  }
}
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Router);

