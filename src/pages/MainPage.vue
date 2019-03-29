<template>
    <div>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    @select="menuSelected"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu" ></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <span>查看用户</span>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <span>添加用户</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>电影管理</span>
                        </template>
                        <el-menu-item index="2-1">
                                <span>查看电影</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                                <span>添加电影</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>系统信息</span>
                        </template>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import UserTable from '@/components/UserTable'
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods: {
    menuSelected (index, indexPath) {
      console.log(index)
      var routeName = ''
      if (index === '1-1') {
        routeName = 'Users'
      } else if (index === '1-2') {
        routeName = 'AddUser'
      }

      this.$router.push({
        name: routeName
      })
    }
  }
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

.menu-icon{
    color: #409EFF
}

.menu-text{
    color:
}
</style>
