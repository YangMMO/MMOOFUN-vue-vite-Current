<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.tools") }}</h1>

      <div class="flex flex-wrap select-none">

        <div class="w-full mb-6">
          <div class="mb-3">
            <button v-for="tab in toolsTabs" :key="tab" :class="['box p-1 px-2 tools-item border-2', 
  { 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-transparent border-transparent': currentTab === tab }, 
          { ' border-gray-300 dark:border-gray-600': currentTab !== tab }] " @click="currentTab = tab">
              {{ $t(`tools.${tab.toLocaleLowerCase()}`) }}
            </button>
          </div>


          <!-- Inactive components will be cached! -->
          <keep-alive>
            <component :is="currentTabComponent"> </component>
          </keep-alive>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import designJson from '../assets/json/design.json';

import Ratio from '../components/Ratio.vue'
import Flygame from '../components/Flygame.vue'
import Ratiofigma from '../components/Ratiofigma.vue'
import More from '../components/More.vue'

export default {
  name: 'Tools',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.tools")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  components: { Ratio,  More, Ratiofigma },
  data() {
    return {
      datas: JSON.parse(JSON.stringify(designJson)),
      currentTab: 'ratio',
      toolsTabs: ['ratio', 'ratioFigma','more', ],
    }
  },
  computed: {
    currentTabComponent() {
      console.log(this.currentTab.toLowerCase());
      return this.currentTab.toLowerCase()
    }
  }
}
</script>


<style lang="scss" scoped>


.active {
  border-color: $G85;
}

.tools-item {
  margin-right: 8px;
  margin-bottom: 8px;

  &:last-child {
    margin-right: 0;
  }

}

.container {
    padding: 120px 12px 0 12px;
}
</style>