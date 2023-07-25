# API使用方法/示例

```javascript
// 公用
let news = bu + '/zc-news';
let zcselfstock = bu + '/zc-selfstock'

let pathUrl = zcselfstock + '/v1/selfStock/ocrByTx' // 自选股票
shop: news + '/v1/cls/shop',// 支付
PZBUserBinding: zcpush + '/v1/push/query', //查询用户绑定情况
PZBoperate: zcpush + '/v1/push/operate', // 开/关推送

```
## 避雷宝API

```javascript
 getUserEnableCount: news + '/v1/slb/getUserEnableCount?' // 未购买用户询剩余次数

 // 非业务相关
 marketScanner: news + '/v1/slb/marketScanner', // 市场扫描
 slbBand: news + '/v1/slb/slbBand', // 红黑榜

 // 业务相关
slbSortStockData: zcselfstock + '/v1/selfGroup/sort', //筛选自选股数据
createGroup: zcselfstock + '/v1/selfGroup/create', // 创建组
slbStock: zcselfstock + '/v1/selfGroup/queryAllStocks', //自选股票查询 
slbFindOtherData: news + '/v1/slb/selfStockScannerDetail', // 根据自选股票查找分数等数据 
createStock: zcselfstock + '/v1/selfGroup/create', // 添加股票
deleteStock: zcselfstock + '/v1/selfGroup/delete', // 删除自选股
getStockInfo: news + '/v1/slb/getStockInfo', // 股票搜索
stockScannerDetail: news + '/v1/slb/stockScannerDetail', // 详情
getStockRiskTypeCount: news + '/v1/slb/getStockRiskTypeCount', // 详情
selfShock: pathUrl, //自选
slbDescribe: news + '/v1/slb/slbRiskDesc', //扫雷宝说明
```
## 事件宝API

```javascript

 // 非业务相关
 '/v1/sjb/industryChange/list?', // 盘口异动 
'/v1/sjb/futureEvents/list?', // 未来大事
'/v1/sjjj/getList' // 事件掘金

// 业务相关
futureBigEvent: news + '/v1/sjb/futureEvents/detail', // 未来大事详情
eventList: news + '/v1/sjjj/getRelateStocks',// 未来大事/事件掘金 股票详情列表
panMouthList: news + '/v1/sjb/industryChange/detail', // 盘口异动次数（查盘口异动详情） 
panMouthDetail: news + '/v1/sjb/industryChange/detailDesc', // 盘口异动字段描述（盘口异动次数详情）
selfStockList: news + '/v1/sjb/industryChange/stockDetail', // 个股异动详

```

 ## 财经日历API

 ```javascript
 
 // 非业务相关
 '/v1/news/calendar/list?',  // 财经新闻列表

 '/v1/news/calendar/event/list?', // 事件新闻列表

 '/v1/news/calendar/holiday/list?', // 假期新闻列表
 // 业务相关
' https://shop.zcskjy.com/mobile/sns/userMessage/getMyMsgNum' // 回执

```

 ## 7*24/热门资讯 API

 ```javascript
  // 非业务相关
newslist: news + '/v1/news/list?',//  快讯新闻列表  
GET https://shop.zcskjy.com/zc-news/v1/news/list?bussinessType=1&tabType=0&pageNum=1&pageSize=15

 // 业务相关
' https://shop.zcskjy.com/mobile/sns/userMessage/getMyMsgNum' // 回执
```
 ## 热门视频 API

 ```javascript
  // 非业务相关
 news + '/v1/video/list' // 视屏资讯列表
 // 业务相关
 '/v1/video/detail?id=60384' // 视屏详情
' https://shop.zcskjy.com/mobile/sns/userMessage/getMyMsgNum' // 回执
```


 ## 二级标题模版
 ```javascript
 // 非业务相关
```