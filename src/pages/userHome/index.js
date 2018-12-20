import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scaleSize } from '../../utils/ScreenUtil';
import icon from '../../assets/image/mine.png';

class Mine extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

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
    padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  userWrap: {
    marginTop: 0
  },
  userBox: {
    alignItems: 'center', justifyContent: 'flex-start', margin: 20, height: 150, backgroundColor: '#108ee9',
    borderRadius: 5, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-end',
  },
  userHead: {
    tintColor: '#ffffff', marginLeft: 20,
  },
  userName: {
    fontSize: 16, color: '#FFFFFF', paddingLeft: 10, width: 300,
  },
  userPhone: {
    fontSize: 14, color: '#83cbff', marginLeft: 50, marginTop: 30
  },
});

export default Mine;
