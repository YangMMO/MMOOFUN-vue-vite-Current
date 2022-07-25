<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.design") }}</h1>

      <ShowDesign class="pb-6"></ShowDesign>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
// import designJson from '../assets/json/design.json';

import ShowDesign from '../components/ShowDesign.vue';

export default {
  name: 'Design',
  components: {
    ShowDesign,
  },
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.design")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  data() {
    return {
      // datas: JSON.parse(JSON.stringify(designJson)),
    }
  },
}
</script>


<style lang="scss" scoped>

.container {
    padding: 120px 12px 0 12px;
}
</style>