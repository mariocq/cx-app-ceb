import React from 'react';
import { View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, ActivityIndicator, Modal, Toast } from '@ant-design/react-native';

const options = {
  title: '',
  takePhotoButtonTitle: '拍照',
  quality: 0.5,
  maxWidth: 1000,
  maxHeight: 1000,
  cancelButtonTitle: '取消',
  chooseFromLibraryButtonTitle: '选择图片',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


// Launch Camera:
// ImagePicker.launchCamera(options, (response) => {
//   // Same code as in above section!
// });

// Open Image Library:
// ImagePicker.launchImageLibrary(options, (response) => {
//   // Same code as in above section!
// });

export default class ImagePickerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
  }
  onPick() {
    const { onlyReal = false } = this.props;
    const func = onlyReal ? 'launchCamera' : 'showImagePicker';

    ImagePicker[func](options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({ animating: !this.state.animating });
        // 请求参数
        const request = {
          'image': response.data,
          'access_token': this.props.access_token,
          'account': this.props.account,
          'location': this.props.location,
          'device': this.props.device,
        }

        console.log("req", request);

        // 请求API
        const res = this.props.reqMatch(request);

        res.then(({ data }) => {
          console.log(data);
          // 识别结果
          this.setState({ animating: !this.state.animating });
          if (data.error_code === 0) {
            this.props.resultAlert(data, response.data);
          }
          else {
            Modal.alert('识别失败', '请稍后再试，' + data.error_msg);
          }
        })
          .catch((error) => { console.error('error', error) });
      }
    });
  }
  render() {
    const { buttonText } = this.props;
    return (
      <View style={{ margin: 20 }}>
        <Button type="primary" onPress={this.onPick.bind(this)}>{buttonText ? buttonText : "检测"}</Button>
        <ActivityIndicator
          animating={this.state.animating}
          toast
          size="large"
          text="识别中..."
        />
      </View>
    );
  }
}
