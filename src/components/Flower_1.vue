<template>
  <div class="fixed bottom-0 left-0 w-full select-none" >
    <div class="container ml-auto mr-auto">
      <!-- 背景模糊层 -->
      <transition name="translateY">
        <div v-if="isShowFlower && flowerData" class="absolute bg-purple-500 -bottom-12 left-0 w-full h-full transition-all duration-75 ease-linear filter blur-3xl"></div>
      </transition>
      <transition name="translateY">
        <div v-if="isShowFlower && flowerData" class="relative ">
          <div class="absolute -bottom-16 -right-0 sm:-right-1 transition-all duration-75 ease-linear flex flex-col">
            <div class="flower relative cursor-pointer filter blur-3xl" >
              <div class="f22 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[5].url : ''})` }"></div>
              <div class="f11 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[6].url : ''})` }"></div>
              <div class="f33 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[7].url : ''})` }"></div>
              <div class="pot11 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[8].url : ''})` }"></div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 主要层 -->
      <transition name="translateY">
        <div v-if="isShowFlower"  :class="['container-p relative  bg  bg-purple-50  bg-opacity-95 backdrop-filter backdrop-grayscale backdrop-blur-3xl backdrop-contrast-200 font-color-p transition-all duration-75 ease-linear   border-purple-400 box-t ']"> 

          <div v-show="isMouseHide" class="absolute w-full">
            <div class="flex absolute mouse-box bg-purple-500 box px-4 py-2  filter blur-lg bg-opacity-30">
              <div class="relative mouse border-2 rounded-full border-purple-400 bg-purple-200">
                <div class="absolute mouse-roller left-1/2 -translate-x-1/2 bg-purple-400">
                  <div class="absolute roller-animation bg-purple-200 left-1/2 -translate-x-1/2" :style="{animationDelay: '0s'}"></div>
                  <div class="absolute roller-animation bg-purple-200 left-1/2 -translate-x-1/2" :style="{animationDelay: '0.15s'}"></div>
                </div>
              </div>
              <span class="pl-3 text-xs">{{ $t('flower.firstHide') }}</span>
            </div>
          </div>

          <div v-show="isMouseHide" class="absolute w-full">
            <div class="flex absolute mouse-box bg-purple-50 box px-4 py-2 left-0  ">
              <div class="relative mouse border-2 rounded-full border-purple-400 bg-purple-200 align-middle">
                <div class="absolute mouse-roller left-1/2 -translate-x-1/2 bg-purple-400">
                  <div class="absolute roller-animation bg-purple-200 left-1/2 -translate-x-1/2" :style="{animationDelay: '0s'}"></div>
                  <div class="absolute roller-animation bg-purple-200 left-1/2 -translate-x-1/2" :style="{animationDelay: '0.3s'}"></div>
                </div>
              </div>

              <div class="flex flex-col roller-arrow ml-0 text-purple-200 ">
                <i class="ri-arrow-down-s-line"></i>
                <i class="ri-arrow-down-s-line"></i>
                <i class="ri-arrow-down-s-line"></i>
              </div>
              
              <div class="ml-2 mr-1 text-xs table text-purple-500">
                <div class="align-middle table-cell">
                  {{ $t('flower.firstHide') }}
                </div>
              </div>



            </div>
          </div>

          <div :class="['flex pr-2 overflow-hidden']">

            <transition name="opacity0" mode="out-in">

              <!-- 操作面板 -->
              <div v-if="isShowFunc" class="w-full bg py-2 ">
                <div class="flex space-x-2 " >

                  <div class="p4" >
                    <div class=" pr-3 border-r border-purple-400 border-opacity-20">
                      <div class="func-icon-1 relative bg rounded-full gradient-green m4 cursor-pointer hover:scale-125 transition-all duration-75 ease-in-out" @click="cultivationHelp">
                        <i class="ri-seedling-fill text-base absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"></i>
                      </div>
                    </div>
                  </div>

                  <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out" @click="sunlight">
                    <span class="func-icon  inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[12].url : ''})` }"></span>
                    <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">{{ $t("flower.sunlight") }}</span>
                  </div>

                  <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out" @click="prune">
                    <span class="func-icon  inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[11].url : ''})` }"></span>
                    <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">{{ $t("flower.prune") }}</span>
                  </div>


                  <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out" @click="watering">
                    <span class="func-icon inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[10].url : ''})` }"></span>
                    <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">{{ $t("flower.watering") }}</span>
                  </div>

                  <div class="cursor-pointer text-sm p4 hover:scale-125 transition-all duration-75 ease-in-out" @click="fertilize">
                    <span class="func-icon  inline-block align-middle" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[13].url : ''})` }"></span>
                    <span class="text-center font-color cursor-pointer ml-2 hidden  sm:inline-block">{{ $t("flower.fertilize") }}</span>
                  </div>

                </div>

              </div>


              <!-- 数值面板 -->
              <div v-else  class="growth flex-1 flex transition-all duration-75 ease-linear gap-x-1 py-2">

                <!-- 阳光 -->
                <div class="flex-1 flex flex-col place-content-center text-sm" >
                  <div class="flex mb-1">
                    <div class="icon sun mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[2].url : ''})` }"></div>
                    <h3 class="">
                      <span class="font-color hidden  sm:inline-block mr-2">
                        {{ $t("flower.sun") }}
                      </span>
                      <span class="text-xs inline-block font-color">
                        {{ isShowFlower ? app.formatNum(flowerData.sunTotal) : 0 }}
                      </span>
                    </h3>

                  </div>

                  <div class="progress-1 w-full text-center border border-gray-300 ">
                    <span class="progress-t text-xs w-full">
                      {{ todaySun }}/{{ dayMaxGrowth }}
                    </span>
                    <div :class="[{'progress-bg-max': todaySun > dayMaxGrowth},{'progress-bg': todaySun <= dayMaxGrowth}]" :style="{ width: `${ todaySun >= dayMaxGrowth ? 100 : todaySun / dayMaxGrowth * 100}%`}"></div>
                  </div>
                </div>


                <!-- 爱心 -->
                <div class="flex-1 flex flex-col place-content-center text-sm" >
                  <div class="flex mb-1">
                    <div class="icon love mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[1].url : ''})` }"></div>
                    <h3 class="">
                      <span class="font-color hidden  sm:inline-block mr-2">
                        {{ $t("flower.love") }}
                      </span>
                      <span class="text-xs inline-block font-color">
                        {{ isShowFlower ? app.formatNum(flowerData.loveTotal) : 0 }}
                      </span>
                    </h3>

                  </div>

                  <div class="progress-1 w-full text-center border border-gray-300 ">
                    <span class="progress-t text-xs w-full">
                      {{ todayLove }}/{{ dayMaxGrowth }}
                    </span>
                    <div :class="[{'progress-bg-max': todayLove > dayMaxGrowth},{'progress-bg': todayLove <= dayMaxGrowth}]" :style="{ width: `${ todayLove >= dayMaxGrowth ? 100 : todayLove / dayMaxGrowth * 100}%`}"></div>
                  </div>
                </div>


                <!-- 雨露 -->
                <div class="flex-1 flex flex-col place-content-center text-sm" >
                  <div class="flex mb-1">
                    <div class="icon water mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[0].url : ''})` }"></div>
                    <h3 class="">
                      <span class="font-color hidden  sm:inline-block mr-2">
                        {{ $t("flower.water") }}
                      </span>
                      <span class="text-xs inline-block font-color">
                        {{ isShowFlower ? app.formatNum(flowerData.waterTotal) : 0 }}
                      </span>
                    </h3>

                  </div>

                  <div class="progress-1 w-full text-center border border-gray-300 ">
                    <span class="progress-t text-xs w-full">
                      {{ todayWater }}/{{ dayMaxGrowth }}
                    </span>
                    <div :class="[{'progress-bg-max': todayWater > dayMaxGrowth},{'progress-bg': todayWater <= dayMaxGrowth}]" :style="{ width: `${ todayWater >= dayMaxGrowth ? 100 : todayWater / dayMaxGrowth * 100}%`}"></div>
                  </div>
                </div>


                <!-- 养分 -->
                <div class="flex-1 flex flex-col place-content-center text-sm" >
                  <div class="flex mb-1">
                    <div class="icon nutrition mr-1" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[3].url : ''})` }"></div>
                    <h3 class="">
                      <span class="font-color hidden  sm:inline-block  mr-2">
                        {{ $t("flower.nutrition") }}
                      </span>
                      <span class="text-xs inline-block font-color">
                        {{ isShowFlower ? app.formatNum(flowerData.nutritionTotal) : 0 }}
                      </span>
                    </h3>

                  </div>

                  <div class="progress-1 w-full text-center border border-gray-300 ">
                    <span class="progress-t text-xs w-full">
                      {{ todayNutrition }}/{{ dayMaxGrowth }}
                    </span>
                    <div :class="[{'progress-bg-max': todayNutrition > dayMaxGrowth},{'progress-bg': todayNutrition <= dayMaxGrowth}]" :style="{ width: `${ todayNutrition >= dayMaxGrowth ? 100 : todayNutrition / dayMaxGrowth * 100}%`}"></div>
                  </div>
                </div>


              </div>

            </transition>

            <!-- 花 -->

              
            <div class="h-0 potw">
              <div class="absolute -bottom-1 -right-0 sm:-right-1 transition-all duration-75 ease-linear flex flex-col">

                <div class="flower relative cursor-pointer" @click="isShowFunc = !isShowFunc">
                  <div class="f22 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[5].url : ''})` }"></div>
                  <div class="f11 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[6].url : ''})` }"></div>
                  <div class="f33 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[7].url : ''})` }"></div>
                  <div class="pot11 box-size absolute bottom-0 right-0" :style="{ backgroundImage: `url(${isShowFlower ? flowerData.flower_img[8].url : ''})` }"></div>

                  <div v-for="item in _randomNum" :key="item" class="absolute star" :style="[{
                    backgroundImage: `url(${isShowFlower && flowerData ? flowerData.flower_img[9].url : ''})` },
                    { width: `${_getRandom(16,24)}px` },
                    { height: `${_getRandom(18,26)}px` },
                    { top: `${_getRandom(12,280)}px` },
                    { left: `${_getRandom(4,96)}px` },
                    { animation: `star-s ` + `${_getRandomFloat(2.5,4)}s  infinite alternate` }]" ></div>
                  
                  <transition name="guide-opa">
                    <div v-if="isGuide " @click="isGuide = false;_isUpdate('nutrition', 1)" class="absolute w-full h-full">
                        <div class="guide bg absolute"  :style="[{
                      backgroundImage: `url(${isShowFlower && flowerData ? flowerData.flower_img[15].url : ''})` }]"></div>
                      </div>
                  </transition>
                </div>

                <div id="fpop"></div>
  
              </div>
            </div>

          </div>
            
        </div>
      </transition>

      <!-- 隐藏按钮 -->
      <transition name="translateX" mode="out-in">
        <div v-if="isShowFlower && isGetFinish " class="absolute bottom-4 -right-5 text-lg">
          <div class="gradient-yellow close cursor-pointer rounded-tl-full rounded-bl-full " @click="toggleFlower">
              <i :class="['ri-sun-foggy-fill ri-drizzle-fill inline-block -translate-y-1/2']"></i>
          </div>
        </div>
        <div v-else class="absolute bottom-4 -right-5">
          <div class="gradient-drill close cursor-pointer rounded-tl-full rounded-bl-full " @click="toggleFlower">
              <i :class="['ri-drizzle-fill inline-block -translate-y-1/2']"></i>
          </div>
        </div>
      </transition>
    </div>

  </div>

  <!-- 弹窗提示 -->
  <Teleport to="body">
    <Pop :show="showPop">
      <template #header>
        <div class="text-center">{{ popHeader }}</div>
      </template>
      <template #body>
        <div class="text-center px-2" v-html="popBody"></div>
      </template>
      <template #footer>
        <div class="text-center">
          <button :class="['border-2 border-black dark:border-slate-600 px-4 py-1 box cursor-pointer']" @click="showPop = false;">
            {{ popFooter }}
          </button>
        </div>

      </template>
    </Pop>
  </Teleport>

</template>

<script>
import i18n from '../i18n';
import Pop from '../components/Pop.vue';

import moment from '../plugins/moment.js';
import { showDialog } from '../plugins/showDialog.js';


import { Vika } from "@vikadata/vika";
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const flowerDatasheet = vika.datasheet("dstWiE1VQtfqqdK3Xj");
const growthDatasheet = vika.datasheet("dstreYQWfqDMRiD1W3");


export default {
  name: 'Flower_1',
  inject: ['app'],
  provide() {
    return {
      flower: this
    }
  },
  components: {
    Pop
  },
  data() {
    return {
      showDialog: showDialog,
      isGetFinish: false,
      isGet: false,
      moment: moment, // 时间格式化
      showPop: false, // 是否显示弹窗
      popHeader: '',
      popBody: '',
      popFooter: '',
      isGuide: true, // 是否显示引导
      isMouseHide: true, // 滚动隐藏

      isShowFlower: false,
      isToggle: false,
      flowerData: null,
      growthData: null,
      dayMaxGrowth : 24,

      todayWater: 0,
      todayLove: 0,
      todaySun: 0,
      todayNutrition: 0,

      isShowFunc: false,

      _randomNum: 1,

    }
  },
  async mounted() {
    await this._getGrowthData();
    await this._getFlowerData();
    this._randomNum = this._getRandom(9, 12);
  },
  methods: {

    // 栽培帮助
    cultivationHelp() {
      this._setShowPop(
        i18n.t("flower._.cultivation_help"), 
        i18n.t("flower._.cultivation_help_body"), 
        i18n.t("flower._.cultivation_help_know"))
    },

    // 设置POP提示
    _setShowPop(header, body, footer) {
      this.popHeader = header;
      this.popBody = body;
      this.popFooter = footer;
      this.showPop = true;
    },

    watering () {
      let status = this._update('water');
      status.then(res => {
        if (res) {
          
        } else {
          this._setShowPop(
            i18n.t("flower._.watering_fail"), 
            i18n.t("flower._.watering_fail_body"), 
            i18n.t("flower._.dnt"))
            this.showPop = true;
        }
      })
    },

    prune () {
      let status = this._update('love');
      status.then(res => {
        if (res) {
          
        } else {
          this._setShowPop(
            i18n.t("flower._.prune_fail"), 
            i18n.t("flower._.prune_fail_body"), 
            i18n.t("flower._.dnt"))
            this.showPop = true;
        }
      })
    },

    sunlight () {
      let status = this._update('sun');
      status.then(res => {
        if (res) {
          
        } else {
        this._setShowPop(
          i18n.t("flower._.sunlight_fail"), 
          i18n.t("flower._.sunlight_fail_body"), 
          i18n.t("flower._.dnt"))
          this.showPop = true;
        }
      })

    },

    fertilize () {
      let status = this._update('nutrition');
      status.then(res => {
        if (res) {
          
        } else {
          this._setShowPop(
            i18n.t("flower._.fertilize_fail"), 
            i18n.t("flower._.fertilize_fail_body"), 
            i18n.t("flower._.dnt"))
            this.showPop = true;
        }
      })
    },

    _update (type) {
      let that = this;
      let status = null;

      // 判断localstorage是否有flowerDate值,如果有则判断日期是否等于今日，如果没有则新建一个今日的日期
      let flowerDate = localStorage.getItem('flowerDate');
      if (flowerDate == moment().format('YYYY-MM-DD')) {
        status = that._isUpdate(type, 1, true);
      } else {
        localStorage.setItem("flowerDate", moment().format("YYYY-MM-DD"));
        status = that._isUpdate(type, 1, true)
      }
      return status;
    },

    
    async _isUpdate (type, addNum, record) {
      let that = this;
      let data = null;
      record = record || false;
      this.isShowFlower = true;

      if (that.flowerData) {
        switch (type) {
          case 'water':
            // 判断localstorage是否有water值
            data = localStorage.getItem('water');
            if (parseInt(data) === 1) {
              return false;
            } else {
              if (record) localStorage.setItem("water", 1);
              that.updateGrowthData({ 'water': that.todayWater + addNum }, addNum, 0);
              that.updateFlowerData({ 'waterTotal': that.flowerData.waterTotal + addNum });
              return true;
            }
            break;
          case 'love':
            // 判断localstorage是否有love值
            data = localStorage.getItem('love');
            if (parseInt(data) === 1) {
              return false;
            } else {
              if (record) localStorage.setItem("love", 1);
              that.updateGrowthData({ 'love': that.todayLove + addNum }, addNum, 1);
              that.updateFlowerData({ 'loveTotal': that.flowerData.loveTotal + addNum });
              return true;
            }
            break;
          case 'sun':
            // 判断localstorage是否有sun值
            data = localStorage.getItem('sun');
            if (parseInt(data) === 1) {
              return false;
            } else {
              if (record) localStorage.setItem("sun", 1);
              that.updateGrowthData({ 'sun': that.todaySun + addNum }, addNum, 2);
              that.updateFlowerData({ 'sunTotal': that.flowerData.sunTotal + addNum });
              return true;
            }
            break;
          case 'nutrition':
            // 判断localstorage是否有nutrition值
            data = localStorage.getItem('nutrition');
            if (parseInt(data) === 1) {
              return false;
            } else {
              if (record) localStorage.setItem("nutrition", 1);
              that.updateGrowthData({ 'nutrition': that.todayNutrition + addNum }, addNum, 3);
              that.updateFlowerData({ 'nutritionTotal': that.flowerData.nutritionTotal + addNum });
              return true;
            }
            break;
          default:
            break;
        }
      }


    },

    async updateGrowthData (object, addNum, fType) {
      let that = this;
      let str = await Object.keys(object)[0];
      str = str.replace(str[0],str[0].toUpperCase());

      await growthDatasheet.records.update([
        {
          "recordId": "recmKtgZTf6eH",
          "fields": object
        }
      ]).then(response => {
        if (response.success) {
          // console.log(response.data);
          that.growthData = response.data.records[0].fields;
          that._setTodayData(that.growthData);
          that.showDialog(that.flowerData, addNum, fType);
        } else {
          console.error(response);
        }
      })
    },

    async updateFlowerData (object) {
      let that = this;
      // let str = await Object.keys(object)[0];
      // str = str.replace(str[0],str[0].toUpperCase());

      await flowerDatasheet.records.update([
        {
          "recordId": "recmKtgZTf6eH",
          "fields": object
        }
      ]).then(response => {
        if (response.success) {
          // console.log(response.data);
          that.flowerData = response.data.records[0].fields;
          // that[`feedback${str}`] = addNum;
        } else {
          console.error(response);
        }
      })
    },

    // 切换isShowFlower状态，1.5s
    toggleFlower() {
      if (!this.flowerData) {
        return;
      }
      
      if (this.isToggle) return;
      this.isToggle = true;
      this.isShowFlower = !this.isShowFlower;
      setTimeout(() => {
        this.isToggle = false;
      }, 1500);
    },
    // 创建一个结果随机数
    _getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 创建一个两位小数的随机数
    _getRandomFloat(min, max) {
      return (Math.random() * (max - min + 1) + min).toFixed(2);
    },

    // 设置今日数值
    _setTodayData(data) {
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
            "water": 0,
            "love": 0,
            "sun": 0,
            "nutrition": 0,
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
        that.isGetFinish = true;
        that.isShowFlower = true;

        // 判断loclstrage中是否有visitsDate字段，字段的日期是否等于今日
        if (localStorage.getItem('visitorDate') !== moment().format('YYYY-MM-DD')) {

            localStorage.setItem('water', 0);
            localStorage.setItem('love', 0);
            localStorage.setItem('sun', 0);
            localStorage.setItem('nutrition', 0);
            // that._isUpdate('sun', 1);
            // that.updateGrowthData({ 'sun': that.todaySun + 1 });
            // that.updateFlowerData({ 'sunTotal': that.flowerData.sunTotal + 1 });
        }
      }
    },

  },
}
</script>


<style lang="scss" scoped>


.mouse-box {
  left: -12px;
  top: -40px;
  // z-index: 2000;

  span {
    white-space:nowrap;
  }

  .mouse {
    width: 16px;
    height: 22px;
  }

  .mouse-roller {
    width: 2px;
    height: 8px;
    overflow: hidden;
    border-radius: 1px;
    top: 3px;
  }

  .roller-animation {
    width: 10px;
    height: 2px;
    // border-radius: 1px;
    animation: roller-animation 1.2s linear infinite;
  }

  .roller-arrow {
    width: 16px;
    i {
      position: absolute;
    }

    :nth-child(1) {
      top: 2px;
      animation: roller-arrow-animation 1s 0s linear infinite;
    }
    :nth-child(2) {
      top: 7px;
      animation: roller-arrow-animation 1s .2s linear infinite;
    }
    :nth-child(3) {
      top: 12px;
      animation: roller-arrow-animation 1s .4s linear infinite;
    }
  }

  @keyframes roller-animation {
    0% {
      transform: translateY(-4px) translateX(-25%);
    }
    100% {
      transform: translateY(10px) translateX(-25%);
    }
  }

  @keyframes roller-arrow-animation {
    0% {
      color:rgb(233,213,255,1)
    }
    50% {
      color:rgb(168,85,247,1)
    }
    80% {
      color:rgb(233,213,255,1)
    }
  }
}

.guide-opa-enter-active {
  animation: guide-opa-in .5s ease-out both;
  -webkit-animation: guide-opa-in .5s ease-out both;
  -moz-animation: guide-opa-in .5s ease-out both;
  -ms-animation: guide-opa-in .5s ease-out both;
  -o-animation: guide-opa-in .5s ease-out both;
  animation: guide-opa-in .5s ease-out both;
}

.guide-opa-leave-active {
  animation: guide-opa-in .5s ease-in both;
  -webkit-animation: guide-opa-in .5s ease-in both;
  -moz-animation: guide-opa-in .5s ease-in both;
  -ms-animation: guide-opa-in .5s ease-in both;
  -o-animation: guide-opa-in .5s ease-in both;
  animation: guide-opa-in .5s ease-in both;
}

@keyframes guide-opa-in {
  0% {
    opacity: 100;
  }
  100% {
    opacity: 0;
  }
}

.guide {
  width: 64px;
  height: 64px;
  top: 70%;
  left: 40%;
  transition: all 0.20s;
  
  animation: guide-in 4.5s ease-in-out reverse infinite;
}

@keyframes guide-in {
  0% {
    transform: translateY(0) translateX(0%) rotate(12deg);
  }
  50% {
    transform: translateY(-2px) translateX(-2px) rotate(12deg);
  }
  100% {
    transform: translateY(0) translateX(0%) rotate(12deg);
  }
}

.translateYPOP-enter-active {
  animation: translateYPOP-in .5s ease-out both;
  -webkit-animation: translateYPOP-in .5s ease-out both;
  -moz-animation: translateYPOP-in .5s ease-out both;
  -ms-animation: translateYPOP-in .5s ease-out both;
  -o-animation: translateYPOP-in .5s ease-out both;
  animation: translateYPOP-in .5s ease-out both;
}

.translateYPOP-leave-active {
  animation: translateYPOP-in .5s 0s reverse ease-in both;
  -webkit-animation: translateYPOP-in .5s 0s reverse ease-in both;
  -moz-animation: translateYPOP-in .5s 0s reverse ease-in both;
  -ms-animation: translateYPOP-in .5s 0s reverse ease-in both;
  -o-animation: translateYPOP-in .5s 0s reverse ease-in both;
  animation: translateYPOP-in .5s 0s reverse ease-in both;
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


.opacity0-enter-active {
  transition: all 0.3s ease;
  animation: opacity0 .3s ease-out both;
  -webkit-animation: opacity0 .3s ease-out both;
  -moz-animation: opacity0 .3s ease-out both;
  -ms-animation: opacity0 .3s ease-out both;
  -o-animation: opacity0 .3s ease-out both;
  animation: opacity0 .3s ease-out both;
}

.opacity0-leave-active {
  transition: all 0.3s ease;
  animation: opacity0 .3s reverse ease-in both;
  -webkit-animation: opacity0 .3s reverse ease-in both;
  -moz-animation: opacity0 .3s reverse ease-in both;
  -ms-animation: opacity0 .3s reverse ease-in both;
  -o-animation: opacity0 .3s reverse ease-in both;
  animation: opacity0 .3s reverse ease-in both;
}

@keyframes opacity0 {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100% {
    opacity: 100;
    transform: translateX(0px);
  }
}

.translateX-enter-active {
  animation: translateX-in 0.75s ease-out both;
  -webkit-animation: translateX-in 0.75s ease-out both;
  -moz-animation: translateX-in 0.75s ease-out both;
  -ms-animation: translateX-in 0.75s ease-out both;
  -o-animation: translateX-in 0.75s ease-out both;
  animation: translateX-in 0.75s ease-out both;
}

.translateX-leave-active {
  animation: translateX-in 0.75s reverse ease-in both;
  -webkit-animation: translateX-in 0.75s reverse ease-in both;
  -moz-animation: translateX-in 0.75s reverse ease-in both;
  -ms-animation: translateX-in 0.75s reverse ease-in both;
  -o-animation: translateX-in 0.75s reverse ease-in both;
  animation: translateX-in 0.75s reverse ease-in both;
}

@keyframes translateX-in {
  0% {
    transform: translateX(80px);
  }

  80% {
    transform: translateX(-4px);
  }

  100% {
    transform: translateX(0);
  }

}


.translateY-enter-active {
  animation: translateY-in 1.5s ease-out both;
  -webkit-animation: translateY-in 1.5s ease-out both;
  -moz-animation: translateY-in 1.5s ease-out both;
  -ms-animation: translateY-in 1.5s ease-out both;
  -o-animation: translateY-in 1.5s ease-out both;
  animation: translateY-in 1.5s ease-out both;
}

.translateY-leave-active {
  animation: translateY-in 1.5s reverse ease-in both;
  -webkit-animation: translateY-in 1.5s reverse ease-in both;
  -moz-animation: translateY-in 1.5s reverse ease-in both;
  -ms-animation: translateY-in 1.5s reverse ease-in both;
  -o-animation: translateY-in 1.5s reverse ease-in both;
  animation: translateY-in 1.5s reverse ease-in both;
}

@keyframes translateY-in {
  0% {
    opacity: 0;
    transform: translateY(320px);
  }
  100% {
    opacity: 100;
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

.func-icon-1 {
  width: 28px;
  height: 28px;
}


.close {
  position: relative;
  width: 60px;
  height: 32px;

  i {
    position: relative;
    top: 50%;
    left: 25%;
    transition: all 1.5s linear;
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

.icon {
  width: 20px;
  height: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.growth {

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

  .progress-bg-max {

    height: 100%;
    transition: all 0.3s;
    background: linear-gradient(89.77deg, #ffd57b 4.17%, #ff97a5 98.05%);
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

  .star {
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    // animation: star-s 2.5s infinite alternate;
    // -webkit-animation: star-s 2.5s infinite alternate;
    // -moz-animation: star-s 2.5s infinite alternate;
    // -ms-animation: star-s 2.5s infinite alternate;
    // -o-animation: star-s 2.5s infinite alternate;
    // animation: star-s 2.5s infinite alternate;


  }

}


</style>