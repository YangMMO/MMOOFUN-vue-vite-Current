<template>
  <div class="w-full mx-auto text-black dark:text-white">
    <div
      class="text-sm list-decimal list-inside bg-stripes bg-rose-200 dark:bg-indigo-200 bg-stripes-white box p-4 dark:text-slate-800">
      <p >{{ $t("tips.tips1") }}</p>
    </div>

  </div>
</template>

<script>
import i18n from '../i18n';
import designJson from '../assets/json/design.json';


export default {
  name: 'More',
  data() {
    return {
      datas: JSON.parse(JSON.stringify(designJson)),
    }
  },
}
</script>


<style lang="scss" scoped>

</style>