<template>
  <div class="text-center">
    <slot>
      <div class="align-middle py-6 box">
        <vue-feather type="refresh-cw" class="animate-spin mb-1"></vue-feather>
        <p>加载中</p>
      </div>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'getProgress',
  data() {
    return {
      
    }
  },
}
</script>


<style lang="scss" scoped>

</style>