<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="6">
                <span style='font-size: 72px'>管理员登录</span>
                <el-form :label-position="top" :model="formData">
                    <el-form-item label="用户名">
                        <el-input placeholder="请输入用户名" v-model="formData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input placeholder="请输入密码" v-model="formData.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loginBtnClicked" :loading="isLogining">{{ loginButtonText }}</el-button>
                        <el-button type="danger" @click="registerBtnClicked">注册</el-button>
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
        username: '',
        password: ''
      },
      loginButtonText: '登录',
      isLogining: false
    }
  },
  methods: {
    loginBtnClicked () {
      console.log('login')
      console.log(this.username)
      console.log(this.password)
      var msgBoxTitle = ''
      var msgBoxContent = ''
      if (this.formData.username === '') {
        msgBoxTitle = '输入错误'
        msgBoxContent = '用户名不能为空'
        this.$alert(msgBoxContent, msgBoxTitle, {
          confirmButtonText: '确定'
        })
      } else if (this.formData.password === '') {
        msgBoxTitle = '输入错误'
        msgBoxContent = '密码不能为空'
        this.$alert(msgBoxContent, msgBoxTitle, {
          confirmButtonText: '确定'
        })
      } else {
        this.isLogining = true
        this.loginButtonText = '登录中'
        var formData = new FormData()
        formData.append('username', this.formData.username)
        formData.append('password', this.formData.password)
        axios({
          method: 'POST',
          url: '/api/login',
          data: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            this.isLogining = false
            this.loginButtonText = '登录'
            console.log(response)
            if (response.data.status === 'error') {
              msgBoxTitle = '登录错误'
              switch (response.data.error_code) {
              // 用户不存在
                case 0:
                  msgBoxContent = '用户不存在'
                  break
                  // 密码错误
                case 1:
                  msgBoxContent = '密码错误'
                  break
              }
              this.$alert(msgBoxContent, msgBoxTitle, {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            } else {
              msgBoxContent = '登录成功'
              console.log(response)
              this.$store.commit('setLoginAdmin', response.data)
              this.$store.commit('setIsLogin', true)
              this.$message({
                message: msgBoxContent,
                type: 'success',
                duration: 500,
                onClose: instance => {
                  console.log('succeed')
                  this.$router.push({
                    name: 'Users'
                  })
                }
              })
            }
          })
          .catch(error => {
            this.isLogining = false
            this.loginButtonText = '登录'
            if (error.response) { // 能够正常与服务器进行通信，但是服务器的响应中显示错误
              this.$alert(error.response.status, '网络错误', {
                confirmButtonText: '确定'
              })
            } else if (error.request) { // 能够发送请求，但是服务器无响应
              this.$alert('服务器无响应', '网络错误', {
                confirmButtonText: '确定'
              })
            } else { // 无法发送请求
              this.$alert('无法发送请求', '网络错误', {
                confirmButtonText: '确定'
              })
            }
          })
      }
    },
    registerBtnClicked () {

    }
  },

  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  }
}
</script>

<style>
.el-form-item__content{
    width: 100%
}
</style>
