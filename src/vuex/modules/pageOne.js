import * as Type from '../../constants/type.js';
import * as API from '../../api/index.js';
import {createAction} from 'createAction';
import {deepCopy} from '../../utils/common'

const state = {
  instockList:[],
  total:0
};
const getters = {};

const actions = {
  getInstockData:createAction(Type.GET_INSTOCK_DATA,API.getInstockList),
  setInstockList:createAction(Type.SET_INSTOCK_LIST),
  editInstockItem:createAction(Type.INSTOCK_EDIT),
  newInstockItem:createAction(Type.NEW_INSTOCK_ITEM),
  delete:createAction(Type.INSTOCK_DELETE),
};

const mutations = {
  [Type.GET_INSTOCK_DATA](state, action) {
    state.instockList = action.payload.data;
    state.total = action.payload.total;
  },
  [Type.SET_INSTOCK_LIST](state, action) {
    state.instockList = action.payload;
  },
  [Type.INSTOCK_EDIT](state, action) {
    let {listNumber} = action.payload;
    let index = state.instockList.findIndex((item)=>item.listNumber===listNumber);
    state.instockList[index] = Object.assign(state.instockList[index],action.payload);
  },
  [Type.NEW_INSTOCK_ITEM](state, action) {
    state.instockList.unshift(action.payload);
    state.instockList.pop();
    state.total+=1;
  },
  [Type.INSTOCK_DELETE](state, action) {
    state.instockList.splice(action.payload.index,1);
    state.instockList.push(action.payload.insertItem);
    state.total-=1;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
