<template>

  <div class="container mx-auto text-black dark:text-white">
    <div class="divide-y">
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("header.home") }}</h1>

      <div class="py-6">
        网站升级中
        <br />
        框架：vite / vue3 / three.js / i18n / scss / tailwindcss
        <br />
        持续集成：github actions
        <br />
        敬请期待...
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>


<style lang="scss" scoped>

.container {
  padding: 120px 12px 0 12px;
}
</style>