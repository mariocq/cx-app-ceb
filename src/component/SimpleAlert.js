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
