import { Button, Checkbox, InputItem, List, Modal, Toast } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import * as users from '../../services/users';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: 'administrator',
      username: '张三',
      mobile: '18600000000',
      password: '',
      checkBoxUserAgreement: true,
      loading: false,
    };
  }

  handleRegister() {
    // 隐藏键盘
    const dismissKeyboard = require('dismissKeyboard');
    dismissKeyboard();

    // 表单处理
    const { username, password, account, mobile, checkBoxUserAgreement } = this.state;
    if (account === '') {
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

      // 请求参数
      const request = {
        'account': account,
        'pwd': password,
        'username': username,
        'mobile': mobile,
      }

      // 请求API
      const res = users.register(request);

      res.then(({ data }) => {
        // 注册结果
        this.setState({ loading: false });
        if (data.error_code === 0) {
          Modal.alert('注册成功',
            `用户名：${account} \n` +
            `请注册人脸信息，点击下一步`,
            [
              { text: '下一步', onPress: () => this.props.navigation.navigate('UserFaceReg') },
            ]
          );
        }
        else {
          Modal.alert('注册失败', '请稍后再试，' + data.error_msg);
        }
      })
        .catch((error) => { console.error('error', error) });
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <List style={styles.form} renderHeader={'注册'}>
          <InputItem
            value={this.state.account}
            onChange={value => {
              this.setState({
                account: value,
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
            <Text style={styles.text} onPress={() => this.setState({ visible: true })}>我已阅读《用户协议》</Text>
          </Checkbox>
        </View>
        <View>
          <Button style={styles.btn} type="primary" loading={this.state.loading} onPress={this.handleRegister.bind(this)}>注册</Button>
        </View>

        {/* 注册协议弹框 */}
        <Modal
          title="用户协议"
          visible={this.state.visible}
          closable
          transparent
          onClose={() => this.setState({ visible: false })}
        >
          <ScrollView style={styles.userAgreementWrap}>
            <Text style={styles.userAgreementTitle}>隐私政策</Text>
            <Text style={styles.userAgreementBody}>
              本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。
            </Text>
            <Text style={styles.userAgreementTitle}>适用范围</Text>
            <Text style={styles.userAgreementBody}>
              (a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；
              (b) 在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；
              (c) 本应用通过合法途径从商业伙伴处取得的用户个人数据。
              您了解并同意，以下信息不适用本隐私权政策：
              (a) 您在使用本应用平台提供的搜索服务时输入的关键字信息；
              (b) 本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；
              (c) 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。
            </Text>
            <Text style={styles.userAgreementTitle}>信息使用</Text>
            <Text style={styles.userAgreementBody}>
              (a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。
              (b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。
            </Text>
            <Text style={styles.userAgreementTitle}>信息安全</Text>
            <Text style={styles.userAgreementBody}>
              (a) 本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。
              (b) 请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用管理员，以便本应用采取相应措施。
            </Text>
          </ScrollView>
        </Modal>
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
  },
  userAgreementWrap: {
    height: scaleSize(800),
  },
  userAgreementTitle: {
    textAlign: "left",
    fontWeight: "bold",
  },
  userAgreementBody: {
    textAlign: "left",
  }
});

function mapStateToProps(state) {
  return {
    login: state.global.login, // state 映射到 props
  };
}

export default connect(mapStateToProps)(Register);
