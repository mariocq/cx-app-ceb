import * as usersService from '../services/users';
import { storage } from '../utils/storage';

export default {
  namespace: 'supervision',
  state: {
    step: 0,
    name: "",
    year: "",
    color: "",
    vin: "",
    isSetpOneSuccessfully: false,
    isSetpTwoSuccessfully: false,
  },
  reducers: {
    carType(state, { payload: { name, year, color } }) {
      return {
        ...state,
        name, year, color,
      };
    },
    carVin(state, { payload: { vin } }) {
      return {
        ...state,
        vin,
      };
    },
    setpOne(state, { payload }) {
      return {
        ...state,
        isSetpOneSuccessfully: payload,
      };
    },
    setpTwo(state, { payload }) {
      return {
        ...state,
        isSetpOneSuccessfully: payload,
      };
    },
  },
  effects: {
    *carTypeSet({ payload }, { put }) {
      yield put({
        type: 'carType',
        payload: payload,
      });
    },
    *carVinSet({ payload }, { put }) {
      yield put({
        type: 'carVin',
        payload: payload,
      });
    },
  }
}
