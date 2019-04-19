<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-form :model="formData" label-width="80px">
                    <el-form-item label="电影名*">
                        <el-input placeholder="请输入电影名" v-model="formData.title"/>
                    </el-form-item>
                    <el-form-item label="电影年份">
                        <el-input placeholder="请输入电影年份" v-model="formData.year" />
                    </el-form-item>
                    <el-form-item label="电影类型">
                        <el-input placeholder="请输入电影类型，输入格式：类型1/类型2/.../类型3" v-model="genresStr"/>
                    </el-form-item>
                    <el-form-item label="电影导演">
                        <el-input placeholder="请输入电影导演，输入格式：导演1/导演2/.../导演n" v-model="directorsStr"/>
                    </el-form-item>
                    <el-form-item label="电影演员">
                        <el-input placeholder="请输入电影演员，输入格式：演员1/演员2/.../演员n" v-model="castsStr" style="width: 100%"/>
                    </el-form-item>
                    <el-form-item label="电影详情">
                        <el-input type="textarea" placeholder="请输入电影详情" v-model="formData.summary"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="confirmBtnClicked">添加</el-button>
                        <el-button type="danger" @click="cancelBtnClicked">取消</el-button>
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
        title: '',
        year: '',
        genres: [],
        directors: [],
        casts: [],
        summary: ''
      },
      genresStr: '',
      directorsStr: '',
      castsStr: ''
    }
  },
  methods: {
    checkFormData (formData) {
      var error = ''
      if (formData.name === '') {
        error = '电影名为空'
      }
      return error
    },
    confirmBtnClicked () {
      var error = this.checkFormData(this.formData)
      if (error !== '') {
        this.$alert(error, '错误', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
      } else {
        this.$confirm('确认添加电影？', '添加电影', {
          type: 'info',
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          callback: (action, instance) => {
            if (action === 'confirm') {
              this.formData.directors = this.directorsStr.split('/')
              this.formData.casts = this.castsStr.split('/')
              this.formData.genres = this.genresStr.split('/')
              axios
                .post(process.env.API_HOST + '/addmovie', this.formData)
                .then(response => {
                  this.$message({
                    type: 'info',
                    message: '已经成功添加电影'
                  })
                })
            }
          }
        })
      }
    },
    cancelBtnClicked () {
      this.formData.title = ''
      this.formData.year = ''
      this.formData.summary = ''
      this.genresStr = ''
      this.directorsStr = ''
      this.castsStr = ''
    }
  }
}
</script>

<style>
</style>
