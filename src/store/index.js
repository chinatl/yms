import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { get } from "@/utils/fetch";
import getters from "./getters";
import user from "./modules/user";
import { SET_USER_INFO, SET_USER_APPLY_INFO, SET_EDU_DICT, SET_DICT } from "./mutations";
const store = new Vuex.Store({
  modules: {
    user
  },
  state: {
    token: "",
    user_info: {},
    applyInfo: {},
    dict: [],
    dict_edu: [],
  },
  getters,
  actions: {
    /**
     *  获取学历字典数据
     */
    getEdu({ state, commit }) {
      get("dict").then(res => {
        commit(SET_DICT,res.data)
        commit(SET_EDU_DICT, res.data.education);
        sessionStorage.setItem(
          SET_DICT,
          JSON.stringify(res.data)
        );
        sessionStorage.setItem(
          SET_EDU_DICT,
          JSON.stringify(res.data.education)
        );
      });
    }
  },
  mutations: {
    [SET_USER_INFO](state, data) {
      state.token = data.token;
      state.user_info = data.yfUser;
      sessionStorage.setItem(SET_USER_INFO, JSON.stringify(data));
    },
    [SET_EDU_DICT](state, data) {
      state.dict_edu = data;
    },
    [SET_DICT] (state, data) {
      state.dict = data;
    },
    /**
     *
     * @param {*} state
     * @param {*} data  修改用户数据
     * @param {*} status   判断是否修改  0 是不修改,1是修改
     */

    [SET_USER_APPLY_INFO](state, data, status) {
      state.applyInfo = data;
      //   state.applyStatus = status;
    }
  },
  strict: process.env.NODE_ENV === "development" ? true : false
});
export default store;
