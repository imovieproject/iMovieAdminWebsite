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
  components: {
    'page-header': PageHeader
  },
  methods: {
    menuSelected (index, indexPath) {
      console.log(index)
    }
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
