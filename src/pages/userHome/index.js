import { List, Modal } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import icon from '../../assets/image/mine.png';
import navigationService from '../../utils/navigationService';
import { scaleSize } from '../../utils/screenUtil';
const Item = List.Item;

class UserHome extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  }
  handleLogout() {
    Modal.operation([
      { text: '返回系统', style: { color: '#333' } },
      {
        text: '确定退出', style: { color: 'red' }, onPress: () => {
          this.props.dispatch({
            type: `global/logout`,
            payload: {
              access_token: this.props.access_token
            },
            callback: (data) => {
              if (data.error_code === 0) {

                // 重置路由，路由栈顶层设置为“SignIn”，防止back键
                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'SignIn' })
                  ]
                })
                navigationService.dispatch(resetAction);

              }
            }
          })
        }
      },
    ]);
  }
  render() {
    const { username, mobile, groups } = this.props;
    const group = groups.map(item => item.desc).join(', ');

    return (
      <View>
        <View style={styles.title}>
          <Text>我的</Text>
        </View>
        <View style={styles.userWrap}>
          <View style={styles.userBox}>
            <Image source={icon} style={styles.userHead}></Image>
            <Text style={styles.userName}>登录名：{username}</Text>
            <Text style={styles.userPhone}>电话：{mobile}</Text>
            <Text style={styles.userPhone}>岗位：{group}</Text>
          </View>
        </View>
        <View style={styles.menuWrap}>
          <List>
            <Item arrow="horizontal" onPress={() => { }}>
              登录日志
            </Item>
            <Item arrow="horizontal" onPress={() => { }}>
              修改密码
            </Item>
            <Item arrow="horizontal" onPress={() => { }}>
              关于软件
            </Item>
          </List>
          <List style={styles.logout}>
            <Item arrow="horizontal" onPress={this.handleLogout.bind(this)}>
              退出登录
            </Item>
          </List>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: scaleSize(50),
    height: scaleSize(50),
  },
  title: {
    padding: scaleSize(20), backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  userWrap: {
    marginTop: 0
  },
  userBox: {
    alignItems: 'center', justifyContent: 'flex-start', margin: scaleSize(40), height: scaleSize(300), backgroundColor: '#108ee9',
    borderRadius: scaleSize(10), flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-end',
  },
  userHead: {
    tintColor: '#ffffff', marginLeft: scaleSize(40),
  },
  userName: {
    fontSize: 16, color: '#FFFFFF', paddingLeft: scaleSize(20), width: scaleSize(500),
  },
  userPhone: {
    fontSize: 14, color: '#83cbff', marginLeft: scaleSize(80), marginTop: scaleSize(60)
  },
  menuWrap: {
    marginTop: 0,
  },
  logout: {
    marginTop: scaleSize(20),
  },
});


function mapStateToProps(state) {
  return {
    ...state.global,
  };
}

export default connect(mapStateToProps)(UserHome);
