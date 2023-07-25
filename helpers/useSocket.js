import Vue from 'vue';
import socket from '../helpers/socket.js'; //引入socket.js 重要
import store from '../store';
import apirequest from '../helpers/apiconfig.js';

let IM_AUTOTIP_ENABLE = 0;

if (!global.$Socket) {
  global.$Socket = new socket({
    url: 'wss://im.suteshop.com:9501?uid=84381719&puid=1017-10002&suid=1017&token=165d448c3237446aac35f696e3afdef3', //连接地址 必填
    maxInterValCount: 5,
    interValTime: 2000,
    onOpen(res) {
      console.log('连接成功');

      /*
		let msg = {
			type: 'self',
			selfName: '老司机',
			text: '连接成功了',
			time: new Date().toLocaleTimeString()
		};
		this.nsend(JSON.stringify(msg));
		 */
    },
    onClose(err) {
      console.log('关闭了连接');
    },
    onReload(res) {
      console.log('重载：' + res);
    },
    onRdFinsh(count) {
      console.log(count + '次重连已完成');
    },
    onMsg(res) {
      console.info('onMessage', res);

      let usign = store.state.userInfo.im.puid;

      let that = this;
      let temdata = JSON.parse(res.data);
      //let temdata = eval("(" + res.data + ")");

      temdata = apirequest.im_decode_msg(temdata);
      // temdata = {
      //   ...temdata,
      //   isRead: true,
      // };
      console.info('onMessage-temdata-1', temdata);
      switch (temdata.type) {
        case 'init':
          apirequest
            .registClientid_f({
              data: {
                cid: temdata.client_id,
                usign: usign,
              },
            })
            .then((res) => {
              if (res.data.code != 1) {
                uni.showToast({
                  icon: 'none',
                  title: res.data.msg,
                });
              }
            });

          break;
        case 'friend':
          let msg = temdata;
          let tempv_fid = 0;
          store.commit('setCurrentMsg', msg);

          console.info('---------------------');
          console.info(msg);

          if (msg.id != store.state.currentChatPuid) {
            if ('rtc' == msg.msg_type) {
              // #ifdef MP-WEIXIN || APP-PLUS
              uni.showModal({
                title: msg.username,
                content: '是否接入音视频聊天？',
                success: function (res) {
                  if (res.confirm) {
                    let url = '';

                    // #ifdef MP-WEIXIN
                    url = '/rtc/room/1v1wx?to_user_id=' + msg.user_id;
                    uni.navigateTo({
                      url: url,
                    });
                    // #endif
                    // #ifdef APP-PLUS
                    url = '/rtc/room/1v1?to_user_id=' + msg.user_id;
                    uni.navigateTo({
                      url: url,
                    });
                    // #endif
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                },
              });
              // #endif
            } else {
              if (IM_AUTOTIP_ENABLE) {
                uni.showModal({
                  title: msg.username,
                  content: '发来消息， 是否接入聊天？',
                  success: function (res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '/im/chat/chat?uid=' + msg.user_id + '&name=' + msg.username + '&type=' + 0 + '&puid=' + msg.id,
                      });
                    } else if (res.cancel) {
                      console.log('用户点击取消');
                    }
                  },
                });
              }
            }
          }

          tempv_fid = msg.id;

          store.commit('updateChaterAttr', {
            type: 'user',
            val: msg.id,
            attr: 'lastmsg',
            data: msg.content,
            time: 'msg.msg.time',
            addinfo: { weidu: 0, lastmsg: msg.content, id: msg.id, avatar: msg.avatar, user_id: msg.user_id, username: msg.username, logtype: msg.type },
          });

          let tempmy_id = { id: usign };
          apirequest.cacheMessage(msg, 'user', msg.id, tempmy_id);

          break;
        case 'group':
          let gmsg = temdata;
          let tempv = 0;
          store.commit('setCurrentMsg', gmsg);
          if (gmsg.sendmethod == 'group') {
            tempv = gmsg.toid;
          } else {
            tempv = gmsg.fromid;
          }
          store.commit('updateChaterAttr', {
            type: gmsg.sendmethod,
            val: tempv,
            attr: 'lastmsg',
            data: gmsg.content,
            time: 'gmsg.msg.time',
            addinfo: { weidu: 0, lastmsg: gmsg.content, id: gmsg.id, avatar: gmsg.avatar, user_id: gmsg.user_id, username: gmsg.username, logtype: gmsg.type },
          });

          let tempmy = { id: usign };
          apirequest.cacheMessage(gmsg, gmsg.sendmethod, tempv, tempmy);

          break;
        case 'setfriendstue':
          ///设置好友状态
          let msg2 = temdata;
          store.commit('setFriendstue', { val: msg2.toid, data: msg2.state, character: msg2.character });

          break;
        case 'msgboxuser':
          ///获取到信息盒子
          store.commit('setmsgboxuser', temdata);
          break;
        case 'msgboxgroup':
          ///获取到信息盒子
          store.commit('setmsgboxgroup', temdata);
          break;
        case 'addgroup':
          //自己成功创建群
          store.commit('updateGrouplist', temdata);
          break;
        case 'addfriend':
          ///成功添加好友
          store.commit('updateFriendlist', temdata);
          break;
      }

      /*
		//设为已读
		apirequest.setMsgRead(temdata.message_id, ()=>{

		})

        var msg_row = JSON.parse(event.data);

        if (msg_row.message_id)
        {
            var url = sprintf("%s/account.php?mdu=sns&ctl=%s&met=%s&typ=json", SYS.CONFIG.base_url, 'User_Message', 'setRead');

            $.request({
                type: 'post',
                url: url,
                data: {message_id:msg_row.message_id},
                dataType: 'json',
                success: function (result) {
                }
            });

        }
         */
    },
  });
}

export default global.$Socket;
