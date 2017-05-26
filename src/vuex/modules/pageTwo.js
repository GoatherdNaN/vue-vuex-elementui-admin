import * as Type from '../../constants/type.js';
import * as API from '../../api/index.js';
import {createAction} from 'createAction';
import {deepCopy} from '../../utils/common'

const state = {
  lineChartsDate:null,
};
const getters = {};

const actions = {
  getStatisticsData:createAction(Type.GET_STATISTICS_DATA,API.getStatisticsData),
};

const mutations = {
  [Type.GET_STATISTICS_DATA](state, action) {
    state.lineChartsDate = action.payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
