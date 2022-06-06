<template>
  <div class="container mx-auto text-black dark:text-white">
    <div class="divide-y">
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("header.update") }}</h1>
      
      <div class="py-6">
        <h2 class="text-xl mb-3">2022-6-6</h2>
        <ul class="text-base list-decimal list-inside bg-stripes bg-rose-200 bg-stripes-white box p8">
          <li>新增深色模式</li>
          <li>布局调整为响应式</li>
        </ul>
      </div>

      <div class="py-6">
        <h2 class="text-xl mb-3">2022-6-3</h2>
        <ul class="text-base list-decimal list-inside bg-stripes bg-rose-200 bg-stripes-white box p8">
          <li>
            框架：vite / vue3 / typescript / three.js / i18n / scss / tailwindcss
          </li>
          <li>
            持续集成: github actions (完成部署)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Update',
  }
</script>


<style lang="scss" scoped>
.container {
    padding: 120px 12px 0 12px;
}
</style>