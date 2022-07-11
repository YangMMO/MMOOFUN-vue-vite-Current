<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.bbs") }}</h1>

      <!-- 墙面 -->
      <div class="">
        <!-- <div class="text-xl font-semibold mb-3">{{ $t("bbs.sendWord") }} </div> -->
        <div class="box sticky mb-6 overflow-hidden text-black dark:text-black">
          <div class="py-12 bg-stripes bg-stripes-white">
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
        <div class="mb-3">
          <h2 class="text-xl font-semibold inline-block align-middle">{{ $t("bbs.message") }}</h2>
          <span class="align-middle text-sm  ml-2 px-3 py-0.5 bg-gray-100 box gradient-red">{{ bbsDataLength }}</span>
        </div>

        <div class="flex flex-wrap flex-row">
          <div class="flex-1 flex flex-col" v-for="colInedx in col" :key="colInedx"
            :class="[{ 'mr-3': colInedx === colInedx % col }]">
            <div v-for="(data, index) in bbsData" :key="index">
              <div class="border-2 mb-3 px-3 py-3 box" v-if=" index % col===colInedx - 1">

                <div class="flex mb-3 items-center justify-center">
                  <div class="flex-1">
                    <i class="ri-ghost-smile-line align-middle icon-font-size pr-2"></i>
                    <h3 class="text-lg align-middle inline-block font-semibold">{{
                      data.fields.bbsUsername }}</h3>
                  </div>

                  <p class="text-gray-400 flex-initial text-sm">
                    {{ moment(data.fields.createDate).format('YYYY-MM-D h:mm') }}
                  </p>
                </div>


                <!-- <p>{{ }}</p> -->
                <div class="mb-3 ">
                  <v-md-preview :text="data.fields.msg" class="box overflow-hidden"></v-md-preview>
                </div>

                <div class="mb-3">
                  <div class="text-sm">
                    <p class="text-gray-400">
                      {{ data.fields.publicEmail ? data.fields.email : $t("bbs.anonymous") }}
                    </p>
                    <p class="text-gray-400" v-show="data.fields.blog">{{ data.fields.blog}}</p>
                  </div>
                </div>

                <div class="text-sm">
                  点赞: {{ data.fields.like }}
                </div>


                <!-- {{ data.fields }} -->

              </div>

            </div>
          </div>
        </div>

        <!-- 页数 -->
        <div class="flex mb-6 items-center justify-center">
          <!-- 上一页 -->
          <div @click="currentPage <= 1 ? retrun : getBBS(currentPage--)"
            class="border-2 border-gray-900 dark:border-white px-4 py-1 box cursor-pointer ">{{ $t("bbs.prev") }}</div>
          <!-- 页码 -->
          <div class="mx-6">{{ currentPage }} / {{ totalPage }}</div>
          <!-- 下一页 -->
          <div @click="currentPage >= totalPage ? retrun : getBBS(currentPage++)"
            class="border-2 border-gray-900 dark:border-white px-4 py-1 box cursor-pointer">{{ $t("bbs.next") }}</div>
        </div>
      </div>


      <!-- 提交留言 -->
      <div class="flex flex-col box select-none mb-6">

        <!-- 用户名昵称 -->
        <label class="mb-3">{{ $t("bbs.user") }} <span class="text-red-500">*</span></label>
        <div
          :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': user.length > userMaxLength }]">
          <input type="text" :class="['w-full p8 focus:outline-none  dark:text-black text-black']" v-model="user">
          <div
            :class="['pr-6 pl-5 text-center absolute right-0 bg-white text-red-500  text-sm', { 'hidden': user.length <= userMaxLength }]">
            <i> {{ user.length }}/{{ userMaxLength }}</i>
          </div>
        </div>

        <!-- 留言信息 -->
        <label class="mb-3">{{ $t("bbs.msg") }} <span class="text-red-500">*</span></label>
        <div
          :class="['mb-3 border-2  box overflow-hidden flex w-full items-center box-border box relative', { 'border-red-500': msg.length > msgMaxLength }]">

          <v-md-editor height="240px" :disabled-menus="[]"
            left-toolbar="undo redo clear | bold italic strikethrough ul ol" right-toolbar="" v-model="msg"
            :class="['w-full dark:text-black text-black']">
          </v-md-editor>
          <div
            :class="['mr-3 pr-3 ml-5 pl-3 py-1 box text-center absolute right-0 top-1.5 bg-white text-red-500  text-sm', { 'hidden': msg.length <= msgMaxLength }]">
            <i> {{ msg.length }}/{{ msgMaxLength }}</i>
          </div>
        </div>


        <!-- 邮箱 -->
        <label class="mb-3">{{ $t("bbs.email") }} <span class="text-red-500">*</span></label>
        <div
          :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': email.length > emailMaxLength }]">
          <input type="text" :class="['w-full p8 focus:outline-none  dark:text-black  text-black']" v-model="email">
          <div class=" absolute right-0 bg-white flex flex items-center justify-center">
            <div
              :class="['pl-5 pr-1 text-center text-red-500  text-sm ', { 'hidden': email.length <= emailMaxLength }]">
              <i> {{ email.length }}/{{ emailMaxLength }}</i>
            </div>
            <div
              class="pr-6 pl-5 text-center cursor-pointer text-black dark:text-black h-full flex items-center justify-center bg-white h-full"
              @click="publicEmail === 0 ? publicEmail = 1 : publicEmail = 0">
              <i
                :class="['icon-font-size pr-2 align-middle ', { 'ri-eye-2-line': publicEmail === 1 }, { 'ri-eye-close-line': publicEmail === 0 }]"></i>
              <span>{{ publicEmail === 1 ? $t("bbs.public") : $t("bbs.anonymous") }}</span>
            </div>
          </div>
        </div>

        <!-- 个人网站 -->
        <label class="mb-3">{{ $t("bbs.blog") }} </label>
        <div
          :class="['mb-3 flex w-full items-center border-2 box-border box relative', { 'border-red-500': blog.length > blogMaxLength }]">
          <input type="text" :class="['w-full p8 focus:outline-none dark:text-black text-black']" v-model="blog">
          <div
            :class="['pr-6 pl-5 text-center absolute right-0 bg-white text-red-500  text-sm', { 'hidden': blog.length <= blogMaxLength }]">
            <i> {{ blog.length }}/{{ blogMaxLength }}</i>
          </div>
        </div>



        <!-- btn -->
        <div class="b-btn box inset-x-0 bottom-0 text-center flex pb-4 justify-center select-none">
          <div
            class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center cursor-pointer"
            @click="createBBS">
            <i class="ri-chat-smile-3-line icon-font-size pr-2"></i>
            <span class="font-semibold ">{{ $t("bbs.submit") }} </span>
          </div>
        </div>
      </div>


      <!-- 弹窗提示 -->
      <Teleport to="body">
        <Pop :show="showPop" @close="showPop = false">
          <template #header>
            <h3>自定插槽文本</h3>
          </template>
        </Pop>
      </Teleport>


    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import Pop from '../components/Pop.vue';

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
    getError,
    Pop
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

      userMaxLength: 12,
      msgMaxLength: 100,
      emailMaxLength: 32,
      blogMaxLength: 32,

      
      getNum: 5,
      currentPage: 1,
      totalPage: 1,

      submitStatus: false,
      notSubmittable: true,
      illegalArray: [],

      showPop: false,
    }
  },

  watch: {
    screenWidth(val) {
      // this.col = Math.floor(val / 300);
      this.col = 1;
    }
  },

  created() {
    this.calculateCol();
    this.getBBS();
  },
  methods: {
    createBBS() {
      let that = this;

      // 测试弹窗
      // this.showPop = true;
      // return

      // 判断提交中的状态
      if (that.submitStatus) {
        return;
      }

      that.submitStatus = true;

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



      console.log('提交');


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
          that.submitStatus = false;
          that.getBBS();
          that.user = "";
          that.msg = "";
          that.publicEmail = 1;
          that.email = "";
          that.blog = "";
        } else {
          console.log('提交失败');
          console.error(response);
          that.submitStatus = false;
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
        pageSize: that.getNum,
        pageNum: that.currentPage
      }).then(response => {
        if (response.success) {
          success = true;
          that.bbsData = response.data.records;
          that.bbsDataLength = response.data.total;
          that.totalPage = that.bbsDataLength % that.getNum === 0 ? that.bbsDataLength / that.getNum : Math.floor(that.bbsDataLength / that.getNum) + 1;
          that.calculateCol();
          console.log(response);
        } else {
          success = false;
          that.calculateCol();
          console.error(response);
        }

        console.log(that.col);
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
        this.col = 1;
      } else if (this.screenWidth > 1024) {
        this.col = 1;
      } else {
        this.col = 1;
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


.bg-stripes-white{
  --stripes-color: hsla(0, 0%, 95%, 0.747);
}

.bg-stripes {
  background-image: linear-gradient(-45deg, var(--stripes-color) 12.5%, transparent 12.5%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.5%, transparent 62.5%, transparent 100%);
  background-size: 5.66px 5.66px;
}


.sticky {
  background: linear-gradient(-45deg, transparent 24px, #fff5c5 0);
  ::before {
    content: "";
      position: absolute;
      right: 0px;
      bottom: 0px;
      background: linear-gradient(-45deg, transparent 50%, #fce6ab 0);
      width: 35px;
      height: 35px;
      border-radius: 4px 0 0 0;
  }
}

.container {
    padding: 120px 12px 0 12px;
}
</style>