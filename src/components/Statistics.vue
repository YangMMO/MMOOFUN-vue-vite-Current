<template>
  <div class="w-full mx-auto text-black dark:text-white">
      <div v-if="isGet === false">
        <get-progress>
          <slot>
            <div class="flex flex-wrap flex-row select-none justify-center">
              <div class="mb-3 box overflow-hidden w-full">
                <div class="w-full h-96 load-gradient "></div>
              </div>
              <div class="mb-3 box overflow-hidden w-full">
                <div class="w-full h-12 load-gradient "></div>
              </div>
            </div>

          </slot>
        </get-progress>
      </div>

      <div v-else-if="isGet === true && isGetFinish === false">
        <get-error></get-error>
      </div>

      <div v-else>
        <div class="bg-slate-100 dark:bg-slate-900 box overflow-hidden">
          <div class="relative select-none">
            <!-- Arnold图片 -->

            <img :src="data[1].fields.image[0].url" />
            <!-- 按钮 -->
            <div class="b-btn box absolute inset-x-0 bottom-0 text-center flex pb-4 justify-center">
              <a :href="data[1].fields.url" target="_blank"
                rel="noopener noreferrer"
                class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center">
                <i class="ri-external-link-line icon-font-size pr-2"></i>
                <span class="font-semibold ">{{ $t("tools.view") }}</span>
              </a>
              <!-- <div>border-2</div> -->
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import getProgress from './getProgress.vue';
import getError from './getError.vue';

import { Vika } from "@vikadata/vika";
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const toolsDatasheet = vika.datasheet("dstqaeswCWeAULpgnQ");

export default {
  name: 'Statistics',
  components: {
    getProgress,
    getError
  },
  data() {
    return {
      data: null,
      isGetFinish: false,
      isGet: false,
    }
  },
  created() {
    this.getToolsData();
  },
  methods: {
    // 获取tools数据
    async getToolsData() {
      let tools = false;
      const that = this;

      // 请求数据
      await toolsDatasheet.records.query({ viewId: "viwvn8j3HNh3M"}).then(response => {
        if (response.success) {
          tools = true;
          that.data = response.data.records;
          // console.log(response.data.records);
        } else {
          tools = false;
          console.error(response);
        }
      });

      // 已请求
      that.isGet = true;

      // 数据是否都已经加载完毕
      if (tools) {
        // 已请求完成
        that.isGetFinish = true;
      }
    }
  }
}
</script>


<style lang="scss" scoped>



.fly-game {
  width: 700px;
  height: 600px;
}

</style>