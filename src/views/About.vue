<template>
  <div class="container mx-auto text-black dark:text-white">
    <div class="divide-y-0">
      <!-- <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.about") }}</h1> -->
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("subscription.sub") }}</h1>

      <div class="pb-6">
        <!-- <p class="mb-6">{{ $t("subscription.sub") }}</p> -->
        <div class="flex select-none">

          <a href="https://space.bilibili.com/5612894" target="_blank"
            class="flex-1 box flex flex-col place-items-center pt-6 pb-5 sub-item text-black dark:text-white bg-white dark:bg-slate-700 transition-all duration-75 ease-linear  border-2 border-gray-200 dark:border-slate-600">
            <vue-feather type="tv" class="mb-3"></vue-feather>
            <span class="text-center">{{ $t("subscription.bilibili") }}</span>
          </a>
          <a href="https://github.com/YangMMO" target="_blank"
            class="flex-1 box flex flex-col place-items-center pt-6 pb-5 sub-item text-black dark:text-white bg-white dark:bg-slate-700 transition-all duration-75 ease-linear  border-2 border-gray-200 dark:border-slate-600">
            <vue-feather type="github" class="mb-3"></vue-feather>
            <span class="text-center">{{ $t("subscription.github") }}</span>
          </a>
          <a href="https://www.figma.com/@MMO" target="_blank"
            class="flex-1 box flex flex-col place-items-center pt-6 pb-5 sub-item text-black dark:text-white bg-white dark:bg-slate-700 transition-all duration-75 ease-linear  border-2 border-gray-200 dark:border-slate-600">
            <vue-feather type="figma" class="mb-3"></vue-feather>
            <span class="text-center">{{ $t("subscription.figma") }}</span>
          </a>
        </div>
      </div>

    </div>

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.update") }}</h1>

      <div v-for="data in datas" v-bind:key="data" class="pb-6">

        <h2 class="text-xl mb-3 select-none">{{ data.date }}</h2>

        <ul
          class="text-sm list-decimal list-inside bg-stripes bg-green-200 dark:bg-indigo-200 bg-stripes-white box p-4 text-slate-800">
          <li v-for="item in data.content" v-bind:key="item">{{ item }}</li>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import updateJson from '../assets/json/update.json';
import SvgIcon from '../components/SvgIcon.vue';

import feather from 'feather-icons/dist/feather.js';

export default {
  name: 'About',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.about")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  data() {
    return {
      datas: JSON.parse(JSON.stringify(updateJson)),
      feather: feather,
    }
  },
  components: { SvgIcon },
  created() {

  },
}
</script>


<style lang="scss" scoped>

.sub-item {
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
}

.container {
    padding: 120px 12px 0 12px;
}
</style>