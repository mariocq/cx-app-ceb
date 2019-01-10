import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import carType from '../../assets/image/carType.png';
import icon from '../../assets/image/home.png';
import { Modal } from '@ant-design/react-native';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import locationService from '../../utils/locationService';

class CarType extends Component {

  resultAlert(data){
    Modal.alert('识别结果',
      `log_id：${data.log_id} \n\n` +
      `车型：${data.result[0].name} \n` +
      `年份：${data.result[0].year} \n` +
      `颜色：${data.color_result}`
    );
  }

  render() {
    return (
      <View>
        <View style={styles.bg}>
          <Text>请确认您本次提交的信息</Text>
          <Text>车型：奥迪A4L</Text>
          <Text>颜色：白色</Text>
          <Text>年份：2017</Text>
          <Text>VIN：SHO0380SG93922</Text>
          <Text>{location.longitude}</Text>
          <Text>{location.altitude}</Text>
        </View>
        <View style={styles.btn}>
          <Button type="primary" onPress={this.gotoCarVin.bind(this)}>确认提交</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    alignItems: 'center', justifyContent: 'flex-start', height: scaleSize(500), marginTop: scaleSize(60)
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

export default connect(mapStateToProps)(CarType);
