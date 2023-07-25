/**
 * 随商
 */
// let bu = "https://demo.mallsuite.cn";
// // let auth = "https://zc-auth.zcskjy.com"
// let shareu = "https://p.shopsuite.cn/zhongcaiedu"

/**
 * 测试
 */
// let bu = 'https://shop-qa.zcskjy.com';

/**
 * 生产
 */
let bu = 'https://xiaoetong-test.integrity.com.cn';

let auth = bu + '/zc-auth';
let shareu = bu;
// let news = bu + '/zc-news';
let news = bu + '/news';
let zcpush = bu + '/zc-push';
let zcconfig = bu + '/zc-config';
let zcselfstock = bu + '/zc-selfstock'
// 自选股票
let pathUrl = zcselfstock + '/v1/selfStock/ocrByTx'
//发现模块、小鹅登录
// let bu = "https://zc-auth.zcskjy.com";
// bu = "http://localhost:8201";
let iu = bu + '/index.php';
let au = bu + '/account.php';
let mu = bu + '/admin.php';

let su = bu + '/shop/static/src/default';
let cdn = 'https://static.shopsuite.cn';

let ip = bu + '/mobile/';
let wx = bu + '/zc-wx/';
// let ip = '/mobile/'
// let ip = 'https://demo.mallsuite.cn/mobile/'

export default {
	basePath: au,
	
	tabBar: {
		color: '#7A7E83',
		borderStyle: 'black',
		backgroundColor: '#ffffff',

		selectedColor: '#DB384C',
		list: [{
				pagePath: 'pages/index/index',
				iconPath: 'static/images/tabBar1.png',
				selectedIconPath: 'static/images/tabBar_sel1.png',
				text: '首页',
			},
			{
				pagePath: 'pages/index/image',
				iconPath: 'static/images/tabBar2.png',
				selectedIconPath: 'static/images/tabBar_sel2.png',
				text: '发现',
			},
			{
				pagePath: 'pages/course/study',
				iconPath: 'static/images/tabBar3.png',
				selectedIconPath: 'static/images/tabBar_sel3.png',
				text: '学习',
			},
			{
				pagePath: 'pages/index/member',
				iconPath: 'static/images/tabBar4.png',
				selectedIconPath: 'static/images/tabBar_sel4.png',
				text: '个人',
			},
		],
	},
};
