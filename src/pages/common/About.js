import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashLoading from "../../component/SplashLoading";
import { scaleSize } from '../../utils/screenUtil';

class Component extends React.Component {
  static navigationOptions={
    headerTitle: '关于软件',
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <SplashLoading
            source={require('../../assets/image/login-logo.png')}
            animateEnd={this._animateEnd}
            height={scaleSize(100)}
          />
        </View>
        <View style={styles.copyright}>
          <Text>版本号：Ver 0.1.1</Text>
          <Text>版权所有： 光大银行 创新奇智</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: scaleSize(120),
    marginBottom: scaleSize(20),
  },
  copyright: {
    color: '#666',
    marginBottom: scaleSize(120),
    alignItems: 'center',
  }
});

export default Component;
