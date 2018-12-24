import { Button, Modal } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import carVin from '../../assets/image/carVin.png';
import ImagePicker from "../../component/ImagePicker";
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';

class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={carVin}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  onSubimt() {
    console.log('submit');

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
        <ImagePicker />
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
    name: state.home.name, // state 映射到 props
  };
}

export default connect(mapStateToProps)(Home);

