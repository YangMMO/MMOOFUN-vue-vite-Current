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
            </div>
          </div>

          <!-- 视频数据 -->
          <!-- <div v-show="bili" class="px-3 pt-3 pb-1 flex text-sm text-slate-400 justify-center space-x-4">
            <div class="flex place-items-center">
              <i class="ri-youtube-line pr-1 text-base"></i>
              <span>{{ formatNum(bili.stat.view) }}</span>
            </div>
            <div class="flex place-items-center">
              <i class="ri-message-2-line pr-1 text-base"></i>
              <span>{{ formatNum(bili.stat.danmaku) }}</span>
            </div>
            <div class="flex place-items-center">
              <i class="ri-thumb-up-line pr-1 text-base"></i>
              <span>{{ formatNum(bili.stat.like) }}</span>
            </div>
            <div class="flex place-items-center">
              <i class="ri-money-cny-circle-line pr-1 text-base"></i>
              <span>{{ formatNum(bili.stat.coin) }}</span>
            </div>
            <div class="flex place-items-center">
              <i class="ri-star-line pr-1 text-base"></i>
              <span>{{ formatNum(bili.stat.favorite) }}</span>
            </div>
          </div> -->

          <!-- 描述 -->
          <div class="px-3 py-3 text-xs text-slate-400 text-center">
            <!-- <i
              class="ri-error-warning-line align-middle pr-1 text-xs"></i> -->
              <span>
                {{ data[0].fields.description }}
              </span>
          </div>
        </div>

        <div class=" m-auto flex mt-3 mb-6 flex-col  transition-all duration-75 ease-linear">
          <div  class="w-full box mr-3 mb-3 select-none transition-all duration-75 ease-linear">
            <img :src="data[1].fields.image[0].url" class="ml-auto mr-auto w-3/12 box transition-all duration-75 ease-linear ">
          </div>
          <div class="bg-slate-100 dark:bg-slate-700 box flex-1 p-3 transition-all duration-75 ease-linear">
            <h3 class="text-slate-400 text-base mb-2 transition-all duration-75 ease-linear">{{ $t("home.download") }}</h3>
            <div class="flex flex-col text-sm space-y-1 " v-for="(item, index) in data" :key="index" v-show="index >= 2">
              <a :href="data[index].fields.cloud" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white transition-all duration-75 ease-linear flex place-items-center">
                <i class="ri-folder-2-line text-base"></i>
                <span class="">{{ data[index].fields.title }}</span>
              </a>
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

      bili: null
    }
  },
  created() {
    this.getHomeData();
    // this.getBiliData();
  },
  methods: {
    // 获取首页数据
    async getHomeData() {
      let banner = false;
      const that = this;

      // 请求数据
      await homeDatasheet.records.query({ viewId: "viwgoAco0PAox"})
      .then(response => {
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
    },

    // 获取b站 bvid=BV1Ar4y1F7JH 数据
    getBiliData() {
      let that = this;
      this.$axios.get('/bili/x/web-interface/view?bvid=BV1Ar4y1F7JH')
      .then((response) => {
        that.bili = response.data.data
        // console.log(that.bili);
      })
      .catch((error) => {
        console.log(error);
      })

      // this.$cookies.set("buvid3", "001D0F7E-EE79-C42F-ECB7-61F2142A99D471300infoc", "/", ".bilibili.com");
      // this.$cookies.set("_uuid", "D961D1078-E10D6-86DB-6CD1-81449862237873662infoc", "/", ".bilibili.com");
      // this.$cookies.set("rpdid", "|(ku|km)l~Yk0J'uYlRl)m~~J", "/", ".bilibili.com");
      // this.$cookies.set("i-wanna-go-back", "-1", "/", ".bilibili.com");
      // this.$cookies.set("buvid_fp_plain", "undefined", "/", ".bilibili.com");
      // this.$cookies.set("b_ut", "5", "/", ".bilibili.com");
      // this.$cookies.set("CURRENT_BLACKGAP", "0", "/", ".bilibili.com");
      // this.$cookies.set("blackside_state", "0", "/", ".bilibili.com");
      // this.$cookies.set("nostalgia_conf", "-1", "/", ".bilibili.com");
      // this.$cookies.set("PVID", "1");
      // this.$cookies.set("LIVE_BUVID", "AUTO1216557841817842", "/", ".bilibili.com");
      // this.$cookies.set("sid", "6gbwl049");
      // this.$cookies.set("CURRENT_QUALITY", "32", "/", ".bilibili.com");
      // this.$cookies.set("CURRENT_FNVAL", "4048", "/", ".bilibili.com");
      // this.$cookies.set("buvid4", "1EEE42C9-4762-6B1D-7456-AF79D132986172443-022060716-57HvyER1xz0r%2BXy4zU%2BjxQ%3D%3D", "/", ".bilibili.com");
      // this.$cookies.set("bsource", "search_bing", "/", ".bilibili.com");
      // this.$cookies.set("fingerprint", "b1e02949306e36b31481e002b2bd7317", "/", ".bilibili.com");
      // this.$cookies.set("fingerprint3", "855903e20ec0058293209ae27b606883", "/", ".bilibili.com");
      // this.$cookies.set("buvid_fp", "b1e02949306e36b31481e002b2bd7317", "/", ".bilibili.com");
      // this.$cookies.set("bp_video_offset_5612894", "688205953003159600", "/", ".bilibili.com");
      // this.$cookies.set("innersign", "0", "/", ".bilibili.com");
      // this.$cookies.set("b_lsid", "8AC447B6_18248C734FF", "/", ".bilibili.com");
      // this.$cookies.set("b_timer", "%7B%22ffp%22%3A%7B%22333.1007.fp.risk_001D0F7E%22%3A%221824886DE49%22%2C%22333.788.fp.risk_001D0F7E%22%3A%2218248871A4E%22%2C%22333.976.fp.risk_001D0F7E%22%3A%2218248D86869%22%2C%22333.934.fp.risk_001D0F7E%22%3A%2218232D88B69%22%2C%22333.999.fp.risk_001D0F7E%22%3A%2218248FE7203%22%2C%22666.4.fp.risk_001D0F7E%22%3A%22182338959BC%22%2C%22666.25.fp.risk_001D0F7E%22%3A%2218248276FFA%22%2C%22333.337.fp.risk_001D0F7E%22%3A%2218238BB10F0%22%2C%22333.880.fp.risk_001D0F7E%22%3A%2218233E3277C%22%2C%22333.885.fp.risk_001D0F7E%22%3A%2218248C070D1%22%2C%22333.22.fp.risk_001D0F7E%22%3A%221824887AE8A%22%2C%22333.979.fp.risk_001D0F7E%22%3A%2218248C09281%22%2C%22333.963.fp.risk_001D0F7E%22%3A%22182487F7E70%22%2C%22333.794.fp.risk_001D0F7E%22%3A%221824795021D%22%2C%22333.969.fp.risk_001D0F7E%22%3A%221824798A975%22%2C%22333.937.fp.risk_001D0F7E%22%3A%2218248EEDDDC%22%2C%22333.897.fp.risk_001D0F7E%22%3A%2218248C2A094%22%7D%7D", "/", ".bilibili.com");

      // this.$axios.get('/bili/x/relation/followers?vmid=5612894&pn=1&ps=20',)
      // .then((response) => {
      //   console.log(response);
      // })
      // .catch((error) => {
      //   console.log(error);
      // })
    },

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