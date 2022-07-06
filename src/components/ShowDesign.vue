<template>
  <!-- 瀑布流 -->
  <div class="flex flex-wrap flex-row select-none">
    <!-- 瀑布流列数 -->
    <div class="flex-1 flex flex-col" v-for="colInedx in col" :key="colInedx"
      :class="[{ 'mr-3': colInedx === colInedx % col }]">
      <!-- 瀑布流列内个数 -->
      <div v-for="(data, index) in datas" :key="index"
        class="design-item box overflow-hidden text-sm bg-white dark:bg-slate-900 ">
        <!-- 判断json的每个item即（data的index）所处于哪一列内 -->
        <div v-if="index % col === colInedx - 1" class="mb-3">
          <a :href="data.href" target="_blank">
            <img :src="data.image" class="w-full bg-gray-50 dark:bg-slate-600">
            <div class="p12 text-black dark:text-white border border-t-0 box-b">
              <h2 class="text-lg mb-1">{{ data.title }}</h2>
              <p class="mb-3 text-gray-400">{{ data.description }}</p>
              <span v-for="tag in data.tags" v-bind:key="tag" :class="`tag px-2 py-1 box inline-block ${tag.css}`">
                {{ tag.text }}
              </span>
            </div>
          </a>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import i18n from '../i18n';
import designJson from '../assets/json/design.json';


export default {
  name: 'ShowDesign',
  data() {
    return {
      datas: JSON.parse(JSON.stringify(designJson)),
      col: 2,
      screenWidth: window.innerWidth,
    }
  },
  methods: {
    calculateCol() {
      this.screenWidth = window.innerWidth;

      // 判断 768 1024
      if (this.screenWidth > 768 && this.screenWidth < 1024) {
        this.col = 3;
      } else if (this.screenWidth > 1024) {
        this.col = 4;
      } else {
        this.col = 2;
      }
      
    },
  },
  created() {
    const that = this;
    that.calculateCol();
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

.design-item {
  // width: calc(50% - 4px);
  // height: auto;
  // margin-right: 8px;
  // margin-bottom: 8px;

  // &:nth-child(even) {
  //   margin-right: 0;
  // }
}
</style>