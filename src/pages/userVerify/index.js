import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/ScreenUtil';
import icon from '../../assets/image/home.png';
import { Button, WhiteSpace } from '@ant-design/react-native';

class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
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
      <View style={{ padding: 10 }}>
        <Button type="primary" onPress={this.goAction.bind(this)}>动作检测</Button>
        <WhiteSpace />
        <Button type="primary" onPress={this.goFace.bind(this)}>身份检测</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: scaleSize(40),
    height: scaleSize(40),
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: scaleSize(40),
  }
});

function mapStateToProps(state) {
  return {
    name: state.home.name, // state 映射到 props
  };
}

export default connect(mapStateToProps)(Home);
