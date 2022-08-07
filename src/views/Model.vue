<template>
  <div class="container mx-auto text-black dark:text-white">
    <div class="">
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.model") }}</h1>

      <!-- <button
        class="box px-4 py-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 font-semibold"
        @click="onClickLoader">加载模型</button> -->

      <NFT1></NFT1>
      <threeEx></threeEx>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n';

import threeEx from '../components/three_ex.vue';

import NFT1 from './Model/NFT_1.vue';

export default {
  name: 'Model',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.model")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  components: {
    threeEx,
    NFT1
  },
  data() {
    return {
      
    }
  },
}
</script>


<style lang="scss" scoped>

#model-canvas {
  width: 100%;
  height: 880px;
  position: relative;
}
.container {
    padding: 120px 12px 0 12px;
}
</style>