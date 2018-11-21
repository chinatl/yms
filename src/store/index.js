import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import getters from './getters'
import user from './modules/user'
import { SET_USER_INFO } from './mutations'
const store = new Vuex.Store({
    modules: {
        user
    },
    state: {
        token: '',
        user_info: {

        }
    },
    getters,
    mutations: {
        [SET_USER_INFO](state, data) {
            state.token = data.token;
            state.user_info = data.yfUser;
            sessionStorage.setItem(SET_USER_INFO, JSON.stringify(data));
        },

    },
    strict: process.env.NODE_ENV === 'development' ? true : false,

})
export default store
