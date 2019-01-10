import { Modal } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import carVin from '../../assets/image/carVin.png';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import locationService from '../../utils/locationService';
import { scaleSize } from '../../utils/screenUtil';

class CarVin extends Component {
  resultAlert(data) {
    const result = data.words_result.length > 0 ? data.words_result[0].words : '暂无'
    Modal.alert('识别结果',
      `log_id：${data.log_id} \n\n` +
      `VIN码：${result}`,
      [
        { text: '下一步', onPress: () => this.props.gotoResult() },
      ]
    );
  }
  render() {
    return (
      <View>
        <View style={styles.bg}>
          <Image source={carVin} style={styles.bgImg}></Image>
        </View>

        <ImagePicker
          reqMatch={faceService.vinMatch}
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
  bg: {
    alignItems: 'center', justifyContent: 'flex-start', height: scaleSize(300), width: scaleSize(450), marginTop: scaleSize(60)
  },
  bgImg: {
    opacity: 0.8, height: scaleSize(290), width: scaleSize(350)
  },
});

export default CarVin;

