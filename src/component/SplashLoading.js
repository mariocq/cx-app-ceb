/**
 * 闪屏页封装
 * 1.5秒渐变后跳到登录页
 */
import React, { Component, } from 'react';
import {
  View,
  Animated,
} from 'react-native';

// 初始logo透明度
const FADE_START = 0.3;

// 等待时间
const WAIT_TIME = 2000;

export default class SplashLoading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(FADE_START),
    };
  }

  componentDidMount() {
    const { animateEnd } = this.props;
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: WAIT_TIME,
      }
    ).start(() => {
      //动画执行完毕
      if (animateEnd) {
        animateEnd()
      }
    });
  }

  render() {
    const { source, height } = this.props;
    return (
      <View>
        <Animated.Image
          style={{ height, opacity: this.state.fadeAnim }}
          source={source}
          resizeMode='contain'
        />
      </View>
    );
  }
}
