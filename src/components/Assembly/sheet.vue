<template>
  <!-- <div style="position: absolute; top: 0">
    <input id="uploadBtn" type="file" @change="loadExcel" />
    <b @click="handle">开发调试中，敬请期待  </b>
  </div> -->
  <div id="luckysheet"></div>
  <div v-show="isMaskShow" id="tip">Downloading</div>
 
</template>

<script>
import { ref, onMounted } from 'vue';
import { exportExcel } from './export';
import LuckyExcel from 'luckyexcel';  // 导入excel
import moment from '../../plugins/moment.js';
import { log } from '@antv/g2plot/lib/utils';

export default {
  data() {
    this.fc = luckysheet;
    this.sheetTypeData = [];
    this.sheetTypeData_old = [];
    this.length = [];
    this.sheetAssemblyData = [];
    this.sheetAssemblyData_old = [];
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
      exportExcel(luckysheet.getAllSheets(), luckysheet.getWorkbookName());
    },

    insertData() {
      this.insertTypeTable();
      this.insertAssemblyTable();
      luckysheet.refresh();
    },

    // 清除 sheet Assembly 表
    clearAssemblyTable() {
      let n = this.sheetAssemblyData;
      let o = this.sheetAssemblyData_old;

      for (let i = 0; i < o.length; i++) {
          for (let j = 0; j < o[i].length; j++) {
              o[i][j] = '';
          }
      }

      let result = n.map((item, index) => {
          // 如果 o 数组存在并且 o 数组长度大于 n 数组长度
          if (o[index] && o[index].length > item.length) {
              // 使用数组切片截取 n 数组的长度，然后填充空字符串
              return item.slice(0, o[index].length).concat(new Array(o[index].length - item.length).fill(' '));
          }
          // 否则返回原始的 n 数组
          return item;
      });

      result = result.concat(o)

      return result;
    },

    // 对组合表进行数据插入
    insertAssemblyTable() {
      let d = this.clearAssemblyTable();
      let nType = this.assembly.cardArr;
      luckysheet.setSheetActive(0);

      luckysheet.deleteColumn(0, 1);

      luckysheet.setCellValue(0, 0, '组合名');
      for (let i = 0; i < nType.length; i++) {
          luckysheet.setCellValue(0, i+1,'类型' + nType[i].id);

      }

      for (let i = 0; i < d.length; i++) {
        luckysheet.setCellValue(i+1, 0, d[i]);
        
        for (let j = 0; j < d[i].length; j++) {
          luckysheet.setCellValue(i+1, j, d[i][j]);
        }
      }

      // 删除多余的''单元数row
      this.sheetAssemblyData_old = d.filter(function(item) {  
          return item[0] !== "" && item[1] !== "";  
      });

      luckysheet.setSheetActive(0);
    },

    // 递归函数，用于生成所有可能的组合
    generateCombinations(data, currentCombination, currentIndex, result) {
      if (currentIndex === data.length) {
          result.push([...currentCombination]);
          return;
      }

      for (let i = 0; i < data[currentIndex].items.length; i++) {
          currentCombination.push(data[currentIndex].items[i].value);
          this.generateCombinations(data, currentCombination, currentIndex + 1, result);
          currentCombination.pop();
      }
    },

    // sheet type arr 处理
    processData(data, name) {
      const result = [];
      this.generateCombinations(data, [name], 0, result);

      // 添加序号
      for (let i = 0; i < result.length; i++) {
          result[i][0] += '-' + (i + 1);
      }

      return result;
    },

    // sheet assembly arr 处理
    toAssemblyArr(newVal, oldVal) {
      this.sheetAssemblyData_old = [];
      if (this.sheetAssemblyData!= null) {
        this.sheetAssemblyData.forEach(item => {
          this.sheetAssemblyData_old.push(item);
        });
      }

      this.sheetAssemblyData = [];
      let result = this.processData(newVal, this.assembly.asName);
      this.sheetAssemblyData = result;
    },


    // 清除 sheet type 表
    clearTypeTable() {
      let n = this.sheetTypeData;
      let o = this.sheetTypeData_old;

      let result = n.map((item, index) => {
          // 如果 o 数组存在并且 o 数组长度大于 n 数组长度
          if (o[index] && o[index].length > item.length) {
              // 使用数组切片截取 n 数组的长度，然后填充空字符串
              return item.slice(0, o[index].length).concat(new Array(o[index].length - item.length).fill(' '));
          }
          // 否则返回原始的 n 数组
          return item;
      });

      return result;
    },

    // 对类型表进行数据插入
    insertTypeTable() {
      let d = this.clearTypeTable()
      luckysheet.setSheetActive(1);

      luckysheet.deleteColumn(0, 1);

      for (let i = 0; i < d.length; i++) {
        luckysheet.setCellValue(0, i, d[i]);
        
        for (let j = 0; j < d[i].length; j++) {
          luckysheet.setCellValue(j, i, d[i][j]);
        }
      }

      luckysheet.setSheetActive(0);   
    },

    // sheet type arr 处理
    toTypeArr(newVal, oldVal) {
      // 将上次的sheetTypeData进行保存，然后重置sheetTypeData为空
      this.sheetTypeData_old = [];
      if (this.sheetTypeData!= null) {
        this.sheetTypeData.forEach(item => {
          this.sheetTypeData_old.push(item);
        });
      }
      this.sheetTypeData = [];

      for (let i = 0; i < newVal.length; i++) {
        this.sheetTypeData.push(['类型' + newVal[i].id])

        for (let j = 0; j < newVal[i].items.length; j++) {
          this.sheetTypeData[i].push(newVal[i].items[j].value);
        }
      }
    },

  },
  mounted() {
    let statement = { 
      name: "使用说明", 
      color: "", 
      status: "0", 
      order: "2", 
      celldata: [{
        r:0,
        c:0,
        v:'工具用途：',
        m:"工具用途：",
      },{
        r:1,
        c:0,
        v:'A1/B1/C1 与 A2/B2/C2 会交叉组合成不同的结果，该工具则对这类预设性组合进行演算！',
        m:"A1/B1/C1 与 A2/B2/C2 会交叉组合成不同的结果，该工具则对这类预设性组合进行演算！",
      },{
        r:3,
        c:0,
        v:'使用说明：',
        m:"使用说明：",
      },{
        r:4,
        c:0,
        v:'1.请在顶部类型进行子项的输入（输入后系统会自动演算）；',
        m:"1.请在顶部类型进行子项的输入（输入后系统会自动演算）；",
      },{
        r:5,
        c:0,
        v:'2.可自定义修改组合名字段的名称；',
        m:"2.可自定义修改组合名字段的名称；",
      },{
        r:6,
        c:0,
        v:'3.建议在演算“满意”后再对表格进行修改，最后导出！',
        m:"3.建议在演算“满意”后再对表格进行修改，最后导出！",
      },{
        r:8,
        c:0,
        v:'温馨提醒：',
        m:"温馨提醒：",
      },{
        r:9,
        c:0,
        v:'1.由于数据实时演算，当您的类型与子项过多时，可能会出现卡顿现象；',
        m:"1.由于数据实时演算，当您的类型与子项过多时，可能会出现卡顿现象；",
      },{
        r:10,
        c:0,
        v:'2.请思考类型与子项过多的情况是必定出现，或建议您考虑适当性、合理拆分！',
        m:"2.请思考类型与子项过多的情况是必定出现，或建议您考虑适当性、合理拆分！",
      },{
        r:12,
        c:0,
        v:'本表格由MMOO.FUN生成，感谢使用与支持！',
        m:"本表格由MMOO.FUN生成，感谢使用与支持！",
        bg: "#fff000",
      },], 
      index: 2,
    }

    luckysheet.create({
      container: 'luckysheet',
      title: '组合演算_' +  this.moment().format('YYYY-MM-DD'), 
      userInfo: 'MMOO.FUN', 
      lang: 'zh', // 设定表格语言
      data: [
        { "name": "组合表", color: "#ccc", "status": "1", "order": "0", "celldata": [], "config": {}, "index":0 }, 
        { "name": "类型表", color: "", "status": "0", "order": "1", "celldata": [], "config": {}, "index":1 }, 
        statement
      ]
    });

    luckysheet.setSheetActive(2);
    luckysheet.setColumnWidth({0:680})
  },
  watch: {
    'assembly.cardArr': {
      handler(newVal, oldVal) {
        luckysheet.setSheetActive(0);
        this.toTypeArr(newVal, oldVal);
        this.toAssemblyArr(newVal, oldVal);
        this.insertData();
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
  top: 0px;
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
