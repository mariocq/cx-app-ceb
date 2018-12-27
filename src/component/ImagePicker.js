import React from 'react';
import { View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, ActivityIndicator, Modal, Toast } from '@ant-design/react-native';

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
    ImagePicker.showImagePicker(options, (response) => {
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
          'location': {
            "accuracy": 0,
            "heading": 0,
            "speed": 0,
            "longitude": -18.5333,
            "latitude": 65.9667
          }
        }

        // 请求API
        const res = this.props.reqMatch(request);

        res.then(({ data }) => {
          console.log(data);
          // 识别结果
          this.setState({ animating: !this.state.animating });
          if (data.error_code === 0) {
            Modal.alert('识别成功', 'log_id：' + data.log_id);
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
    return (
      <View style={{ margin: 20 }}>
        <Button type="primary" onPress={this.onPick.bind(this)}>检测</Button>
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
