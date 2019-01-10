import { Modal, Button, Steps } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import carTypeIcon from '../../assets/image/carType.png';
import face from '../../assets/image/face.png';
import ImagePicker from "../../component/ImagePicker";
import * as faceService from '../../services/faceService';
import { scaleSize } from '../../utils/screenUtil';
import locationService from '../../utils/locationService';
import navigationService from '../../utils/navigationService';
import CarType from "./carType";

const Step = Steps.Step;

class OptSupervision extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={carTypeIcon}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  state = {
    currentStep: 0,
  }

  resultAlert(data) {
    Modal.alert('人脸识别成功', 'log_id：' + data.log_id);
  }

  gotoCarType() {
    navigationService.navigate('CarType');
  }
  gotoCarVin() {
    navigationService.navigate('CarVin');
  }
  render() {
    const location = locationService.getPosition() || {};

    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text>车辆清库</Text>
        </View>

        <View style={styles.steps}>
          <Steps size="small" current={this.state.currentStep} direction="horizontal">
            <Step
              key={0}
              title={
                <View>
                  <Text style={styles.stepsTitle}>1.车型识别</Text>
                </View>
              }
              status="wait"
            />
            <Step
              key={1}
              title={
                <View>
                  <Text style={styles.stepsTitle}>2.车架号识别</Text>
                </View>
              }
              status="wait"
            />
            <Step
              key={2}
              title={
                <View>
                  <Text style={styles.stepsTitle}>3.提交认证</Text>
                </View>
              }
              status="wait"
            />
          </Steps>
        </View>

        <View style={styles.contentWrap}>
          {this.state.currentStep === 0 ?
            <CarType/> : null
          }
        </View>

        {/* <View style={styles.btn}>
          <Button type="primary" onPress={this.gotoCarType.bind(this)}>类型检测</Button>
        </View>
        <View style={styles.btn}>
          <Button type="primary" onPress={this.gotoCarVin.bind(this)}>VIN检测</Button>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  icon: {
    width: scaleSize(65),
    height: scaleSize(40),
  },
  title: {
    padding: scaleSize(20), backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  steps: {
    alignItems:"flex-start", marginTop: scaleSize(60), marginLeft: scaleSize(140)
  },
  stepsTitle: {
    width: scaleSize(150), marginLeft: scaleSize(-50), marginTop: scaleSize(30)
  },
  contentWrap:{
    alignItems:"center",
  }
});


export default OptSupervision;
