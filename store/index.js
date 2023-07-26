import Vue from 'vue';
import Vuex from 'vuex';

import $ from '../helpers/util';
import Socket from '../helpers/useSocket.js';
import apiconfig from '../helpers/apiconfig.js';

// #ifdef H5
import $cookies from '../helpers/vue-cookies';
// #endif

import Config from '../config/config';
import StateCode from '../config/statecode';
import Lang from '../config/lang';

import notice from '../helpers/notice';

const MSG_INDEX = null;
const CART_INDEX = 3;
const FORCED_LOGIN_STATE = false; //true：不提示登录tips，直接跳转

Vue.use(Vuex);


uni.getSystemInfo({
	success: (res) => {
		Config.systemInfo = res;
	},
});

const store = new Vuex.Store({
	state: {

		plantformInfo: null, //平台信息


		Config: Config, //配置信息
		StateCode: StateCode, //状态码

		$: $,
		sprintf: $.sprintf,

		$Socket: Socket,
		$apiconfig: apiconfig,
	},
	mutations: {

		getPlantformInfo(state, callback) {
			//读取APP平台信息
			var that = this;
		},



	},
	getters: {
	
	},

	actions: {},
});

export default store;
