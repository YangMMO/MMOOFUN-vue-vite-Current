<template>
  <div v-if="show" class="table fixed left-0 top-0 bg w-full h-full">
    <div class="table-cell align-middle">
      <div class="pop-container border-2 border-black dark:border-slate-600 bg-white dark:bg-slate-800 box text-black dark:text-white shadow-box_d ">
        <div class="p12 border-b-2 border-black dark:border-slate-600">
          <slot name="header">
            <div class="text-center">
              default body
            </div>
          </slot>
        </div>

        <div class="pt-3">
          <slot name="body">
            <div class="text-center">
              default body
            </div>
          </slot>
        </div>

        <div class="p12">
          <slot name="footer">
            <div class="text-center">
              <button :class="['border-2 border-black dark:border-slate-600 px-4 py-1 box cursor-pointer']" @click="$emit('close')">
                关闭
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Pop',
  props: {
    show: Boolean
  }
}
</script>

<style lang="scss" scoped>


.bg {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.65);
}

.pop-container {
  width: 320px;
  margin: 0px auto;
}

</style>
