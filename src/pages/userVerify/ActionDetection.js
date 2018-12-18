import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/ScreenUtil';

class ActionDetection extends Component {
  static navigationOptions={
    title: '动作检测',
  }
  
  render() {
    return (
      <View style={styles.wrapper}>
        <Text>ActionDetection</Text>
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
});


export default ActionDetection;
