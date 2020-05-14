import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
        hasToken:false
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
            state.hasToken = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
            state.hasToken = false;
		}
	}
})

export default store
