<template>
  <div class="w-full mx-auto text-white">
    <div class="calculate bg-gradient-to-b from-slate-700 to-slate-900 mx-auto box overflow-hidden">
      <div class="calculate-c">

        <div class=" bg-gradient-to-b from-slate-700 to-slate-800  py-12 px-3">
          <!-- 常见比例 -->
          <div class="text-center">
            <button v-for="ratio in commonRatio" :key="ratio" @click="currentRatio = ratio; clearVal()"
              :class="['box  p-1 px-2 ratio-item', { 'bg-gradient-to-b from-pink-500 to-pink-600 ': currentRatio === ratio}]">
              {{ ratio.w ? `${ratio.w} : ${ratio.h}` : 'Custom' }}
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
    let commonRatio = [{   //常见比例
      w: 16, h: 9
    }, {
      w: 21, h: 9
    }, {
      w: 4, h: 3
    }, {
      w: 2, h: 1
    }, {
        w: 0, h: 0
      }]
    let scale = commonRatio[0].w / commonRatio[0].h;

    return {
      datas: JSON.parse(JSON.stringify(designJson)),
      toolsTabs: ['ratio', 'ratio'],
      currentRatio: commonRatio[0],
      commonRatio: commonRatio,
      width: '',
      height: '',
      ratioWidth: commonRatio.slice(-1)[0].w,
      ratioHeight: commonRatio.slice(-1)[0].h,
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
      if (this.currentRatio.w === 0) {
        this.width = this.ratioWidth;
        this.height = this.ratioHeight;
      } else {
        this.width = this.currentRatio.w;
        this.height = this.currentRatio.h;
      }

      if (position === 'width') {
        this.height = Math.round(this.width / this.currentRatio.w * this.currentRatio.h);
      } else {
        this.width = Math.round(this.height / this.currentRatio.h * this.currentRatio.w);
      }
    },

  },
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