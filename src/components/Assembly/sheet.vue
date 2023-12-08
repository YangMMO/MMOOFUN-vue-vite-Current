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

    // 对组合表进行数据插入
    insertAssemblyTable() {
      let d = this.clearAssemblyTable();
      let nType = this.assembly.cardArr;
      luckysheet.setSheetActive(0);

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
      this.sheetAssemblyData = [];
      if (this.sheetAssemblyData!= null) {
        this.sheetAssemblyData.forEach(item => {
          this.sheetAssemblyData_old.push(item);
        });
      }
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
    // let statement = { 
    //   name: "使用说明", 
    //   color: "", 
    //   status: "0", 
    //   order: "2", 
    //   celldata: [{
    //     r:0,
    //     c:0,
    //     ct: {
    //       fa: "General",
    //       t: "s"
    //     },
    //     v:'本表格由MMOO.FUN生成，感谢使用与支持！',
    //     m:"本表格由MMOO.FUN生成，感谢使用与支持！",
    //     "mc": { //合并单元格必备属性
    //       "r": 0, //主单元格的行号
    //       "c": 0, //主单元格的列号
    //       "rs": 1, //合并单元格占的行数
    //       "cs": 10 //合并单元格占的列数
    //     }
    //   },{
    //     r:1,
    //     c:0,
    //     ct: {
    //       fa: "General",
    //       t: "s"
    //     },
    //     v:'说明：生活或工作中会经常遇到某件事会出现A被B影响，如果有C、D..的情况下结果也会有不同的走向；',
    //     m:"说明：生活或工作中会经常遇到某件事会出现A被B影响，如果有C、D..的情况下结果也会有不同的走向；",
    //     "mc": { //合并单元格必备属性
    //       "r": 1, //主单元格的行号
    //       "c": 0, //主单元格的列号
    //       "rs": 5, //合并单元格占的行数
    //       "cs": 5 //合并单元格占的列数
    //     },
    //   },{
    //     r:2,
    //     c:0,
    //     ct: {
    //       fa: "General",
    //       t: "s"
    //     },
    //     v:'1.该功能将把可预知的选项当做一个类型进行罗列，同时对多个类型进行组合演算！',
    //     m:"1.该功能将把可预知的选项当做一个类型进行罗列，同时对多个类型进行组合演算！",
    //     "mc": { //合并单元格必备属性
    //       "r": 2, //主单元格的行号
    //       "c": 0, //主单元格的列号
    //       "rs": 5, //合并单元格占的行数
    //       "cs": 5 //合并单元格占的列数
    //     },
    //   },{
    //     r:3,
    //     c:0,
    //     ct: {
    //       fa: "General",
    //       t: "s"
    //     },
    //     v:'2.由于该功能并非特别完善，请在表格完全加载完毕后，在进行选项输入！',
    //     m:"2.由于该功能并非特别完善，请在表格完全加载完毕后，在进行选项输入！",
    //     "mc": { //合并单元格必备属性
    //       "r": 2, //主单元格的行号
    //       "c": 0, //主单元格的列号
    //       "rs": 5, //合并单元格占的行数
    //       "cs": 5 //合并单元格占的列数
    //     },
    //   },{
    //     r:4,
    //     c:0,
    //     ct: {
    //       fa: "General",
    //       t: "s"
    //     },
    //     v:'3.建议在完全演算后再对表格进行修改，最后导出！',
    //     m:"3.建议在完全演算后再对表格进行修改，最后导出！",
    //     "mc": { //合并单元格必备属性
    //       "r": 2, //主单元格的行号
    //       "c": 0, //主单元格的列号
    //       "rs": 5, //合并单元格占的行数
    //       "cs": 5 //合并单元格占的列数
    //     },
    //   }], 
    //   config: {
    //     "merge": {
    //       "0_0": {
    //           "r": 1,
    //           "c": 0,
    //           "rs": 1,
    //           "cs": 10
    //       },
    //       "1_0": {
    //           "r": 1,
    //           "c": 0,
    //           "rs": 1,
    //           "cs": 10
    //       },
    //       "2_0": {
    //           "r": 1,
    //           "c": 0,
    //           "rs": 1,
    //           "cs": 10
    //       },
    //       "3_0": {
    //           "r": 1,
    //           "c": 0,
    //           "rs": 1,
    //           "cs": 10
    //       },
    //       "4_0": {
    //           "r": 1,
    //           "c": 0,
    //           "rs": 1,
    //           "cs": 10
    //       }
    //     }
    //   }, 
    //   index: 2 
    // }

    let statement = { 
      name: "使用说明", 
      color: "", 
      status: "0", 
      order: "2", 
      celldata: [{
        r:0,
        c:0,
        ct: {
          fa: "General",
          t: "s"
        },
        v:'本表格由MMOO.FUN生成，感谢使用与支持！',
        m:"本表格由MMOO.FUN生成，感谢使用与支持！",
      },{
        r:1,
        c:0,
        ct: {
          fa: "General",
          t: "s"
        },
        v:'说明：如A1/B1/C1 与 A2/B2/C2 会交叉组合成不同的结果，可则使用该工具进行预设性演算！',
        m:"说明：如A1/B1/C1 与 A2/B2/C2 会交叉组合成不同的结果，可则使用该工具进行预设性演算！",
      },{
        r:2,
        c:0,
        ct: {
          fa: "General",
          t: "s"
        },
        v:'1.请在顶部类型进行子项的输入（输入后系统会自动演算）；',
        m:"1.请在顶部类型进行子项的输入（输入后系统会自动演算）；",
      },{
        r:3,
        c:0,
        ct: {
          fa: "General",
          t: "s"
        },
        v:'2.可自定义修改组合名字段的名称；',
        m:"2.可自定义修改组合名字段的名称；",
      },{
        r:4,
        c:0,
        ct: {
          fa: "General",
          t: "s"
        },
        v:'3.建议在演算“满意”后再对表格进行修改，最后导出！',
        m:"3.建议在演算“满意”后再对表格进行修改，最后导出！",
      }], 
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
