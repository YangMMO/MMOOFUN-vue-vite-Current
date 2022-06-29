<template>
  <div class="container mx-auto text-black dark:text-white">
    <div>
      <h1 class="text-3xl pb-9 font-semibold select-none">{{ $t("menu.resume") }}</h1>

      <!-- 暗号 -->
      <div :class="{ hidden: unlock === true}">
        <div class="text-center pb-6 flex flex-col place-items-center">
          <i class="ri-lock-line text-3xl"></i>
          <h1 class="text-3xl font-semibold my-6 select-none">请输入暗号</h1>
          <input type="text" v-model="password" v-focus placeholder="天王盖地虎"
            class="p8 border-2 focus:outline-none focus:ring focus:border-blue-300 box text-center">
          <span class="text-slate-400 text-xs py-2">猫猫吃老鼠</span>
        </div>

        <div class="b-btn box pb-6 inset-x-0 bottom-0 text-center flex pb-4 justify-center select-none">
          <a href="http://resume.mmoo.fun/" target="_blank" rel="noopener noreferrer"
            class="box px-4 py-1 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white bg-white dark:bg-gray-800 flex items-center">
            <i class="ri-share-line icon-font-size pr-2"></i>
            <span class="font-semibold ">查看旧版</span>
          </a>
        </div>
      </div>

      <!-- 简历 -->
      <div :class="['bg-white box transition-all mb-6 dark:text-black overflow-hidden', { hidden: unlock===false}]">
        <div class="bg-gradient-to-br from-green-50 to-blue-50 py-10 text-center basic-card">
          <div class="avatar inline-block mb-2"></div>
          <h3 class="text-xl mb-2">{{ resumeData.baseInfo.name }}</h3>
          <div>
            <span class="tag text-xs px-2 py-1 box bg-gradient-to-br from-purple-500 to-indigo-500 text-white">联系方式：{{
              resumeData.baseInfo.tel }}</span>
            <span class="tag text-xs px-2 py-1 box bg-gradient-to-br from-purple-500 to-indigo-500 text-white">邮箱：{{
              resumeData.baseInfo.email }}</span>
          </div>
        </div>
        <div class="flex bg-green dark:bg-gray-800 transition-all mb-6">
          <div id="chart" class="flex-1 bg-white"></div>
        </div>


      </div>


    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import { Radar } from '@antv/g2plot';

const focus = {
  mounted: (el) => el.focus()
}

export default {
  name: 'Resume',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.resume")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  directives: {
    focus
  },
  setup() {

  },
  data() {
    return {
      password: '',
      unlock: false,
      radarPlot: null,
      resumeData: {
        baseInfo: {
          name: 'MMO',
          tel: '17607568801',
          email: '11436052@qq.com',
          education: '大专',
          discipline: '数字影像（广告设计） & 计算机科学与技术',
        }
      },
      chartData: [
        { name: '设计', star: 80 },
        { name: '产品', star: 30 },
        { name: '前端', star: 60 },
        { name: '测试', star: 30 },
      ]
    }
  },
  created() {
    // this.password = '猫猫吃老鼠';

  },
  mounted() {
    if (this.radarPlot === null) {
      this.radarPlot = new Radar('chart', {
        data: this.chartData.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
        xField: 'name',
        yField: 'star',
        appendPadding: [10, 10, 10, 10],
        meta: {
          star: {
            alias: '能力数值',
            min: 0,
            nice: true,
            formatter: (v) => Number(v).toFixed(2),
            range: [0, 1]
          },
        },
        xAxis: {
          tickLine: null,
        },
        yAxis: {
          label: false,
          grid: {
            alternateColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        // 开启辅助点
        point: {
          size: 2,
        },
        area: {},
        theme: 'default', // 'dark',
      });
      this.radarPlot.render();
    }
  },
  unmounted() {
    this.radarPlot.destroy();
  },
  methods: {
    
  },
  watch: {
    password: function(e) {
      if (this.password === '猫猫吃老鼠') {
        this.unlock = true
      }
    }
  },
}
</script>


<style lang="scss" scoped>

.tag {
  margin-right: 4px;
  margin-bottom: 4px;

  &:last-child {
    margin-right: 0;
  }
}

.avatar {
  width: 100px;
  height: 100px;
  background: url(../assets/img/mmo.jpg) no-repeat center;
  background-size: cover;
  border-radius: 100%;
}

.container {
  padding: 120px 12px 0 12px;
  // position: absolute;
}

</style>