<template>
  <view>
    <view class="selector">
      <view
        v-for="(item, index) in notice_selector"
        @click="
          select_type = item.type;
          isShow = !isShow;
        "
        :key="index"
        :class="[item.type == select_type ? 'isSelected' : '', 'type_option']"
      >
        {{ item.content }}
      </view>
    </view>
    <view class="future_event">
      <view class="title">未来</view>
      <view class="timeline-wrapper">
        <el-timeline>
          <el-timeline-item
            placement="top"
            size="normal"
            v-for="(activity, index) in activities"
            :key="index"
          >
            <view class="custom-timestamp">
                <span v-html="activity.timestamp"> </span>
            </view>
            <view class="custom-content">
              <view class="title-content">
                <p class="title-c">{{ activity.type }}</p>
                <p class="more">
                  同类事件
                  <img src="../../static/icon/more-1.png" alt="" />
                </p>
              </view>
              <view class="wrapper">
                <!-- <input id="exp1" class="exp" type="checkbox" /> -->
                <view class="custom-notice">
                  <span class="btn">
                    <img src="../../static/icon/more-1.png" alt=""
                  /></span>
                  <!-- <label class="btn" for="exp1"></label> -->
                  {{ activity.content }}
                </view>
              </view>
            </view>
          </el-timeline-item>
        </el-timeline>
      </view>
    </view>
    <view class="history_event">
      <view class="title">历史</view>
      <view class="timeline-wrapper">
        <el-timeline>
          <el-timeline-item
            placement="top"
            size="normal"
            v-for="(activity, index) in activities"
            :key="index"
          >
            <view class="custom-timestamp">
              <span v-html="activity.timestamp"> </span>
            </view>
            <view class="custom-content">
              <view class="title-content">
                <p class="title-c">{{ activity.type }}</p>
                <p class="more">
                  同类事件
                  <img src="../../static/icon/more-1.png" alt="" />
                </p>
              </view>
              <view class="wrapper">
                <!-- <input id="exp1" class="exp" type="checkbox" /> -->
                <view class="custom-notice">
                  <span class="btn">
                    <img src="../../static/icon/more-1.png" alt=""
                  /></span>
                  <!-- <label class="btn" for="exp1"></label> -->
                  {{ activity.content }}
                </view>
              </view>
            </view>
          </el-timeline-item>
        </el-timeline>
      </view>
    </view>
  </view>
</template>

<script>
//设置根节点font-size
document.documentElement.style.fontSize =
  1560 / document.documentElement.clientWidth + "vw";
export default {
  data() {
    return {
      activities: [
        {
          content:
            "06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…",
          timestamp: "2018-04-05",
          type: "龙虎榜",
        },
        {
          content:
            "06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…",
          timestamp: "2018-04-13",
          type: "分红转送",
        },
        {
          content:
            "06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…",
          timestamp: "2018-04-11",
          type: "一季报披露",
        },
      ],
      notice_selector: [
        {
          content: "全部",
          type: 0,
        },
        {
          content: "重大事项",
          type: 1,
        },
        {
          content: "业绩披露",
          type: 2,
        },
        {
          content: "利润分配",
          type: 3,
        },
        {
          content: "交易提示",
          type: 4,
        },
        {
          content: "交易行为",
          type: 5,
        },
      ],
      select_type: 0,
    };
  },
  watch:{
  	  activities: {
  	  	handler(newName, oldName) {
  			this.activities = newName;
  	  		this.$forceUpdate();
  	  	},
  	  	deep: true,
  	  	immediate: true,
  	  },
  },  watch:{
	  activities: {
	  	handler(newName, oldName) {
			this.activities = newName;
	  		this.$forceUpdate();
	  	},
	  	deep: true,
	  	immediate: true,
	  },
  },
  created() {
  	this.initActivities();
  },
  methods: {
    handleChange() {},
	  initActivities(){
		  let that = this;
		  this.activities.map((item,i) => {
			  that.activities[i].timestamp  = that.formatTime(item.timestamp)
			  console.log("",that.activities[i])
		  })
	  },
    //传入一个时间格式为2018-04-16转换为年月日返回一个html结构month不足10补0
    formatTime(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return (
        '<view style="font-size: 0.78rem;color: #333333;height:1.0725rem;line-height:1.0725rem;float:right; ">' +
        month +
        "-" +
        day +
        '</view><view style="font-size:0.65rem;color: #999999; transform: scale(0.833); float:right;height:0.11rem;line-height:0.81rem">' +
        year +
        "</view>"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-timeline-item {
  padding-bottom: 0;
}
::v-deep .el-timeline-item__timestamp.is-top {
  position: absolute;

  color: #333333;
  white-space: pre-line;
}
::v-deep .el-timeline {
  padding-left: 2.7rem;
  font-size: 0.91rem;
  --el-timeline-node-size-normal: 0.625rem;
}
::v-deep .el-timeline-item__tail {
  border-left: 0.0625rem solid #e4e4e4;
}
::v-deep .el-timeline-item__node--normal {
  left: 0;
}
::v-deep .el-timeline-item__wrapper {
  padding-left: 1.3rem;
  padding-top: -0.3125rem;
}
.selector {
  width: 94%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .type_option {
    width: 30%;
    margin-top: 0.6rem;
    text-align: center;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #f7f8fa;
    border-radius: 0.375rem;
    color: #666666;
  }
  .type_option:not(:nth-child(3n + 1)) {
    margin-left: 5%;
  }
  .isSelected {
    background-color: #ffeded;
    color: #fe0000;
    font-family: "PF Medium";
  }
}
.history_event,
.future_event {
  .title {
    width: 5rem;
    background-color: #ffeded;
    color: #fe0000;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }
}
.future_event {
  .title {
    background-color: #ffeded;
    color: #fe0000;
    margin-top: 1rem;
  }
}
.history_event {
  .title {
    background-color: #fdf7eb;
    color: #d7ae70;
  }
}
.timeline-wrapper {
  margin-top: 1.25rem;
  padding: 0 0.975rem;
}
.custom-timestamp {
  position: absolute;
  top: -0.5em;
  left: -2.7rem;
  color: #333333;
  white-space: pre-line;
  width: 2.5rem;
}
.custom-content {
  .title-content {
    display: flex;
    justify-content: space-between;
    p {
      margin: 0;
      display: inline-block;
    }
    .title-c {
      font-size: 0.91rem;
      font-family: "PF Medium";
      color: #fe0000;
    }
    .more {
      font-size: 0.715rem;
      color: #999999;
    }
    img {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  .wrapper {
    display: flex;
    overflow: hidden;
    .custom-notice {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: justify;
      /* display: flex; */
      /*   display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; */
      line-height: 1.5;
      max-height: 4.5em;
      position: relative;
      transition: 0.3s max-height;
      .btn {
        position: relative;
        float: right;
        clear: both;
        margin-left: 1rem;
        line-height: 1rem;
        cursor: pointer;
        border: 0;

        img {
          width: 0.75rem;
          height: 0.75rem;
        }
      }
      .btn::before {
        content: "...";
        position: absolute;
        left: -0.5rem;
        color: #333;
        transform: translateX(-100%);
      }
      .btn::after {
        content: "";
      }
    }
    .custom-notice::before {
      content: "";
      height: calc(100% - 1.25rem);
      float: right;
    }
    .custom-notice::after {
      content: "";
      width: 999vw;
      height: 999vw;
      position: absolute;
      box-shadow: inset calc(6.25rem - 999vw) calc(1.875rem - 999vw) 0 0 #fff;
      margin-left: -6.25rem;
    }
    // .exp {
    //   display: none;
    // }
    // .exp:checked + .custom-notice {
    //   max-height: none;
    // }
    // .exp:checked + .custom-notice .btn::after {
    //   content: "收起";
    // }
    // .exp:checked + .custom-notice .btn::before {
    //   visibility: hidden; /*在展开状态下隐藏省略号*/
    // }
  }
}
</style>
