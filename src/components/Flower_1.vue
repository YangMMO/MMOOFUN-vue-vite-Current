<template>
  <div class="sm:fixed hidden z-50 bottom-0 right-0 flex bg  transition-all duration-75 ease-linear select-none bg-gray-50 bg-opacity-90 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 p12">    
    <!-- 数值面板 -->
    <div v-show="isShowFlower" class="growth flex flex-col transition-all duration-75 ease-linear">
      <!-- 雨露 -->
      <div class="flex-1 flex flex-col place-content-center text-sm" >
        <div class="flex mb-1">
          <div class="icon water mr-1"></div>
          <h3 class="font-color ">雨露值</h3>
        </div>

        <div class="font-color-p flex items-center mb-1">
          <span class="align-middle mr-1">今日</span>
          <div class="progress text-center py-0.5 border border-gray-200 ">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>

        <div class="font-color-p text-sm">
          <span class="mr-1">总值</span>
          <span>8703</span>
        </div>
      </div>

      <!-- 爱心 -->
      <div class="flex-1 flex flex-col place-content-center text-sm">
        <div class="flex mb-1">
          <div class="icon love mr-1"></div>
          <h3 class="font-color">爱心值</h3>
        </div>

        <div class="font-color-p flex items-center mb-1">
          <span class="align-middle mr-1 ">今日</span>
          <div class="progress text-center py-0.5 border border-gray-200">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>

        <div class="font-color-p ">
          <span class="mr-1">总值</span>
          <span>8703</span>
        </div>
      </div>

      <!-- 阳光 -->
      <div class="flex-1 flex flex-col place-content-center text-sm">
        <div class="flex mb-1">
          <div class="icon sun mr-1"></div>
          <h3 class="font-color">阳光值</h3>
        </div>

        <div class="font-color-p flex items-center mb-1">
          <span class="align-middle mr-1 ">今日</span>
          <div class="progress text-center py-0.5 border border-gray-200">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>

        <div class="font-color-p  ">
          <span class="mr-1">总值</span>
          <span>8703</span>
        </div>
      </div>

      <!-- 养分 -->
      <div class="flex-1 flex flex-col place-content-center text-sm">
        <div class="flex mb-1">
          <div class="icon nutrition mr-1"></div>
          <h3 class="font-color">营养值</h3>
        </div>

        <div class="font-color-p flex items-center mb-1">
          <span class="align-middle mr-1 ">今日</span>
          <div class="progress text-center py-0.5 border border-gray-200">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>

        <div class="font-color-p  ">
          <span class="mr-1">总值</span>
          <span>8703</span>
        </div>
      </div>

    </div>

    <!-- 花 -->
    <div v-show="isShowFlower"  class="relative flower mx-8 self-end">
      <!-- <div class="relative container mx-8 self-end"> -->
        <div class="f22 box-size absolute bottom-0 right-0"></div>
        <div class="f11 box-size absolute bottom-0 right-0"></div>
        <div class="f33 box-size absolute bottom-0 right-0" ></div>
        <div class="pot11 box-size absolute bottom-0 right-0" ></div>
      <!-- </div> -->
    </div>

    <!-- 操作 -->
    <div class="growth flex flex-col transition-all duration-75 ease-linear">
      <!-- 隐藏按钮 -->
      <div class="">
        <div class="gradient-purple close cursor-pointer float-right rounded-full" @click="isShowFlower = !isShowFlower">
          <i :class="['ri-subtract-line inline-block transition-all duration-75 ease-linear -translate-x-1/2 -translate-y-1/2 ',{ ' ' : isShowFlower},{ '-rotate-45' : !isShowFlower}]"></i>
        </div>
      </div>

      <!-- 主操作 -->
      <div v-show="isShowFlower"  class="flex-1 content-end mb-2 text-sm flex flex-col  sm:pr-6" >

        <div class="flex-1 flex flex-col place-content-end hover:scale-105 active:scale-100">
          <div class="func-icon w cursor-pointer"></div>
          <div class="text-center font-color cursor-pointer">浇花</div>
        </div>
        <div class="flex-1 flex flex-col place-content-end hover:scale-105 active:scale-100">
          <div class="func-icon l cursor-pointer"></div>
          <div class="text-center font-color cursor-pointer">修剪</div>
        </div>
        <div class="flex-1 flex flex-col place-content-end hover:scale-105 active:scale-100">
          <div class="func-icon s cursor-pointer"></div>
          <div class="text-center font-color cursor-pointer">晒花</div>
        </div>
        <div class="flex-1 flex flex-col place-content-end hover:scale-105 active:scale-100 ">
          <div class="func-icon n cursor-pointer"></div>
          <div class="text-center font-color cursor-pointer">施肥</div>
        </div>

      </div>

    </div>

  </div>

  <div class="fixed bg w-full bottom-0 left-0 bg-gray-50 bg-opacity-90 backdrop-filter backdrop-grayscale backdrop-blur-md backdrop-contrast-200 font-color-p ">
    <div class="flex">
      <!-- 数值面板 -->
      <div v-show="isShowFlower" class="growth p4 flex-1 flex transition-all duration-75 ease-linear gap-x-1">
        <!-- 雨露 -->
        <div class="flex-1 flex flex-col place-content-center text-sm" >
          <div class="flex mb-1">
            <div class="icon water mr-1"></div>
            <h3 class="font-color ">
              <span>雨露值</span>
              <span class="text-xs inline-block">(8703)</span>
            </h3>

          </div>

          <div class="progress-1 w-full text-center border border-gray-200 ">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>

        <!-- 爱心 -->
        <div class="flex-1 flex-col place-content-center text-sm" >
          <div class="flex mb-1">
            <div class="icon love mr-1"></div>
            <h3 class="font-color ">
              <span>雨露值</span>
              <span class="text-xs inline-block">(8703)</span>
            </h3>

          </div>

          <div class="progress-1 w-full text-center border border-gray-200 ">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>


        <!-- 阳光 -->
        <div class="flex-1 flex-col place-content-center text-sm" >
          <div class="flex mb-1">
            <div class="icon sun mr-1"></div>
            <h3 class="font-color ">
              <span>阳光值</span>
              <span class="text-xs inline-block">(8703)</span>
            </h3>

          </div>

          <div class="progress-1 w-full text-center border border-gray-200 ">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>



        <!-- 养分 -->
        <div class="flex-1 flex-col place-content-center text-sm" >
          <div class="flex mb-1">
            <div class="icon nutrition mr-1"></div>
            <h3 class="font-color ">
              <span>营养值</span>
              <span class="text-xs inline-block">(8703)</span>
            </h3>

          </div>

          <div class="progress-1 w-full text-center border border-gray-200 ">
            <span class="progress-t text-xs">10/24</span>
            <div class="progress-bg"></div>
          </div>
        </div>


      </div>
      <!-- 花 -->
      <div v-show="isShowFlower"  class="h-0 potw">
        <div class="absolute flower bottom-0 right-0">
          <div class="f22 box-size absolute bottom-0 right-0"></div>
          <div class="f11 box-size absolute bottom-0 right-0"></div>
          <div class="f33 box-size absolute bottom-0 right-0" ></div>
          <div class="pot11 box-size absolute bottom-0 right-0" ></div>
        </div>
      </div>

      <!-- 隐藏按钮 -->
      <div class="absolute bottom-0 right-0">
        <div class="gradient-purple close cursor-pointer float-right " @click="isShowFlower = !isShowFlower">
          <i :class="['ri-subtract-line inline-block transition-all duration-75 ease-linear -translate-x-1/2 -translate-y-1/2 ',{ ' ' : isShowFlower},{ '-rotate-45' : !isShowFlower}]"></i>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import i18n from '../i18n';

export default {
  name: 'Flower_1',
  inject: ['app'],
  data() {
    return {
      // isGetFinish: false,
      // isGet: false,

      isShowFlower: false,
    }
  },

}
</script>


<style lang="scss" scoped>

.func-icon {
  margin: 0 auto;
  width: 32px;
  height: 32px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.w {
  background-image: url(../assets/img/flower/w.png);
}

.l {
  background-image: url(../assets/img/flower/l.png);
}

.s {
  background-image: url(../assets/img/flower/s.png);
}

.n {
  background-image: url(../assets/img/flower/n.png);
}


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
    background-image: url(../assets/img/flower/icon_1.png);
  }

  .love {
    background-image: url(../assets/img/flower/icon_2.png);
  }

  .sun {
    background-image: url(../assets/img/flower/icon_3.png);
  }

  .nutrition {
    background-image: url(../assets/img/flower/icon_4.png);
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
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    background: linear-gradient(89.77deg, #ABCDFF 4.17%, #D8A6FF 98.05%);
  }

}

.bg {
  background-image: url(../assets/img/flower/bg_a1.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.potw {
  width: 100px;
}

.flower {
  width: 100px;
  height: 300px;

  .box-size {
    width: 100%;
    height: 100%;
  }


  .pot11 {
    width: 100%;
    background-image: url(../assets/img/flower/pot_a1.png);
    background-size: 92px 110px;
    background-position: bottom center;
    background-repeat: no-repeat;
  }

  .f11 {
    width: 100%;
    background-image: url(../assets/img/flower/f_a1.png);
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
    background-image: url(../assets/img/flower/f_a2.png);
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
    background-image: url(../assets/img/flower/f_a3.png);
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

</style>