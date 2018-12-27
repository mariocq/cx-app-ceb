import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import face from '../../assets/image/face.png';
import { Button, Modal, Toast } from '@ant-design/react-native';
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

  goAction() {
    this.props.navigation.navigate('ActionDetection');
  }

  goFace() {
    this.props.navigation.navigate('FaceDetection');
  }

  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text>身份认证</Text>
        </View>
        <View style={styles.bg}>
          <Text>您当前暂未通过身份认证</Text>
          <Image source={face} style={styles.bgImg}></Image>
        </View>
        <ImagePicker
          reqMatch={faceService.faceMatch}
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

export default connect(mapStateToProps)(UserVerify);
