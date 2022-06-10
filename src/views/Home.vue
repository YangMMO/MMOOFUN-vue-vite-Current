<template>

  <div class="container mx-auto text-black dark:text-white">
    <div>
      <h1 class="text-3xl pb-9 font-semibold ">{{ $t("header.home") }}</h1>

      <div class="bg-slate-100 dark:bg-slate-900 box overflow-hidden">
        <div class="relative">
          <!-- Arnold图片 -->

          <img src="../assets/img/Arnold-6.jpg" />
          <!-- 按钮 -->
          <div class="box absolute inset-x-0 bottom-0 text-center flex pb-4 justify-center">
            <a href="https://www.bilibili.com/video/BV1Ar4y1F7JH?share_source=copy_web" target="_blank"
              rel="noopener noreferrer"
              class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center">
              <i class="ri-bilibili-line icon-font-size pr-2"></i>
              <span class="font-semibold ">前往观看</span>
            </a>
            <!-- <div>border-2</div> -->
          </div>
        </div>
        <div class="p8 text-xs text-slate-400 text-center"><i
            class="ri-error-warning-line align-middle pr-1 text-xs "></i>该教程仅用于学习交流，中文字幕由（MMOO.FUN - 续命牛黄解毒片）译制上传,
          收费行为仅保护字幕成果
        </div>
      </div>

      <div class="py-6">
        <div
          class="text-sm list-decimal list-inside bg-stripes bg-rose-200 dark:bg-indigo-200 bg-stripes-white box p-4 dark:text-slate-800">
          <i class="ri-ruler-2-line text-3xl"></i>
          <i class="ri-compasses-2-line text-3xl"></i>
          <i class="ri-paint-brush-line text-3xl"></i>
          <br />
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
  </div>
</template>

<script>


export default {
  name: 'Home',
  // components: { VueImageLoader },
  data() {
    return {
      arnold: "../assets/img/Arnold-6.jpg"
    }
  }
}
</script>


<style lang="scss" scoped>

.container {
  padding: 120px 12px 0 12px;
  // position: absolute;
}
</style>