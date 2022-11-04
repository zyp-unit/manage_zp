<template>
    <el-button type="primary" @click="">+新增</el-button>
  <div class="table">
    <el-table :data="list" style="width: 100%">
    <el-table-column v-for="item in tableLabel" :key="item.prop" 
    :label="item.label" :prop="item.prop" :width="item.width ? item.width : 225" />

    <el-table-column fixed="right" label="操作" min-width="180">
      <template #default>
        <el-button  type="primary" 
          >编辑</el-button
        >
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {reactive,ref} from 'vue'
export default {
  name:'mall',
  setup(){
    const tableLabel = reactive([
      {
        prop: "name",
        label: "商品名称",
      },
      {
        prop: "price",
        label: "商品单价",
      },
      {
        prop: "birth",
        label: "商品日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "商品地址",
        width: 320,
      },
    ]);
    const list = ref([
      {
        id:1,
        name:'水杯',
        price:200,
        addr:'北京市新华街45号',
        birth:'1991-02-09'
      },
      {
        id:2,
        name:'铅笔',
        price:300,
        addr:'吉林省 通化市 梅河口市',
        birth:"1990-06-10"
      },
      {
        id:3,
        name:'橡皮',
        price:2300,
        addr:"台湾 新竹县 尖石乡",
        birth:"2015-11-13"
      },
      {
        id:4,
        name:'键盘',
        price:2200,
        addr:"海南省 海口市 琼山区",
        birth:"2014-10-06"
      },
      {
        id:1,
        name:'鼠标',
        price:200,
        addr:"海南省 海口市 琼山区",
        birth:'1991-02-09'
      },
      {
        id:5,
        name:'笔记本',
        price:23400,
        addr:"山西省 长治市 沁县",
        birth:"1984-07-05"
      },
      {
        id:6,
        name:'数据线',
        price:200,
        addr:"海外 海外 ",
        birth:"2016-04-24"
      },
      {
        id:7,
        name:'水杯',
        price:200,
        addr:'北京市新华街45号',
        birth:'1991-02-09'
      },
      {
        id:8,
        addr : "湖南省 郴州市 临武县",
        birth : "2015-10-30",
        name:'宝柏',
        price:900
      },
      {
        id:10,
        name:'埃纳是',
        price:2300,
        addr:"香港特别行政区 香港岛 湾仔",
        birth:"1976-01-26"
      },
    ])
    return{
      tableLabel,
      list
    }
  }
}
</script>