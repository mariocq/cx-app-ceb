import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Initializer, MapView } from 'react-native-baidumap-sdk';
Initializer.init().catch(e => console.error(e));

export default class MapStatus extends Component {
  static navigationOptions = { title: '电子围栏' }

  ZGC = {
    overlook: 0,
    rotation: 0,
    zoomLevel: 16,
    center: {
      latitude: 29.6307385629,
      longitude: 106.6039620327,
    },
  }

  TAM = {
    overlook: 0,
    rotation: 0,
    zoomLevel: 14,
    center: {
      latitude: 29.6462534314,
      longitude: 106.5794634119,
    },
  }

  toZGC = () => this.setState(this.ZGC)
  toTAM = () => this.setState(this.TAM)

  render() {
    return (
      <View style={styles.full}>
        <MapView style={styles.full} ref={ref => this.mapView = ref} {...this.state}
          center={{ latitude: 29.6462534314, longitude: 106.5794634119 }}
        >
          {/* 记录点示意 */}
          <MapView.Marker
            color="#2ecc71"
            coordinate={{ latitude: 29.6463534314, longitude: 106.5794634119 }}
          >
            <MapView.Callout>
              <View style={styles.mapTitle}>
                <Text style={styles.mapTitleDate}>上报日期：2019-01-02 14:51:38</Text>
                <Text style={styles.mapTitleName}>长安马自达 2018款</Text>
                <Text style={styles.mapTitleVIN}>VIN：SH0392034083</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
          <MapView.Marker
            color="#2ecc71"
            title="日期：2019-01-02 14:51:38"
            coordinate={{ latitude: 29.6564534324, longitude: 106.5694634119 }}
          />
          <MapView.Marker
            color="#2ecc71"
            title="日期：2019-01-02 14:51:38"
            coordinate={{ latitude: 29.6665534334, longitude: 106.5594634119 }}
          />
          <MapView.Marker
            color="#2ecc71"
            title="日期：2019-01-02 14:51:38"
            coordinate={{ latitude: 29.6766534344, longitude: 106.5494634119 }}
          />
          <MapView.Marker
            color="#2ecc71"
            title="日期：2019-01-02 14:51:38"
            coordinate={{ latitude: 29.6862534354, longitude: 106.5394634119 }}
          />

          <MapView.Circle
            center={{ latitude: 29.6462534314, longitude: 106.5794634119 }}
            radius={5000}
            strokeWidth={2}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(255, 0, 0, 0.5)"
          />
        </MapView>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.toZGC}>
              <Text style={styles.text}>一号仓库</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.toTAM}>
              <Text style={styles.text}>二号4S店</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  mapTitle:{
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  mapTitleDate:{
    fontSize: 12
  },
  mapTitleName:{
    fontSize: 12,
    fontWeight: "bold"
  },
  mapTitleVIN:{
    fontSize: 12
  },
})
