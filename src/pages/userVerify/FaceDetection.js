import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';

class ActionDetection extends Component {
  static navigationOptions={
    title: '身份检测',
  }
  
  render() {
    return (
      <View style={styles.wrapper}>
        <Text>FaceDetection</Text>
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
