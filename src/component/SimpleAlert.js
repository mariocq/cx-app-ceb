/**
 * 系统自带弹框，一般不用
 * 通常采用 antd modal
 */
import { Alert } from 'react-native';
export default (title, msg) => {
  Alert.alert(
    title,
    msg,
    [
      { text: '确定' },
    ],
    { cancelable: false }
  )
}
