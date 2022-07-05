<template>
  <div class="w-full mx-auto text-white">
    <div class="calculate bg-gradient-to-b from-slate-700 to-slate-900 mx-auto box overflow-hidden">
      <div class="calculate-c">

        <div class=" bg-gradient-to-b from-slate-700 to-slate-800  py-12 px-3">
          <!-- 常见比例 -->
          <div class="text-center">
            <button v-for="ratio in commonRatio" :key="ratio" @click="currentRatio = ratio; clearVal()"
              :class="['box  p-1 px-2 ratio-item', { 'bg-gradient-to-b from-pink-400 to-pink-600 ': currentRatio === ratio }, { 'bg-gradient-to-b from-blue-700 to-indigo-800 ': currentRatio !== ratio }]">
              <!-- {{ ratio.w ? `${Math.round(ratio.w * 1000) / 1000}:${Math.round(ratio.h * 1000) / 1000}` : 'Custom' }} -->
              {{ ratio.w ? `${Math.round(ratio.w * 1000) / 1000}` : 'Custom' }}
              {{ ratio.h > 1 ? ` : ${Math.round(ratio.h * 1000) / 1000}` : '' }}
            </button>
          </div>
          <!-- 自定比例 -->
          <div :class="['text-white text-center pt-3', { 'hidden': currentRatio.w !== 0 }]">
            <input type="number" v-model="ratioWidth"
              class="p4 border-2 focus:outline-none focus:ring focus:border-blue-300 box text-center text-black max-w-2xl w-3/12">
            <span class="text-center w-1/12 inline-block">:</span>
            <input type="number" v-model="ratioHeight"
              class="p4 border-2 focus:outline-none focus:ring focus:border-blue-300 box text-center text-black max-w-2xl w-3/12">
          </div>
        </div>

        <div class="py-20 px-3 flex items-center">
          <section class="flex flex-col flex-auto w-5/12">
            <h1 class="text-center mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white ">
              Width
            </h1>
            <input class="text-center bg-transparent outline-none text-3xl flex-auto" type="number" placeholder="NUMBER"
              v-model="width" @keyup="calculate('width')">
          </section>

          <span class="w-2/12 text-center inline-block text-4xl font-thin flex-none">×</span>

          <section class="flex flex-col flex-auto w-5/12">
            <h1 class="text-center mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white ">
              Height
            </h1>
            <input class="text-center bg-transparent outline-none text-3xl flex-auto" type="number" placeholder="NUMBER"
              v-model="height" @keyup="calculate('height')">
          </section>

        </div>
        <p class="text-center mb-6 opacity-20">By MMOO.FUN</p>
      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import designJson from '../assets/json/design.json';


export default {
  name: 'Ratio',
  data() {
    let commonRatio = [
    // 常见比例
    { w: 21, h: 9 },
    { w: 16, h: 9 },
    // { w: 16, h: 10 },
    { w: 4, h: 3 },
    { w: 3, h: 2 },
    // { w: 3, h: 1 },
    { w: 2, h: 1 },

    // 自定比例
    { w: 1.618, h: 1 },
    { w: 1.414, h: 1 },
    { w: 1.732, h: 1 },

    // 自定比例 + 1
    // { w: 1 + 1.618, h: 1 },
    // { w: 1 + 1.414, h: 1 },
    { w: 3.303, h: 1 },

    {w: 0, h: 0}
    ]
    let scale = commonRatio[0].w / commonRatio[0].h;

    return {
      datas: JSON.parse(JSON.stringify(designJson)),
      toolsTabs: ['ratio', 'ratio'],
      currentRatio: commonRatio[0],
      commonRatio: commonRatio,
      width: '',
      height: '',
      ratioWidth: 0,
      ratioHeight: 0,
    }
  },
  methods: {
    /* 清除input值 */
    clearVal(){
      this.width = '';
      this.height = '';
    },
    /* 计算 */
    calculate(position) {
      if (this.currentRatio.w !== 0) {
        if (position === 'width') {
          this.height = Math.round(this.width / this.currentRatio.w * this.currentRatio.h * 1000) / 1000;
        } else {
          this.width = Math.round(this.height / this.currentRatio.h * this.currentRatio.w * 1000) / 1000;
        }
        return;
      }

      if (position === 'width') {
        this.height = Math.round(this.width / this.ratioWidth * this.ratioHeight * 100) / 100;
      } else {
        this.width = Math.round(this.height / this.ratioHeight * this.ratioWidth * 100) / 100;
      }
    },

  },
  watch: {
    ratioWidth(val) {
      this.ratioWidth = parseInt(val);
    },
    ratioHeight(val) {
      this.ratioHeight = parseInt(val);
    }
  }
}
</script>


<style lang="scss" scoped>

input[type=number] {
  -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ratio-item {
  margin-right: 8px;
  margin-bottom: 8px;

  &:last-child {
    margin-right: 0;
  }

}

.container {
    padding: 120px 12px 0 12px;
}
</style>