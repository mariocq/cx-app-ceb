import { Button, Modal } from '@ant-design/react-native';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import locationService from '../../utils/locationService';
import { scaleSize } from '../../utils/screenUtil';

class CarResult extends Component {

  resultAlert(data) {
    Modal.alert('识别结果',
      `log_id：${1} \n\n` +
      `车型：${2} \n`
    );
  }

  render() {
    const location = locationService.getPosition() || {};
    return (
      <View>
        <View style={styles.bg}>
          <Text style={styles.title}>请确认您本次提交的信息</Text>
          <Text>车型：奥迪A4L</Text>
          <Text>颜色：白色</Text>
          <Text>年份：2017</Text>
          <Text>VIN：SHO0380SG93922</Text>
        </View>
        <View style={styles.btn}>
          <Button type="primary" onPress={() => this.resultAlert()}>确认提交</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    alignItems: 'center', justifyContent: "space-between", height: scaleSize(300), marginTop: scaleSize(60),
    width: scaleSize(550),
    backgroundColor: '#fff',
    borderRadius: scaleSize(10),
    padding: scaleSize(40)
  },
  title:{
    color: "#4396ec"
  },
  btn: {
    justifyContent: 'center',
    margin: scaleSize(50)
  }
});

export default CarResult;
