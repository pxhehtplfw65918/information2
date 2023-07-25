/**
 * version 1.1.7
 */
import Config from '../config/config'
import $ from '../helpers/util'
import store from "../store";

class apiconfig {
    constructor(config = {})
    {
        this.baseurl = 'https://test.shopsuite.cn/index.php';
        this.merchcode = 'cb0ac353f02a73a7c45885a862fe4de1';
        this.pathconfig = {
            login: "apicom/user/login", ///第三方登录,
            regist: "apicom/user/regist", ///第三方注册,
            checklogout: "apicom/user/checklogout", ///第三方注册,
            registClientid: "/apicom/chat/registchater",///注册聊天通道,
            initInfo: "apicom/commapi/initinfo",///获取用户个人信息  [usign=34],
            sendMessage: 'apicom/commapi/sendmessageapp',///发送数据
            getMessagelog: 'apicom/chatlog/mochatlog',///获取历史记录,
            upload_image: this.baseurl + '/apicom/commapi/upload_image',///图片上传地址,
            upload_voice: this.baseurl + '/apicom/commapi/upload_voice',///图片上传地址,

            searchuser: '/apicom/commapi/searchapp',///图片上传地址,
            getUinfoByid: '/apicom/set/getuserinfoByid',///图片上传地址,
            sendInvite: '/apicom/commapi/savemsgapp',///图片上传地址,
            getMsgbox: '/apicom/commapi/msgbox',///获取消息盒子的信息,
            getlevemsg: '/apicom/commapi/levemsg',///获取与某个好友的留言信息,这样在第一次加载对话的时候就去检测一次
            handlefirend: '/apicom/set/changeHandle',///同意好友请求,
            createGroup: 'apicom/set/createGroup',
            updateuserinfo: 'apicom/set/update',
            getrecentmsg: 'apicom/chatlog/mochatlog',///最近20条记录


        };


        var alt = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"];

        let arr = {};

        alt.forEach(function(item, index){
            arr[item] = 'https://static.shopsuite.cn/xcxfile/appicon/im/face/'+ index + '.gif';
        });


        //表情库
        this.faces = arr;
    }

    ///把存聊天缓存放主文件里面 可全局调用  cacheid 缓存的对象的id  cachetype对象类型(user,group)
    cacheMessage(val, cachetype, cacheid, tempmy)
    {
        console.info('cacheMessage');
        ////聊天记录存入缓存
        let msg = val;

        uni.getStorage({
            key: 'chatim',
            fail(res)
            {

                if (res.data == '' || typeof (res.data) == 'undefined')
                {
                    ///如果没有缓存
                    let tempcache = new Object();
                    let chatlog = new Object();
                    let temparr = new Array();

                    temparr.push(msg);
                    if (cachetype == 'group')
                    {
                        chatlog['group'.concat(cacheid)] = temparr;

                    }
                    else
                    {
                        chatlog['friend'.concat(cacheid)] = temparr;

                    }

                    tempcache[tempmy.id] = {chatlog: chatlog};
                    uni.setStorage({
                        key: 'chatim',
                        data: tempcache
                    })
                }
            },
            success(res)
            {
                console.log(res.data)

                if (typeof (res.data[tempmy.id]) == 'undefined')
                {
                    ///处理同一台设备登录过多个账户
                    res.data[tempmy.id] = new Object();
                }

                ///如果有
                //1判断有没有对应该用户的聊天记录  有没有都添加

                if (typeof (res.data[tempmy.id]['chatlog']) == 'undefined')
                {
                    res.data[tempmy.id]['chatlog'] = new Object();
                    if (cachetype == 'group')
                    {
                        res.data[tempmy.id]['chatlog']['group' + cacheid] = new Array();
                        res.data[tempmy.id]['chatlog']['group' + cacheid].push(msg)
                        res.data[tempmy.id]['chatlog']['group' + cacheid] = res.data[tempmy.id]['chatlog']['group' + cacheid].slice(-10);
                    }
                    else
                    {
                        res.data[tempmy.id]['chatlog']['friend' + cacheid] = new Array();
                        res.data[tempmy.id]['chatlog']['friend' + cacheid].push(msg)
                        res.data[tempmy.id]['chatlog']['friend' + cacheid] = res.data[tempmy.id]['chatlog']['friend' + cacheid].slice(-10);
                    }

                }
                else
                {
                    if (cachetype == 'group')
                    {
                        if (typeof (res.data[tempmy.id]['chatlog']['group' + cacheid]) == 'undefined')
                        {
                            res.data[tempmy.id]['chatlog']['group' + cacheid] = new Array();
                        }
                        res.data[tempmy.id]['chatlog']['group' + cacheid].push(msg)
                        res.data[tempmy.id]['chatlog']['group' + cacheid] = res.data[tempmy.id]['chatlog']['group' + cacheid].slice(-10);////只存10条记录

                    }
                    else
                    {
                        if (typeof (res.data[tempmy.id]['chatlog']['friend' + cacheid]) == 'undefined')
                        {
                            res.data[tempmy.id]['chatlog']['friend' + cacheid] = new Array();
                        }
                        res.data[tempmy.id]['chatlog']['friend' + cacheid].push(msg)
                        res.data[tempmy.id]['chatlog']['friend' + cacheid] = res.data[tempmy.id]['chatlog']['friend' + cacheid].slice(-10);

                    }
                }

                uni.setStorage({
                    key: 'chatim',
                    data: res.data
                })
            }
        })
    }

    getrecentmsg_f(params, callback)
    {
        var that = this

        $.request({
            url: Config.URL.user.msg_chat_lists,
            data: params,
            loading:false,
            success: function (data, status, msg, code) {
                if (status == 200)
                {
                    //$.alert(Lang.__("已关注！"))
                    callback && callback(data, status, msg, code)
                }
                else
                {
                    //$.alert(msg)
                    callback && callback(data, status, msg, code)
                }
            }
        })

        return true;
    }

    getlevemsg_f(config)
    {
        return request.post(this.pathconfig.getlevemsg, config);
    }

    updateuserinfo_f(config)
    {
        return request.post(this.pathconfig.updateuserinfo, config);
    }

    createGroup_f(config)
    {
        return request.post(this.pathconfig.createGroup, config);
    }

    handlefirend_f(config)
    {
        return request.post(this.pathconfig.handlefirend, config);
    }

    getMsgbox_f(config)
    {
        return request.post(this.pathconfig.getMsgbox, config);
    }

    sendInvite_f(config)
    {
        return request.post(this.pathconfig.sendInvite, config);
    }

    getUinfoByid_f(config)
    {
        return request.post(this.pathconfig.getUinfoByid, config);
    }

    searchuser_f(config)
    {
        return request.post(this.pathconfig.searchuser, config);
    }

    login_f(config)
    {
        return request.post(this.pathconfig.login, config);
    }

    regist_f(config)
    {
        return request.post(this.pathconfig.regist, config);
    }

    checklogout_f(config)
    {
        return request.post(this.pathconfig.checklogout, config);
    }

    registClientid_f(config)
    {
        return request.post(this.pathconfig.registClientid, config);
    }

    initInfo_f(config)
    {
        return request.post(this.pathconfig.initInfo, config);
    }

    sendMessage_f(params, callback)
    {
        console.info(params);
        var that = this


        if (store.state.userInfo)
        {
            if(params.type === 'group'){
                var url = Config.URL.user.zonemsg_add_msg;
            } else {
                var url = Config.URL.user.msg_add;
            }

            $.request({
                type: 'post',
                url: url,
                data: params,
                dataType: 'json',
                loading:false,
                success: (data, status, msg, code) => {
                    if (status == 200)
                    {
                        callback && callback(data, status, msg, code)
                    }
                    else
                    {
                        callback && callback(data, status, msg, code)
                    }
                }
            });
        }

        return true;
    }


    setMsgRead(msg_id, callback)
    {
        var that = this;
        let params = {message_id:msg_id};

        $.request({
            type: 'post',
            url: Config.URL.user.msg_set_read,
            data: params,
            dataType: 'json',
            success: (data, status, msg, code) => {
                if (status == 200)
                {
                    callback && callback(data, status, msg, code)
                }
                else
                {
                    callback && callback(data, status, msg, code)
                }
            }
        });

        return true;
    }

    getMessagelog_f(config)
    {
        return request.post(this.pathconfig.getMessagelog, config);
    }


	im_decode(content){
        let that = this;

			//支持的html标签
			var html = function(end){
			  return new RegExp('\\n*\\['+ (end||'') +'(code|pre|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
			};
			content = (content||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
			//.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') //XSS
			.replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@

			.replace(/face\[([^\s\[\]]+?)\]/g, function(face){  //转义表情
			  var alt = face.replace(/^face/g, '');
			  return '<img alt="'+ alt +'" title="'+ alt +'" src="' + that.faces[alt] + '">';
			})
			.replace(/img\[([^\s]+?)\]/g, function(img){  //转义图片
			  //return '<img class="layui-layim-photos" style="width: 100%;height: 100%;" src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';

			  return '<div><img class="chatimg single-img" src="' + img.replace(/(^img\[)|(\]$)/g, '') + '" /><span style="min-width: 240px;">&nbsp;</span></div>';
			})
			.replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){ //转义文件
			  var href = (str.match(/file\(([\s\S]+?)\)\[/)||[])[1];
			  var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
			  if(!href) return str;
              return  $.__('不支持该格式:file');
      // #ifdef H5
        return '<a class="layui-layim-file" href="'+ href +'" download target="_blank"><i class="iconfont zc zc-xiangqing im-file"></i><cite>'+ $.sprintf($.__('不支持该格式,请复制网址到浏览器打开 %s'), href) +'</cite></a>';
      // #endif

      // #ifndef H5
      return '<a class="layui-layim-file" href="'+ href +'" download target="_blank"><i class="iconfont zc zc-xiangqing im-file"></i><cite>'+ $.sprintf($.__('不支持该格式,请复制网址到浏览器打开 %s'), href) +'</cite></a>';
      // #endif

			})
			.replace(/audio\[([^\s]+?)\]/g, function(audio){  //转义音频
              return  $.__('不支持该格式:audio');
			  return '<div class="layui-unselect layui-layim-audio" layim-event="playAudio" data-src="' + audio.replace(/(^audio\[)|(\]$)/g, '') + '"><i class="layui-icon">&#xe652;</i><p>音频消息</p></div>';
			})
			.replace(/video\[([^\s]+?)\]/g, function(video){  //转义音频
              return  $.__('不支持该格式:video');
			  return '<div class="layui-unselect layui-layim-video" layim-event="playVideo" data-src="' + video.replace(/(^video\[)|(\]$)/g, '') + '"><i class="layui-icon">&#xe652;</i></div>';
			})
      .replace(/\[pre([\s\S]*)\]([\s\S]*)\[\/pre\]/g, function(video){  //转义音频
          return  $.__('不支持该格式:code');
          return '<div class="layui-unselect layui-layim-video" layim-event="playVideo" data-src="' + video.replace(/(^video\[)|(\]$)/g, '') + '"><i class="layui-icon">&#xe652;</i></div>';
      })

			.replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){ //转义链接
			  var href = (str.match(/a\(([\s\S]+?)\)\[/)||[])[1];
			  var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
			  if(!href) return str;
			  return '<a href="'+ href +'" target="_blank">'+ (text||href) +'</a>';
			})
				//.replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移HTML代码
			//.replace(/\n/g, '<br>') //转义换行

			return content;
	}

    im_decode_msg(msg){
        let that = this;

        if (typeof msg.content.text != 'undefined')
        {
            let tmp_str = msg.content.text+'';
            let tmp_href = '';

            //判断是否发送文件
            if (tmp_href = (tmp_str.match(/file\(([\s\S]+?)\)\[/)||[])[1])
            {
                msg.content.text = that.im_decode(tmp_str);
            }
            else if (tmp_href = (tmp_str.match(/audio\[([^\s]+?)\]/g)))
            {
                //msg.type = 'voice';
                //msg.content.url = tmp_href;

                msg.content.text = that.im_decode(tmp_str);
            }
            else if (tmp_href = (tmp_str.match(/video\[([^\s]+?)\]/g)))
            {
                msg.content.text = that.im_decode(tmp_str);
            }
            else
            {
                msg.content.text = that.im_decode(msg.content.text+'');
            }
        }
        else
        {
            if (typeof msg.content != 'undefined')
            {
                let tmp_str = msg.content+'';
                let tmp_href = '';

                //判断是否发送文件
                if (tmp_href = (tmp_str.match(/file\(([\s\S]+?)\)\[/)||[])[1])
                {
                    msg.content = that.im_decode(tmp_str);
                }
                else if (tmp_href = (tmp_str.match(/audio\[([^\s]+?)\]/g)))
                {
                    msg.content = that.im_decode(tmp_str);
                }
                else if (tmp_href = (tmp_str.match(/video\[([^\s]+?)\]/g)))
                {
                    msg.content = that.im_decode(tmp_str);
                }
                else
                {
                    msg.content = that.im_decode(tmp_str);
                }
            }
        }

        return msg;
    }
}

if (!global.$apiconfig)
{
    global.$apiconfig = new apiconfig();
}

export default global.$apiconfig;
