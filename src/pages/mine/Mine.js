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
        <View style={styles.bgUser}>
          <Image source={icon} style={styles.bgImg}></Image>
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
  bgUser: {
    alignItems: 'center', justifyContent: 'flex-start', height: 350, marginTop: 20
  },
  bgImg: {
    opacity: 0.6
  }
});

export default Mine;
