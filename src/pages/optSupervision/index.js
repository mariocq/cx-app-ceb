import { Modal, Button } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import carType from '../../assets/image/carType.png';
import face from '../../assets/image/face.png';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import { scaleSize } from '../../utils/screenUtil';
import locationService from '../../utils/locationService';
import navigationService from '../../utils/navigationService';

class OptSupervision extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={carType}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  state = {
    alreadyCheck: false,
  }

  resultAlert(data) {
    Modal.alert('人脸识别成功', 'log_id：' + data.log_id);
  }

  gotoCarType(){
    navigationService.navigate('CarType');
  }
  gotoCarVin(){
    navigationService.navigate('CarVin');
  }
  render() {
    const { alreadyCheck } = this.state;
    const tips = alreadyCheck ? "您已通过身份认证" : "您当前暂未通过身份认证";

    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text>车辆清库</Text>
        </View>
        <View style={styles.bg}>
          <Text>请确认您本次提交的信息</Text>
          <Text>车型：奥迪A4L</Text>
          <Text>颜色：白色</Text>
          <Text>年份：2017</Text>
          <Text>VIN：SHO0380SG93922</Text>
        </View>
        <View style={styles.btn}>
          <Button type="primary" onPress={this.gotoCarVin.bind(this)}>确认提交</Button>
        </View>
        {/* <View style={styles.btn}>
          <Button type="primary" onPress={this.gotoCarType.bind(this)}>类型检测</Button>
        </View>
        <View style={styles.btn}>
          <Button type="primary" onPress={this.gotoCarVin.bind(this)}>VIN检测</Button>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  icon: {
    width: scaleSize(65),
    height: scaleSize(40),
  },
  title: {
    padding: scaleSize(20), backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  bg: {
    alignItems: 'center', justifyContent: 'flex-start', height: scaleSize(350), marginTop: scaleSize(60)
  },
  bgImg: {
    opacity: 0.8, height: scaleSize(350), width: scaleSize(350),
  },
  tips: {
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    margin: scaleSize(50)
  }
});


export default OptSupervision;
