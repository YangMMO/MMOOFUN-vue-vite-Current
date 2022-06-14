<template>
  <div class="container mx-auto text-black dark:text-white">

    <div class="divide-y-0">
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("menu.design") }}</h1>

      <div class="flex flex-wrap select-none">

        <div v-for="data in datas" v-bind:key="data"
          class="design-item box overflow-hidden text-xs text-slate-400 bg-slate-100 dark:bg-slate-900">
          <a :href="data.href" target="_blank">
            <img :src="data.image" alt="">
            <div class="p12 text-black dark:text-white">
              <h2 class="text-lg mb-1">{{ data.title }}</h2>
              <p class="mb-3">{{ data.description }}</p>
              <span v-for="tag in data.tags" v-bind:key="tag"
                class="tag px-2 py-1 box bg-gradient-to-r from-green-400 to-green-500 text-white">
                {{ tag }}
              </span>
            </div>
          </a>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import designJson from '../assets/json/design.json';

export default {
  name: 'Update',
  data() {
    return {
      datas: JSON.parse(JSON.stringify(designJson)),
    }
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
  width: calc(50% - 4px);
  height: auto;
  margin-right: 8px;
  margin-bottom: 8px;

  &:nth-child(even) {
    margin-right: 0;
  }
}

.container {
    padding: 120px 12px 0 12px;
}
</style>