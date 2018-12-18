import React from 'react';
import { View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, Modal, Toast, ActivityIndicator } from '@ant-design/react-native';

const options = {
  title: '选择图片',
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
      console.log('Response = ', response);
      this.setState({ animating: !this.state.animating });

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        fetch('http://172.16.20.20:5000/api/face-detect', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            'image': response.data
          }),
        })
          .then((response) => response.text())
          .then((responseData) => {
            const data = JSON.parse(responseData);
            console.log('responseData', data);
            this.setState({ animating: !this.state.animating });
            if (data.error_code === 0) {
              console.log(data.log_id);
              alert('识别成功！log_id：' + data.log_id);
              // Toast.success('识别成功！log_id：', 3);

              // Modal.alert(
              //   '提示',
              //   '识别成功！log_id：' + data.log_id,
              //   [
              //     { text: '确定', onPress: () => console.log('确定') },
              //   ]
              // )
            }
            else {
              alert('识别失败：' + data.error_msg);
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
