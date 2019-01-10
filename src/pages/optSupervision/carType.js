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
      `颜色：${data.color_result}`,
      [
        { text: '下一步', onPress: () => this.props.gotoVinCheck() },
      ]
    );
  }

  render() {
    return (
      <View>
        <View style={styles.bg}>
          <Image source={carType} style={styles.bgImg}></Image>
        </View>

        <ImagePicker
          reqMatch={faceService.typeMatch}
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
    alignItems: 'center', justifyContent: 'flex-start', height: scaleSize(300), marginTop: scaleSize(60)
  },
  bgImg: {
    opacity: 0.8, height: scaleSize(250), width: scaleSize(450), resizeMode: "cover"
  },
});

function mapStateToProps(state) {
  return {
    ...state.global,
  };
}

export default connect(mapStateToProps)(CarType);
