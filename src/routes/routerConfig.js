import ModifyPassword from '../pages/common/ModifyPassword';
import About from '../pages/common/About';
import SignIn from '../pages/common/SignIn';
import Splash from '../pages/common/Splash';
import Register from '../pages/common/Register';
import MapFence from '../pages/mapFence';
import UserFaceReg from '../pages/userFaceReg';
import CarType from '../pages/optSupervision/carType';
import CarVin from '../pages/optSupervision/carVin';

// 隐藏header
const navigationOptions = { header: null };

/**
 * 页面配置
 */
export default {
  ModifyPassword: { screen: ModifyPassword },
  About: { screen: About },
  MapFence: { screen: MapFence },
  CarType: { screen: CarType, navigationOptions  },
  CarVin: { screen: CarVin, navigationOptions  },
  SignIn: { screen: SignIn, navigationOptions },
  Splash: { screen: Splash, navigationOptions },
  Register: { screen: Register, navigationOptions },
  UserFaceReg: { screen: UserFaceReg, navigationOptions },
};

