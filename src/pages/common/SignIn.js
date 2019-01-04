import { Button, InputItem, List, Toast } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import locationService from '../../utils/locationService';
import deviceInfo from 'react-native-device-info';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: 'administrator',
      loading: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 初始化位置
    locationService.initLocation();
    // 初始化设备信息
    const device = {};
    device.DeviceID = deviceInfo.getUniqueID();
    device.UserAgent = deviceInfo.getUserAgent();
    device.DeviceBrand = deviceInfo.getBrand();
    device.DeviceModel = deviceInfo.getModel();
    device.PhoneNumber = deviceInfo.getPhoneNumber();
    device.Timezone = deviceInfo.getTimezone();
    device.AppVersion = deviceInfo.getVersion();
    device.AppReadableVersion = deviceInfo.getReadableVersion();
    dispatch({
      type: `global/deviceInit`,
      payload: device,
    })
  }

  componentDidUpdate() {
    if (this.props.login) {
      this.props.navigation.navigate('身份认证');
    }
  }

  handleLogin() {
    // 隐藏键盘
    const dismissKeyboard = require('dismissKeyboard');
    dismissKeyboard();

    // 登录协议
    const { username, password } = this.state;
    if (username === '') {
      Toast.info('请输入用户名', 1, undefined, false);
    } else if (password === '') {
      Toast.info('请输入密码', 1, undefined, false);
    } else {
      const { dispatch } = this.props;
      this.setState({ loading: true });
      dispatch({
        type: `global/login`,
        payload: {
          account: username,
          pwd: password,
        },
        callback: (data) => {
          this.setState({ loading: false });
          if (data.error_code !== 0) {
            Toast.fail('请检查用户名或密码，稍后再试');
          }
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.imgLogo}
          source={require('../../assets/image/login-logo.png')}
          resizeMode='contain'
        />
        <List style={styles.form} renderHeader={'请登录'}>
          <InputItem
            value={this.state.username}
            onChange={value => {
              this.setState({
                username: value,
              });
            }}
            placeholder="您的登录用户名"
          >
            用户名
          </InputItem>
          <InputItem
            type="password"
            value={this.state.password}
            onChange={value => {
              this.setState({
                password: value,
              });
            }}
            placeholder="您的密码"
          >
            密码
          </InputItem>
        </List>
        <View>
          <Button style={styles.btn} type="primary" loading={this.state.loading} onPress={this.handleLogin.bind(this)}>登录</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: scaleSize(600),
    marginBottom: scaleSize(40),
  },
  imgLogo: {
    height: scaleSize(80),
    marginBottom: scaleSize(80),
  },
  btn: {
    height: scaleSize(80),
    width: scaleSize(600),
  }
});

function mapStateToProps(state) {
  return {
    login: state.global.login, // state 映射到 props
  };
}

export default connect(mapStateToProps)(Login);
