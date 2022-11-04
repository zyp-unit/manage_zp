<template>
  <el-row class="main">
    <el-form  :v-model="loginForm" class="login-container">
        <h3>系统登录</h3>
        <el-form-item>
          <el-input type="input" placeholder="请输入账号" v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">
            登录
          </el-button>
        </el-form-item>

      </el-form>
  </el-row>
      
</template>
<script>
import { getCurrentInstance, reactive } from 'vue';
import { useStore} from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup(){
    const  {proxy}  = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    const loginForm = reactive({
      username:'admin',
      password:'admin'
    })
    const login = async () =>{
      const res = await proxy.$api.getMenu(loginForm)
      // console.log(res);
      store.commit('setMenu', res.menu)
      store.commit('addMenu', router)
      store.commit('setToken', res.token)
      router.push({
        name:'home'
      })
    }
    return{
      loginForm,
      login
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  width: 100%;
  height: 100%;
  background: url("../assets/images/20201203214346381.jpg")  fixed no-repeat; 
  background-size: cover;
  overflow: hidden;
}
.login-container{
  width: 350px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, .1);
  padding: 35px 35px 15px 35px;
  margin: 240px auto;
  h3{
    text-align: center;
    margin-bottom: 20px;
  }
  :deep(.el-input__wrapper){
    background-color: rgba(255, 255, 255, .2);
    border: none;
    :deep(.el-input__inner){
      color: black;
    }
  }
  :deep(.el-form-item__content){
    justify-content: center;
  }
  .el-button{
    background-color: rgba(255, 255, 255, .4);
    color: #000;
    border: none;
  }
}
</style>