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

  resultAlert(data, img_data) {
    if (data.result.score > 80) {
      const img = { uri: `data:image/png;base64,${img_data}` };
      Modal.alert('人脸识别成功',
        <View>
          <Image source={img} style={styles.resultImg} />
          <Text>身份认证成功，可进行车辆清库操作</Text>
        </View>
      );
      this.props.dispatch({
        type: `global/faceCheckSet`,
        payload: true
      })
    }
    else {
      Modal.alert('检测失败', '请调整好角度和光线，重新拍照');
    }
  }

  render() {
    const { face_check } = this.props;
    const tips = face_check ? <Text>您<Text style={styles.txtRed}>已通过</Text>身份认证</Text> : "您当前暂未通过身份认证";

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
          buttonText="身份认证"
          onlyReal={true}
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
  resultImg: {
    height: scaleSize(300), width: scaleSize(400), resizeMode: "cover", marginBottom: scaleSize(20), alignSelf: "center"
  },
  txtRed:{
    color: "#ff0000"
  }
});

function mapStateToProps(state) {
  return {
    ...state.global,
  };
}

export default connect(mapStateToProps)(UserVerify);
