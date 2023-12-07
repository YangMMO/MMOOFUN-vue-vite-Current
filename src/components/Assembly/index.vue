<template>
  <div class="w-full mx-auto text-white">
    <div class="calculate bg-slate-100 mx-auto box overflow-hidden border-2">
      <div class="calculate-c text-slate-500" >
        <!-- 组合项 -->
        <div class="bg-slate-50 p-6 text-slate-500 flex gap-x-3 overflow-x-auto " ref="scrollContainer">

          <!-- 卡片组 -->
          <div ref="scrollContent" class="flex gap-x-3 shrink grow-0 basis-auto " >
            <Card v-for="card in cardArr" :key="card.id" :card="card">

              <CardLi  v-for="item in card.items" :key="item.id" :cardId="card.id" :item="item" >

              </CardLi>

            </Card>
          </div>



        </div>

        <!-- 生成栏 -->
        <div class="pt-6">
          <!-- 添加卡片 -->
          <div class="pb-6 px-6 flex gap-x-3">
            <button 
              class="px-2 py-1 text-center flex justify-center bg-white active:bg-slate-300 rounded-md cursor-pointer text-slate-600 border-2 border-slate-500"
               @click="handleAddCard"
            >
                <i class="ri-add-box-line  pr-1 "></i>
                <span class="block">{{ $t("as.add") }}</span>
            </button>

            <button 
              class="px-2 py-1 text-center flex justify-center bg-white active:bg-slate-300 rounded-md cursor-pointer text-slate-600 border-2 border-slate-500"
               @click="handleResetCard"
            >
                <i class="ri-restart-line pr-1 "></i>
                <span class="block">{{ $t("as.reset") }}</span>
            </button>

            <button 
              class="px-2 py-1 text-center flex justify-center bg-white active:bg-slate-300 rounded-md cursor-pointer text-slate-600 border-2 border-slate-500"
               @click="exportChildGridToExcel"
            >
                <i class="ri-file-excel-2-line pr-1 "></i>
                <span class="block">{{ $t("as.export") }}</span>
            </button>

          </div>

          <!-- <div class="pb-6">
            <div @click="calculate()">功能开发中</div>
          </div> -->

          <!-- 表格 -->
          <div class="relative sheet-container">
            <sheet class=" w-full" ></sheet>
          </div>
          
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../../i18n';
import Card from './card.vue';
import CardLi from './li.vue';
import Sheet from './sheet.vue';


export default {
  name: 'Assembly',
  components: {
    Card, CardLi, Sheet
  },
  provide() {
    return {
      assembly: this,
    }
  },
  data() {
    return {
      cardArr: [{
        id: 1,
        items: [
          {
            id: 1,
            value: '1.1',
          }, {
            id: 2,
            value: '1.2',
          }
        ]
      },{
        id: 2,
        items: [
          {
            id: 1,
            value: '2.1',
          },
          {
            id: 2,
            value: '2.2',
          }
        ]
      },{
        id: 3,
        items: [
          {
            id: 1,
            value: '3.1',
          },
          {
            id: 2,
            value: '3.2',
          }
        ]
      }],
    };
  },
  methods: {
    /* 计算 */
    calculate(position) {
      const container = this.$refs.scrollContainer;
      const content = this.$refs.scrollContent;
      console.log(content.scrollWidth);
    },

    /* 更新卡片每一项id */
    _updateCardArrId() {
      this.cardArr.forEach((item, index) => {
        item.id = index + 1;
        item.items.forEach((item, index) => {
          item.id = index + 1;
        });
      });
    },

    /* 重置卡片 */
    handleResetCard() {
      this.cardArr.length = 0;
      this.cardArr.push({
        id: 1,
        items: [
          {
            id: 1,
            value: '',
          }, {
            id: 2,
            value: '',
          }
        ]
      },{
        id: 2,
        items: [
          {
            id: 1,
            value: '',
          }
        ]
      });
      this.$forceUpdate();
    },

    /* 添加卡片 */
    handleAddCard() {
      this.cardArr.push({
        id: this.cardArr.length + 1,
        items: [
          {
            id: 1,
            value: ''
          }, 
        ]
      });
      this.$forceUpdate();  
    },

    /* 关闭卡片 */
    handleCloseCard(id) {
      if (this.cardArr.length === 1) {
        return;
      }
      this.cardArr.forEach((item, index) => {
        if (item.id === id) {
          this.cardArr.splice(index, 1);
        }
      });
      this._updateCardArrId()
      this.$forceUpdate();
    },

    /* 添加卡片Item */
    handleAddItem(id) {
      this.cardArr.forEach((item, index) => {
        if (item.id === id) {
          item.items.push({
            id: item.items.length + 1,
            value: ''
          });
        }
      });
      this.$forceUpdate();
    },

    /* 删除卡片Item */
    handleDeleteItem(id, itemId) {
      if (this.cardArr[id-1].items.length === 1) {
        return;
      }
      this.cardArr.forEach((item, index) => {
        if (item.id === id) {
          item.items.forEach((item, index) => {
            if (item.id === itemId) {
              this.cardArr[id-1].items.splice(index, 1);
            }
          });
        }
      });
      this._updateCardArrId();
      this.$forceUpdate();
    },

  },
  mounted() {

  },
  created() {
    
  },
}

</script>


<style lang="scss" scoped>
.sheet-container {
  height: 600px;
}

.add-card-btn {
  width: 52px;

  i {
    left: 50%;
    top: 52%;
    transform: translate(-50%, -50%);
  }
}

.item-left {
  position: relative;
  width: 32px;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    height: 999px;
    width: 32px;
    background-image: repeating-linear-gradient(45deg, #ccc, #ccc 1px, transparent 2px, transparent 5px);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    background-size: 28px 28px;
  }

  &:hover {
    // background: #000;

    &::after {
      background-image: repeating-linear-gradient(45deg, #ffbebe, #ffbebe 1px, transparent 2px, transparent 5px);
    }

    :first-child {
      display: none;
    }

    :last-child{
      display: inline-block;
    }
  }

  :last-child{
    display: none;
  }

  span {
    position: absolute;
    width: auto;
    padding: 1px 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    text-align: center;
    z-index: 999;
    white-space:nowrap;
  }
}

.container {
    padding: 120px 12px 0 12px;
}
</style>