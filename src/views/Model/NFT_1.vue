<template>
    <div class="mb-9">
        <h1 class="text-xl pb-6 font-semibold select-none">
            <i class="ri-terminal-box-line align-middle mr-2"></i>
            <span class="align-middle">3D NFT 方案</span>
        </h1>
        <p class="mb-6">脚本化随机修改材质/模型部件组合，批量导出PNG/GLB文件，部分示例（随机材质球） 👇</p>
        <ul class="grid grid-cols-4 gap-2">
            <li v-for="item in m_data" :key="item" class="box overflow-hidden">
                <div>
                    <img :src="item.fields.img[0].url" alt="">
                    <!-- <div>title</div>
                    <span>NFT方案</span> -->
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import i18n from '../../i18n';

import { Vika } from "@vikadata/vika";

const vika = new Vika({ token: "uskXc86WRaBC0WpUZhWeOHO", fieldKey: "name" });
const NFT1_Datasheet = vika.datasheet("dstY5719T5rY2ddMig");


export default {
  name: 'Model',
  metaInfo: {
    title: `MMOO.FUN | ${i18n.t("menu.model")}`,
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'MMOO.FUN, 个人网站, MMO,'
    }]
  },
  components: {

  },
  data() {
    return {
      m_data: [],
    }
  },
  created() {
    let that = this;
    NFT1_Datasheet.records.query({ viewId: "viwiZvDkRkpS6"}).then(response => {
        if (response.success) {
            that.m_data = response.data.records;
            // console.log(that.m_data);
        } else {
            console.error(response);
        }
    });
  },
}
</script>


<style lang="scss" scoped>

#model-canvas {
  width: 100%;
  height: 880px;
  position: relative;
}
.container {
    padding: 120px 12px 0 12px;
}
</style>