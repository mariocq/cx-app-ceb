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
export function faceRegister(values) {
  return request(IP.domain + '/api/faceset/user/add', {
    method: 'POST',
    headers: {
      Authorization: values.access_token
    },
    body: JSON.stringify(values),
  });
}
export function typeMatch(values) {
  return request(IP.domain + '/api/car/detect', {
    method: 'POST',
    headers: {
      Authorization: values.access_token
    },
    body: JSON.stringify(values),
  });
}
export function vinMatch(values) {
  return request(IP.domain + '/api/car/vin', {
    method: 'POST',
    headers: {
      Authorization: values.access_token
    },
    body: JSON.stringify(values),
  });
}
