<template>
  <div class="w-full mx-auto text-white">
    <div class="calculate bg-gradient-to-b from-slate-700 to-slate-900 mx-auto box overflow-hidden border-2">
      <div class="calculate-c " >
        <!-- 组合项 -->
        <div class="bg-white p-6 text-slate-500 flex gap-x-3 overflow-x-auto ">

          <!-- 卡片组 -->
          <div   class="flex gap-x-3  ">
            <Card v-for="card in cardArr" :key="card.id" :card="card">

              <CardLi  v-for="item in card.items" :key="item.id" :cardId="card.id" :item="item" >

              </CardLi>

            </Card>
          </div>


          <!-- 添加卡片 -->
          <div class="flex gap-y-2 flex-col place-content-center">
            <div class="add-card-btn relative p-3 border-2 border-slate-500 rounded-full overflow-hidden aspect-square cursor-pointer  active:bg-slate-200 hover:bg-slate-100" @click="handleAddCard">
              <span><i class="ri-add-line icon-font-size absolute"></i></span>
              
            </div>

            <div class="add-card-btn relative p-3 border-2 border-slate-500 rounded-full overflow-hidden aspect-square cursor-pointer  active:bg-slate-200 hover:bg-slate-100" @click="handleResetCard">
              <span><i class="ri-restart-line icon-font-size absolute"></i></span>
            </div>

          </div>
        </div>

        <!-- 结果项 -->
        <div class="py-3 px-3 flex items-center">
          <div @click="calculate()">功能开发中</div>
        </div>
        <p class="text-center mb-6 opacity-20">By MMOO.FUN</p>
      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../../i18n';
import Card from './card.vue';
import CardLi from './li.vue';


export default {
  name: 'Assembly',
  components: {
    Card, CardLi
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
        reckonIn: true,
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
        reckonIn: true,
        items: [
          {
            id: 1,
            value: '',
          }
        ]
      }]
    }
  },
  methods: {
    /* 计算 */
    calculate(position) {
      console.log(this.cardArr);
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
      this.cardArr = [{
        id: 1,
        reckonIn: true,
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
        reckonIn: true,
        items: [
          {
            id: 1,
            value: '',
          }
        ]
      }];
      this._updateCardArrId()
      this.$forceUpdate();
    },

    /* 添加卡片 */
    handleAddCard() {
      this.cardArr.push({
        id: this.cardArr.length + 1,
        reckonIn: true,
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