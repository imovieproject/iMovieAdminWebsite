<template>
    <div style="height: 100%">
        <el-row type="flex" justify="space-between" align="middle" style="height: 100%">
            <el-col :span="4" >
                <span class="page-logo" @click="pageLogoClicked">i<span style="color: #409EFF">Movie<span style="color: #bbbbbb"> 后台管理系统</span></span></span>
            </el-col>

            <el-col :span="4">
                <div class="user-info">
                    <img class="user-logo" v-bind:src="imageSrc"/>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link user-name" type="text">用户名<i class="el-icon-arrow-down el-icon--right"/></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="changeAccount">切换账号</el-dropdown-item>
                            <el-dropdown-item style="color: #F56C6C" divided command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 测试用图片链接
      imageSrc: 'http://s15.sinaimg.cn/middle/62791a5cxa647fde862ae&690'
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'changeAccount') {

      } else if (command === 'logout') {

      }
    },
    pageLogoClicked () {
      console.log('page logo clicked')
      this.$router.push({
        name: 'Users'
      })
    }
  }
}
</script>

<style scoped>
.page-logo{
    color: #67C23A;
    font-size: 20px;
    cursor: pointer;
}

.user-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: Microsoft YaHei;
    color: #909399;
}

.user-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: #bbbbbb
}

.user-name{
    margin-left: 10px;
    cursor: pointer;
}
</style>
