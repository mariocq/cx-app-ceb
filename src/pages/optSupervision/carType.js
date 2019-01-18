import { Modal, Button } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, View, Text} from 'react-native';
import carType from '../../assets/image/carType.png';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import locationService from '../../utils/locationService';
import { scaleSize } from '../../utils/screenUtil';

class CarType extends Component {

  resultAlert(data, img_data) {
    const img = img_data ? { uri: `data:image/png;base64,${img_data}` } : carType;
    Modal.alert('识别结果',
      <View>
        <Image source={img} style={styles.resultImg}/>
        <Text>车型：{data.result[0].name}</Text>
        <Text>年份：{data.result[0].year}</Text>
        <Text>颜色：{data.color_result}</Text>
      </View>,
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
              buttonText="车型检测"
            /> :
            <Button type="primary" onPress={() => Modal.alert('提示', "请先进行人脸身份认证")}>车型检测</Button>
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
  resultImg: {
    height: scaleSize(150), width: scaleSize(250), resizeMode: "cover", marginBottom: scaleSize(20)
  },
});

export default CarType;
