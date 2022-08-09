<template>
  <div class="table fixed left-0 top-0 bg-verify w-full h-full" @touchmove.prevent  @click="$emit('close')">
    <div class="table-cell align-middle">
      <div class="pop-container-verify border-2 border-black dark:border-slate-600 text-black dark:text-white shadow-box_d box bg-white" @click.stop>
        <div class="p12 border-b-2 border-black dark:border-slate-600  dark:bg-slate-800 ">
          <slide-verify
            ref="block"
            :slider-text="text"
            :accuracy="accuracy"
            :imgs="imgs"
            @again="onAgain"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
          ></slide-verify>
          <!-- <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button> -->
          <div class="mt-3 text-center">{{ msg }}{{ endTime > 0 ? ` (${endTime})` : '' }}</div>
          <!-- <button v-show="showBtn" :class="['w-full border-2 border-black dark:border-slate-600 px-4 py-1 box cursor-pointer']" @click="$emit('close')">关闭</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import i18n from '../i18n';

import { ref } from "vue";
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";

import img1 from "../assets/img/verify1.jpg";
import img2 from "../assets/img/verify2.jpg";
import img3 from "../assets/img/verify3.jpg";

export default {
  name: 'Verify',
  components: {
    SlideVerify,
  },
  inject: ['app'],
  props: {
    show: Boolean,
  },
  watch: {
    show(val) {
      if (val === true) {
        this.handleRefresh();
      }
    }
  },
  setup(props) {
    let msg = ref("");
    let text = ref("");
    let endTime = ref(0);
    let block = ref<SlideVerifyInstance>();

    text.value = i18n.t("verify.slide")
    msg.value = i18n.t("verify.onDefault")
    
    return {
      block,
      msg,
      text,
      accuracy: 3,
      imgs: [img1, img2, img3],
      showBtn: true,
      props,
      endTime,
    };
  },
  mounted() {
  
  },
  methods: {
    // 刷新
    handleRefresh() {
      this.block.refresh();
      this.text = i18n.t("verify.slide")
      this.msg = i18n.t("verify.onDefault")
      // this.showBtn = true;
    },
    onAgain() {
      this.msg = i18n.t("verify.onAgain")
    },
    onRefresh() {
      this.msg = i18n.t("verify.onRefresh")
    },
    onSuccess(times) {
      // this.msg = i18n.t("verify.onSuccess") + `: ${(times / 1000).toFixed(1)}s`;
      this.msg = i18n.t("verify.onSuccess");
      // this.showBtn = false;
      this.$emit('verifySeccess');
      this.endTime = 3;

      let st = setInterval(() => {
        if (this.endTime > 1) {
          --this.endTime;
        } else {
          this.endTime = 0;
          this.$emit('close');
          clearInterval(st);
        }
      }, 1000);
    },
    onFail() {
      this.msg = i18n.t("verify.onFail")
    },

  },
}
</script>

<style lang="scss">
.bg-verify {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
}

.pop-container-verify {
  width: 338px;
  margin: 0px auto;
  // background: rgba(0, 0, 0, 0.85);


}

.icon-refresh::after {
  content: "";
  display: block;
  position: absolute;
  right: 8px;
  top: 8px;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
}

.icon-refresh::before {
  display: none; 
}

.icon-arrow-right::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  width: 24px !important;
  height: 24px !important;
  transform: translate(-50%, -50%);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 13H4v-2h8V4l8 8-8 8z' fill='rgba(25,145,250,1)'/%3E%3C/svg%3E");
}

.icon-arrow-right::before {
  display: none; 
}

.slide-verify-slider-mask-item {
  width: 38px !important; 
  height: 38px !important;
}

.slide-verify-slider-mask-item:hover {
  .icon-arrow-right::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 13H4v-2h8V4l8 8-8 8z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
  }
}


.slide-verify-slider-mask-item-icon {
  display: block;
  position: relative;
  width: 38px !important; 
  height: 38px !important;
}

.icon-fail::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  width: 24px !important;
  height: 24px !important;
  transform: translate(-50%, -50%);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
}

.icon-fail::before {
  display: none; 
}

.icon-success::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  width: 24px !important;
  height: 24px !important;
  transform: translate(-50%, -50%);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
}

.icon-success::before {
  display: none; 
}

.slide-verify-slider-text {
  color: #cdcdcd;
}

canvas {
  border-radius: 2px !important;
}
</style>