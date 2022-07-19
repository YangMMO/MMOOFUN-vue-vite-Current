<template>
  <div class="fixed bottom-0 left-0 w-full select-none" >
    <transition name="translateY">
      <div v-if="isShowFlower"  :class="['container relative ml-auto mr-auto bg  bg-purple-100   bg-opacity-95 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 font-color-p transition-all duration-75 ease-linear  border-t-2 border-purple-200 box-t border-l-2 border-r-2 shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h']"> 

        <div :class="['flex pr-2 overflow-hidden']">

          <transition name="opacity0" mode="out-in">

            <!-- 操作面板 -->
            <div v-if="isShowFunc" class="w-full bg py-2 ">
              <div class="flex space-x-2 " >

                <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out">
                  <span class="func-icon inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[10].url : ''})` }"></span>
                  <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">浇花</span>
                </div>

                <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out">
                  <span class="func-icon  inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[11].url : ''})` }"></span>
                  <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">浇花</span>
                </div>

                <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out">
                  <span class="func-icon  inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[12].url : ''})` }"></span>
                  <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">浇花</span>
                </div>

                <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out">
                  <span class="func-icon  inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[13].url : ''})` }"></span>
                  <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">浇花</span>
                </div>

              </div>

            </div>


            <!-- 数值面板 -->
            <div v-else  class="growth flex-1 flex transition-all duration-75 ease-linear gap-x-1 py-2">
              <!-- 雨露 -->
              <div class="flex-1 flex flex-col place-content-center text-sm" >
                <div class="flex mb-1">
                  <div class="icon water mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[0].url : ''})` }"></div>
                  <h3 class="">
                    <span class="font-color hidden  sm:inline-block mr-2">雨露值</span>
                    <span class="text-xs inline-block font-color">
                      {{ isShowFlower ? `${flowerData.waterTotal}` : 0 }}
                    </span>
                  </h3>

                </div>

                <div class="progress-1 w-full text-center border border-gray-300 ">
                  <span class="progress-t text-xs w-full">
                    {{ todayWater }}/{{ dayMaxGrowth }}
                  </span>
                  <div class="progress-bg" :style="{ width: `${ todayWater / dayMaxGrowth * 100}%`}"></div>
                </div>
              </div>

              <!-- 爱心 -->
              <div class="flex-1 flex flex-col place-content-center text-sm" >
                <div class="flex mb-1">
                  <div class="icon love mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[1].url : ''})` }"></div>
                  <h3 class="">
                    <span class="font-color hidden  sm:inline-block mr-2">爱心值</span>
                    <span class="text-xs inline-block font-color">
                      {{ isShowFlower ? `${flowerData.loveTotal}` : 0 }}
                    </span>
                  </h3>

                </div>

                <div class="progress-1 w-full text-center border border-gray-300 ">
                  <span class="progress-t text-xs w-full">
                    {{ todayLove }}/{{ dayMaxGrowth }}
                  </span>
                  <div class="progress-bg" :style="{ width: `${ todayLove / dayMaxGrowth * 100}%`}"></div>
                </div>
              </div>


              <!-- 阳光 -->
              <div class="flex-1 flex flex-col place-content-center text-sm" >
                <div class="flex mb-1">
                  <div class="icon sun mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[2].url : ''})` }"></div>
                  <h3 class="">
                    <span class="font-color hidden  sm:inline-block mr-2">阳光值</span>
                    <span class="text-xs inline-block font-color">
                      {{ isShowFlower ? `${flowerData.sunTotal}` : 0 }}
                    </span>
                  </h3>

                </div>

                <div class="progress-1 w-full text-center border border-gray-300 ">
                  <span class="progress-t text-xs w-full">
                    {{ todaySun }}/{{ dayMaxGrowth }}
                  </span>
                  <div class="progress-bg" :style="{ width: `${ todaySun / dayMaxGrowth * 100}%`}"></div>
                </div>
              </div>



              <!-- 养分 -->
              <div class="flex-1 flex flex-col place-content-center text-sm" >
                <div class="flex mb-1">
                  <div class="icon nutrition mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[3].url : ''})` }"></div>
                  <h3 class="">
                    <span class="font-color hidden  sm:inline-block">营养值</span>
                    <span class="text-xs inline-block font-color">
                      {{ isShowFlower ? `${flowerData.nutritionTotal}` : 0 }}
                    </span>
                  </h3>

                </div>

                <div class="progress-1 w-full text-center border border-gray-300 ">
                  <span class="progress-t text-xs w-full">
                    {{ todayNutrition }}/{{ dayMaxGrowth }}
                  </span>
                  <div class="progress-bg" :style="{ width: `${ todayNutrition / dayMaxGrowth * 100}%`}"></div>
                </div>
              </div>


            </div>

          </transition>

          <!-- 花 -->
          <div  class="h-0 potw">
            <div class="absolute -bottom-1 -right-0 sm:-right-1 transition-all duration-75 ease-linear flex flex-col">

              <div class="flower relative cursor-pointer" @click="isShowFunc = !isShowFunc">
                <div class="f22 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[5].url : ''})` }"></div>
                <div class="f11 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[6].url : ''})` }"></div>
                <div class="f33 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[7].url : ''})` }"></div>
                <div class="pot11 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[8].url : ''})` }"></div>
              </div>
 
            </div>
          </div>

        </div>
          
      </div>
    </transition>

    <!-- 隐藏按钮 -->
    <div class="absolute bottom-4 right-0">
      {{  }}
      <div class="gradient-purple close cursor-pointer float-right rounded-tl-full rounded-bl-full" @click="isShowFlower = !isShowFlower">
        <i :class="['ri-seedling-line inline-block transition-all duration-75 ease-linear -translate-x-1/3 -translate-y-1/2 ',{ ' ' : isShowFlower},{ '-rotate-45' : !isShowFlower}]"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import i18n from '../i18n';

import moment from '../plugins/moment.js';

import { Vika } from "@vikadata/vika";
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const flowerDatasheet = vika.datasheet("dstWiE1VQtfqqdK3Xj");
const growthDatasheet = vika.datasheet("dstreYQWfqDMRiD1W3");


export default {
  name: 'Flower_1',
  inject: ['app'],
  data() {
    return {
      isGetFinish: false,
      isGet: false,
      moment: moment, // 时间格式化

      isShowFlower: false,
      flowerData: null,
      growthData: null,
      dayMaxGrowth : 24,

      todayWater: 0,
      todayLove: 0,
      todaySun: 0,
      todayNutrition: 0,

      isShowFunc: false,
    }
  },
  mounted() {
    this._getGrowthData();
    this._getFlowerData();
  },
  methods: {
    // 设置今日数值
    _setTodayData(data) {
      console.log(data);
      this.todayWater = data.water;
      this.todayLove = data.love;
      this.todaySun = data.sun;
      this.todayNutrition = data.nutrition;
    },

    // 创建一条新的记录
    async _createGrowthData(data) {
      let that = this;

      await growthDatasheet.records.update([
        {
          "recordId": "recmKtgZTf6eH",
          "fields": {
            "water": 12,
            "love": 6,
            "sun": 3,
            "nutrition": 8,
            "date": that.moment().valueOf()
          }
        }
      ]).then(response => {
        if (response.success) {
          let data = response.data.records[0].fields;
          that._setTodayData(data);
          // console.log(data);
        } else {
          console.error(response);
        }
      })
    },

    // 判断growthData的createDate是否是今天
    _isToday(date) {
      // 是否有异常，有则捕捉异常
      try {
        return this.moment(date).format('YYYY-MM-DD') === this.moment().format('YYYY-MM-DD');
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    // 获取成长值数据
    async _getGrowthData() {
      let responseResult = false;
      let that = this;
      that.responseResult = responseResult;
      
      if (this.isGet) {
        return;
      }

      await growthDatasheet.records.query({ 
        viewId: "viwDqyU7g8jmp",
        pageSize: 1,
      }).then(response => {
        if (response.success) {
          that.growthData = response.data.records[0].fields;

          // 判断是否今天，不是则将记录更新为今日，并成长记录
          let today = that._isToday(that.growthData.date);
          if (!today) {
            that._createGrowthData();
            
          } else {
            that._setTodayData(that.growthData);
          }

          // console.log(that.growthData);
        } else {
          console.error(response);
        }
      });

    },


    // 首次访问读取数据
    async _getFlowerData() {
      let responseResult = false;
      let that = this;
      that.responseResult = responseResult;
      
      if (this.isGet) {
        return;
      }

      await flowerDatasheet.records.query({ viewId: "viwDqyU7g8jmp"}).then(response => {
        if (response.success) {
          responseResult = true;
          that.flowerData = response.data.records[0].fields;

          // console.log(response.data);
        } else {
          responseResult = false;
          console.error(response);
        }
      });

      this.isGet = true;

      if (responseResult) {
        this.isGetFinish = true;
        that.isShowFlower = true;
      }
    },

  },
}
</script>


<style lang="scss" scoped>

.opacity0-enter-active {
  opacity: 100;
  transition: opacity 0.3s ease;
  animation: opacity0 .3s ease-out both;
}

.opacity0-leave-active {
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: opacity0 .3s reverse ease-in both;
}

@keyframes opacity0 {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0px);
  }
}


.translateY-enter-active {
  animation: translateY-in .5s ease-out both;
}

.translateY-leave-active {
  animation: translateY-in .5s reverse ease-in both;
}

@keyframes translateY-in {
  0% {
    transform: translateY(360px);
  }
  100% {
    transform: translateY(0px);
  }
}

.func-icon {
  margin: 0 auto;
  width: 36px;
  height: 36px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

// .w {
//   background-image: url(../assets/img/flower/w.png);
// }

// .l {
//   background-image: url(../assets/img/flower/l.png);
// }

// .s {
//   background-image: url(../assets/img/flower/s.png);
// }

// .n {
//   background-image: url(../assets/img/flower/n.png);
// }


.close {
  position: relative;
  width: 32px;
  height: 32px;

  i {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}

.font-color {
  background: linear-gradient(180deg, #ECDDFF 0%, #37007C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.font-color-p {
  color: #747CBF;
}

.growth {
  .icon {
    width: 20px;
    height: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .water {
    // background-image: url(../assets/img/flower/icon_1.png);
  }

  .love {
    // background-image: url(../assets/img/flower/icon_2.png);
  }

  .sun {
    // background-image: url(../assets/img/flower/icon_3.png);
  }

  .nutrition {
    // background-image: url(../assets/img/flower/icon_4.png);
  }

  .progress {
    position: relative;
    padding: 2px;
    width: 100px;
    height: 20px;
    border-radius: 4px;
    background: #f5f5f5;
    box-sizing: border-box;
  }

  .progress-1 {
    position: relative;
    padding: 2px;
    height: 20px;
    border-radius: 4px;
    background: #f5f5f5;
    box-sizing: border-box;
  }


  .progress-t {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .progress-bg {

    height: 100%;
    transition: all 0.3s;
    background: linear-gradient(89.77deg, #ABCDFF 4.17%, #D8A6FF 98.05%);
  }

}

.bg {
  // background-image: url(../assets/img/flower/bg_a1.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.potw {
  width: 80px;
}

.flower {
  width: 100px;
  height: 300px;

  .func-icon {
    width: 36px;
    height: 36px;
  }

  .box-size {
    width: 100%;
    height: 100%;
  }


  .pot11 {
    width: 100%;
    // background-image: url(../assets/img/flower/pot_a1.png);
    background-size: 92px 110px;
    background-position: bottom center;
    background-repeat: no-repeat;
  }

  .f11 {
    width: 100%;
    // background-image: url(../assets/img/flower/f_a1.png);
    background-size: 65px 160px;
    background-position: left -6px bottom 78px;
    background-repeat: no-repeat;
    transition: all 0.5s;
    animation: f111 2s infinite alternate;

    @keyframes f111 {
      0% {
        transform: rotate(0deg) translateX(0px);
      }
      100% {
        transform: rotate(-1deg) translateX(-1px);
      }
    }
  }

  .f22 {
    width: 100%;
    // background-image: url(../assets/img/flower/f_a2.png);
    background-size: 68px 220px;
    background-position: left 32.5px bottom 64px;
    background-repeat: no-repeat;
    transition: all 0.5s;
    animation: f222 3s infinite alternate;

    @keyframes f222 {
      0% {
        transform: rotate(0deg) translateX(0px);
      }
      100% {
        transform: rotate(2deg) translateX(2px);
      }
    }
  }

  .f33 {
    width: 100%;
    // background-image: url(../assets/img/flower/f_a3.png);
    background-size: 68px 145px;
    background-position: left 33px bottom 52px;
    background-repeat: no-repeat;
    transition: all 0.5s;
    animation: f333 2.5s infinite alternate;

    @keyframes f333 {
      0% {
        transform: rotate(0deg) translateX(0px);
      }
      100% {
        transform: rotate(4deg) translateX(3px);
      }
    }
  }

}

.container {
  padding: 0px 12px 0 12px;
}

.container-p {
  padding: 0px 12px 0 12px;
}

</style>