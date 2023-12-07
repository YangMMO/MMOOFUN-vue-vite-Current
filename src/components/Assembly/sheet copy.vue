<template>
  <!-- The AG Grid component -->
  <ag-grid-vue
    class="ag-theme-alpine "
    :gridOptions="gridOptions"
    :columnDefs="columnDefs"
    :rowData="rowData"
    @firstDataRendered="onFirstDataRendered"
    @cellContextMenu="onCellContextMenu"
  >
  </ag-grid-vue>
</template>

<script>
import i18n from '../../i18n';
import { ref, watch } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme
import { AgGridVue } from "ag-grid-vue3"; // Vue Grid Logic

export default {
  name: "Sheet",
  components: {
    AgGridVue, // Add AG Grid Vue3 component
  },
  inject: ['assembly'],
  data() {
    return {
      gridOptions: {
        defaultColDef: {
          // flex: 1,
          resizable: true,
          editable: true,
        },
        domLayout: 'autoHeight',
        rowDrag: true, // 启用行拖拽功能
        rowDragManaged: true,
        getContextMenuItems: this.getContextMenuItems,
      },
      // 自定义列字段名称
      columnDefs: [],
      // 自定义行数据
      rowData: [],
    };
  },
  methods: {
    renderT () {
      this.columnDefs = [];

      // 创建字段
      this.columnDefs = [
          { rowDrag: true, headerName: i18n.t('as.serial'), valueGetter: 'node.rowIndex + 1', editable: false, width: 80 },
          { headerName: i18n.t('as.assemblyName'), field: 'assembly', editable: true },
      ]

      this.tableData.forEach(c => {
        // 是否计入
        // if (c.reckonIn == false) {
        //   return
        // }

        // 加列字段名
        this.columnDefs.push({ headerName: i18n.t('as.type') + c.id, field: 'type_' + c.id, editable: true });
      });
    },

    generateCombinations(arrays) {
      const result = [];

      function recurse(current, remaining) {
        if (remaining.length === 0) {
          result.push(current.slice());
        } else {
          const first = remaining[0];
          for (let i = 0; i < first.length; i++) {
            current.push(first[i]);
            recurse(current, remaining.slice(1));
            current.pop();
          }
        }
      }

      recurse([], arrays);
      return result;
    },

    dataAssembly() {
      this.rowData = [];
      this.resultData = [];
      for (let i = 0; i < this.tableData.length; i++) {
        // if (this.tableData[i].reckonIn == false) {
        //   return ;
        // }

        this.resultData.push([])

        for (let j = 0; j < this.tableData[i].items.length; j++) {
          this.resultData[i].push(this.tableData[i].items[j].value);
        }
      }

      let rowData = this.generateCombinations(this.resultData);

      for (let i = 0; i < rowData.length; i++) {
        this.rowData.push({ assembly: '组合'+ (i + 1)})
      }

      // console.log(this.rowData);

      for (let i = 0; i < this.columnDefs.length; i++) {
        if (this.columnDefs[i].field !== undefined && this.columnDefs[i].field !== 'assembly') {
          let field =  this.columnDefs[i].field;

          for (let j = 0; j < this.rowData.length; j++) {
            this.rowData[j][field] = rowData[j][i - 2];
          }
        }
      }
    },

    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    },
    onCellContextMenu(params) {
      // 阻止默认右键菜单
      params.event.preventDefault();
      // 自定义右键菜单逻辑
      console.log('右键菜单事件', params);
    },

    getContextMenuItems(params) {
      // 自定义右键菜单选项
      const menuItems = [
        {
          name: 'Custom Option 1',
          action: () => this.customOption1(params),
        },
        {
          name: 'Custom Option 2',
          action: () => this.customOption2(params),
        },
      ];

      return menuItems;
    },
    customOption1(params) {
      console.log('执行自定义选项 1', params);
    },
    customOption2(params) {
      console.log('执行自定义选项 2', params);
    },
  },
  created() {
    this.tableData = this.assembly.cardArr;
    this.renderT();
    this.dataAssembly();
  },
  mounted() {
    watch(this.assembly.cardArr, (newVal) => {
      this.tableData = [];
      this.tableData = this.assembly.cardArr;
      this.renderT();
      this.dataAssembly();
    })
  },
};
</script>