<template>
  <div class="fixed z-50 bottom-0 right-0 flex bg  transition-all duration-75 ease-linear">
    <!-- 数值面板 -->
    <div v-show="isShowFlower" class="growth flex flex-col mb-2 transition-all duration-75 ease-linear">
      <!-- 雨露 -->
      <div class="flex-1 content-center mb-2 text-sm">
        <div class="flex mb-1">
          <div class="icon water mr-1"></div>
          <h3 class="font-color">雨露值</h3>
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
      <div class="flex-1 content-center mb-2 text-sm">
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
      <div class="flex-1 content-center mb-2 text-sm">
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
      <div class="flex-1 content-center mb-2 text-sm transition-all duration-75 ease-linear">
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
    <div v-show="isShowFlower" class="relative container mx-8 self-end">
      <div class="f11 box-size absolute bottom-0 right-0"></div>
      <div class="f22 box-size absolute bottom-0 right-0"></div>
      <div class="f33 box-size absolute bottom-0 right-0" ></div>
      <div class="pot11 box-size absolute bottom-0 right-0" ></div>
    </div>

    <!-- 操作 -->
    <div class="relative">

      <!-- 隐藏按钮 -->
      <div class="absolute right-0">
        <div class="gradient-purple close cursor-pointer" @click="isShowFlower = !isShowFlower">
          <i :class="['ri-arrow-right-line inline-block transition-all duration-75 ease-linear -translate-x-1/2 -translate-y-1/2 ',{ 'rotate-45' : isShowFlower},{ '-rotate-90' : !isShowFlower}]"></i>
        </div>
      </div>


      <!-- 主操作 -->
      <div v-show="isShowFlower" class="flex flex-col justify-end text-sm mr-6">
          <div class="flex-1 ">
            <div class="func-icon w"></div>
            <div class="text-center font-color">胶水</div>
          </div>
          <div class="flex-1 ">
            <div class="func-icon l"></div>
            <div class="text-center font-color">修剪</div>
          </div>
          <div class="flex-1 ">
            <div class="func-icon s"></div>
            <div class="text-center font-color">晒花</div>
          </div>
          <div class="flex-1 ">
            <div class="func-icon n"></div>
            <div class="text-center font-color">施肥</div>
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

      isShowFlower: true,
    }
  },

}
</script>


<style lang="scss" scoped>

.func-icon {
  width: 44px;
  height: 44px;
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
  width: 40px;
  height: 40px;

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

.container {
  width: 120px;
  height: 280px;

  .box-size {
    width: 100%;
    height: 100%;
  }

  .pot {
    width: 100px;
  }

  .pot11 {
    width: 100%;
    background-image: url(../assets/img/flower/pot_a1.png);
    background-size: 100px 115px;
    background-position: bottom center;
    background-repeat: no-repeat;
  }

  .f11 {
    width: 100%;
    background-image: url(../assets/img/flower/f_a1.png);
    background-size: 65px 160px;
    background-position: 6px 40px;
    background-repeat: no-repeat;
    transition: all 0.5s;
    animation: f111 2s infinite alternate;

    @keyframes f111 {
      0% {
        transform: rotate(0deg) translateX(0px);
      }
      100% {
        transform: rotate(-.5deg) translateX(-2px);
      }
    }
  }

  .f22 {
    width: 100%;
    background-image: url(../assets/img/flower/f_a2.png);
    background-size: 68px 220px;
    background-position: 42px 0px;
    background-repeat: no-repeat;
    transition: all 0.5s;
    animation: f222 3s infinite alternate;

    @keyframes f222 {
      0% {
        transform: rotate(0deg) translateX(0px);
      }
      100% {
        transform: rotate(1deg) translateX(2px);
      }
    }
  }

  .f33 {
    width: 100%;
    background-image: url(../assets/img/flower/f_a3.png);
    background-size: 68px 145px;
    background-position: 44px 78px;
    background-repeat: no-repeat;
    transition: all 0.5s;
    animation: f333 5s infinite alternate;

    @keyframes f333 {
      0% {
        transform: rotate(0deg) translateX(0px);
      }
      100% {
        transform: rotate(1deg) translateX(2px);
      }
    }
  }

}

</style>