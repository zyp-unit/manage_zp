<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%; height: 500px;">
      <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
        :width="item.width ? item.width : 125" />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small background class="mt-4 pager" @current-change="changePage" layout="prev, pager, next"
      :total="config.total" />
  </div>
  <el-dialog v-model="dialogVisible" :title="action === 'add' ? '新增用户' : '编辑用户'" width="35%"
    :before-close="handleClose">
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name" :rules="[
            // 表单验证
            { required: true, message: '姓名是必填项' }
          ]">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age" :rules="[
            { required: true, message: '年龄是必填项' },
            { type: 'number', message: '年龄必须为数字' }
          ]">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" :rules="[
            { required: true, message: '性别是必填项' },
          ]">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth" :rules="[
            { required: true, message: '出生日期是必填项' },
          ]">
            <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址" prop="addr" :rules="[
        { required: true, message: '地址是必填项' },
      ]">
        <el-input v-model="formUser.addr" placeholder="请输入地址" />
      </el-form-item>
      <el-row style=" justify-content: flex-end;">
        <el-form-item>
          <el-button type="primary" @click="handelCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const list = ref([])
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    const { proxy } = getCurrentInstance()
    onMounted(() => {
      getUserData(config)
    })
    const config = reactive({
      total: 0,
      page: 1,
      name: ''
    })
    // 点击user页面初次渲染数据
    const getUserData = async (config) => {
      let res = await proxy.$api.getUserData(config)
      // console.log(res);
      config.total = res.count
      list.value = res.list.map(item => {
        item.sexLabel = item.sex === 1 ? '男' : '女'
        return item
      })
    }
    // 切换分页处理
    const changePage = (page) => {
      // console.log(page);
      config.page = page
      getUserData(config)

    }
    // 搜索框区域
    const formInline = reactive({
      keyword: ''
    })
    const handleSearch = () => {
      config.name = formInline.keyword
      getUserData(config)
    }
    // 控制模态框的显示隐藏 小"x"号
    const dialogVisible = ref(false)
    const handleClose = (done) => {
      ElMessageBox.confirm('确定关闭吗？')
        .then(() => {
          proxy.$refs.userForm.resetFields()
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    // 时间的处理
    const timeFormat = (time) => {
      var time = new Date(time)
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const date = time.getDate()
      function add(m) {
        return m > 10 ? m : '0' + m
      }
      return add(year) + '-' + add(month) + '-' + add(date)
    }
    // 添加用户form数据
    const formUser = reactive({
      name: '', //用户姓名
      age: '',
      sex: '',
      birth: '',
      addr: ''
    })
    // 添加用户
    const onSubmit = () => {
      // 表单信息完整校验
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (action.value === 'add') {
            formUser.birth = timeFormat(formUser.birth)
            let res = await proxy.$api.addUser(formUser)
            if (res) {
              // console.log(proxy.$refs);
              dialogVisible.value = false
              // 重置表单信息
              proxy.$refs.userForm.resetFields()
              getUserData(config)
            }
          } else {
            // 编辑接口
            formUser.birth = timeFormat(formUser.birth)
            // formUser.sex === '男' ? (formUser.sex = 1) : (formUser.sex = 0)
            formUser.sex === '女' ? (formUser.sex = 0) : (formUser.sex = 1)
            let res = await proxy.$api.editUser(formUser)
            if (res) {
              // console.log(proxy.$refs);
              dialogVisible.value = false
              // 重置表单信息
              proxy.$refs.userForm.resetFields()
              getUserData(config)

            }
          }

        } else {
          ElMessage({
            showClose: true,
            message: '请输入正确的内容',
            type: 'error'
          })
        }
      })

    }
    // 取消 表单验证提示等
    const handelCancel = () => {
      dialogVisible.value = false
      proxy.$refs.userForm.resetFields()
    }
    // 区分新增 和 编辑用户
    const action = ref('add')
    // 编辑用户 复用模态框
    const handleEdit = (row) => {
      console.log(row);
      action.value = 'edit'
      dialogVisible.value = true
      row.sex == 1 ? row.sex = '男' : row.sex = '女'
      // 新增时编辑内容重置 利用$nextTick进行异步操作
      proxy.$nextTick(() => {
        Object.assign(formUser, row)
      })
      // console.log(row);
    }
    // 新增用户 显示模态框
    const handleAdd = () => {
      action.value = 'add'
      dialogVisible.value = true
    }
    const handleDelete = (row) => {
      ElMessageBox.confirm('确定删除吗')
        .then( async () => {
          await proxy.$api.deleteUser({
            id:row.id
          })
          ElMessage({
            showClose:true,
            message:'删除成功',
            type:'success'
          })
          getUserData(config)
        })
        .catch(() => {
          // catch error
        })
    }
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
      handleClose,
      dialogVisible,
      formUser,
      onSubmit,
      timeFormat,
      handelCancel,
      action,
      handleEdit,
      handleAdd,
      handleDelete
    }
  }
})
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;

  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}

.user-header {
  display: flex;
  justify-content: space-between;
}
</style>