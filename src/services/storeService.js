import request from '../utils/request';
import IP from "./ip";

export function list(values) {
  return request(IP.domain + '/api/stores', {
    method: 'GET',
    headers: {
      Authorization: values.access_token
    },
  });
}
export function info(values) {
  return request(IP.domain + '/api/stores/' + values.id, {
    method: 'GET',
    headers: {
      Authorization: values.access_token
    },
  });
}
