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
    const { name, year, color, vin } = this.props.supervision;
    return (
      <View>
        <View style={styles.bg}>
          <Text style={styles.title}>请确认您本次提交的信息</Text>
          <Text>车型：{name}</Text>
          <Text>颜色：{year}</Text>
          <Text>年份：{color}</Text>
          <Text>VIN：{vin}</Text>
        </View>
        <View style={styles.btn}>
          <Button type="primary" onPress={() => this.resultAlert()}>确认提交</Button>
        </View>
        <View style={styles.btnReCheck}>
          <Button onPress={() => this.props.gotoReCheck()}>重新识别</Button>
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
    marginTop: scaleSize(50)
  },
  btnReCheck: {
    justifyContent: 'center',
    marginTop: scaleSize(30)
  }
});

export default CarResult;
