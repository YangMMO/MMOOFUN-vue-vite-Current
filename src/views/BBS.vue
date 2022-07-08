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

      <!-- 读取判断展示 -->
      <div v-if="isGet === false">
        <get-progress></get-progress>
      </div>

      <div v-else-if="isGet === true && isGetFinish === false">
        <get-error></get-error>
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

import moment from '../plugins/moment.js';

import getProgress from '../components/getProgress.vue';
import getError from '../components/getError.vue';

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
  components: {
    getProgress,
    getError
  },
  data() {
    return {
      isGetFinish: false,
      isGet: false,
      bbsData: [],
      screenWidth: window.innerWidth,
      col: 2,
      moment: moment,

      board: "::: align-center 🏄网上冲浪留下点什么再走吧😁🙈🍇",

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
</script>


<style lang="scss" scoped>

.container {
    padding: 120px 12px 0 12px;
}
</style>