<template>
  <div class="text-center">
    <slot>
      <div class="align-middle py-6 box">
        <vue-feather type="meh" class=" mb-1"></vue-feather>
        <p>请求失败，刷新页面重试！</p>
      </div>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'getFail',
  data() {
    return {
      
    }
  },
}
</script>


<style lang="scss" scoped>

</style>