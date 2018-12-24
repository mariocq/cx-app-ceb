import React from 'react';
import SplashLoading from "../../component/SplashLoading";
import { Text, View, StyleSheet } from 'react-native';
import { scaleSize } from '../../utils/screenUtil';

class Component extends React.Component {
  _animateEnd = () => {
    //动画完成的回调
    this.props.navigation.navigate('SignIn');
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
        <View>
          <Text style={styles.copyright}>Powered By 光大银行 创新奇智</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    height: scaleSize(120),
    marginBottom: scaleSize(20),
  },
  copyright: {
    color: '#bbb',
    marginBottom: scaleSize(120),
  }
});

export default Component;
