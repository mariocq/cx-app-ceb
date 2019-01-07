import { Button, Checkbox, InputItem, List, Toast } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accout: 'administrator',
      username: '张三',
      mobile: '18600000000',
      password: '',
      loading: false,
    };
  }

  handleRegister() {
    // 隐藏键盘
    const dismissKeyboard = require('dismissKeyboard');
    dismissKeyboard();

    // 登录协议
    const { username, password, accout, mobile, checkBoxUserAgreement } = this.state;
    if (accout === '') {
      Toast.info('请输入用户名', 1, undefined, false);
    } else if (password === '') {
      Toast.info('请输入密码', 1, undefined, false);
    } else if (username === '') {
      Toast.info('请输入真实姓名', 1, undefined, false);
    } else if (mobile === '') {
      Toast.info('请输入手机号码', 1, undefined, false);
    } else if (!checkBoxUserAgreement) {
      Toast.info('请勾选用户协议', 1, undefined, false);
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
        <List style={styles.form} renderHeader={'注册'}>
          <InputItem
            value={this.state.accout}
            onChange={value => {
              this.setState({
                accout: value,
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
          <InputItem
            value={this.state.username}
            onChange={value => {
              this.setState({
                username: value,
              });
            }}
            placeholder="请输入真实姓名"
          >
            真实姓名
          </InputItem>
          <InputItem
            value={this.state.mobile}
            onChange={value => {
              this.setState({
                mobile: value,
              });
            }}
            placeholder="请输入手机号码"
          >
            手机号码
          </InputItem>
        </List>
        <View>
          <Checkbox
            style={styles.text}
            checked={this.state.checkBoxUserAgreement}
            onChange={event => {
              this.setState({ checkBoxUserAgreement: event.target.checked });
            }}
          >
            <Text style={styles.text} onPress={this.handleRegister.bind(this)}>我已阅读《用户协议》</Text>
          </Checkbox>
        </View>
        <View>
          <Button style={styles.btn} type="primary" loading={this.state.loading} onPress={this.handleRegister.bind(this)}>注册</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    width: scaleSize(750),
    marginBottom: scaleSize(40),
  },
  text: {
    color: "#999",
    marginTop: scaleSize(-10)
  },
  btn: {
    marginTop: scaleSize(20),
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
