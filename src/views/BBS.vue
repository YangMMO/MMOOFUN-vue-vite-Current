<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.bbs") }}</h1>

      <!-- 墙面 -->
      <div class="border-2 box mb-6 border-2  overflow-hidden">
        <div class="border-b-2 border-t-2">
          <v-md-preview :text="board" class=""></v-md-preview>
        </div>
      </div>


      <!-- 提交 -->
      <div class="flex flex-col box">
        <label class="mb-3">留言昵称</label>
        <input type="text" class="p8 border-2 focus:outline-none focus:ring focus:border-blue-300 box  mb-3"
          v-model="user">
        <label class="mb-3">留言信息 - Markdown</label>
        <div class="mb-3 border-2 focus:outline-none focus:ring focus:border-blue-300 box overflow-hidden">
          <v-md-editor height="240px" :disabled-menus="[]"
            left-toolbar="preview | undo redo clear | bold italic strikethrough" right-toolbar="" v-model="msg">
          </v-md-editor>
        </div>

        <label class="mb-3 ">邮箱</label>
        <div class="mb-3 flex w-full items-center border-2 box-border box relative overflow-hidden">
          <input type="text"
            class="p8 box pl-6 focus:outline-none focus:ring focus:border-blue-300 flex-1 overflow-hidden"
            v-model="email">
          <div
            class="px-6 py-6  border-l-2 focus:outline-none focus:ring focus:border-blue-300 text-center flex-initial absolute right-0 cursor-pointer"
            @click="publicEmail === 0 ? publicEmail = 1 : publicEmail = 0">
            {{ publicEmail === 1 ? '公开' : '不公开' }}
          </div>

        </div>

        <label class="mb-3">分享您的个人网站</label>
        <input type="text" class="p8 border-2 focus:outline-none focus:ring focus:border-blue-300 box  mb-3"
          v-model="blog">


        <!-- btn -->
        <div class="b-btn box inset-x-0 bottom-0 text-center flex pb-4 justify-center select-none">
          <div
            class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center cursor-pointer"
            @click="createBBS">
            <i class="ri-chat-smile-3-line icon-font-size pr-2"></i>
            <span class="font-semibold ">提交</span>
          </div>
        </div>
      </div>

      <!-- 过度效果 -->
      <div v-if="isGet === false" class="text-center">
        <div class="align-middle py-6 box">
          <vue-feather type="refresh-cw" class="animate-spin mb-1"></vue-feather>
          <p>加载中</p>
        </div>
      </div>

      <div v-else-if="isGet === true && isGetFinish === false " class="text-center">
        <div class="align-middle py-6 box">
          <vue-feather type="meh" class=" mb-1"></vue-feather>
          <p>请求失败，刷新页面重试！</p>
        </div>
      </div>

      <!-- 渲染读取的数据 -->
      <div v-else>
        <div class="flex flex-wrap flex-row ">
          <div class="flex-1 flex flex-col" v-for="colInedx in col" :key="colInedx"
            :class="[{ 'mr-3': colInedx === colInedx % col }]">
            <div v-for="(data, index) in bbsData" :key="index">
              <div class="border-2 mb-3 p-6" v-if=" index % col===colInedx - 1">
                <h2 class="text-lg mb-1">{{ data.fields.bbsUsername }}</h2>
                <!-- <p>{{ }}</p> -->
                <div class="mb-3 ">
                  <v-md-preview :text="data.fields.msg" class="box overflow-hidden"></v-md-preview>
                </div>

                <p class="mb-3 text-gray-400" v-show="data.fields.publicEmail === 1">{{ data.fields.email }}</p>
                <p class="mb-3 text-gray-400" v-show="data.fields.blog">{{ data.fields.blog}}</p>
                <p class="mb-3 text-gray-400">{{ moment(data.fields.createDate).format('YYYY-MM-D , h:mm , a') }}</p>
                <!-- {{ data.fields }} -->

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import moment from 'moment';

import { Vika } from "@vikadata/vika";
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const msgDatasheet = vika.datasheet("dstuYoi5jUdh0Z0Fvq");

export default {
  name: 'BBS',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.bbs")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  data() {
    return {
      isGetFinish: false,
      isGet: false,
      bbsData: [],
      screenWidth: window.innerWidth,
      col: 2,
      moment: moment,

      board: "🏄网上冲浪留下点什么再走吧😁🙈🍇",

      user: "",
      msg: "",
      publicEmail: 1,
      email: "",
      blog: "",

    }
  },
  async created() {
    await this.getBBS();
    this.calculateCol();
  },
  methods: {
    createBBS() {
      let that = this;

      console.log(that.user);
      console.log(that.msg);
      console.log(that.publicEmail);
      console.log(that.email);
      console.log(that.blog);


      msgDatasheet.records.create([
        {
          "fields": {
            "bbsUsername": that.user,
            "email": that.email,
            "publicEmail": that.publicEmail,
            "blog": that.blog,
            "msg": that.msg,
            "createDate": Date.parse(new Date())
          }
        }
      ]).then(response => {
        if (response.success) {
          console.log('提交成功');
          // console.log(response.data);
          that.getBBS();
        } else {
          console.error(response);
        }
      })
    },

    async getBBS() {
      let success = false;
      const that = this;

      // design
      await msgDatasheet.records.query({ viewId: "viwhuh8Q1ikXw" }).then(response => {
        if (response.success) {
          success = true;
          that.bbsData = response.data.records;
          console.log(that.bbsData);
        } else {
          success = false;
          console.error(response);
        }
      });


      // 已请求
      that.isGet = true;

      // 数据是否都已经加载完毕
      if (success) {
        // 已请求完成
        that.isGetFinish = true;
      }
    },

    calculateCol() {
      console.log(1);
      this.screenWidth = window.innerWidth;

      // 判断 768 1024
      if (this.screenWidth > 768 && this.screenWidth < 1024) {
        this.col = 2;
      } else if (this.screenWidth > 1024) {
        this.col = 3;
      } else {
        this.col = 2;
      }

    },
  },
  mounted() {
    const that = this;
    window.onresize = that.calculateCol;
  },
  unmounted() {
    window.onresize = null;
  },
}


moment.defineLocale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'Ah点mm分',
    LTS: 'Ah点m分s秒',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MMMD日',
    LLL: 'YYYY年MMMD日Ah点mm分',
    LLLL: 'YYYY年MMMD日ddddAh点mm分',
    l: 'YYYY-MM-DD',
    ll: 'YYYY年MMMD日',
    lll: 'YYYY年MMMD日Ah点mm分',
    llll: 'YYYY年MMMD日ddddAh点mm分'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '凌晨' || meridiem === '早上' ||
      meridiem === '上午') {
      return hour;
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    } else {
      // '中午'  
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem: function (hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1130) {
      return '上午';
    } else if (hm < 1230) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    } else {
      return '晚上';
    }
  },
  calendar: {
    sameDay: function () {
      return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
    },
    nextDay: function () {
      return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
    },
    lastDay: function () {
      return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
    },
    nextWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
    },
    lastWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
    },
    sameElse: 'LL'
  },
  ordinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number;
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效  
    dow: 1, // Monday is the first day of the week.  
    doy: 4  // The week that contains Jan 4th is the first week of the year.  
  }
});
</script>


<style lang="scss" scoped>

.container {
    padding: 120px 12px 0 12px;
}
</style>