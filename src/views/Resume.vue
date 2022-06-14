<template>
  <div class="container mx-auto text-black dark:text-white">
    <div>
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("menu.resume") }}</h1>

      <div class="text-center pb-6">
        新版建设中...
      </div>

      <div class="b-btn box pb-6 inset-x-0 bottom-0 text-center flex pb-4 justify-center">
        <a href="http://resume.mmoo.fun/" target="_blank" rel="noopener noreferrer"
          class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center">
          <i class="ri-share-line icon-font-size pr-2"></i>
          <span class="font-semibold ">查看旧版</span>
        </a>
        <!-- <div>border-2</div> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Resume',
  }
</script>


<style lang="scss" scoped>
.container {
  padding: 120px 12px 0 12px;
  // position: absolute;
}
</style>