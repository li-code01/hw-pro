<template>
  <div class="form-control w-full max-w-md">
    <label class="label cursor-pointer ml-10">
      <span class="label-text">年份：</span>
      <select class="select w-full max-w-xs" @change="changeYear">
        <option value="2023">2023</option>
        <option value="2024" selected>2024</option>
      </select>
    </label>
  </div>
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
const initChartData = (data) => {
  const zzlChartData = data.filter((i) => i.pay_user === 'zzl')
  const fjChartData = data.filter((i) => i.pay_user === 'fj')
  const leftChartDom = echarts.init(leftChart.value)
  const rightChartDom = echarts.init(rightChart.value)
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
const changeYear = async (e) => {
  console.log(e.target.value)
  const res = await service.get(`/spendApi/getSpendTotal?type=get&year=${e.target.value}`)
  if (res.data.code === 200) {
    const chartData = res.data.data
    initChartData(chartData)
  }
}
const initData = async () => {
  const res = await service.get(`/spendApi/getSpendTotal?type=get&year=2024`)
  if (res.data.code === 200) {
    const chartData = res.data.data
    initChartData(chartData)
  }
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
