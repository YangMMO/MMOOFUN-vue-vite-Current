<template>
  <div class="container text-gray-900 dark:text-white flex flex-col place-items-center">
    <img src="../assets/img/mmo.jpg" class="w-2/5 rounded-full my-6 ">
    <h1 class="text-3xl font-semibold my-6">出404辣</h1>
    <span class="text-slate-400 mb-12 text-xs">总感觉你在找些什么，但我却不想给你些什么</span>
  </div>
</template>

<script>
  export default {
    name: '404',
    metaInfo: {
      title: `MMOO.FUN | 404 Not Found`,
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  }
</script>


<style lang="scss" scoped>

.container {
  padding: 120px 12px 0 12px;
  // position: absolute;
}
</style>