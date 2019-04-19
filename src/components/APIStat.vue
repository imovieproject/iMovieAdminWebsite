<template>
    <div class="container">
        <div id='main' style="width: 600px;height: 400px"></div>
        <el-button type="success" icon="el-icon-refresh" @click="refreshBtnClicked">刷新</el-button>
    </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'

export default {
  data () {
    return {
      myChart: null
    }
  },

  created () {
    this.getStat()
  },

  methods: {
    getStat () {
      axios
        .get(process.env.API_HOST + '/getallstat')
        .then(response => {
          this.myChart = echarts.init(document.getElementById('main'))
          var keys = []
          var stat = []
          for (var name in response.data) {
            for (var key in response.data[name]) {
              keys.push(key)
              stat.push(response.data[name][key])
            }
          }
          var option = {
            title: {
              text: 'API访问统计'
            },
            tooltip: {},
            legend: {
              data: ['访问次数']
            },
            xAxis: {
              data: keys
            },
            yAxis: {},
            series: [{
              name: '访问次数',
              type: 'bar',
              data: stat,
              color: ['#409EFF']
            }]
          }
          this.myChart.setOption(option)
        })
    },
    refreshBtnClicked () {
      this.getStat()
    }
  }

}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center
}
</style>
