import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { List } from '@ant-design/react-native';
import { connect } from 'react-redux';
import { scaleSize } from '../../utils/ScreenUtil';
import icon from '../../assets/image/mine.png';
const Item = List.Item;

class Mine extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  }
  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text>我的</Text>
        </View>
        <View style={styles.userWrap}>
          <View style={styles.userBox}>
            <Image source={icon} style={styles.userHead}></Image>
            <Text style={styles.userName}>登录名：张三十</Text>
            <Text style={styles.userPhone}>电话：18930203929</Text>
            <Text style={styles.userPhone}>岗位：巡检员</Text>
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
});

export default Mine;
