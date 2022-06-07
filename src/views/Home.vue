<template>
  <div class="f1 text-black dark:text-white">
    网站升级中
    <br />
    框架：vite / vue3 / three.js / i18n / scss / tailwindcss
    <br />
    持续集成：github actions 
    <br />
    敬请期待...
  </div>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>


<style lang="scss" scoped>
.f1 {
    display: flex;
    // width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
}
</style>