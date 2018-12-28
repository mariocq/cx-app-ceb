import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scaleSize } from '../../utils/screenUtil';

class Component extends React.Component {
  static navigationOptions={
    headerTitle: '电子围栏',
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text>地图API</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  title: {
    height: scaleSize(120),
    marginBottom: scaleSize(20),
  },
});

export default Component;
