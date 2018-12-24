import request from '../utils/request'

export function fetchImage(values) {
  return request('http://120.79.44.187:5100/api/face-detect', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values),
  });
}
