<template>

  <div class="container bg-animate mx-auto bg-white dark:bg-gray-800 transition-all duration-200">
    <div class="header relative select-none">
      <div class="flex-header title box ">
        <router-link class="home box flex items-center shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 font-semibold cursor-pointer transition-all " to="/">
          <img src="./assets/img/mmo.jpg" alt="">
          <span class="hidden sm:block text-black dark:text-white transition-all duration-200">MMOO.FUN</span>
        </router-link>

        <!-- 语言 -->
        <div
          class="flex-header fun lua box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all"
          @click="switchLang()">
          <i class="ri-globe-line"></i>
        </div>


        <!-- 主题 -->
        <div
          class="flex-header fun box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all"
          @click="themesMode()">
          <Transition name="switch-theme">
            <i class="ri-sun-line absolute" v-if="theme === 'light'"></i>
            <i class="ri-moon-line absolute" v-else-if="theme === 'dark'"></i>
          </Transition>
        </div>


      </div>

      <div class="menu-fun">

        <!-- 菜单 -->
        <div
          :class="['flex-header flex-col menu  shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 font-semibold relative transition-all duration-200 box overflow-hidden']"
           @click="isActiveMenu = true" @mouseenter="isActiveMenu = !isActiveMenu" @mouseleave="isActiveMenu = false"
>
          
          <!-- <div
            class="flex-header flex-col menu relative box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all font-semibold "
            @click.stop="isActiveMenu = true"> -->
          <div class="flex items-center show-menu ">
            <span class="">{{ $t("menu.menu") }}</span>
            <i class="ri-menu-2-line"></i>
          </div>
          <nav v-show="isActiveMenu"
            :class="['show-list flex flex-col w-full border-gray-900 border-t-2 dark:border-white transition-all duration-200  bg-white dark:bg-gray-800 ', { 'box-b': isActiveMenu }]">

            <div v-for="item in routes" :key="item" @click.stop="isActiveMenu = false">
              <router-link v-if="item.menu" :to="item.path"
                class=" hover:text-red-300 dark:hover:text-indigo-300 w-full inline-block text-black dark:text-white transition-all duration-200">
                {{ $t(`menu.${item.name.toLocaleLowerCase()}`) }}
              </router-link>
            </div>

          </nav>

        </div>
      </div>

    </div>
  </div>

  <!-- <perfect-scrollbar class="relative h-screen mx-auto mask-img-top"> -->
  <div class=" mx-auto mask-img-top transition-all duration-1000">
    <!-- 路由页面 -->
    <router-view class="transition-all duration-1000" />

    <!-- 页脚 -->
    <div class="footer container mx-auto">
      <div class="container">
        <div class=" border-t text-xs text-slate-400 text-center cursor-default">
          <span>©2018-{{ moment().format("YYYY") }} MMOO.FUN </span>
          <a class="text-slate-400" href="https://beian.miit.gov.cn/">粤ICP备17077157号</a>
        </div>
      </div>
    </div>
  </div>

  <!-- 装饰元素 -->
  <div class="h-screen fixed w-full top-0 decorate">
    <div class="sphere1"
      :style="[{ width: _innerWidth * 0.81 + 'px' }, { height: _innerWidth * 0.81 + 'px' }, { top: -(_innerWidth * 0.57) + 'px' }, { right: -(_innerWidth * 0.28) + 'px' }]">
    </div>
    <div class="sphere2"
      :style="[{ width: _innerWidth * 0.41 + 'px' }, { height: _innerWidth * 0.41 + 'px' }, { bottom: -(_innerWidth * 0.16) + 'px' }, { left: -(_innerWidth * 0.07) + 'px' }]">
    </div>
    <div class="sphere3"
      :style="[{ width: _innerWidth * 0.3 + 'px' }, { height: _innerWidth * 0.3 + 'px' }, { bottom: -(_innerWidth * 0.105) + 'px' }, { right: -(_innerWidth * 0.06) + 'px' }]">
    </div>
    <!-- <div class="sphere1"></div> -->
    <!-- <div class="sphere2"></div> -->
    <!-- <div class="sphere3"></div> -->
  </div>
  <!-- </perfect-scrollbar> -->

  <Flower1 ref="fl"></Flower1>

</template>

<script>
import i18n from "./i18n"
import routers from "./router"

import moment from "./plugins/moment"

import Flower1 from './components/Flower_1.vue'

import { Vika } from "@vikadata/vika";
const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const webDatasheet = vika.datasheet("dstG8GQp2tuf0ZoqG2");

export default {
  name: 'App',
  components: {
    Flower1
  },
  provide() {
    return {
      app: this
    }
  },
  data() {
    return {
      theme: 'light',
      lang: 'cn',
      isActiveMenu: false,
      routes: routers.options.routes,
      _innerWidth: window.innerWidth,
      _scrollTop: window.scrollY,
      moment: moment,
      visitor: 0,
      isVisits: false,
      firstVisit: true
    }
  },
  created() {
    // this._focus()
    let that = this
    window.addEventListener("resize", this._resize);
    window.addEventListener("scroll", that._scroll);
  },
  async mounted() {
    let that = this;
    // 判断loclstrage中是否有visitsDate字段，字段的日期是否等于今日
    if (localStorage.getItem('visitorDate') !== moment().format('YYYY-MM-DD')) {
      // 更新visitsDate字段为今日日期
      localStorage.setItem('visitorDate', moment().format('YYYY-MM-DD'));
      setTimeout(() => {
        that.$refs.fl._isUpdate('sun', 2)
      }, 2000);

      setTimeout(() => {
        that.$refs.fl._isUpdate('love', 1)
      }, 6000);

      setTimeout(() => {
        that.$refs.fl._isUpdate('water', 1)
      }, 10000);

      // 更新
      this.isVisits = true;
    }

    // setTimeout(() => {
    //   that.$refs.fl.isShowFlower = false
    // }, 10000);
    
    this._visitor();

  },
  unmounted() {
    window.removeEventListener("resize", this._resize);
    window.removeEventListener("scroll", this._scroll);
  },
  methods: {
    // 提交一次访问记录
    async _visitor() {
      let that = this;
      await webDatasheet.records.query({ viewId: "viwyauFQyYRvf"}).then(response => {
        if (response.success) {
          let web = response.data.records[0];
          that.visitor = web.fields.visitor;

          if (!that.isVisits) {
            return;
          }

          webDatasheet.records.update([{
              "recordId": "recf87XyUxcH4",
              "fields": {
                "visitor": web.fields.visitor + 1
              }
            }
          ]).then(response => {
            if (response.success) {
              that.visitor = web.fields.visitor + 1;

              // console.log("提交成功");
              // console.log(response.data);
            } else {
              console.error(response);
            }
          })

          // console.log(web);
        } else {
          console.error(response);
        }
      });
    },

    // 根据页面宽度计算出元素的宽度
    _resize() {
      this._innerWidth = window.innerWidth
    },

    _scroll() {
      let that = this;
      that._scrollTop = window.scrollY
      if (that.firstVisit && that._scrollTop >= 400) {
        that.firstVisit = false
        that.$refs.fl.isShowFlower = false
      }
    },

    // 切换语言
    switchLang() {
      let newLang = i18n.getLocale() === 'en' ? 'cn' : 'en'
      i18n.setLocale(newLang)
      this.lang = newLang
    },

    // 切换主题
    themesMode() {
      if (this.theme === 'light') {
        this.theme = 'dark'
        const clsList = document.documentElement.classList;
        if(!clsList.contains('dark')) {
          document.documentElement.classList.add('dark');
        }
      } else {
        this.theme = 'light'
        document.documentElement.classList.remove('dark')
      }

      // console.log(this.theme);
    },

    // 点击菜单
    onClickMenu () {
      this.isActiveMenu = !this.isActiveMenu
    },

    _goTop(node) {
      let that = this;
      let top = window.document.getElementById(node).offsetTop - 10;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-window.scrollY / 3);
        document.documentElement.scrollTop = document.body.scrollTop =
          that._scrollTop + ispeed;
        if (that._scrollTop <= top) {
          clearInterval(timer);
        }
      }, 10);
    }
  },
}
</script>

<style lang="scss">



.bg-animate {
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(./assets/img/resume_bg.png) center;
    // animation: pulse 5s infinite;
    opacity: 0.3;
  }

  // @keyframes pulse {
  //   0% {
  //     opacity: .4;
  //   }

  //   50% {
  //     opacity: .8;
  //   }

  //   100% {
  //     opacity: .4;
  //   }
  // }

}

.decorate {
  z-index: -9999;
  filter: blur(12px);
}

.sphere1 {
  position: absolute;
  width: 1006px;
  height: 1006px;
  right: -356px;
  top: -720px;
  border-radius: 9999px;
  background: linear-gradient(-45deg, rgba(255, 174, 202, 0.2), rgba(255, 225, 90, 0.2));
  filter: blur(12px);
  
}

.sphere2 {
  position: absolute;
  width: 506px;
  height: 506px;
  left: -100px;
  bottom: -200px;
  background: linear-gradient(-45deg, rgba(201, 255, 140, 0.12), rgba(191, 232, 255, 0.12));
  border-radius: 9999px;
  filter: blur(12px);
}

.sphere3 {
  position: absolute;
  width: 356px;
  height: 356px;
  right: -70px;
  bottom: -120px;
  background: linear-gradient(-60deg, rgba(199, 130, 255, 0.08), rgba(255, 191, 236, 0.08));
  border-radius: 9999px;
  filter: blur(12px);
}



.footer {
  // margin: 12px;
  .container {
    padding: 12px 12px 0 12px;

    div {
      padding: 12px;
    }
  }
}

.bg-stripes-white {
    --stripes-color: hsla(0,0%,100%,0.4);
}

.bg-stripes{
  background-image: linear-gradient(-45deg,var(--stripes-color) 12.5%,transparent 12.5%,transparent 50%,var(--stripes-color) 50%,var(--stripes-color) 62.5%,transparent 62.5%,transparent 100%);
  background-size: 5.66px 5.66px;
}

.switch-theme-enter-active,
.switch-theme-leave-active {
  transition: all 0.25s ease-out;
}

.switch-theme-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.switch-theme-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.icon-font-size {
  font-size: 1.4rem;
}

.header {
  // position: fixed;
  width: 100%;
  top: 0;
  color: $G85;
  z-index: 1000;

  .flex-header {
    display: flex;
    align-items: center;
    height: 40px;
    box-sizing: border-box;
  }

  .home {
    height: 40px;
    padding: 8px;
  }

  .title {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 1rem;
    // font-weight: 600;
    cursor: default;

    img {
      width: 20px;
      height: 20px;
      border-radius: 100%;
    }

    span {
      margin-left: 8px;
    }

  }
    .box {
      margin-right: 4px;
      float: left;
      
      &:last-child {
        margin-right: 0;
      }
    }

    .fun {
      // position: absolute;
      width: 40px;
      position: relative;
      font-size: 1.4rem;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;

      i {
        width: 100%;
      }

    }

    .lua {
      // position: absolute;
      &:hover {
        // animation: rotateY 1s 1;
        transition: all 0.5s;
      }
    
      @keyframes rotateY {
        0% {
          transform: rotate3d(0,0,0,0deg);
          box-shadow: none;
        }
    
        80% {
          transform: rotate3d(0, 1, .5, 360deg);
          box-shadow: none;
        }

        100% {
          transform: rotate3d(0, 1, .5, 360deg);
          box-shadow: auto;
        }
      }
      
    }

  .menu {
    width: 120px;
    height: auto;
    cursor: pointer;

    // &:hover {
    //   .show-list {
    //     display: flex;
    //   }
    // }

    .show-menu {
      width: 100%;
      align-items: center;
      height: 36px;
      padding: 0 10px;
      box-sizing: border-box;

      span {
        width: 100%;
        margin-right: 4px;
      }
    }

    .show-list {
      width: calc(100% + 4px) ;
      top: 36px;
      padding: 4px 0;
      // border-top-width: 2px;
      
      a {
        padding: 4px 12px;
        font-size: 1rem;

        // &:hover {
        //   .show-list {
        //     display: flex;
        //   }
        // }
      }
      
    }

  }

  .menu-fun {
    position: absolute;
    top: 12px; 
    right: 12px;
    // display: flex;
    

    .box {
      margin-right: 4px;
      float: left;
      
      &:last-child {
        margin-right: 0;
      }
    }
  }

}


</style>