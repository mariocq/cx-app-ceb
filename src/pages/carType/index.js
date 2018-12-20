import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/ScreenUtil';
import carType from '../../assets/image/carType.png';
import icon from '../../assets/image/home.png';
import { Button, WhiteSpace } from '@ant-design/react-native';
import ImagePicker from "../../component/ImagePicker";

class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={carType}
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
          <Text>车型识别</Text>
        </View>
        <View style={styles.bg}>
          <Image source={carType} style={styles.bgImg}></Image>
        </View>
        <ImagePicker />
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
    name: state.home.name, // state 映射到 props
  };
}

export default connect(mapStateToProps)(Home);
