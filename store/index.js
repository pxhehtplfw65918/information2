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
		//用户信息
		userInfo:{},
		SLNumber: 3, // 扫雷次数
		SJBNumber: 3, // 扫雷次数
		// noviceGuide:  uni.getStorageSync('guideCache_state'),// 新手引导
		noviceGuide: uni.getStorageSync('guideCache_state').toString() === '' ? true : uni.getStorageSync(
			'guideCache_state'), // 新手引导
		noviceGuideIndex: 0,

	},
	mutations: {

		updateSJBNumber(state, message) {
			state.SJBNumber = message;
		},
		updateNoviceGuide(state, message) {
			state.noviceGuide = message;
		},
		updateNoviceGuideIndex(state, message) {
			state.noviceGuideIndex = message;
		},
		getUserInfo(state, callback) {
			callback && callback($.isEmptyObject(state.userInfo) ? null : state.userInfo);
		},
		getPlantformInfo(state, callback) {
			//读取APP平台信息
			var that = this;
		}
	},
	getters: {

	},

	actions: {},
});

export default store;