<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-form :model="formData" label-width="80px">
                    <el-form-item label="电影名*">
                        <el-input placeholder="请输入电影名" v-model="formData.name"/>
                    </el-form-item>
                    <el-form-item label="电影年份">
                        <el-input placeholder="请输入电影年份" v-model="formData.password" show-password/>
                    </el-form-item>
                    <el-form-item label="电影类型">
                        <el-input placeholder="请输入电影类型" v-model="formData.confirmPassword" show-password/>
                    </el-form-item>
                    <el-form-item label="电影导演">
                        <el-input placeholder="请输入电影导演，输入格式：导演1/导演2/.../导演n" v-model="formData.email"/>
                    </el-form-item>
                    <el-form-item label="电影演员">
                        <el-date-picker placeholder="请输入电影演员，输入格式：演员1/演员2/.../演员n" v-model="formData.birthday" style="width: 100%"/>
                    </el-form-item>
                    <el-form-item label="电影详情">
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

          }
        })
      }
    }
  }
}
</script>

<style>
</style>
