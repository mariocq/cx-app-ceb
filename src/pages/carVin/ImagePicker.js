import React from 'react';
import { View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, WhiteSpace } from '@ant-design/react-native';

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
    };
  }
  onPick() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
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

            console.log('responseData', responseData);
          })
          .catch((error) => { console.error('error', error) });
      }
    });
  }
  render() {
    return (
      <View style={{ margin: 20 }}>
        <Button type="primary" onPress={this.onPick.bind(this)}>检测</Button>
      </View>
    );
  }
}
