import { Modal, Button } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import carType from '../../assets/image/carType.png';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import locationService from '../../utils/locationService';
import { scaleSize } from '../../utils/screenUtil';

class CarType extends Component {

  resultAlert(data) {
    Modal.alert('识别结果',
      `LogID：${data.log_id} \n\n` +
      `车型：${data.result[0].name} \n` +
      `年份：${data.result[0].year} \n` +
      `颜色：${data.color_result}`,
      [
        { text: '下一步', onPress: () => this.props.gotoVinCheck(data) },
      ]
    );
  }

  render() {
    const { face_check } = this.props;
    return (
      <View>
        <View style={styles.bg}>
          <Image source={carType} style={styles.bgImg}></Image>
        </View>
        {
          face_check ?
            <ImagePicker
              reqMatch={faceService.typeMatch}
              location={locationService.getPosition()}
              resultAlert={this.resultAlert.bind(this)}
              access_token={this.props.access_token}
              device={this.props.device}
              account={this.props.account}
            /> :
            <Button type="primary" onPress={() => Modal.alert('提示',"请先进行人脸身份认证")}>检测</Button>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    alignItems: 'center', justifyContent: 'flex-start', height: scaleSize(300), marginTop: scaleSize(60)
  },
  bgImg: {
    opacity: 0.8, height: scaleSize(250), width: scaleSize(450), resizeMode: "cover"
  },
});

export default CarType;
