import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from '../../utils/dva';
import { scaleSize } from '../../utils/screenUtil';
import face from '../../assets/image/face.png';
import { Button, Modal, Toast } from '@ant-design/react-native';
import * as faceService from '../../services/faceService';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: '',
  takePhotoButtonTitle: '拍照',
  cancelButtonTitle: '取消',
  chooseFromLibraryButtonTitle: '选择图片',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class UserFaceReg extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={face}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  state = {
    img_data: null
  }

  resultAlert(data) {
    Modal.alert('成功', '请登录');
  }

  onPick() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {

        // 界面显示结果
        this.setState({ img_data: response.data });

        // 请求参数
        const request = {
          'image': response.data,
          'access_token': this.props.access_token,
          'account': this.props.account,
          'location': this.props.location,
          'device': this.props.device,
        }

        console.log("req", request);

        // // 请求API
        // const res = this.props.reqMatch(request);

        // res.then(({ data }) => {
        //   console.log(data);
        //   // 识别结果
        //   this.setState({ animating: !this.state.animating });
        //   if (data.error_code === 0) {
        //     this.props.resultAlert(data);
        //   }
        //   else {
        //     Modal.alert('识别失败', '请稍后再试，' + data.error_msg);
        //   }
        // })
        //   .catch((error) => { console.error('error', error) });
      }
    });
  }
  onRegFace() {
    Modal.alert('提交成功',
      `请等待管理员审核，审核成功后才能进行清库业务！ \n` +
      `请点击返回登录界面`,
      [
        { text: '返回', onPress: () => this.props.navigation.navigate('SignIn') },
      ]
    );
  }
  render() {
    const { img_data } = this.state;

    const data = img_data ? { uri: `data:image/png;base64,${img_data}` } : face;
    const tips = img_data ? "请点击上传，注册人脸信息" : "请点击拍照";
    const btn = img_data ?
      <Button type="primary" onPress={this.onRegFace.bind(this)}>上传信息</Button> :
      <Button type="primary" onPress={this.onPick.bind(this)}>拍照</Button>;

    return (
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text>用户人脸信息注册</Text>
        </View>
        <View style={styles.bg}>
          <Image source={data} style={styles.bgImg}></Image>
        </View>
        <View style={styles.btn}>
          {btn}
        </View>
        <View style={styles.tips}>
          <Text>{tips}</Text>
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
    width: scaleSize(50),
    height: scaleSize(50),
  },
  title: {
    padding: scaleSize(20), backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'
  },
  bg: {
    alignItems: 'center', justifyContent: 'flex-start', height: scaleSize(350), marginTop: scaleSize(60)
  },
  bgImg: {
    opacity: 0.8, height: scaleSize(350), width: scaleSize(350),
  },
  tips: {
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    margin: scaleSize(50)
  }
});


export default UserFaceReg;
