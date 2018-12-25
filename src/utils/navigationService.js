/**
 * 全局导航单例
 * 参考 https://reactnavigation.org/docs/navigating-without-navigation-prop.html
 * 注：先在路由入口初始化
  <AppNavigator ref={navigatorRef => {
    navigationService.setTopLevelNavigator(navigatorRef);
    }}
  />
 */

import { NavigationActions } from 'react-navigation';

// 用于记录所使用的导航器
let _navigator;

/**
 * 记录所使用的导航器
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

/**
 * 导航到目标路由/屏幕
 * @param routeName
 * @param params
 */
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  );
}

/**
 * 发送自定义路由事件
 * @param action
 */
function dispatch(action) {
  _navigator.dispatch(action);
}

export default {
  dispatch,
  navigate,
  setTopLevelNavigator,
};
