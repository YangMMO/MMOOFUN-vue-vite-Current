<template>
  <div v-if="show" class="table fixed left-0 top-0 bg w-full h-full">
    <div class="table-cell align-middle">
      <div class="pop-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button" @click="$emit('close')">OK</button>
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
  background-color: rgba(0, 0, 0, 0.5);
}

.pop-container {
  width: 400px;
  margin: 0px auto;
}

</style>
