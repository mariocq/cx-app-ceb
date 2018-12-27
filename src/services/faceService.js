import request from '../utils/request'
import IP from "./ip";

export function faceMatch(values) {
  return request(IP.domain + '/api/face/match', {
    method: 'POST',
    headers: {
      Authorization: values.access_token
    },
    body: JSON.stringify(values),
  });
}
