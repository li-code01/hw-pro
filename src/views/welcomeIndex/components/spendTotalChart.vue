<template>
  <div class="flex w-full">
    <div class="grid w-full flex-grow card place-items-center">
      <div ref="leftChart" style="width: 100%; height: 400px"></div>
    </div>
    <div class="grid w-full flex-grow card place-items-center">
      <div ref="rightChart" style="width: 100%; height: 400px"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import service from '@/service/request'
const leftChart = ref(null)
const rightChart = ref(null)
const initData = async () => {
  const res = await service.get(`/spendApi/getSpendTotal?type=get`)
  const chartData = res.data.data
  const zzlChartData = chartData.filter((i) => i.pay_user === 'zzl')
  const fjChartData = chartData.filter((i) => i.pay_user === 'fj')
  const leftChartDom = echarts.init(leftChart.value)
  const rightChartDom = echarts.init(rightChart.value)
  console.log('res', chartData)
  const zzlOption = {
    // chart option
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: zzlChartData.map((i) => i.month)
    },
    yAxis: {
      min: 0
    },
    series: [
      {
        data: zzlChartData.map((i) => i.spend_total),
        type: 'bar',
        name: '总花费'
      },
      {
        data: zzlChartData.map((i) => i.wx_spend),
        type: 'line',
        name: '微信'
      },
      {
        data: zzlChartData.map((i) => i.zfb_spend),
        type: 'line',
        name: '支付宝'
      }
    ]
  }
  const fjOption = {
    // chart option
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: fjChartData.map((i) => i.month)
    },
    yAxis: {
      min: 0
    },
    series: [
      {
        data: fjChartData.map((i) => i.spend_total),
        type: 'bar',
        name: '总花费'
      },
      {
        data: fjChartData.map((i) => i.wx_spend),
        type: 'line',
        name: '微信'
      },
      {
        data: fjChartData.map((i) => i.zfb_spend),
        type: 'line',
        name: '支付宝'
      }
    ]
  }
  leftChartDom.setOption(zzlOption)
  rightChartDom.setOption(fjOption)
}
onMounted(() => {
  initData()
})
</script>

<style>
#chart {
  width: 800px;
  height: 500px;
}
</style>
