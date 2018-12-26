import { Button, InputItem, List, Toast } from '@ant-design/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';

class Component extends React.Component {
  static navigationOptions = {
    headerTitle: '修改密码',
  }
  constructor(props) {
    super(props);
    this.state = {
      passwordOld: '',
      passwordNew: '',
      passwordConfirm: '',
      loading: false,
    };
  }
  handleModify() {
    // 隐藏键盘
    const dismissKeyboard = require('dismissKeyboard');
    dismissKeyboard();

    // 登录协议
    const { passwordOld, passwordNew, passwordConfirm } = this.state;
    if (passwordOld === '') {
      Toast.info('请输入您的旧密码', 1, undefined, false);
    } else if (passwordNew === '') {
      Toast.info('请输入您的新密码', 1, undefined, false);
    } else if (passwordConfirm === '') {
      Toast.info('请再次输入您的新密码', 1, undefined, false);
    } else {
      const { dispatch } = this.props;
      this.setState({ loading: true });
      dispatch({
        type: `global/resetPassword`,
        payload: {
          old: passwordOld,
          new: passwordNew,
          account: this.props.account,
          access_token: this.props.access_token,
        },
        callback: (data) => {
          this.setState({ loading: false });
          if (data.error_code === 0) {
            Toast.success('修改成功，请牢记您的新密码！');
          }
          else{
            Toast.info('修改失败，' + data.error_msg);
          }
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <List style={styles.form}>
          <InputItem
            type="password"
            value={this.state.passwordOld}
            onChange={value => {
              this.setState({
                passwordOld: value,
              });
            }}
            placeholder="请输入您的旧密码"
          >
            旧密码
          </InputItem>
          <InputItem
            type="password"
            value={this.state.passwordNew}
            onChange={value => {
              this.setState({
                passwordNew: value,
              });
            }}
            placeholder="请输入您的新密码"
          >
            新密码
          </InputItem>
          <InputItem
            type="password"
            value={this.state.passwordConfirm}
            onChange={value => {
              this.setState({
                passwordConfirm: value,
              });
            }}
            placeholder="请再次输入您的新密码"
          >
            重复密码
          </InputItem>
        </List>
        <View>
          <Button style={styles.btn} type="primary" loading={this.state.loading} onPress={this.handleModify.bind(this)}>修改密码</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  form: {
    marginBottom: scaleSize(40),
  },
  btn: {
    height: scaleSize(80),
    width: scaleSize(600),
    alignSelf: 'center',
  }
});


function mapStateToProps(state) {
  return {
    ...state.global,
  };
}

export default connect(mapStateToProps)(Component);
