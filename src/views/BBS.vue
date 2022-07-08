<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.bbs") }}</h1>

      <!-- 墙面 -->
      <div class="">
        <div class="text-xl font-semibold mb-3">寄语</div>
        <div class="border-l-2 border-r-2 box mb-6 overflow-hidden">
          <div class="border-b-2 border-t-2 py-6">
            <v-md-preview :text="board" class=""></v-md-preview>
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
        <div class="text-xl font-semibold mb-3">留言 {{ bbsDataLength }}</div>
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

        <!-- 页数 -->
        <div class="flex mb-6 items-center justify-center">
          <div @click="currentPage <= 1 ? retrun : getBBS(currentPage--)"
            class="border-2 border-gray-900 px-4 py-1 box"> 上一页
          </div>
          <div class="mx-6">{{ currentPage }}</div>
          <div @click="currentPage >= totalPage ? retrun : getBBS(currentPage++)"
            class="border-2 border-gray-900 px-4 py-1 box"> 下一页
          </div>
        </div>

      </div>


      <!-- 提交 -->
      <div class="flex flex-col box select-none mb-6">
        <label class="mb-3">留言昵称 <span class="text-red-500">*</span></label>
        <input type="text" class="p8 border-2 focus:outline-none box  mb-3" v-model="user">

        <label class="mb-3">留言信息 - Markdown <span class="text-red-500">*</span></label>
        <div :class="['mb-3 border-2  box overflow-hidden']">
          <v-md-editor height="240px" :disabled-menus="[]" left-toolbar="undo redo clear | bold italic strikethrough"
            right-toolbar="" v-model="msg">
          </v-md-editor>
        </div>

        <label class="mb-3 ">邮箱 <span class="text-red-500">*</span></label>
        <div class="mb-3 flex w-full items-center border-2 box-border box relative  ">
          <input type="text" class="p8 pl-6 flex-1 overflow-hidden focus:outline-none" v-model="email">
          <div
            class="pr-6 pl-5  border-l-2 text-center flex-initial absolute right-0 cursor-pointer text-black dark:text-black h-full flex items-center justify-center bg-white"
            @click="publicEmail === 0 ? publicEmail = 1 : publicEmail = 0">
            <i
              :class="['icon-font-size pr-2 align-middle ', { 'ri-eye-2-line': publicEmail === 1 }, { 'ri-eye-close-line': publicEmail === 0 }]"></i>
            <span>{{ publicEmail === 1 ? '公开' : '私密' }}</span>


          </div>

        </div>

        <label class="mb-3">分享您的个人网站</label>
        <input type="text" class="p8 border-2 focus:outline-none  box  mb-3" v-model="blog">


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
      bbsDataLength: 0,
      screenWidth: window.innerWidth,
      col: 2,
      moment: moment,

      board: "::: align-center 🏄网上冲浪留下点什么再走吧😁🙈🍇",

      user: "",
      msg: "",
      publicEmail: 1,
      email: "",
      blog: "",

      
      getNum: 5,
      currentPage: 1,
      totalPage: 1,
    }
  },

  watch: {
    screenWidth(val) {
      this.col = Math.floor(val / 300);
    }
  },

  async created() {
    await this.getBBS();
    this.calculateCol();
  },
  methods: {
    createBBS() {
      let that = this;

      // console.log(that.user.length);
      // console.log(that.msg.length);
      // console.log(that.publicEmail);
      // console.log(that.email.length);
      // console.log(that.blog.length);

      let isNotNull = that.user.length > 0 && that.msg.length > 0 && that.email.length > 0;

      // console.log('空');

      if (!isNotNull) {
        console.log('没填写');
        // that.$toast.open({
        //   message: '请填写完整',
        //   type: 'is-danger',
        //   duration: 2000
        // });

        return;
        
      } 


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
          that.user = "";
          that.msg = "";
          that.publicEmail = 1;
          that.email = "";
          that.blog = "";
        } else {
          console.error(response);
        }
      })
    },

    async getBBS(currentPage) {
      let success = false;
      const that = this;
      that.currentPage = that.currentPage || currentPage;

      // design
      await msgDatasheet.records.query({ 
        viewId: "viwhuh8Q1ikXw",
        pageSize: 5,
        pageNum: that.currentPage
      }).then(response => {
        if (response.success) {
          success = true;
          that.bbsData = response.data.records;
          that.bbsDataLength = response.data.total;
          that.totalPage = that.bbsDataLength % that.getNum === 0 ? that.bbsDataLength / that.getNum : Math.floor(that.bbsDataLength / that.getNum) + 1;
          console.log(response);
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