<template>
  <div v-if="show" class="table fixed left-0 top-0 bg w-full h-full">
    <div class="table-cell align-middle">
      <div class="pop-container bg-white dark:bg-slate-800 box text-black dark:text-white">
        

        <div class="">
          <slot name="body">
            <div class="text-center">
              default body
            </div>
          </slot>
        </div>

        <div class="">
          <slot name="footer">
            <!-- <div class="text-center">
              default body
            </div> -->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TipsPop',
  props: {
    show: Boolean
  }
}
</script>

<style lang="scss" scoped>


.bg {
  z-index: 9999;
  // background-color: rgba(0, 0, 0, 0.6);
}

.pop-container {
  width: 160px;
  margin: 0px auto;
  background: rgba(0, 0, 0, 0.85);
}

</style>
