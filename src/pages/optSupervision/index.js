import { Modal } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import carType from '../../assets/image/carType.png';
import face from '../../assets/image/face.png';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import { scaleSize } from '../../utils/screenUtil';
import locationService from '../../utils/locationService';

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

  resultAlert(data){
    Modal.alert('人脸识别成功', 'log_id：' + data.log_id);
  }

  render() {
    const { alreadyCheck } = this.state;
    const tips = alreadyCheck ? "您已通过身份认证" : "您当前暂未通过身份认证";

    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text>用户人脸信息注册</Text>
        </View>
        <View style={styles.bg}>
          <Text>{tips}</Text>
          <Image source={face} style={styles.bgImg}></Image>
        </View>
        <ImagePicker
          reqMatch={faceService.faceMatch}
          location={locationService.getPosition()}
          resultAlert={this.resultAlert}
          access_token={this.props.access_token}
          device={this.props.device}
          account={this.props.account}
        />
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
