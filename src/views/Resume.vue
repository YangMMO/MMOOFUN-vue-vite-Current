<template>
  <div class="container mx-auto text-black dark:text-white">
    <div>
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.resume") }}</h1>

      <!-- 暗号 -->
      <div :class="{ hidden: unlock === true}">
        <div class="text-center pb-6 flex flex-col place-items-center">
          <i class="ri-lock-line text-3xl"></i>
          <h1 class="text-3xl font-semibold my-6 select-none">请输入暗号</h1>
          <input type="text" v-model="password" v-focus placeholder="天王盖地虎"
            class="p8 border-2 focus:outline-none focus:ring focus:border-blue-300 box text-center">
          <span class="text-slate-400 text-xs py-2">猫猫吃老鼠</span>
        </div>

        <div class="b-btn box pb-6 inset-x-0 bottom-0 text-center flex pb-4 justify-center select-none">
          <a href="http://resume.mmoo.fun/" target="_blank" rel="noopener noreferrer"
            class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center">
            <i class="ri-share-line icon-font-size pr-2"></i>
            <span class="font-semibold ">查看旧版</span>
          </a>

          <!-- <div>border-2</div> -->
        </div>
      </div>

      <!-- 简历 -->
      <div :class="{ hidden: unlock === false}">
        <div class="text-center pb-6 flex flex-col place-items-center">
          <h1 class="text-3xl font-semibold my-6">暗号正确</h1>
          <h1 class="text-3xl font-semibold my-6">但该页面正在建设中...</h1>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import i18n from '../i18n';

const focus = {
  mounted: (el) => el.focus()
}

export default {
  name: 'Resume',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.resume")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  directives: {
    focus
  },
  data() {
    return {
      password: '',
      unlock: false,
      
    }
  },
  created() {
    // this._focus()
  },
  methods: {
    // _focus() {
    //   console.log(this);
    // },
  },
  watch: {
    password: function(e) {
      if (this.password === '猫猫吃老鼠') {
        this.unlock = true
      }
    }
  },
}
</script>


<style lang="scss" scoped>
.container {
  padding: 120px 12px 0 12px;
  // position: absolute;
}
</style>