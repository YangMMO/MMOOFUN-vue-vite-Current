<template>

  <div class="container mx-auto bg-white dark:bg-gray-800 transition-all">
    <div class="header relative select-none">
      <div
        class="flex-header title box p8 shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all font-semibold cursor-pointer ">
        <router-link class="flex items-center" to="/">
          <img src="./assets/img/mmo.jpg" alt="">
          <span class="hidden sm:block">MMOO.FUN</span>
        </router-link>
      </div>

      <div class="menu-fun">

        <!-- 语言 -->
        <div
          class="flex-header fun lua box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all"
          @click="switchLang()"><i class="ri-globe-line"></i></div>
        <!-- 主题 -->

        <div
          class="flex-header fun box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all"
          @click="themesMode()">
          <Transition name="switch-theme">
            <i class="ri-sun-line absolute" v-if="theme === 'light'"></i>
            <i class="ri-moon-line absolute" v-else-if="theme === 'dark'"></i>
          </Transition>
        </div>

        <!-- 菜单 -->
        <div
          class="flex-header flex-col menu relative box shadow-box_l hover:shadow-box_l_h dark:shadow-box_d dark:hover:shadow-box_d_h border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all font-semibold ">
          <div class="flex items-center show-menu ">
            <!-- <div class="flex items-center show-menu" @click="isActiveMenu = !this.isActiveMenu"> -->
            <span class="">{{ $t("menu.menu") }}</span>
            <i class="ri-menu-2-line"></i>
          </div>
          <nav class="show-list hidden flex flex-col w-full box border-gray-900 dark:border-white">

            <div v-for="item in routes" :key="item">
              <router-link v-if="item.menu" :to="item.path"
                class=" hover:text-red-300 dark:hover:text-indigo-300 w-full inline-block">
                {{ $t(`menu.${item.name.toLocaleLowerCase()}`) }}
              </router-link>
            </div>

          </nav>

        </div>
      </div>

    </div>
  </div>

  <perfect-scrollbar class="relative h-screen mx-auto mask-img-top">
    <!-- 路由页面 -->
    <router-view class="" />

    <!-- 页脚 -->
    <div class="footer container mx-auto">
      <div class="container">
        <div class=" border-t text-xs text-slate-400 text-center cursor-default">
          <span>©2018-2022 MMOO.FUN <a href="https://beian.miit.gov.cn/">粤ICP备17077157号</a></span>
        </div>
      </div>
    </div>

    <!-- 装饰元素 -->
    <div class="h-screen fixed w-full top-0 decorate">
      <div class=" sphere1"></div>
      <div class="sphere2"></div>
      <div class="sphere3"></div>
    </div>


  </perfect-scrollbar>

</template>

<script>
import i18n from "./i18n"
import routers from "./router"

export default {
  name: 'App',
  data() {
    return {
      theme: 'light',
      isActiveMenu: false,
      routes: routers.options.routes
    }
  },
  methods: {
    // 切换语言
    switchLang() {
      i18n.setLocale(i18n.getLocale() === 'en' ? 'cn' : 'en')
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
    }
  },
}
</script>

<style lang="scss">



.decorate {
  z-index: -9999;
}

.sphere1 {
  position: absolute;
  width: 1006px;
  height: 1006px;
  right: -356px;
  top: -720px;
  border-radius: 9999px;
  background: rgba(187, 69, 111, 0.05);
  
}

.sphere2 {
  position: absolute;
  width: 506px;
  height: 506px;
  left: -100px;
  bottom: -200px;
  background: rgba(255, 222, 122, 0.1);
  border-radius: 9999px;
}

.sphere3 {
  position: absolute;
  width: 356px;
  height: 356px;
  right: -70px;
  bottom: -120px;
  background: rgba(69, 187, 171, 0.05);
  border-radius: 9999px;
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
  background-image: linear-gradient(45deg,var(--stripes-color) 12.5%,transparent 12.5%,transparent 50%,var(--stripes-color) 50%,var(--stripes-color) 62.5%,transparent 62.5%,transparent 100%);
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

  .title {
    position: absolute;
    padding: 0 10px;
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

  .menu {
    width: 120px;
    height: auto;
    cursor: pointer;

    &:hover {
      .show-list {
        display: flex;
      }
    }

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
      padding: 4px 0;
      border-top-width: 2px;
      
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
    display: flex;

    .box {
      margin-right: 4px;
      
      &:last-child {
        margin-right: 0;
      }
    }

    .fun {
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
      &:hover {
        animation: rotateY 1s 1;
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

  }

}


</style>