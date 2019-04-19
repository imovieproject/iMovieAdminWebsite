<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-form :model="formData" label-width="80px">
                    <el-form-item label="用户名*">
                        <el-input placeholder="请输入用户名" v-model="formData.name"/>
                    </el-form-item>
                    <el-form-item label="密码*">
                        <el-input placeholder="请输入密码" v-model="formData.password" show-password/>
                    </el-form-item>
                    <el-form-item label="确认密码*">
                        <el-input placeholder="请再一次输入密码" v-model="formData.confirmPassword" show-password/>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input placeholder="请输入用户邮箱" v-model="formData.email"/>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker placeholder="请输入用户生日" v-model="formData.birthday" style="width: 100%"/>
                    </el-form-item>
                    <el-form-item label="个性签名">
                        <el-input placeholder="请输入用户的个性签名" v-model="formData.description"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="confirmBtnClicked">添加</el-button>
                        <el-button type="danger">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      formData: {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        brithday: '',
        description: ''
      }
    }
  },
  methods: {
    checkFormData (formData) {
      var error = ''
      if (formData.name === '') {
        error = '用户名为空'
      } else if (formData.password === '') {
        error = '密码为空'
      } else if (formData.confirmPassword === '') {
        error = '确认密码为空'
      } else if (formData.confirmPassword !== formData.password) {
        error = '两次输入的密码不一致'
      }
      return error
    },
    confirmBtnClicked () {
      var error = this.checkFormData(this.formData)
      console.log(error)
      console.log(this.formData.name)
      if (error !== '') {
        this.$alert(error, '错误', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
      } else {
        this.$alert('确认添加用户？', '添加用户', {
          type: 'info',
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          callback: (action, instance) => {
            axios
              .post('/api/adduser', this.formData)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: '已成功添加用户'
                })
              })
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
