import request from '../utils/request'

export function fetchImage(values) {
  return request('http://172.16.20.20:5000/api/face-detect', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values),
  });
}
