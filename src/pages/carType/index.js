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
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={carType}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

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
        <View style={styles.title}>
          <Text>车型识别</Text>
        </View>
        <View style={styles.bg}>
          <Image source={carType} style={styles.bgImg}></Image>
        </View>

        <ImagePicker
          reqMatch={faceService.typeMatch}
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
  icon: {
    width: scaleSize(65),
    height: scaleSize(40),
  },
  title: {
    padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  bg: {
    alignItems: 'center', justifyContent: 'center', height: 350
  },
  bgImg: {
    opacity: 0.6
  }
});

function mapStateToProps(state) {
  return {
    ...state.global,
  };
}

export default connect(mapStateToProps)(CarType);
