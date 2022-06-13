<template>
  <div class="container mx-auto text-black dark:text-white">
    <div class="divide-y">
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("menu.update") }}</h1>

      <div v-for="data in datas" v-bind:key="data" class="py-6">

        <h2 class="text-xl mb-3">{{ data.date }}</h2>

        <ul
          class="text-sm list-decimal list-inside bg-stripes bg-rose-200 dark:bg-indigo-200 bg-stripes-white box p-4 dark:text-slate-800">
          <li v-for="item in data.content" v-bind:key="item">{{ item }}</li>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
import updateJson from '../assets/json/update.json';

export default {
  name: 'Update',
  data() {
    return {
      datas: JSON.parse(JSON.stringify(updateJson)),
    }
  },
}
</script>


<style lang="scss" scoped>
.container {
    padding: 120px 12px 0 12px;
}
</style>