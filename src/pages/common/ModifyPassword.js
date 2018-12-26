import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scaleSize } from '../../utils/screenUtil';

class Component extends React.Component {
  static navigationOptions = {
    headerTitle: '修改密码',
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <Text>版本号：Ver 0.1.1</Text>

        </View>
        <View style={styles.copyright}>
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
  copyright: {
    color: '#666',
    marginBottom: scaleSize(120),
    alignItems: 'center',
  }
});

export default Component;
