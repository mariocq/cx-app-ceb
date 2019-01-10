import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from '../../utils/dva';
import { Initializer, MapView } from 'react-native-baidumap-sdk';
Initializer.init().catch(e => console.error(e));

class MapFence extends Component {
  static navigationOptions = { title: '电子围栏' }

  componentDidMount() {
    this.props.dispatch({
      type: `supervision/getReportLog`,
      payload: {
        access_token: this.props.access_token,
        account: this.props.account,
      }
    })
  }

  // API参考
  // ZGC = {
  //   overlook: 0,
  //   rotation: 0,
  //   zoomLevel: 16,
  //   center: {
  //     latitude: 29.6307385629,
  //     longitude: 106.6039620327,
  //   },
  // }
  // toZGC = () => this.setState(this.ZGC)
  markerList(data) {
    const List = data.map(({ time, location, car }, index) => {
      const { latitude, longitude } = location;
      const { model, year, color, vin } = car;
      return (
        <MapView.Marker
          key={index}
          color="#2ecc71"
          coordinate={{ latitude, longitude }
          }
        >
          <MapView.Callout>
            <View style={styles.mapTitle}>
              <Text style={styles.mapTitleDate}>上报日期：{time}</Text>
              <Text style={styles.mapTitleName}>{model} {year} {color}</Text>
              <Text style={styles.mapTitleVIN}>VIN：{vin}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>)
    })
    return List
  }
  render() {
    const { store_info, list } = this.props;
    const { center = [0, 0], radius } = store_info.fence;
    const List = this.markerList(list);

    return (
      <View style={styles.full}>
        <MapView style={styles.full} ref={ref => this.mapView = ref} {...this.state}
          zoomLevel={15}
          center={{ latitude: center[1], longitude: center[0] }}
        >
          {/* 标记点 */}
          {List}

          {/* 电子围栏区域 */}
          <MapView.Circle
            center={{ latitude: center[1], longitude: center[0] }}
            radius={radius * 1000}
            strokeWidth={2}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(255, 0, 0, 0.5)"
          />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  buttons: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 8,
  },
  button: {
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(245,83,61,0.8)',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  mapTitle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  mapTitleDate: {
    fontSize: 12
  },
  mapTitleName: {
    fontSize: 12,
    fontWeight: "bold"
  },
  mapTitleVIN: {
    fontSize: 12
  },
})


function mapStateToProps(state) {
  return {
    ...state.global,
    list: state.supervision.list,
  };
}
export default connect(mapStateToProps)(MapFence);
