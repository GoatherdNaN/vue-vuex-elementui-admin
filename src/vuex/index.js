import Vue from 'vue';
import Vuex from 'vuex';
import {createAction} from 'createAction';
import pageOne from './modules/pageOne';
import pageTwo from './modules/pageTwo';
import {LOGIN_FLOW,LOGIN_OUT,LOADING} from '../constants/type'

Vue.use(Vuex);
const actions = {
   loginFlow:createAction(LOGIN_FLOW),
   loginOut:createAction(LOGIN_OUT),
   loading:createAction(LOADING),
};
const mutations = {
   [LOGIN_FLOW](state, action) {
     if(action.payload.checked){
       localStorage.setItem('v_username',action.payload.username);
       localStorage.setItem('v_password',action.payload.password);
     }else{
       if(localStorage.v_username){
         localStorage.removeItem('v_username');
         localStorage.removeItem('v_password');
       }
     }
     state.username = action.payload.username;
     state.checked = action.payload.checked;
   },
   [LOGIN_OUT](state, action) {
     if(!state.checked){
       localStorage.removeItem('v_username');
       localStorage.removeItem('v_password');
     }
     state.username = '';
   },
   [LOADING](state, action) {
     state.isLoading = action;
   },
};
export default new Vuex.Store({
 state: {
   isLoading:true,
   checked:true,
   username:''
 },
 mutations,
 actions,
 modules: {
   pageOne,
   pageTwo,
 },
});
