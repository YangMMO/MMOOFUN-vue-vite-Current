<template>

  <div class="container mx-auto text-black dark:text-white">
    <div>
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.home") }}</h1>


      <div v-if="isGet === false">
        <get-progress>
          <slot>
            <div class="flex flex-wrap flex-row select-none justify-center">
              <div class="mb-3 box overflow-hidden w-full">
                <div :class="['w-full h-96 load-gradient ', { 'load_gradient_l' : app.theme === 'light' }, { 'load_gradient_d': app.theme === 'dark'}]"></div>
              </div>
              <div class="mb-3 box overflow-hidden w-full">
                <div :class="['w-full h-12 load-gradient ', { 'load_gradient_l' : app.theme === 'light' }, { 'load_gradient_d': app.theme === 'dark'}]"></div>
              </div>
              <div class="mb-3 box overflow-hidden w-48">
                <div :class="['w-full h-48 load-gradient ', { 'load_gradient_l' : app.theme === 'light' }, { 'load_gradient_d': app.theme === 'dark'}]"></div>
              </div>
            </div>

          </slot>
        </get-progress>
      </div>

      <div v-else-if="isGet === true && isGetFinish === false">
        <get-error></get-error>
      </div>

      <div v-else>
        <div class="bg-slate-100 dark:bg-slate-700 box overflow-hidden transition-all duration-75 ease-linear">
          <div class="relative select-none">
            <!-- Arnold图片 -->

            <img :src="data[0].fields.image[0].url" />
            <!-- 按钮 -->
            <div class="b-btn box absolute inset-x-0 bottom-0 text-center flex pb-4 justify-center">
              <a :href="data[0].fields.url" target="_blank"
                rel="noopener noreferrer"
                class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center transition-all duration-75 ease-linear">
                <i class="ri-bilibili-line icon-font-size pr-2"></i>
                <span class="font-semibold ">{{ $t("home.watch") }}</span>
              </a>
              <!-- <div>border-2</div> -->
            </div>
          </div>
          <div class="p8 text-xs text-slate-400 text-center">
            <i
              class="ri-error-warning-line align-middle pr-1 text-xs"></i>
              {{ data[0].fields.description }}
          </div>
        </div>

        <div class=" m-auto flex mt-3 mb-6 flex-col  transition-all duration-75 ease-linear">
          <div  class="w-full box mr-3 mb-3 select-none transition-all duration-75 ease-linear">
            <img :src="data[1].fields.image[0].url" class="ml-auto mr-auto w-3/12 box transition-all duration-75 ease-linear ">
          </div>
          <div class="bg-slate-100 dark:bg-slate-700 box flex-1 p-3 transition-all duration-75 ease-linear">
            <h3 class="text-slate-400 text-base mb-2 transition-all duration-75 ease-linear">{{ $t("home.download") }}</h3>
            <div class="flex flex-col ">
              <a :href="data[2].fields.cloud" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white transition-all duration-75 ease-linear"><i class="ri-folder-2-line icon-font-size align-middle"></i>{{ data[2].fields.title }}</a>
              <a :href="data[3].fields.cloud" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white transition-all duration-75 ease-linear"><i class="ri-folder-2-line icon-font-size align-middle"></i>{{ data[3].fields.title }}</a>
            </div>
          </div>
        </div>
      </div>

      <div>

      </div>
    
      <!-- 设计 -->
      <ShowDesign></ShowDesign>

      <div class="pb-6">
        <div
          class="text-sm list-decimal list-inside bg-stripes bg-rose-200 dark:bg-indigo-200 bg-stripes-white box p-4 dark:text-slate-800">
          <i class="ri-ruler-2-line text-3xl"></i>
          <i class="ri-compasses-2-line text-3xl"></i>
          <i class="ri-paint-brush-line text-3xl"></i>
          <br />
          网站升级中
          <br />
          框架：vite / vue3 / three.js / i18n / scss / tailwindcss
          <br />
          持续集成：github actions
          <br />
          敬请期待...
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';

import ShowDesign from '../components/ShowDesign.vue';
import getProgress from '../components/getProgress.vue';
import getError from '../components/getError.vue';

import { Vika } from "@vikadata/vika";
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const homeDatasheet = vika.datasheet("dstHbwFl3wtUzW8fcK");

export default {
  name: 'Home',
  // components: { VueImageLoader },
  components: {
    ShowDesign,
    getProgress,
    getError
  },
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.home")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  inject: ['app'],
  data() {
    return {
      data: null,
      isGetFinish: false,
      isGet: false,
    }
  },
  created() {
    this.getHomeData();
  },
  methods: {
    // 获取首页数据
    async getHomeData() {
      let banner = false;
      const that = this;

      // 请求数据
      await homeDatasheet.records.query({ viewId: "viwgoAco0PAox"}).then(response => {
        if (response.success) {
          banner = true;
          that.data = response.data.records;
          // console.log(response.data.records);
        } else {
          banner = false;
          console.error(response);
        }
      });

      // 已请求
      that.isGet = true;

      // 数据是否都已经加载完毕
      if (banner) {
        // 已请求完成
        that.isGetFinish = true;
      }
    }
  }
}
</script>


<style lang="scss" scoped>

.b-btn {
  animation: bounce 5s infinite;

  @keyframes bounce {
    0% {
      transform: rotate3d(0, 0, 0, 0deg) translate3d(0, 0, 0);
    }

    1% {
      transform: rotate3d(0, 0, .5, 2deg) translate3d(2px, 0, 0);
    }

    2% {
      transform: rotate3d(0, 0, .5, 0deg) translate3d(0px,-2px, 0);
    }

    3% {
      transform: rotate3d(0, 0, .5, -2deg) translate3d(-2px, 0, 0);
    }

    4% {
      transform: rotate3d(0, 0, .5, 0deg) translate3d(0px, 2px, 0);
    }

    5% {
      transform: rotate3d(0, 0.2, 0, 5deg) translate3d(0px, 0, 0);
    }

    6% {
      transform: rotate3d(0, 0.2, 0, 0deg);
    }

    7% {
      transform: rotate3d(0, 0.2, 0, -5deg);
    }

    8% {
      transform: rotate3d(0, 0.2, 0, 0deg);
    }

    100% {
      transform: rotate3d(0, 0, .5, 0deg);
    }
  }
  
}



.container {
  padding: 120px 12px 0 12px;
  // position: absolute;
}
</style>