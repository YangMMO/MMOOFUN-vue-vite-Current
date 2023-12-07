<template>
  <div style="position: absolute; top: 0">
    <!-- <input id="uploadBtn" type="file" @change="loadExcel" /> -->

    <!-- <span>Or Load remote xlsx file:</span>

    <select v-model="selected" @change="selectExcel">
      <option disabled value="">Choose</option>
      <option v-for="option in options" :key="option.text" :value="option.value">
        {{ option.text }}
      </option>
    </select> -->
 <b @click="handle">开发调试中，敬请期待  </b>
    <!-- <a href="javascript:void(0)" @click="downloadExcel">Download source xlsx file</a> -->
  </div>
  <div id="luckysheet"></div>
  <div v-show="isMaskShow" id="tip">Downloading</div>
 
</template>

<script>
import { ref, onMounted } from 'vue';
import { exportExcel } from './export';
import LuckyExcel from 'luckyexcel';
import moment from '../../plugins/moment.js';

export default {
  data() {
    return {
      isMaskShow: false,
      selected: '',
      jsonData: {},
      moment: moment,
    };
  },
  inject: ['assembly'],
  methods: {
    // 导入excel代码
    loadExcel(evt) {
      const files = evt.target.files;
      if (files == null || files.length == 0) {
        alert('No files wait for import');
        return;
      }

      let name = files[0].name;
      let suffixArr = name.split('.');
      let suffix = suffixArr[suffixArr.length - 1];
      if (suffix != 'xlsx') {
        alert('Currently only supports the import of xlsx files');
        return;
      }

      LuckyExcel.transformExcelToLucky(files[0], (exportJson, luckysheetfile) => {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!');
          return;
        }
        console.log('exportJson', exportJson);
        this.jsonData = exportJson;

        window.luckysheet.destroy();

        window.luckysheet.create({
          container: 'luckysheet',
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
        });
      });
    },

    // 导出excel文件
    downloadExcel() {
      exportExcel(luckysheet.getAllSheets(), '下载');
    },

    insertData(newVal) {
      // let data = this.assembly.cardArr;
      // let t1 = luckysheet.getAllSheets()[0]
      // let t2 = luckysheet.getAllSheets()[1];
      // this.result = [];

      // for (let i = 0; i < newVal.length; i++) {
      //   this.result.push(newVal[i].items[0].value);
      //   console.log(newVal[i].items[0].value)
      // }

      // t1.data[0][0] = new String(this.result[0]);

      
      // console.log(luckysheet.getAllSheets()[0].data[0][0]);

      // luckysheet.refresh();

      // const sheetData = luckysheet.getGridData();
      console.log(LuckyExcel);

// // 在第2行第2列插入数据
// sheetData[1][1] = 'New Data';

// // 更新表格数据
// luckysheet.setGridData(sheetData);

// // 刷新 Luckysheet
// luckysheet.refresh();
    },

    handle() {
      console.log(luckysheet.getAllSheets()[0]);
    },
  },
  mounted() {
    window.luckysheet.create({
      container: 'luckysheet',
      title: '组合演算_' +  this.moment().format('YYYY-MM-DD'), 
      userInfo: 'MMOO.FUN', 
      lang: 'zh', // 设定表格语言
      data: [
        { "name": "组合表", color: "#ccc", "status": "1", "order": "0", "data": [], "config": {}, "index":0 }, 
        { "name": "类型表", color: "", "status": "0", "order": "1", "data": [], "config": {}, "index":1 }, 
        { "name": "声明", color: "", "status": "0", "order": "2", "data": [], "config": {}, "index":2 }]
    });

    // watch(this.assembly.cardArr, (newVal) => {
    //   this.insertData(newVal);
    // })
  },
  created() {

  },
  watch: {
    'assembly.cardArr': {
      handler(newVal, oldVal) {
        this.insertData(newVal);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
#luckysheet {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 30px;
  bottom: 0px;
}

#uploadBtn {
  font-size: 16px;
}

#tip {
  position: absolute;
  z-index: 1000000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
