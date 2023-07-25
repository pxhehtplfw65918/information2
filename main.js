import Vue from 'vue';

import uView from '@/uni_modules/uview-ui';
Vue.use(uView);

//import MetaInfo from 'vue-meta-info';
//Vue.use(MetaInfo)

import App from './App';
import './styles/zerocons.css';
import store from './store';

import Lang from './config/lang';
Vue.prototype.Lang = Lang;
import '.env.js'
import Config from './config/config';
import Statecode from './config/statecode';
import $ from './helpers/util';
import Socket from './helpers/useSocket.js';
import apiconfig from './helpers/apiconfig.js';
import FT from './helpers/tools.fn.js';
// import wxCommon from './helpers/wxCommon.js';

import statusBar from './components/status-bar.vue';
import uniIcons from './components/uni-icons/uni-icons.vue';
import loading from '@/components/loading.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// #ifdef H5
import $cookies from './helpers/vue-cookies';
// const vconsole = require('vconsole')
// Vue.prototype.$vconsole = new vconsole() // 使用vconsole
// #endif

import './helpers/ican-H5Api';

Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$ = $;
Vue.prototype.cf = Config;
Vue.prototype.__ = Lang.__;
Vue.prototype.sprintf = $.sprintf;
Vue.prototype.number_format = $.number_format;
Vue.prototype.mf = $.mf;
Vue.prototype.statecode = Statecode;
//Vue.prototype.$mysocket = mysocket;
Vue.prototype.$Socket = Socket;
Vue.prototype.$apiconfig = apiconfig;
Vue.prototype.$FT = FT;
// Vue.prototype.$wxCommon = wxCommon;
Vue.config.ignoredElements.push('wx-open-launch-weapp');

if (uni.getSystemInfoSync().platform !== 'devtools') {
    // console.log = () => {};
    // console.info = () => {};
}
Vue.prototype.resetLang = function () {
  if (Config.tabBar.list instanceof Array || true) {
    // for (var r = 0; r < Config.tabBar.list.length; r++) {
    //     uni.setTabBarItem({
    //         index: r,
    //         text: Lang.__(Config.tabBar.list[r].text)
    //     })
    // }

    uni.setTabBarItem({
      index: 0,
      text: '首页',
      pagePath: '/pages/index/index',
    });
    uni.setTabBarItem({
      index: 1,
      text: '发现',
      pagePath: '/pages/findPage/index',
    });
    uni.setTabBarItem({
      index: 2,
      text: '学习',
      pagePath: '/pages/course/study',
    });
    uni.setTabBarItem({
      index: 3,
      text: '工具',
      pagePath: '/pages/tools/index',
    });
    uni.setTabBarItem({
      index: 4,
      text: '我的',
      pagePath: '/pages/my/my',
    });
  }
};

var _x60680 = [
  '\x73\x65\x74\x44\x61\x74\x61',
  '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
  '\x6f\x70\x74\x69\x6f\x6e\x73',
  '\x75\x69\x64',
  '\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63',
  '\x73\x6f\x75\x72\x63\x65\x5f\x75\x73\x65\x72\x5f\x69\x64',
  '\x75\x69\x64',
  '\x73\x6f\x75\x72\x63\x65\x5f\x74\x79\x70\x65',
  '\x73\x6f\x75\x72\x63\x65\x5f\x64\x61\x74\x61',
  '\x53\x4f\x55\x52\x43\x45\x5f\x54\x59\x50\x45\x5f\x48\x35',
  '\x73\x74\x61\x74\x65\x63\x6f\x64\x65',
  '\x73\x65\x74',
  '\x66\x78\x69\x64',
  '\x75\x69\x64',
  '\x75\x69\x64',
  '\x70\x69\x64',
  '\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63',
  '\x73\x6f\x75\x72\x63\x65\x5f\x69\x74\x65\x6d\x5f\x69\x64',
  '\x70\x61\x72\x73\x65',
  '\x70\x61\x72\x73\x65',
  '\x70\x69\x64',
  '\x75\x69\x64',
  '\x61\x73\x73\x69\x67\x6e',
  '\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63',
  '\x73\x6f\x75\x72\x63\x65\x5f\x69\x74\x65\x6d\x5f\x69\x64',
  '\x73\x74\x72\x69\x6e\x67\x69\x66\x79',
  '\x73\x6f\x75\x72\x63\x65\x5f\x74\x79\x70\x65',
  '\x73\x6f\x75\x72\x63\x65\x5f\x64\x61\x74\x61',
  '\x53\x4f\x55\x52\x43\x45\x5f\x54\x59\x50\x45\x5f\x48\x35',
  '\x73\x74\x61\x74\x65\x63\x6f\x64\x65',
  '\x73\x69\x64',
  '\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63',
  '\x73\x6f\x75\x72\x63\x65\x5f\x73\x74\x6f\x72\x65\x5f\x69\x64',
  '\x73\x69\x64',
  '\x73\x6f\x75\x72\x63\x65\x5f\x74\x79\x70\x65',
  '\x73\x6f\x75\x72\x63\x65\x5f\x64\x61\x74\x61',
  '\x53\x4f\x55\x52\x43\x45\x5f\x54\x59\x50\x45\x5f\x48\x35',
  '\x73\x74\x61\x74\x65\x63\x6f\x64\x65',
  '\x73\x65\x74',
  '\x73\x74\x69\x64',
  '\x73\x69\x64',
  '\x75\x69\x64',
  '\x75\x6b\x65\x79',
  '\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63',
  '\x75\x69\x64',
  '\x75\x69\x64',
  '\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63',
  '\x75\x6b\x65\x79',
  '\x75\x6b\x65\x79',
  '\x73\x65\x74',
  '\x75\x69\x64',
  '\x75\x69\x64',
  '\x73\x65\x74',
  '\x75\x6b\x65\x79',
  '\x75\x6b\x65\x79',
  '\x73\x6f\x75\x72\x63\x65\x5f\x75\x63\x63\x5f\x63\x6f\x64\x65',
  '\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63',
  '\x73\x6f\x75\x72\x63\x65\x5f\x75\x63\x63\x5f\x63\x6f\x64\x65',
  '\x73\x6f\x75\x72\x63\x65\x5f\x75\x63\x63\x5f\x63\x6f\x64\x65',
  '\x24\x73\x65\x74',
  '\x63\x6f\x6d\x70\x6f\x6e\x65\x6e\x74',
  '\x73\x74\x61\x74\x75\x73\x2d\x62\x61\x72',
  '\x63\x6f\x6d\x70\x6f\x6e\x65\x6e\x74',
  '\x75\x6e\x69\x2d\x69\x63\x6f\x6e\x73',
  '\x63\x6f\x6d\x70\x6f\x6e\x65\x6e\x74',
  '\x6c\x6f\x61\x64\x69\x6e\x67',
  '\x6d\x70\x54\x79\x70\x65',
  '\x61\x70\x70',
  '\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65',
  '\x6e\x61\x6d\x65',
  '\x6f\x73',
  '\x61\x6e\x64\x72\x6f\x69\x64',
  '\x74\x6f\x61\x73\x74',
  '\x6e\x61\x74\x69\x76\x65\x55\x49',
  '\u518d\u6309\u4e00\u6b21\u9000\u51fa\u5e94\u7528',
  '\x73\x68\x6f\x77\x54\x6f\x61\x73\x74',
  '\x5f\x5f',
  '\u518d\u6309\u4e00\u6b21\u9000\u51fa\u5e94\u7528',
  '\x6e\x6f\x6e\x65',
  '\x73\x68\x6f\x77\x54\x6f\x61\x73\x74',
  '\x6e\x6f\x6e\x65',
];
Vue[_x60680[1]][_x60680[0]] = function (params) {
  for (let x in params) {
    if (x == _x60680[2]) {
      if (params[x][_x60680[3]]) {
        uni[_x60680[4]](_x60680[5], params[x][_x60680[6]]);
        if ($[_x60680[8]][_x60680[7]] == this[_x60680[10]][_x60680[9]]) {
          $cookies[_x60680[11]](_x60680[12], params[x][_x60680[13]]);
        }
      }
      if (params[x][_x60680[14]] && params[x][_x60680[15]]) {
        let fx_item_row = {};
        let fx_item_str = uni[_x60680[16]](_x60680[17]);
        if (fx_item_str) {
          fx_item_row = JSON[_x60680[18]](fx_item_str);
        }
        let time = parseInt(Date[_x60680[19]](new Date()) / 100);
        let new_item = {};
        new_item[params[x][_x60680[20]]] = { u: params[x][_x60680[21]], t: time };
        Object[_x60680[22]](fx_item_row, new_item);
        uni[_x60680[23]](_x60680[24], JSON[_x60680[25]](fx_item_row));
        if ($[_x60680[27]][_x60680[26]] == this[_x60680[29]][_x60680[28]]) {
        }
      }
      if (params[x][_x60680[30]]) {
        uni[_x60680[31]](_x60680[32], params[x][_x60680[33]]);
        if ($[_x60680[35]][_x60680[34]] == this[_x60680[37]][_x60680[36]]) {
          $cookies[_x60680[38]](_x60680[39], params[x][_x60680[40]]);
        }
      }
      if (params[x][_x60680[41]] && params[x][_x60680[42]]) {
        var id = $[_x60680[43]](_x60680[44], params[x][_x60680[45]]);
        var key = $[_x60680[46]](_x60680[47], params[x][_x60680[48]]);
        $cookies[_x60680[49]](_x60680[50], params[x][_x60680[51]]);
        $cookies[_x60680[52]](_x60680[53], params[x][_x60680[54]]);
      }
      if (params[x][_x60680[55]]) {
        uni[_x60680[56]](_x60680[57], params[x][_x60680[58]]);
      }
    }
    this[_x60680[59]](this, x, params[x]);
  }
};
Vue[_x60680[60]](_x60680[61], statusBar);
Vue[_x60680[62]](_x60680[63], uniIcons);
Vue[_x60680[64]](_x60680[65], loading);
App[_x60680[66]] = _x60680[67];

// #ifdef APP-PLUS
if (plus[_x60680[70]][_x60680[69]][_x60680[68]]() === _x60680[71]) {
  plus[_x60680[73]][_x60680[72]] = function (str) {
    if (str == _x60680[74]) {
      uni[_x60680[75]]({ title: Lang[_x60680[76]](_x60680[77]), icon: _x60680[78] });
      return false;
    } else {
      uni[_x60680[79]]({ title: str, icon: _x60680[80] });
    }
  };
}
// #endif

const app = new Vue({
  store,
  ...App,
});

app.$mount();
