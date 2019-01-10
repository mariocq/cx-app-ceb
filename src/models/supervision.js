import * as supervisionService from '../services/supervisionService';
import { storage } from '../utils/storage';

export default {
  namespace: 'supervision',
  state: {
    step: 0,
    name: "",
    year: "",
    color: "",
    vin: "",
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
    *report({ payload, callback }, { call, put }) {
      let { data } = yield call(supervisionService.resultReport, payload);
      if (data) {
        callback(data);
      }
    },
  }
}
