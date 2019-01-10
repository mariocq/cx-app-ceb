import * as usersService from '../services/usersService';
import { storage } from '../utils/storage';

export default {
  namespace: 'global',
  state: {
    login: false,
    access_token: "",
    account: "",
    username: "",
    mobile: "",
    groups: [],
    device: null,
    face_check: false,
  },
  reducers: {
    signok(state, { payload: { access_token, username, account, mobile, groups } }) {
      return {
        ...state,
        login: true,
        access_token,
        account,
        username,
        mobile,
        groups,
      };
    },
    registerok(state, { payload: { access_token, account } }) {
      return {
        ...state,
        access_token,
        account,
      };
    },
    signout(state, { }) {
      return {
        ...state,
        login: false,
        access_token: "",
        account: "",
        username: "",
        mobile: "",
        groups: [],
      };
    },
    device(state, { payload }) {
      return {
        ...state,
        device: payload,
      };
    },
    faceCheck(state, { payload }) {
      return {
        ...state,
        face_check: payload,
      };
    },
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      let { data } = yield call(usersService.login, payload);
      if (data) {
        // 设置reducer
        if (data.error_code === 0) {
          // 登录成功
          yield put({
            type: 'signok',
            payload: data,
          });
        }
        callback(data);
      }
      // 本地存储access_token
      storage.save('accessToken', data.access_token)
    },
    *register({ payload, callback }, { call, put }) {
      let { data } = yield call(usersService.register, payload);
      if (data) {
        // 设置reducer
        if (data.error_code === 0) {
          // 登录成功
          yield put({
            type: 'registerok',
            payload: data,
          });
        }
        callback(data);
      }
    },
    *logout({ payload, callback }, { put, call }) {
      const { data } = yield call(usersService.logout, payload);
      if (data) {
        // 设置reducer
        if (data.error_code === 0) {
          // 退出成功
          yield put({
            type: 'signout',
          });
          // 本地存储access_token
          storage.save('accessToken', '')
        }
        callback(data);
      }
    },
    *resetPassword({ payload, callback }, { call }) {
      const { data } = yield call(usersService.resetPassword, payload);
      if (data) {
        callback(data);
      }
    },
    *deviceInit({ payload }, { put, call }) {
      yield put({
        type: 'device',
        payload: payload,
      });
    },
    *faceCheckSet({ payload }, { put }) {
      yield put({
        type: 'faceCheck',
        payload: payload,
      });
    },
  }
}
