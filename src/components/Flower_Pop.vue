<template>
  <!-- pop -->
  <div class="absolute -top-2 w-16 left-1/2 -translate-x-1/2" :style="[{ zIndex: zIndex }]">
    <transition name="translateYPOP">
      <div v-if="isShowFeedback" class="relative">
        <div class=" absolute top-1 flex p4 justify-center items-center rounded-full filter blur-xl bg-purple-500 bg-opacity-50 w-full h-full">
        </div>
        <div class="flex p4 justify-center items-center bg-white rounded-full relative">
          <div class="icon " :style="[{ backgroundImage: `url(${isShowFeedback ? flower.flower_img[imgIndex].url : ''})` }]"></div>
          <div class="text-xs inline-block font-color pr-1">
            {{ `  + ${data}` }}
          </div>
        </div>
      </div>
    </transition>
  </div>


</template>

<script>

export default {
  name: 'Flower_Pop',
  props: {
    isShowFeedback: Boolean,
    flower: Object,
    data: Number,
    imgIndex: Number,
    zIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // isShowFeedback: props,
    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>


<style lang="scss" scoped>

.translateYPOP-enter-active {
  animation: translateYPOP-in .5s ease-out both;
  -webkit-animation: translateYPOP-in .5s ease-out both;
  -moz-animation: translateYPOP-in .5s ease-out both;
  -ms-animation: translateYPOP-in .5s ease-out both;
  -o-animation: translateYPOP-in .5s ease-out both;
  animation: translateYPOP-in .5s ease-out both;
}

.translateYPOP-leave-active {
  animation: translateYPOP-in .5s 2s reverse ease-in both;
  -webkit-animation: translateYPOP-in .5s 2s reverse ease-in both;
  -moz-animation: translateYPOP-in .5s 2s reverse ease-in both;
  -ms-animation: translateYPOP-in .5s 2s reverse ease-in both;
  -o-animation: translateYPOP-in .5s 2s reverse ease-in both;
  animation: translateYPOP-in .5s 2s reverse ease-in both;
}

@keyframes translateYPOP-in {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 100;
    transform: translateY(0px);
  }
}

.icon {
  width: 20px;
  height: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


</style>