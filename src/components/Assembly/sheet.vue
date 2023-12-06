<template>
  <!-- The AG Grid component -->
  <ag-grid-vue
    class="ag-theme-alpine"
    :gridOptions="gridOptions"
    :columnDefs="columnDefs"
    :rowData="rowData"
  >
  </ag-grid-vue>
</template>

<script>
import i18n from '../../i18n';
import { ref } from 'vue';
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
        onRowDragMove: this.onRowDragMove, // 拖动行的回调
      },
      // 自定义列字段名称
      columnDefs: [],
      // 自定义行数据
      rowData: [],
    };
  },
  methods: {

  },
  created() {
    this.tableData = this.assembly.cardArr;

    // 创建字段
    this.columnDefs = [
        { rowDrag: true, headerName: i18n.t('as.serial'), valueGetter: 'node.rowIndex + 1', editable: false, width: 80 },
        { headerName: i18n.t('as.assemblyName'), field: 'assembly', editable: true },
    ]

    this.tableData.forEach(c => {
      // 是否计入
      if (c.reckonIn == false) {
        return
      }

      // 加列字段名
      this.columnDefs.push({ headerName: i18n.t('as.type') + c.id, field: 'type_' + c.id, editable: true });
    });

    // 创建数据
    this.columnDefs.forEach(e => {


      // this.rowData.push({ 
      //   assembly: i18n.t('as.assemblyName') ,
      //   field:'type',
      //   editable: true });
    });
  },
};
</script>