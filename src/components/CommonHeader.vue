<template>
  <el-header style="padding: 0 20px;">
    <div class="l-content">
      <el-button size='small' @click="handleCollapse">
        <el-icon :size='20'>
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页是一定存在的 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>


      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc()" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut"> 退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const store = useStore()
    const getImgSrc = () => {
      return new URL(`../assets/images/user-2.jpg`, import.meta.url).href
    }
    let handleCollapse = () => {
      store.commit('updateIsCollapse')
    }
    // 计算属性
    const current = computed(() => {
      return store.state.currentMenu
    })
    const router = useRouter()
    const handleLoginOut = () =>{
      store.commit('cleanMenu')
      store.commit('clearToken')
      router.push({
        name:'login'
      })
    }
    return {
      getImgSrc,
      handleCollapse,
      current,
      handleLoginOut,
    }
  }
})
</script>
<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #242933;
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }

  h3 {
    color: #fff;
  }
}

.bread :deep(span)  {
  color: #fff !important;
  cursor: pointer !important;
}
</style>