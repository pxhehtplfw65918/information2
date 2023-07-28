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
let ip = bu + '/mobile/';
let wx = bu + '/zc-wx/';

export default {
	stockList: news + '/v1/news/stockList', //  资讯列表 POST
	stockDetail: news + '/v1/news/stockDetail', // 资讯详情 Get page=0是第一页


	// that.Config.URL.newsUrl.newslist,
	URL: {
		newsUrl: {
			newslist: news + '/v1/news/list?',
			noticeTypeList: news + '/v1/news/noticeTypeList',
			noticeList: news + '/v1/news/noticeList'

		},
		config: {

		},

	},
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
