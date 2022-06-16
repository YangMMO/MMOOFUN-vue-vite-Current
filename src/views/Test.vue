<template>
  <div class="container text-gray-900 dark:text-white flex flex-col place-items-center">
    <img src="../assets/img/mmo.jpg" class="w-2/5 rounded-full my-6 ">
    <h1 class="text-3xl font-semibold my-6">这是一个临时数据链接</h1>
    <span class="text-slate-400 mb-12 text-xs">你访问到了作者进行测试时插入的临时数据，说明该功能还在完善中</span>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    metaInfo: {
      title: `MMOO.FUN | Test Link`,
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