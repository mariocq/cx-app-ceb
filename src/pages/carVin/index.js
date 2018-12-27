import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import carVin from '../../assets/image/carVin.png';
import ImagePicker from "../../component/ImagePicker";
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import * as faceService from '../../services/faceService';
import { Modal } from '@ant-design/react-native';

class CarVin extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={carVin}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  resultAlert(data) {
    const result = data.words_result.length > 0 ? data.words_result[0].words : '暂无'
    Modal.alert('识别结果',
      `log_id：${data.log_id} \n\n` +
      `VIN码：${result}`
    );
  }
  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text>车架号识别</Text>
        </View>
        <View style={styles.bg}>
          <Image source={carVin} style={styles.bgImg}></Image>
        </View>

        <ImagePicker
          reqMatch={faceService.vinMatch}
          resultAlert={this.resultAlert}
          access_token={this.props.access_token}
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

export default connect(mapStateToProps)(CarVin);

