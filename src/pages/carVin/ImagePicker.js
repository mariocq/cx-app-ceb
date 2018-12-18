import React from 'react';
import { View } from 'react-native';
import { ImagePicker, WhiteSpace } from '@ant-design/react-native';
import { PermissionsAndroid } from 'react-native';

export default class ImagePickerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2121',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2122',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2123',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2124',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2125',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2126',
        },
      ],
      files2: [],
    };
  }
  async componentWillMount() {
    await requestReadExteralStorage();
  }

  handleFileChange = (files) => {
    this.setState({
      files,
    });
  }

  handleFile2Change = (files2) => {
    this.setState({
      files2,
    });
  }

  render() {
    return (
      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <ImagePicker
          onChange={this.handleFileChange}
          files={this.state.files}
        />
        <WhiteSpace />
        <ImagePicker
          onChange={this.handleFile2Change}
          files={this.state.files2}
        />
      </View>
    );
  }
}

async function requestReadExteralStorage() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: '申请相册权限',
        message: '可选择相册图片'
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('现在你获得摄像头权限了');
    } else {
      console.log('用户并不屌你');
    }
  } catch (err) {
    console.warn(err);
  }
}
