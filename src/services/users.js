import request from '../utils/request';
import IP from "./ip";

export function login(values) {
  return request(IP.domain + '/api/user/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
export function resetPassword(values) {
  return request(IP.domain + '/api/user/setpassword', {
    method: 'POST',
    headers: {
      Authorization: values.access_token
    },
    body: JSON.stringify(values),
  });
}
export function logout(values) {
  return request(IP.domain + '/api/user/logout', {
    method: 'POST',
    headers: {
      Authorization: values.access_token
    },
    body: JSON.stringify(values),
  });
}
