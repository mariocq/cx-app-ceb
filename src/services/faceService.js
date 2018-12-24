import request from '../utils/request'
import IP from "./ip";

export function fetchImage(values) {
  return request(IP.domain + '/api/face-detect', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
