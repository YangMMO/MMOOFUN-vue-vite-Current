<template>
  <div v-if="isGet === false">
    <get-progress>
      <slot>
        <div class="flex flex-wrap flex-row select-none">
          <div class="flex-1 flex flex-col" v-for="colInedx in col" :key="colInedx"
            :class="[{ 'mr-3': colInedx === colInedx % col }]">
            <div v-for="(data, index) in 6" :key="index">
              <div v-if="index % col === colInedx - 1" class="mb-3 bg-gray-50 dark:bg-slate-600 box bg-opacity-80">
                <div class="mb-3 box overflow-hidden">
                  <div :class="['w-full h-48 load-gradient', { 'load_gradient_l' : app.theme === 'light' }, { 'load_gradient_d': app.theme === 'dark'}]"></div>
                  <div class="p12 text-black dark:text-white box-b dark:border-transparent">
                    <h2 :class="['text-lg mb-2 load-gradient h-6 w-4/6 box', { 'load_gradient_l' : app.theme === 'light' }, { 'load_gradient_d': app.theme === 'dark'}]"></h2>
                    <p :class="['text-gray-400 load-gradient h-4 box', { 'load_gradient_l' : app.theme === 'light' }, { 'load_gradient_d': app.theme === 'dark'}]"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </get-progress>
  </div>

  <div v-else-if="isGet === true && isGetFinish === false">
    <get-error></get-error>
  </div>


  <div v-else>
    <!-- 瀑布流 -->
    <div class=" flex flex-wrap flex-row select-none">
      <!-- 瀑布流列数 -->
      <div class="flex-1 flex flex-col" v-for="colInedx in col" :key="colInedx"
        :class="[{ 'mr-3': colInedx === colInedx % col }]">
        <!-- 瀑布流列内个数 -->
        <div v-for="(data, index) in designData" :key="index" class="design-item box overflow-hidden text-sm ">
          <!-- 判断json的每个item即（data的index）所处于哪一列内 -->
          <div v-if="index % col === colInedx - 1" class="mb-3">
            <a :href="data.fields.url.text" target="_blank">
              <img :src="data.fields.image[0].url" class="w-full bg-gray-50 dark:bg-slate-600 transition-all duration-75 ease-linear">
              <div
                class="p12 text-black dark:text-white box-b bg-gray-100 dark:bg-slate-700 transition-all duration-200">
                <h2 class="text-lg mb-1">{{ data.fields.title }}</h2>
                <p class="mb-3 text-gray-400">{{ data.fields.description }}</p>
                <span v-for="tag in data.fields.tags" v-bind:key="tag"
                  :class="`tag px-2 py-1 box inline-block ${caseTag(tag).css}`">
                  {{ caseTag(tag).tagName }}
                </span>
              </div>
            </a>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
// import i18n from '../i18n';
// import designJson from '../assets/json/design.json';
import getProgress from './getProgress.vue';
import getError from './getError.vue';


import { Vika } from "@vikadata/vika";
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO" });
const DesignDatasheet = vika.datasheet("dstcZEVFbYA2wKmEov");
const DesignTagsDatasheet = vika.datasheet("dsteuB41zaTS2cRPTe");


export default {
  name: 'ShowDesign',
  components: {
    getProgress, getError
  },
  inject: ['app'],
  data() {
    return {
      // datas: JSON.parse(JSON.stringify(designJson)),

      isGetFinish: false,
      isGet: false,
      designData: [],
      designTagsData: [],
      col: 2,
      screenWidth: window.innerWidth,
    }
  },
  methods: {
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
    caseTag (tag) {
      let that = this;
      that.designTagsData;
      console.log();
      
      for (let i = 0; i < that.designTagsData.length; i++) {
        if (that.designTagsData[i].recordId === tag) {
          return that.designTagsData[i].fields
        }
      }
    },
  },
  async created() {
    let design = false;
    let designTags = false;
    const that = this;

    // design
    await DesignDatasheet.records.query({ viewId: "viwCt936eRuqE" }).then(response => {
      if (response.success) {
        design = true;
        that.designData = response.data.records;
        // console.log(design, that.designData);
      } else {
        design = false;
        console.error(response);
      }
    });

    // design tags
    await DesignTagsDatasheet.records.query({ viewId: "viwDqW2P7S6pH" }).then(response => {
      if (response.success) {
        designTags = true;
        that.designTagsData = response.data.records;
        // console.log(designTags, that.designTagsData);
      } else {
        designTags = false;
        console.error(response);
      }
    });

    // 已请求
    that.isGet = true;

    // 数据是否都已经加载完毕
    if (design && designTags) {
      // 已请求完成
      that.isGetFinish = true;
      // 调用瀑布流进行列数刷新
      that.calculateCol();
    }


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

.tag {
  margin-right: 4px;
  margin-bottom: 4px;

  &:last-child {
    margin-right: 0;
  }
}

</style>