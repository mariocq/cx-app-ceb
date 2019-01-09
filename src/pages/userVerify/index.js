import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import face from '../../assets/image/face.png';
import { Button, Modal, Toast } from '@ant-design/react-native';
import locationService from '../../utils/locationService';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';

class UserVerify extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={face}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  state = {
    alreadyCheck: false,
  }

  resultAlert(data){
    if (data.result.score > 80 ) {
      Modal.alert('人脸识别成功', 'log_id：' + data.log_id);
      this.props.dispatch({
        type: `global/faceCheckSet`,
        payload: true
      })
    }
    else{
      Modal.alert('检测失败', '请调整好角度和光线，重新拍照');
    }
  }

  render() {
    const { face_check } = this.props;
    const tips = face_check ? "您已通过身份认证" : "您当前暂未通过身份认证";

    return (
      <View>
        <View style={styles.title}>
          <Text>身份认证</Text>
        </View>
        <View style={styles.bg}>
          <Text>{tips}</Text>
          <Image source={face} style={styles.bgImg}></Image>
        </View>
        <ImagePicker
          reqMatch={faceService.faceMatch}
          location={locationService.getPosition()}
          resultAlert={this.resultAlert.bind(this)}
          access_token={this.props.access_token}
          device={this.props.device}
          account={this.props.account}
        />
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
    padding: scaleSize(20), backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  bg: {
    alignItems: 'center', justifyContent: 'flex-start', height: scaleSize(500), marginTop: scaleSize(60)
  },
  bgImg: {
    opacity: 0.8, height: scaleSize(350), width: scaleSize(350),
  },
});

function mapStateToProps(state) {
  return {
    ...state.global,
  };
}

export default connect(mapStateToProps)(UserVerify);
