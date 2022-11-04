<template>
   <div class="common-layout">
    <el-container class="lay-content">
      <common-aside />
      <el-container>
        <el-header>
          <common-header />
          <common-tab />
        </el-header>
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonTab from '../components/CommonTab.vue'
import { defineComponent } from 'vue'
  
export default defineComponent({
    components:{
      CommonHeader,
      CommonAside,
      CommonTab
    }
})
</script>
<style lang="less" scoped>
.el-header{
  padding: 0;
}
  .el-container{
    height: 100%;
  }
  .common-layout{
    .lay-content{
      flex-wrap: nowrap;
      .right-main{
        height: calc(100%-124px) !important;
      }
    }
    height: 100%;
    &>.el-container{
      height: 100%;
     
      &>.el-aside{
        height: 100%;
        background-color: #545c64;
      }
    }
  }
  .el-main{
    margin-top: 40px;
  }
</style>