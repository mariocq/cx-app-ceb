import ModifyPassword from '../pages/common/ModifyPassword';
import About from '../pages/common/About';
import SignIn from '../pages/common/SignIn';
import Splash from '../pages/common/Splash';

// 隐藏header
const navigationOptions = { header: null };

/**
 * 页面配置
 */
export default {
  ModifyPassword: { screen: ModifyPassword },
  About: { screen: About },
  SignIn: { screen: SignIn, navigationOptions },
  Splash: { screen: Splash, navigationOptions },
};

