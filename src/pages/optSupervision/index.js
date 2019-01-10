import { Steps } from '@ant-design/react-native';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import carTypeIcon from '../../assets/image/carType.png';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import CarResult from "./carResult";
import CarType from "./carType";
import CarVin from "./carVin";

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

  gotoVinCheck() {
    this.setState({ currentStep: 1 })
  }
  gotoResult() {
    this.setState({ currentStep: 2 })
  }
  render() {

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
            />
            <Step
              key={1}
              title={
                <View>
                  <Text style={styles.stepsTitle}>2.车架号识别</Text>
                </View>
              }
            />
            <Step
              key={2}
              title={
                <View>
                  <Text style={styles.stepsTitle}>3.提交认证</Text>
                </View>
              }
            />
          </Steps>
        </View>

        <View style={styles.contentWrap}>
          { this.state.currentStep === 0 ?
            <CarType gotoVinCheck={this.gotoVinCheck.bind(this)} /> :
            this.state.currentStep === 1 ?
            <CarVin gotoResult={this.gotoResult.bind(this)} /> :
            this.state.currentStep === 2 ?
            <CarResult /> : null
          }
        </View>
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
    alignItems: "flex-start", marginTop: scaleSize(60), marginLeft: scaleSize(140)
  },
  stepsTitle: {
    width: scaleSize(150), marginLeft: scaleSize(-50), marginTop: scaleSize(30)
  },
  contentWrap: {
    alignItems: "center",
  }
});

function mapStateToProps(state) {
  return {
    ...state.global,
  };
}


export default connect(mapStateToProps)(OptSupervision);
