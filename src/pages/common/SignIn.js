import { Button, InputItem, List, Toast } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';

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
        // console.log(positionData);

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
