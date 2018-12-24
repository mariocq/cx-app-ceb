import * as usersService from '../services/users';

export default {
  namespace: 'global',
  state: {
    login: false,
    access_token: "",
    username: "",
  },
  reducers: {
    signok(state, { payload: { access_token, username } }) {
      return {
        ...state,
        login: true,
        access_token,
        username,
      };
    },
    signout(state, { }) {
      return {
        ...state,
        login: false,
        access_token: "",
        username: "",
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
    },
    *logout({ payload }, { put, call }) {
      const { data } = yield call(usersService.logout, payload);
      if (data) {
        // 设置reducer
        if (data.msg === "ok") {
          // 退出成功
          yield put({
            type: 'signout',
          });
        }
      }
    },
  }
}
