import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/ScreenUtil';
import face from '../../assets/image/face.png';
import { Button, Modal, Toast } from '@ant-design/react-native';
import ImagePicker from "../../component/ImagePicker";

class Home extends Component {
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
        <ImagePicker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: scaleSize(40),
    height: scaleSize(40),
  },
  title: {
    padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  bg: {
    alignItems: 'center', justifyContent: 'center', height: 350
  },
  bgImg: {
    opacity: 0.4
  }
});

function mapStateToProps(state) {
  return {
    name: state.home.name, // state 映射到 props
  };
}

export default connect(mapStateToProps)(Home);
