<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header>
        <page-header/>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
export default {
  name: 'App',
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('state')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('state'))))
      console.log(this.$store.getters.isLogin)
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  },
  components: {
    'page-header': PageHeader
  },
  methods: {
    menuSelected (index, indexPath) {
      console.log(index)
    }
  },
  beforeRouterEnter (to, from, next) {
    console.log('app beforerouter')
    next()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
