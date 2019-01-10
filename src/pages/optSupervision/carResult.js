import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import carType from '../../assets/image/carType.png';
import icon from '../../assets/image/home.png';
import { Modal, Button } from '@ant-design/react-native';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import locationService from '../../utils/locationService';

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

function mapStateToProps(state) {
  return {
    ...state.global,
  };
}

export default connect(mapStateToProps)(CarResult);
